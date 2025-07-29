import { type NextRequest, NextResponse } from "next/server"
import { getCardById } from "@/lib/card-data-access"
import { getSystemPrompt, getUserPrompt } from "@/lib/ai-prompt-manager"
import { createClient } from "@/lib/supabase/server"
import { getAssistantResponse, createThread, addMessageToThread } from "@/lib/openai-assistant" // Ensure these are correctly imported
import { env } from "@/lib/env" // Import env for checking API keys

export const runtime = "nodejs" // Use nodejs runtime for OpenAI Assistant API

export async function POST(req: NextRequest) {
  console.log("API: /api/ai/reading - Request received.")

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.warn("API: /api/ai/reading - Unauthorized access attempt.")
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  let requestBody: any
  try {
    requestBody = await req.json()
    console.log("API: /api/ai/reading - Request body parsed successfully.")
  } catch (jsonError: any) {
    console.error("API: /api/ai/reading - Failed to parse request body as JSON:", jsonError)
    return NextResponse.json({ success: false, error: "Invalid JSON in request body." }, { status: 400 })
  }

  try {
    const { cards, question, spread_type, user_context, threadId: existingThreadId } = requestBody

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      console.warn("API: /api/ai/reading - No cards provided or invalid format.")
      return NextResponse.json({ success: false, error: "No cards provided" }, { status: 400 })
    }
    if (!question) {
      console.warn("API: /api/ai/reading - No question provided.")
      return NextResponse.json({ success: false, error: "No question provided" }, { status: 400 })
    }

    const cardDetails = cards.map((card: { id: string }) => getCardById(card.id)).filter(Boolean) as any[]

    if (cardDetails.length === 0) {
      console.warn("API: /api/ai/reading - Invalid card IDs provided.")
      return NextResponse.json({ success: false, error: "Invalid card IDs provided" }, { status: 400 })
    }

    // Check if OpenAI API keys are configured
    if (!env.OPENAI_API_KEY || !env.OPENAI_ASSISTANT_ID) {
      console.error("API: /api/ai/reading - OpenAI API key or Assistant ID is missing.")
      return NextResponse.json(
        { success: false, error: "AI service not configured. Please check server environment variables." },
        { status: 500 },
      )
    }

    const systemPrompt = getSystemPrompt(spread_type)
    const userPrompt = getUserPrompt(cardDetails, question, spread_type, user_context)

    let threadId = existingThreadId

    if (!threadId) {
      console.log("API: /api/ai/reading - Creating new OpenAI thread.")
      const thread = await createThread()
      threadId = thread.id
      console.log(`API: /api/ai/reading - New thread created: ${threadId}`)
    } else {
      console.log(`API: /api/ai/reading - Using existing thread: ${threadId}`)
    }

    console.log("API: /api/ai/reading - Adding message to thread.")
    await addMessageToThread(threadId, userPrompt)
    console.log("API: /api/ai/reading - Message added. Getting assistant response.")

    const assistantResponse = await getAssistantResponse(threadId)
    console.log("API: /api/ai/reading - Received assistant response.")

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
      console.error("API: /api/ai/reading - Error saving reading to DB:", dbError)
      // Continue even if saving fails, as the reading was generated
    } else {
      console.log("API: /api/ai/reading - Reading saved to DB successfully.")
    }

    return NextResponse.json({ success: true, reading: assistantResponse, threadId, method: "assistant" })
  } catch (error: any) {
    console.error("API: /api/ai/reading - Unhandled error during AI reading generation:", error)
    // Ensure the error message is a string
    const errorMessage = error.message || "Internal Server Error"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
