import OpenAI from "openai"
import { env } from "@/lib/env"

let openaiClient: OpenAI | null = null
let openaiAssistant: OpenAI.Beta.Assistants.Assistant | null = null

// Initialize OpenAI client
export function getOpenAIClient(): OpenAI {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set.")
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

// Initialize OpenAI Assistant
export async function getOpenAIAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error("OPENAI_ASSISTANT_ID environment variable is not set.")
  }
  if (!openaiAssistant) {
    const client = getOpenAIClient()
    try {
      openaiAssistant = await client.beta.assistants.retrieve(env.OPENAI_ASSISTANT_ID)
    } catch (error) {
      console.error("Failed to retrieve OpenAI Assistant:", error)
      throw new Error(
        `Failed to retrieve OpenAI Assistant with ID ${env.OPENAI_ASSISTANT_ID}. Please check the ID and API key.`,
      )
    }
  }
  return openaiAssistant
}

// Create a new thread
export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
  const client = getOpenAIClient()
  try {
    return await client.beta.threads.create()
  } catch (error) {
    console.error("Failed to create OpenAI thread:", error)
    throw new Error("Failed to create a new conversation thread with OpenAI.")
  }
}

// Add a message to a thread
export async function addMessageToThread(
  threadId: string,
  content: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
  const client = getOpenAIClient()
  try {
    return await client.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    })
  } catch (error) {
    console.error(`Failed to add message to thread ${threadId}:`, error)
    throw new Error(`Failed to add message to conversation thread ${threadId}.`)
  }
}

// Get assistant response from a thread
export async function getAssistantResponse(threadId: string): Promise<string> {
  const client = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  try {
    let run = await client.beta.threads.runs.create(threadId, {
      assistant_id: assistant.id,
    })

    // Poll for the run completion
    while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
      run = await client.beta.threads.runs.retrieve(threadId, run.id)
    }

    if (run.status === "completed") {
      const messages = await client.beta.threads.messages.list(threadId, { order: "desc", limit: 1 })
      const latestAssistantMessage = messages.data.find((msg) => msg.role === "assistant")?.content[0]

      if (latestAssistantMessage && latestAssistantMessage.type === "text") {
        return latestAssistantMessage.text.value
      } else {
        throw new Error("No text content found in assistant's response or response is empty.")
      }
    } else {
      throw new Error(
        `Assistant run failed with status: ${run.status}. Last error: ${run.last_error?.message || "None"}`,
      )
    }
  } catch (error) {
    console.error(`Error getting assistant response for thread ${threadId}:`, error)
    throw new Error(`Failed to get AI assistant response: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Function to run the assistant with a given content and optional threadId
export async function runAssistant(
  content: string,
  threadId?: string,
): Promise<{ response: string; threadId: string }> {
  const client = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  let currentThreadId = threadId

  if (!currentThreadId) {
    const newThread = await createThread()
    currentThreadId = newThread.id
  }

  await addMessageToThread(currentThreadId, content)

  const response = await getAssistantResponse(currentThreadId)

  return { response, threadId: currentThreadId }
}
