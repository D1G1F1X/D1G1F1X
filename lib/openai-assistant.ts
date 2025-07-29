import OpenAI from "openai"
import { getEnv } from "./env"

const OPENAI_API_KEY = getEnv("OPENAI_API_KEY")
const OPENAI_ASSISTANT_ID = getEnv("OPENAI_ASSISTANT_ID")

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set.")
}

if (!OPENAI_ASSISTANT_ID) {
  throw new Error("OPENAI_ASSISTANT_ID is not set.")
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export async function createAssistantThread() {
  try {
    const thread = await openai.beta.threads.create()
    return thread.id
  } catch (error) {
    console.error("Error creating assistant thread:", error)
    throw error
  }
}

export async function addMessageToThread(threadId: string, content: string) {
  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    })
  } catch (error) {
    console.error("Error adding message to thread:", error)
    throw error
  }
}

export async function runAssistant(threadId: string) {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: OPENAI_ASSISTANT_ID,
    })

    // Poll for the run completion
    let currentRun = run
    while (
      currentRun.status === "queued" ||
      currentRun.status === "in_progress" ||
      currentRun.status === "cancelling"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
      currentRun = await openai.beta.threads.runs.retrieve(threadId, currentRun.id)
    }

    if (currentRun.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId)
      const lastMessage = messages.data.filter((msg) => msg.role === "assistant" && msg.run_id === currentRun.id).pop()

      if (lastMessage && lastMessage.content[0]?.type === "text") {
        return lastMessage.content[0].text.value
      } else {
        return "No response from assistant."
      }
    } else {
      throw new Error(`Assistant run failed with status: ${currentRun.status}`)
    }
  } catch (error) {
    console.error("Error running assistant:", error)
    throw error
  }
}

export async function getAssistantStatus(): Promise<{ status: string; message?: string }> {
  try {
    const assistant = await openai.beta.assistants.retrieve(OPENAI_ASSISTANT_ID)
    return { status: assistant.status || "unknown" }
  } catch (error: any) {
    console.error("Error retrieving assistant status:", error)
    return { status: "error", message: error.message || "Failed to retrieve assistant status." }
  }
}
