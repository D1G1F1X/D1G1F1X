import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fallback response when Gemini API is not available
    return NextResponse.json({
      models: [
        { name: "gemini-pro", displayName: "Gemini Pro", description: "Text generation model" },
        { name: "gemini-pro-vision", displayName: "Gemini Pro Vision", description: "Multimodal model" },
      ],
      message: "Using fallback model list - Gemini API integration disabled",
    })
  } catch (error) {
    console.error("Error listing models:", error)
    return NextResponse.json(
      { error: "Failed to list models", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
