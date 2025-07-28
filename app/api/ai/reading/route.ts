import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading } from "@/lib/ai/enhanced-ai-service-manager"
import type { OracleCard } from "@/types/cards"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    console.log("🔮 API Route: /api/ai/reading POST request received.")

    let requestBody: any

    try {
      requestBody = await req.json()
      console.log("📥 Request body parsed successfully")
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { cards, spread_type, question, user_context } = requestBody

    // Moved environment variable checks to the functions that use them (getOpenAIClient, getOpenAIAssistant)
    // to prevent synchronous crashes during module loading.
    // The errors thrown by those functions will now be caught by this try/catch block.

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      console.warn("WARN: Invalid or empty cards array received.")
      return NextResponse.json({ success: false, error: "Invalid card data provided." }, { status: 400 })
    }

    // The client now sends the full card objects, so we don't need to fetch them by ID here.
    // We just need to ensure they conform to OracleCard type.
    const oracleCards: OracleCard[] = cards.map((card: any) => ({
      id: card.id,
      number: card.number,
      suit: card.tool, // Map 'tool' from client to 'suit' for OracleCard
      fullTitle: card.name,
      symbols: [], // Not strictly needed for AI prompt, but keep type consistency
      symbolismBreakdown: card.description ? [card.description] : [],
      keyMeanings: card.keywords || [],
      baseElement: card.element,
      planetInternalInfluence: "", // Not provided by client, can be empty
      astrologyExternalDomain: "", // Not provided by client, can be empty
      iconSymbol: "", // Not provided by client, can be empty
      orientation: "", // Not provided by client, can be empty
      sacredGeometry: "", // Not provided by client, can be empty
      synergisticElement: "", // Not provided by client, can be empty
      imagePath: card.imagePath, // Keep imagePath if available
    }))

    console.log(
      "DEBUG: Initial cards drawn for AI reading:",
      oracleCards.map((c) => c.id),
    )
    console.log("DEBUG: Spread Type:", spread_type)
    console.log("DEBUG: User Question:", question)
    console.log("DEBUG: User Context:", user_context ? "Present (stringified)" : "Absent")

    console.log("🔮 Generating AI reading...")
    const { reading, threadId } = await generateOracleReading({
      cards: oracleCards,
      question: question,
      spreadType: spread_type,
      userContext: user_context, // Pass the stringified user context directly
    })
    console.log("✅ AI reading generated successfully.")

    return NextResponse.json({ success: true, reading, threadId })
  } catch (error: any) {
    console.error("💥 Error generating AI reading:", error)
    // Ensure the error message is always a string
    const errorMessage =
      typeof error === "string" ? error : error instanceof Error ? error.message : JSON.stringify(error)
    return NextResponse.json(
      {
        success: false,
        error: errorMessage || "An unexpected error occurred while generating the reading. Please try again.",
      },
      { status: 500 },
    )
  }
}
