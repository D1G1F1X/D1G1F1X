import { NextResponse } from "next/server"
import { generateGeminiReading } from "@/lib/gemini"

export async function GET() {
  try {
    const prompt = "Write a short poem about oracle cards and divination."
    const result = await generateGeminiReading(prompt)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error generating content:", error)
    // Return a fallback poem if the API fails
    return NextResponse.json({
      result: `
Mystical cards laid out in sight,
Symbols glowing in candlelight.
Whispers from realms beyond our own,
Seeds of wisdom divinely sown.

Oracle's guidance, gentle and clear,
Illuminating paths when the way's not near.
In the dance of chance and destiny's call,
The cards reveal truths within us all.
      `,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
