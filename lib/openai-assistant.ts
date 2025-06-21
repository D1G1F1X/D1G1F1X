import OpenAI from "openai"
import { generateReadingPrompt } from "@/lib/ai-prompt-manager"
import type { OracleCard } from "@/components/card-simulator" // Import OracleCard type

export interface ReadingRequest {
  fullName: string
  dateOfBirth?: string
  timeOfBirth?: string
  birthPlace?: string
  question: string
  selectedCards: OracleCard[]
  spreadType: string
  isMember?: boolean
}

export interface ReadingResponse {
  success: boolean
  reading?: string
  error?: string
  fallback?: boolean
  threadId?: string
  runId?: string
}

export interface AssistantMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export async function generateOracleReading(request: ReadingRequest): Promise<ReadingResponse> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    console.warn("OpenAI API key or Assistant ID not configured, using fallback")
    return {
      success: false,
      error: "AI service not configured",
      fallback: true,
    }
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  try {
    // Create a new thread for each new reading
    const thread = await openai.beta.threads.create()

    // Generate the prompt using the prompt manager
    const prompt = await generateReadingPrompt(
      request.selectedCards,
      request.question,
      request.fullName,
      request.dateOfBirth,
      request.birthPlace,
      request.spreadType,
      request.isMember,
    )

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    })

    // Run the assistant
    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    })

    // Poll for the run completion
    while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id, { order: "desc", limit: 1 })
      const assistantMessage = messages.data[0]

      if (assistantMessage.content[0].type === "text") {
        return {
          success: true,
          reading: assistantMessage.content[0].text.value,
          threadId: thread.id,
          runId: run.id,
        }
      } else {
        console.error("Assistant response was not text:", assistantMessage.content[0])
        return {
          success: false,
          error: "AI response format error",
          fallback: true,
          threadId: thread.id,
        }
      }
    } else {
      console.error(`Assistant run failed with status: ${run.status}`)
      return {
        success: false,
        error: `AI run failed: ${run.status}`,
        fallback: true,
        threadId: thread.id,
      }
    }
  } catch (error) {
    console.error("Error in generateOracleReading:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI service unavailable",
      fallback: true,
    }
  }
}

export async function continueConversation(threadId: string, message: string): Promise<ReadingResponse> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    console.warn("OpenAI API key or Assistant ID not configured for follow-up, using fallback")
    return {
      success: false,
      content: "",
      threadId,
      runId: "",
      error: "AI service not configured (stub)",
      fallback: true,
    } as any // Cast to any because the return type doesn't perfectly match ReadingResponse
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    })

    let run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    })

    while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      run = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId, { order: "desc", limit: 1 })
      const assistantMessage = messages.data[0]

      if (assistantMessage.content[0].type === "text") {
        return {
          success: true,
          reading: assistantMessage.content[0].text.value,
          threadId: threadId,
          runId: run.id,
        }
      } else {
        console.error("Assistant response was not text:", assistantMessage.content[0])
        return {
          success: false,
          error: "AI response format error",
          fallback: true,
          threadId: threadId,
        }
      }
    } else {
      console.error(`Assistant run failed with status: ${run.status}`)
      return {
        success: false,
        error: `AI run failed: ${run.status}`,
        fallback: true,
        threadId: threadId,
      }
    }
  } catch (error) {
    console.error("Error in continueConversation:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI service unavailable",
      fallback: true,
    }
  }
}

export async function getConversationHistory(threadId: string): Promise<AssistantMessage[]> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    return []
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  try {
    const messages = await openai.beta.threads.messages.list(threadId, { order: "asc" })
    return messages.data.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content[0].type === "text" ? msg.content[0].text.value : "",
      timestamp: new Date(msg.created_at * 1000),
    }))
  } catch (error) {
    console.error("Error fetching conversation history:", error)
    return []
  }
}
