import { NextResponse } from "next/server"
import { generateFollowUpQuestion } from "@/lib/openai-assistant"

export async function POST(request: Request) {
  try {
    const { conversationHistory } = await request.json()

    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return NextResponse.json({ error: "Conversation history is required and must be an array" }, { status: 400 })
    }

    const followUp = await generateFollowUpQuestion(conversationHistory)
    return NextResponse.json({ followUpQuestion: followUp })
  } catch (error) {
    console.error("Error generating follow-up question:", error)
    return NextResponse.json({ error: "Failed to generate follow-up question" }, { status: 500 })
  }
}
