import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, context } = body

    // Fallback response when Gemini API is not available
    return NextResponse.json({
      response: `This is a fallback response. The follow-up question API is currently disabled. Your question was: "${question}"`,
      message: "Using fallback response - AI integration disabled",
    })
  } catch (error) {
    console.error("Error processing follow-up question:", error)
    return NextResponse.json(
      {
        error: "Failed to process follow-up question",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
