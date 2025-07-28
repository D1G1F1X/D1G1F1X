import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key not configured",
          success: false,
        },
        { status: 500 },
      )
    }

    if (!process.env.OPENAI_ASSISTANT_ID) {
      return NextResponse.json(
        {
          error: "OpenAI Assistant ID not configured",
          success: false,
        },
        { status: 500 },
      )
    }

    // Create a new thread
    const thread = await openai.beta.threads.create()

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: body.message || "Tell me something cool",
    })

    // Create a run with the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    })

    return NextResponse.json({
      threadId: thread.id,
      runId: run.id,
      success: true,
    })
  } catch (err) {
    console.error("OpenAI Error:", err)

    // Ensure we always return valid JSON
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to generate reading",
        details: errorMessage,
        success: false,
      },
      { status: 500 },
    )
  }
}
