import { NextResponse } from "next/server"
import { continueConversation } from "@/lib/openai-assistant"

export async function POST(req: Request) {
  try {
    const { threadId, message } = await req.json()

    if (!threadId || !message) {
      return NextResponse.json({ error: "Thread ID and message are required" }, { status: 400 })
    }

    const response = await continueConversation(threadId, message)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error continuing conversation:", error)
    return NextResponse.json({ error: "Failed to continue conversation" }, { status: 500 })
  }
}
