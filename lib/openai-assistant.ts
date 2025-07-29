import OpenAI from "openai"
import { env } from "@/lib/env" // Assuming env is correctly set up to read process.env

let openaiClient: OpenAI | null = null
let openaiAssistant: OpenAI.Beta.Assistants.Assistant | null = null

/**
 * Initializes and returns the OpenAI client.
 * Throws an error if OPENAI_API_KEY is not set.
 */
export function getOpenAIClient(): OpenAI {
  if (!env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY environment variable is not set. Please configure it in your Vercel project settings.",
    )
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

/**
 * Retrieves and caches the OpenAI Assistant.
 * Throws an error if OPENAI_ASSISTANT_ID is not set or if the assistant cannot be retrieved.
 */
export async function getOpenAIAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error(
      "OPENAI_ASSISTANT_ID environment variable is not set. Please configure it in your Vercel project settings.",
    )
  }
  if (!openaiAssistant) {
    const client = getOpenAIClient()
    try {
      openaiAssistant = await client.beta.assistants.retrieve(env.OPENAI_ASSISTANT_ID)
      console.log("OpenAI Assistant retrieved successfully:", openaiAssistant.id)
    } catch (error) {
      console.error("Failed to retrieve OpenAI Assistant:", error)
      throw new Error(
        `Failed to retrieve OpenAI Assistant with ID '${env.OPENAI_ASSISTANT_ID}'. Please check the ID and your OPENAI_API_KEY.`,
      )
    }
  }
  return openaiAssistant
}

/**
 * Creates a new OpenAI thread.
 */
export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
  const client = getOpenAIClient()
  return client.beta.threads.create()
}

/**
 * Adds a message to an existing OpenAI thread.
 */
export async function addMessageToThread(
  threadId: string,
  content: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
  const client = getOpenAIClient()
  return client.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  })
}

/**
 * Retrieves all messages from an OpenAI thread.
 */
export async function getAssistantThreadMessages(
  threadId: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage[]> {
  const client = getOpenAIClient()
  const messages = await client.beta.threads.messages.list(threadId)
  return messages.data
}

/**
 * Runs the OpenAI Assistant on a given thread and polls for its completion.
 * Throws an error if the run fails or does not complete successfully.
 */
export async function runAssistant(threadId: string, assistantId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  const client = getOpenAIClient()
  let run = await client.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  })

  // Poll for run completion
  while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
    run = await client.beta.threads.runs.retrieve(threadId, run.id)
  }

  if (run.status === "failed") {
    console.error("Assistant run failed:", run.last_error)
    throw new Error(
      `Assistant run failed: ${run.last_error?.message || "Unknown error"}. Code: ${run.last_error?.code || "N/A"}`,
    )
  }
  if (run.status !== "completed") {
    console.warn(`Assistant run ended with unexpected status: ${run.status}`)
    throw new Error(`Assistant run did not complete successfully. Final status: ${run.status}`)
  }
  return run
}

/**
 * Continues an AI conversation with the assistant by adding a message and running the assistant.
 */
export async function continueAIConversationWithAssistant(
  threadId: string,
  messageContent: string,
): Promise<{ response: string | null }> {
  const client = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  await addMessageToThread(threadId, messageContent)
  const run = await runAssistant(threadId, assistant.id)

  if (run.status === "completed") {
    const messages = await getAssistantThreadMessages(threadId)
    const assistantMessages = messages.data.filter((msg) => msg.role === "assistant")
    const latestAssistantMessage = assistantMessages[0]?.content[0]

    if (latestAssistantMessage && latestAssistantMessage.type === "text") {
      return { response: latestAssistantMessage.text.value }
    } else {
      console.error("No text content found in assistant's response or unexpected message type for follow-up.")
      return { response: null }
    }
  } else {
    console.error(`Assistant run for follow-up failed with status: ${run.status}`)
    throw new Error(`Assistant run for follow-up failed with status: ${run.status}`)
  }
}

/**
 * Checks the status of the OpenAI Assistant.
 */
export async function getAssistantStatus(): Promise<{ status: "active" | "inactive"; message?: string }> {
  try {
    const assistant = await getOpenAIAssistant()
    if (assistant && assistant.id) {
      return { status: "active", message: `Assistant ID: ${assistant.id}` }
    }
    return { status: "inactive", message: "Assistant not found or ID is missing." }
  } catch (error: any) {
    return { status: "inactive", message: error.message || "Failed to retrieve assistant status." }
  }
}

/**
 * Runs a simple test with the OpenAI Assistant.
 */
export async function testOpenAIAssistant(testPrompt: string): Promise<{ response: string | null; error?: string }> {
  try {
    const client = getOpenAIClient()
    const assistant = await getOpenAIAssistant()

    const thread = await client.beta.threads.create()
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: testPrompt,
    })

    const run = await runAssistant(thread.id, assistant.id)

    if (run.status === "completed") {
      const messages = await client.beta.threads.messages.list(thread.id)
      const assistantMessages = messages.data.filter((msg) => msg.role === "assistant")
      const latestAssistantMessage = assistantMessages[0]?.content[0]

      if (latestAssistantMessage && latestAssistantMessage.type === "text") {
        return { response: latestAssistantMessage.text.value }
      } else {
        return { response: null, error: "No text content found in assistant's response." }
      }
    } else {
      return { response: null, error: `Assistant run failed with status: ${run.status}` }
    }
  } catch (error: any) {
    console.error("Error during OpenAI Assistant test:", error)
    return { response: null, error: error.message || "An unknown error occurred during test." }
  }
}
