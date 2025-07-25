import { generateReading } from "@/lib/actions/generate-reading"
import { getCardById } from "@/lib/card-data-access"
import { NextResponse } from "next/server"
import { StreamingTextResponse } from "ai"
import type { OracleCard, DrawnCardForAI, UserContext, SpreadType } from "@/types/cards"

// Removed: export const runtime = "edge" as per user instructions

export async function POST(req: Request) {
  try {
    const {
      cards: drawnCardsInput,
      question,
      userContext,
      spreadType,
    } = (await req.json()) as {
      cards: OracleCard[] // This is the input from the client, which might be partial
      question: string
      spreadType: SpreadType
      userContext: UserContext
    }

    if (!drawnCardsInput || drawnCardsInput.length === 0) {
      return new NextResponse(JSON.stringify({ error: "No cards provided for reading." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    if (!question) {
      return new NextResponse(JSON.stringify({ error: "No question provided for reading." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    if (!spreadType) {
      return new NextResponse(JSON.stringify({ error: "No spread type provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Re-fetch full card data and determine orientation for AI prompt
    const fullDrawnCards: DrawnCardForAI[] = drawnCardsInput.map((dcInput) => {
      const fullCard = getCardById(dcInput.card.id) // Using getCardById from lib/card-data-access
      if (!fullCard) {
        throw new Error(`Card with ID ${dcInput.card.id} not found.`)
      }

      // Use the orientation passed from the client (which was randomly determined there)
      // and map it to 'first' or 'second' end for the AI prompt.
      // Note: The OracleCard type doesn't have 'firstEnd' or 'secondEnd' directly.
      // Assuming dcInput.orientation is either "Upright" or "Reversed"
      const endUp: "first" | "second" = dcInput.orientation === "Upright" ? "first" : "second"

      return {
        card: fullCard,
        endUp: endUp,
      }
    })

    // Generate the reading using the AI service manager, which returns a StreamResult
    const resultStream = await generateReading(fullDrawnCards, question, spreadType, userContext)

    // Return the streaming text response directly
    return new StreamingTextResponse(resultStream.toTextStream())
  } catch (error: any) {
    console.error("Error generating AI reading:", error)
    // Ensure error responses are always JSON
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error generating reading",
        fallback: true, // Indicate that this is a fallback error response
        // You might add a simple fallback reading here if the AI service fails completely
        // reading: "Due to an unexpected error, the oracle cannot provide a full reading at this moment. Please try again later."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
