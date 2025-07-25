import { NextResponse } from "next/server"
import { recordShareEvent } from "@/lib/services/share-analytics-service"

export async function POST(request: Request) {
  try {
    const { type, contentId, platform } = await request.json()

    if (!type || !contentId || !platform) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await recordShareEvent(type, contentId, platform)

    return NextResponse.json({ message: "Share event recorded successfully" })
  } catch (error) {
    console.error("Error recording share event:", error)
    return NextResponse.json({ error: "Failed to record share event" }, { status: 500 })
  }
}
