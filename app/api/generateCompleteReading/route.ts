import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading, type ReadingRequest } from "@/lib/openai-assistant"

/**
 * POST /api/generateCompleteReading
 * Generates a full NUMO Oracle reading with the OpenAI Assistant.
 * Expects JSON body matching the ReadingRequest interface.
 */
export async function POST(req: NextRequest) {
  try {
    // Add request validation
    const contentType = req.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, error: "Content-Type must be application/json" }, { status: 400 })
    }

    let body: ReadingRequest
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json({ success: false, error: "Invalid JSON in request body" }, { status: 400 })
    }

    // Enhanced validation
    if (!body.selectedCards || !Array.isArray(body.selectedCards) || body.selectedCards.length === 0) {
      return NextResponse.json({ success: false, error: "selectedCards must be a non-empty array" }, { status: 400 })
    }

    if (!body.question || typeof body.question !== "string" || body.question.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "question is required and must be a non-empty string" },
        { status: 400 },
      )
    }

    // Call helper that wraps the Assistant flow with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 30000) // 30 second timeout
    })

    const aiResponse = (await Promise.race([generateOracleReading(body), timeoutPromise])) as any

    // Always return a well-formed JSON object
    return NextResponse.json(aiResponse, {
      status: aiResponse.success ? 200 : 500,
    })
  } catch (err) {
    console.error("generateCompleteReading error:", err)

    // Return a more specific error message
    const errorMessage = err instanceof Error ? err.message : "Unknown server error occurred"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        fallback: true, // Indicate this should trigger fallback behavior
      },
      { status: 500 },
    )
  }
}
