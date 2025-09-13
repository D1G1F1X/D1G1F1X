import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { threadId, message } = body

    if (!threadId || !message) {
      return NextResponse.json(
        {
          error: "Thread ID and message are required",
          success: false,
        },
        { status: 400 },
      )
    }

    // Validate required environment variables
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_ASSISTANT_ID) {
      return NextResponse.json(
        {
          error: "OpenAI configuration missing",
          success: false,
        },
        { status: 500 },
      )
    }

    // Add the user's message to the existing thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    })

    // Create a new run
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    })

    // Poll for completion (simplified)
    let runStatus = await openai.beta.threads.runs.retrieve(run.id, {
      thread_id: threadId
    })
    let attempts = 0
    const maxAttempts = 30

    while (runStatus.status === "in_progress" || runStatus.status === "queued") {
      if (attempts >= maxAttempts) {
        break
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(run.id, {
        thread_id: threadId
      })
      attempts++
    }

    if (runStatus.status === "completed") {
      // Get the latest messages
      const messages = await openai.beta.threads.messages.list(threadId)
      const assistantMessage = messages.data.find((msg) => msg.role === "assistant")

      if (assistantMessage && assistantMessage.content[0]?.type === "text") {
        return NextResponse.json({
          threadId,
          runId: run.id,
          content: assistantMessage.content[0].text.value,
          success: true,
        })
      }
    }

    return NextResponse.json({
      threadId,
      runId: run.id,
      content: "Response is being generated...",
      success: true,
    })
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
