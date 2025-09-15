import { type NextRequest, NextResponse } from "next/server"

// Ensure Node runtime and allow longer processing window than 10s Edge default
export const runtime = "nodejs"
export const maxDuration = 30
export const dynamic = "force-dynamic"
import { aiServiceManager } from "@/lib/ai/ai-service-manager"
import type { ReadingRequest } from "@/lib/ai/ai-service-manager"

export async function POST(request: NextRequest) {
  try {
    console.log("[API] AI reading request received")

    // Parse request body with error handling
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("[API] Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format",
          fallback: true,
        },
        { status: 400 },
      )
    }

    console.log("[API] Request body parsed:", {
      fullName: body.fullName,
      hasQuestion: !!body.question,
      hasCards: !!body.selectedCards,
      spreadType: body.spreadType,
    })

    // Validate required fields
    if (!body.question || !body.selectedCards) {
      console.error("[API] Missing required fields:", {
        fullName: !!body.fullName,
        question: !!body.question,
        selectedCards: !!body.selectedCards,
      })
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: question or selectedCards",
          fallback: true,
        },
        { status: 400 },
      )
    }

    // Validate selectedCards is an array
    if (!Array.isArray(body.selectedCards)) {
      console.error("[API] Invalid selectedCards:", body.selectedCards)
      return NextResponse.json(
        {
          success: false,
          error: "selectedCards must be an array",
          fallback: true,
        },
        { status: 400 },
      )
    }

    // For chat initialization, allow empty cards array, otherwise require at least one card
    if (body.spreadType !== "chat_init" && body.selectedCards.length === 0) {
      console.error("[API] Empty selectedCards for non-chat spread:", body.selectedCards)
      return NextResponse.json(
        {
          success: false,
          error: "selectedCards must contain at least one card for card readings",
          fallback: true,
        },
        { status: 400 },
      )
    }

    const readingRequest: ReadingRequest = {
      fullName: body.fullName || "Anonymous User",
      dateOfBirth: body.dateOfBirth || undefined,
      timeOfBirth: body.timeOfBirth || undefined,
      birthPlace: body.birthPlace || undefined,
      question: body.question,
      selectedCards: body.selectedCards,
      spreadType: body.spreadType || "single",
      isMember: body.isMember || false,
    }

    console.log("[API] Calling AI service manager...")
    const response = await aiServiceManager.generateOracleReading(readingRequest)

    console.log("[API] AI service response:", {
      success: response.success,
      hasReading: !!response.reading,
      hasThreadId: !!response.threadId,
      error: response.error,
    })

    // Always return 200 status for successful API calls, let the client handle the response
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("[API] Unexpected error in AI reading route:", error)
    console.error("[API] Error stack:", error.stack)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
        fallback: true,
        reading:
          "I apologize, but the AI service is currently unavailable. Please try again later or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}
