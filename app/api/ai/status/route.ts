import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "nodejs"
export const maxDuration = 20
export const dynamic = "force-dynamic"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get("threadId")
    const runId = searchParams.get("runId")

    if (!threadId || !runId) {
      return NextResponse.json({ success: false, error: "threadId and runId are required" }, { status: 400 })
    }

    const run = await openai.beta.threads.runs.retrieve(threadId, runId)

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId, { order: "desc", limit: 1 })
      const assistantMessage = messages.data[0]
      return NextResponse.json({
        success: true,
        status: run.status,
        content: assistantMessage?.content?.[0]?.type === "text" ? assistantMessage.content[0].text.value : null,
      })
    }

    return NextResponse.json({ success: true, status: run.status })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

