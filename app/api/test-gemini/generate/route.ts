import { NextResponse } from "next/server"
import { generateTextWithGemini } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const { prompt, model } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const generatedText = await generateTextWithGemini(prompt, model)
    return NextResponse.json({ text: generatedText })
  } catch (error) {
    console.error("Error generating text with Gemini:", error)
    return NextResponse.json({ error: "Failed to generate text with Gemini" }, { status: 500 })
  }
}
