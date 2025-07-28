import { type NextRequest, NextResponse } from "next/server"
import { getCardById } from "@/lib/card-data-access"
import { getSystemPrompt, getUserPrompt } from "@/lib/ai-prompt-manager"
import { createClient } from "@/lib/supabase/server"
import { getAssistantResponse, createThread, addMessageToThread } from "@/lib/openai-assistant"

export const runtime = "nodejs" // Use nodejs runtime for OpenAI Assistant API

export async function POST(req: NextRequest) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { cards, question, spread_type, user_context, threadId: existingThreadId } = await req.json()

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json({ success: false, error: "No cards provided" }, { status: 400 })
    }
    if (!question) {
      return NextResponse.json({ success: false, error: "No question provided" }, { status: 400 })
    }

    const cardDetails = cards.map((card: { id: string }) => getCardById(card.id)).filter(Boolean) as any[] // Filter out undefined and assert type

    if (cardDetails.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid card IDs provided" }, { status: 400 })
    }

    const systemPrompt = getSystemPrompt(spread_type)
    const userPrompt = getUserPrompt(cardDetails, question, spread_type, user_context)

    let threadId = existingThreadId

    if (!threadId) {
      const thread = await createThread()
      threadId = thread.id
    }

    await addMessageToThread(threadId, userPrompt)

    const assistantResponse = await getAssistantResponse(threadId)

    // Save the reading to Supabase
    const { error: dbError } = await supabase.from("readings").insert([
      {
        user_id: user.id,
        question: question,
        reading_text: assistantResponse,
        cards_drawn: cards.map((c: any) => c.id),
        spread_type: spread_type,
        thread_id: threadId,
      },
    ])

    if (dbError) {
      console.error("Error saving reading to DB:", dbError)
      // Continue even if saving fails, as the reading was generated
    }

    return NextResponse.json({ success: true, reading: assistantResponse, threadId, method: "assistant" })
  } catch (error: any) {
    console.error("Error generating AI reading:", error)
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
