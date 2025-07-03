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
      console.log("❌ Invalid cards array")
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

    if (!body.question || typeof body.question !== "string" || body.question.trim().length === 0) {
      console.log("❌ Invalid question")
      return NextResponse.json(
        {
          success: false,
          error: "Question is required",
          reading: "Please provide a question for your reading.",
          interpretation: "A focused question helps the Oracle provide better guidance.",
          guidance: "Think about what specific guidance you seek.",
        },
        { status: 400 },
      )
    }

    console.log("✅ Request validation passed")

    // Generate reading using the AI service manager
    const result = await aiServiceManager.generateReading({
      cards: body.cards,
      question: body.question,
      spread_type: body.spread_type || "single",
      user_context: body.user_context,
    })

    console.log("✨ Reading generated:", {
      success: result.success,
      method: result.method,
      hasReading: !!result.reading,
      hasError: !!result.error,
      readingLength: result.reading?.length || 0,
    })

    // Ensure we always return a properly formatted response
    const response = {
      success: result.success,
      reading: result.reading || "Unable to generate reading at this time.",
      interpretation: result.interpretation || "Please try again later.",
      guidance: result.guidance || "The Oracle will provide guidance when the time is right.",
      method: result.method || "fallback",
      error: result.error || undefined,
    }

    console.log("📤 Sending response:", {
      success: response.success,
      hasReading: !!response.reading,
      method: response.method,
    })

    return NextResponse.json(response, {
      status: result.success ? 200 : 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("💥 AI Reading API error:", error)

    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      reading: "I apologize, but I'm unable to provide a reading at this time due to a technical issue.",
      interpretation: "The AI service encountered an unexpected error while processing your request.",
      guidance: "Please try again in a few moments, or contact support if the issue persists.",
      method: "error_fallback",
    }

    console.log("📤 Sending error response:", errorResponse)

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
