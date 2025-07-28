import { NextResponse } from "next/server"
import { generateReading } from "@/lib/actions/generate-reading"

export async function POST(request: Request) {
  try {
    const { cards, question, spreadType, userContext } = await request.json()

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json({ error: "No cards provided for reading" }, { status: 400 })
    }
    if (!question) {
      return NextResponse.json({ error: "No question provided for reading" }, { status: 400 })
    }

    const reading = await generateReading(cards, question, spreadType, userContext)
    return NextResponse.json({ reading })
  } catch (error) {
    console.error("Error generating reading:", error)
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 })
  }
}
