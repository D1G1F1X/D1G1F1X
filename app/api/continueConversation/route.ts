import { type NextRequest, NextResponse } from "next/server"
import { continueConversation } from "@/lib/openai-assistant"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { threadId, message } = body

    if (!threadId || !message) {
      return NextResponse.json({ error: "Thread ID and message are required" }, { status: 400 })
    }

    const response = await continueConversation(threadId, message)
    return NextResponse.json(response)
  } catch (err) {
    console.error("Continue Conversation Error:", err)

    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to continue conversation",
        details: errorMessage,
        success: false,
      },
      { status: 500 },
    )
  }
}
