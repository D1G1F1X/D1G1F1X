import { NextResponse } from "next/server"
import { generateReading } from "@/lib/services/reading-service"

export async function POST(request: Request) {
  try {
    const { cardIds, question, spreadType } = await request.json()

    if (!cardIds || !Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json({ error: "At least one card ID is required" }, { status: 400 })
    }

    const reading = await generateReading(cardIds, question, spreadType)
    return NextResponse.json(reading)
  } catch (error) {
    console.error("Error generating reading:", error)
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 })
  }
}
