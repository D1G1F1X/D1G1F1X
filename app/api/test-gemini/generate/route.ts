import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, model = "gemini-pro" } = body

    // Fallback response when Gemini API is not available
    return NextResponse.json({
      text: `This is a fallback response. The Gemini API integration is currently disabled. Your prompt was: "${prompt}"`,
      model: model,
      message: "Using fallback response - Gemini API integration disabled",
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json(
      { error: "Failed to generate content", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
