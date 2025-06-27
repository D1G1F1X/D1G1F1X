import { type NextRequest, NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function POST(request: NextRequest) {
  try {
    console.log("🔮 AI Reading API called")

    const body = await request.json()
    console.log("📝 Request body:", {
      hasCards: !!body.cards,
      cardCount: body.cards?.length || 0,
      hasQuestion: !!body.question,
      spreadType: body.spread_type,
    })

    // Validate request
    if (!body.cards || !Array.isArray(body.cards) || body.cards.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cards array is required and must not be empty",
          reading: "Please select at least one card for your reading.",
          interpretation: "No cards were provided for interpretation.",
          guidance: "Choose cards that resonate with your question.",
        },
        { status: 400 },
      )
    }

    // Generate reading using the AI service manager
    const result = await aiServiceManager.generateReading({
      cards: body.cards,
      question: body.question,
      spread_type: body.spread_type,
      user_context: body.user_context,
    })

    console.log("✨ Reading generated:", {
      success: result.success,
      method: result.method,
      hasReading: !!result.reading,
      hasError: !!result.error,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("💥 AI Reading API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        reading: "I apologize, but I'm unable to provide a reading at this time.",
        interpretation: "The AI service encountered an unexpected error.",
        guidance: "Please try again in a few moments, or contact support if the issue persists.",
        method: "error_fallback",
      },
      { status: 500 },
    )
  }
}
