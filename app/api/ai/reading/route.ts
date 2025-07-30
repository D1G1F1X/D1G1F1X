import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"
import { getAllCards, type OracleCard } from "@/lib/card-data-access" // Import to get full card data

export async function POST(req: Request) {
  try {
    const { cardIds, question, spread_type, user_context } = await req.json()

    // 1. Basic input validation
    if (!cardIds || !Array.isArray(cardIds) || cardIds.length === 0) {
      console.error("API Error: Missing or invalid 'cardIds' in request body.")
      return NextResponse.json({ success: false, error: "Missing or invalid card IDs." }, { status: 400 })
    }
    if (!question || typeof question !== "string" || question.trim() === "") {
      console.error("API Error: Missing or empty 'question' in request body.")
      return NextResponse.json({ success: false, error: "Question is required." }, { status: 400 })
    }

    // 2. Reconstruct full OracleCard objects from IDs
    const allAvailableCards = getAllCards()
    const selectedFullCards: OracleCard[] = cardIds
      .map((id: string) => allAvailableCards.find((card) => card.id === id))
      .filter(Boolean) as OracleCard[] // Filter out undefined and assert type

    if (selectedFullCards.length !== cardIds.length) {
      const missingCardIds = cardIds.filter((id: string) => !allAvailableCards.some((card) => card.id === id))
      console.error(`API Error: Could not find full card data for some IDs. Missing: ${missingCardIds.join(", ")}`)
      return NextResponse.json(
        { success: false, error: "One or more selected cards could not be found." },
        { status: 400 },
      )
    }

    // 3. Generate the oracle reading using the AI service manager
    console.log("API Route: Calling aiServiceManager.generateOracleReading...")
    const { reading, threadId, method } = await aiServiceManager.generateOracleReading({
      cards: selectedFullCards,
      question,
      spreadType: spread_type,
      userContext: user_context,
    })
    console.log("API Route: aiServiceManager.generateOracleReading completed successfully.")

    // 4. Return success response
    return NextResponse.json({ success: true, reading, threadId, method }, { status: 200 })
  } catch (error: any) {
    // 5. Centralized error handling for the API route
    console.error("API Route Error (/api/ai/reading):", error)
    console.error("Error name:", error.name)
    console.error("Error message:", error.message)
    if (error.stack) {
      console.error("Error stack:", error.stack)
    }

    // Provide a more informative error message to the client if possible
    let clientErrorMessage = "An unexpected error occurred while generating the reading."
    if (error.message.includes("OPENAI_API_KEY") || error.message.includes("OPENAI_ASSISTANT_ID")) {
      clientErrorMessage = "AI service configuration error. Please check server environment variables."
    } else if (
      error.message.includes("Failed to create OpenAI thread") ||
      error.message.includes("Failed during assistant run")
    ) {
      clientErrorMessage = "AI service communication error. Please try again."
    } else if (error.message.includes("No text content found")) {
      clientErrorMessage = "AI generated an unexpected response format. Please try again."
    } else if (error.message.includes("API returned unsuccessful response")) {
      clientErrorMessage = "The AI service returned an unsuccessful response. Please try again."
    } else if (error.message.includes("Failed to prepare AI prompt")) {
      clientErrorMessage = "There was an issue preparing the AI prompt. Please try a different question."
    }

    return NextResponse.json({ success: false, error: clientErrorMessage }, { status: 500 })
  }
}
