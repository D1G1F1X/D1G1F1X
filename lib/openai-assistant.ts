import OpenAI from "openai"
import { env } from "@/lib/env"

let openaiClient: OpenAI | null = null
let assistant: OpenAI.Beta.Assistants.Assistant | null = null

/**
 * Initializes and returns the OpenAI client.
 * Throws an error if OPENAI_API_KEY is not set.
 */
export function getOpenAIClient(): OpenAI {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.")
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

/**
 * Retrieves and caches the OpenAI Assistant object.
 * Throws an error if OPENAI_ASSISTANT_ID is not set or if the assistant cannot be retrieved.
 */
export async function getOpenAIAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error("OPENAI_ASSISTANT_ID is not set in environment variables.")
  }
  if (!assistant) {
    try {
      const client = getOpenAIClient()
      assistant = await client.beta.assistants.retrieve(env.OPENAI_ASSISTANT_ID)
      console.log(`✅ OpenAI Assistant '${assistant.name}' retrieved successfully.`)
    } catch (error) {
      console.error("❌ Failed to retrieve OpenAI Assistant:", error)
      throw new Error(`Failed to retrieve OpenAI Assistant: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  return assistant
}

/**
 * Creates a new OpenAI Assistant thread.
 */
export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
  try {
    const client = getOpenAIClient()
    const thread = await client.beta.threads.create()
    console.log(`✅ New OpenAI thread created with ID: ${thread.id}`)
    return thread
  } catch (error) {
    console.error("❌ Failed to create OpenAI thread:", error)
    throw new Error(`Failed to create thread: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Adds a message to an existing OpenAI Assistant thread.
 */
export async function addMessageToThread(
  threadId: string,
  content: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
  try {
    const client = getOpenAIClient()
    const message = await client.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    })
    console.log(`✅ Message added to thread ${threadId}. Message ID: ${message.id}`)
    return message
  } catch (error) {
    console.error(`❌ Failed to add message to thread ${threadId}:`, error)
    throw new Error(`Failed to add message: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Runs the assistant on a given thread and waits for its completion.
 */
export async function runAssistant(threadId: string, assistantId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  try {
    const client = getOpenAIClient()
    let run = await client.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    })

    console.log(`✅ Assistant run created with ID: ${run.id} for thread ${threadId}.`)

    // Poll for run completion
    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
      run = await client.beta.threads.runs.retrieve(threadId, run.id)
      console.log(`DEBUG: Current run status for ${run.id}: ${run.status}`)
    }

    if (run.status !== "completed") {
      throw new Error(`Assistant run failed or stopped with status: ${run.status}`)
    }

    console.log(`✅ Assistant run ${run.id} completed.`)
    return run
  } catch (error) {
    console.error(`❌ Failed to run assistant on thread ${threadId}:`, error)
    throw new Error(`Failed to run assistant: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Retrieves messages from an OpenAI Assistant thread.
 */
export async function getAssistantThreadMessages(
  threadId: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage[]> {
  try {
    const client = getOpenAIClient()
    const messagesPage = await client.beta.threads.messages.list(threadId)
    console.log(`✅ Retrieved ${messagesPage.data.length} messages from thread ${threadId}.`)
    return messagesPage.data
  } catch (error) {
    console.error(`❌ Failed to retrieve messages from thread ${threadId}:`, error)
    throw new Error(`Failed to retrieve messages: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Continues an AI conversation with the assistant on an existing thread.
 * This function adds a user message, runs the assistant, and returns the latest assistant response.
 */
export async function continueAIConversationWithAssistant(
  threadId: string,
  userMessage: string,
): Promise<{ response: string; threadId: string }> {
  try {
    const assistantObj = await getOpenAIAssistant()
    await addMessageToThread(threadId, userMessage)
    await runAssistant(threadId, assistantObj.id)
    const messages = await getAssistantThreadMessages(threadId)

    const latestAssistantMessage = messages.data.find(
      (msg) => msg.role === "assistant" && msg.run_id === messages.data[0]?.run_id,
    )?.content[0]

    if (latestAssistantMessage && latestAssistantMessage.type === "text") {
      return { response: latestAssistantMessage.text.value, threadId: threadId }
    } else {
      throw new Error("No text content found in assistant's response or unexpected message type.")
    }
  } catch (error) {
    console.error(`❌ Error in continueAIConversationWithAssistant for thread ${threadId}:`, error)
    throw new Error(`Failed to continue conversation: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Tests the OpenAI Assistant's connectivity and basic functionality.
 */
export async function testOpenAIAssistant(testMessage: string): Promise<{ response?: string; error?: string }> {
  try {
    const client = getOpenAIClient()
    const assistantObj = await getOpenAIAssistant()

    const thread = await client.beta.threads.create()
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: testMessage,
    })

    let run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistantObj.id,
    })

    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 500))
      run = await client.beta.threads.runs.retrieve(thread.id, run.id)
    }

    if (run.status === "completed") {
      const messages = await client.beta.threads.messages.list(thread.id)
      const assistantResponse = messages.data.find((msg) => msg.role === "assistant")?.content[0]
      if (assistantResponse && assistantResponse.type === "text") {
        return { response: assistantResponse.text.value }
      } else {
        return { error: "Assistant responded, but no text content found." }
      }
    } else {
      return { error: `Assistant run failed with status: ${run.status}` }
    }
  } catch (error: any) {
    console.error("❌ OpenAI Assistant test failed:", error)
    return { error: error.message || "An unknown error occurred during the test." }
  }
}

/**
 * Checks the status of the OpenAI Assistant.
 */
export async function getAssistantStatus(): Promise<{ status: "active" | "inactive" | "unknown"; message?: string }> {
  try {
    await getOpenAIAssistant() // Attempt to retrieve the assistant
    return { status: "active", message: "OpenAI Assistant is active and reachable." }
  } catch (error: any) {
    return { status: "inactive", message: error.message || "OpenAI Assistant is inactive or unreachable." }
  }
}

// Placeholder for AI SDK functions (if not directly used by Assistant API)
// These are typically used for direct model calls, not Assistant API interactions.
export async function generateText(options: {
  model: any
  prompt: string
  system?: string
  messages?: any[]
}): Promise<{ text: string }> {
  // This is a simplified placeholder. In a real scenario, you'd use @ai-sdk/openai's generateText.
  // For Assistant API, the prompt is sent via messages.create and response retrieved from thread messages.
  console.warn("Using placeholder generateText. For Assistant API, use thread messages.")
  return { text: "Placeholder response from generateText." }
}

export function streamText(options: {
  model: any
  prompt: string
  system?: string
  onChunk?: (chunk: any) => void
  onFinish?: (result: any) => void
}): any {
  // This is a simplified placeholder. In a real scenario, you'd use @ai-sdk/openai's streamText.
  console.warn("Using placeholder streamText. For Assistant API, use thread messages.")
  return {
    toReadableStream: () =>
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("Placeholder stream response."))
          controller.close()
        },
      }),
  }
}
