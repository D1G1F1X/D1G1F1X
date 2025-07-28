import { NextResponse } from "next/server"
import { getReadingSessions, createReadingSession } from "@/lib/services/reading-history-service"

export async function GET() {
  try {
    const sessions = await getReadingSessions()
    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error fetching reading sessions:", error)
    return NextResponse.json({ error: "Failed to fetch reading sessions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const sessionData = await request.json()
    const newSession = await createReadingSession(sessionData)
    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    console.error("Error creating reading session:", error)
    return NextResponse.json({ error: "Failed to create reading session" }, { status: 500 })
  }
}
