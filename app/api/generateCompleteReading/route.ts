import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading, type ReadingRequest } from "@/lib/openai-assistant"

/**
 * POST /api/generateCompleteReading
 * Generates a full NUMO Oracle reading with the OpenAI Assistant.
 * Expects JSON body matching the ReadingRequest interface.
 */
export async function POST(req: NextRequest) {
  try {
    const body: ReadingRequest = await req.json()

    // Basic validation – you can tighten this if desired
    if (!body.selectedCards || body.selectedCards.length === 0) {
      return NextResponse.json({ success: false, error: "No cards supplied" }, { status: 400 })
    }

    // Call helper that wraps the Assistant flow
    const aiResponse = await generateOracleReading(body)

    // Always return a well-formed JSON object
    return NextResponse.json(aiResponse, {
      status: aiResponse.success ? 200 : 500,
    })
  } catch (err) {
    console.error("generateCompleteReading error:", err)

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown server error occurred",
      },
      { status: 500 },
    )
  }
}
