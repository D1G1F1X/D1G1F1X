import { type NextRequest, NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/ai-service-manager" // This is a server-only import

export async function POST(request: NextRequest) {
  try {
    console.log("[API] AI reading request received")

    // Parse request body with error handling
    let body: any
    try {
      body = await request.json()
    } catch (parseError: any) {
      console.error("[API] Failed to parse request body:", parseError.message, parseError.stack)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format. Please ensure your request body is valid JSON.",
          details: parseError.message,
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
    if (!body.fullName || !body.question || !body.selectedCards) {
      console.error("[API] Missing required fields:", {
        fullName: !!body.fullName,
        question: !!body.question,
        selectedCards: !!body.selectedCards,
      })
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: fullName, question, or selectedCards.",
          fallback: true,
        },
        { status: 400 },
      )
    }

    // Validate selectedCards is an array
    if (!Array.isArray(body.selectedCards) || body.selectedCards.length === 0) {
      console.error("[API] Invalid selectedCards: must be a non-empty array.", body.selectedCards)
      return NextResponse.json(
        {
          success: false,
          error: "selectedCards must be a non-empty array.",
          fallback: true,
        },
        { status: 400 },
      )
    }

    const readingRequest = {
      fullName: body.fullName,
      dateOfBirth: body.dateOfBirth || undefined,
      timeOfBirth: body.timeOfBirth || undefined,
      birthPlace: body.birthPlace || undefined,
      question: body.question,
      selectedCards: body.selectedCards,
      spreadType: body.spreadType || "single",
      isMember: body.isMember || false,
    }

    // Ensure aiServiceManager is configured before calling it
    if (!aiServiceManager.isAIConfigured()) {
      console.error("[API] AI Service Manager is not configured. Check OpenAI environment variables.")
      return NextResponse.json(
        {
          success: false,
          error: "AI service is not configured on the server. Please check server environment variables.",
          fallback: true,
          reading: aiServiceManager.generateFallbackReading(), // Use fallback reading from manager
        },
        { status: 500 },
      )
    }

    console.log("[API] Calling AI service manager to generate reading...")
    const response = await aiServiceManager.generateOracleReading(readingRequest)

    console.log("[API] AI service response:", {
      success: response.success,
      hasReading: !!response.reading,
      hasThreadId: !!response.threadId,
      error: response.error,
    })

    // Always return 200 status for successful API calls, let the client handle the response
    // If response.success is false, the client will handle the error message in 'response.error'
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("[API] Unexpected error in AI reading route:", error.message, error.stack)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during AI reading generation.",
        details: error.message,
        fallback: true,
        reading:
          "I apologize, but the AI service encountered an unexpected error. Please try again later or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}
