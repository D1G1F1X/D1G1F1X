import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { generateReading } from "@/lib/actions/generate-reading"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured",
          success: false,
        },
        { status: 500 },
      )
    }

    if (!process.env.OPENAI_ASSISTANT_ID) {
      return NextResponse.json(
        {
          error: "OpenAI Assistant ID not configured",
          success: false,
        },
        { status: 500 },
      )
    }

    const { cards, question, spreadType, userContext } = body

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json({ error: "No cards provided for reading" }, { status: 400 })
    }
    if (!question) {
      return NextResponse.json({ error: "No question provided for reading" }, { status: 400 })
    }

    const reading = await generateReading(cards, question, spreadType, userContext)
    return NextResponse.json({ reading })
  } catch (err) {
    console.error("OpenAI Error:", err)

    // Ensure we always return valid JSON
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to generate reading",
        details: errorMessage,
        success: false,
      },
      { status: 500 },
    )
  }
}
