import OpenAI from "openai"
import { env } from "@/lib/env" // Assuming env is correctly set up for OPENAI_API_KEY and OPENAI_ASSISTANT_ID

let openaiClient: OpenAI | null = null
let openaiAssistant: OpenAI.Beta.Assistants.Assistant | null = null

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

export async function getOpenAIAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error("OPENAI_ASSISTANT_ID environment variable is not set.")
  }
  if (!openaiAssistant) {
    const client = getOpenAIClient()
    try {
      openaiAssistant = await client.beta.assistants.retrieve(env.OPENAI_ASSISTANT_ID)
      console.log("OpenAI Assistant retrieved successfully.")
    } catch (error) {
      console.error("Failed to retrieve OpenAI Assistant:", error)
      throw new Error(
        `Failed to retrieve OpenAI Assistant with ID ${env.OPENAI_ASSISTANT_ID}. Please check the ID and API key.`,
      )
    }
  }
  return openaiAssistant
}

export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
  const client = getOpenAIClient()
  return client.beta.threads.create()
}

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
 * Runs the assistant and polls its status until it completes or fails.
 * @param threadId The ID of the thread.
 * @param assistantId The ID of the assistant.
 * @returns The completed run object.
 * @throws Error if the run fails or does not complete.
 */
export async function runAssistant(threadId: string, assistantId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  const client = getOpenAIClient()
  let run = await client.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  })

  // Poll for run completion
  while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before polling again
    run = await client.beta.threads.runs.retrieve(threadId, run.id)
    console.log(`Assistant run status for thread ${threadId}: ${run.status}`)
  }

  if (run.status === "completed") {
    return run
  } else {
    throw new Error(`Assistant run finished with status: ${run.status}. Expected 'completed'.`)
  }
}

export async function getAssistantThreadMessages(threadId: string): Promise<OpenAI.Beta.Threads.Messages.MessagesPage> {
  const client = getOpenAIClient()
  return client.beta.threads.messages.list(threadId, { order: "asc" }) // Get messages in chronological order
}

export async function continueAIConversationWithAssistant(
  threadId: string,
  messageContent: string,
): Promise<{ response: string | null }> {
  const client = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  await addMessageToThread(threadId, messageContent)
  const run = await runAssistant(threadId, assistant.id) // This now polls until completion

  if (run.status === "completed") {
    const messages = await client.beta.threads.messages.list(threadId, { order: "desc", limit: 1 })
    const latestAssistantMessage = messages.data.find((msg) => msg.role === "assistant")?.content[0]

    if (latestAssistantMessage && latestAssistantMessage.type === "text") {
      return { response: latestAssistantMessage.text.value }
    } else {
      console.warn("No text content found in latest assistant response or unexpected message type.")
      return { response: null }
    }
  } else {
    throw new Error(`Assistant run for follow-up failed with status: ${run.status}`)
  }
}

export async function getAssistantStatus(): Promise<{ status: "active" | "inactive"; message?: string }> {
  try {
    const client = getOpenAIClient()
    const assistant = await getOpenAIAssistant()
    if (assistant && assistant.id) {
      // Attempt a small test run to confirm functionality
      const testThread = await client.beta.threads.create()
      await client.beta.threads.messages.create(testThread.id, {
        role: "user",
        content: "Test message",
      })
      const run = await client.beta.threads.runs.create(testThread.id, {
        assistant_id: assistant.id,
      })

      // Poll for a short time or check immediate status
      let testRunStatus = run.status
      let attempts = 0
      while (testRunStatus === "queued" || testRunStatus === "in_progress") {
        if (attempts > 5) break // Prevent infinite loop for slow runs
        await new Promise((resolve) => setTimeout(resolve, 500))
        const updatedRun = await client.beta.threads.runs.retrieve(testThread.id, run.id)
        testRunStatus = updatedRun.status
        attempts++
      }

      if (testRunStatus === "completed") {
        // Clean up the test thread
        // Note: OpenAI API does not have a direct delete thread endpoint via client.beta.threads.delete.
        // Threads expire after a certain period. For a quick test, we can just let it expire.
        return { status: "active", message: "OpenAI Assistant is reachable and responsive." }
      } else {
        return {
          status: "inactive",
          message: `Assistant test run did not complete successfully. Status: ${testRunStatus}`,
        }
      }
    }
    return { status: "inactive", message: "OpenAI Assistant ID not configured or assistant not found." }
  } catch (error: any) {
    console.error("Error checking OpenAI Assistant status:", error)
    return { status: "inactive", message: `Error: ${error.message || "Unknown error"}` }
  }
}

export async function testOpenAIAssistant(prompt: string): Promise<{ response: string | null; error?: string }> {
  try {
    const client = getOpenAIClient()
    const assistant = await getOpenAIAssistant()

    const thread = await client.beta.threads.create()
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    })

    const run = await runAssistant(thread.id, assistant.id) // Use the polling runAssistant

    if (run.status === "completed") {
      const messages = await client.beta.threads.messages.list(thread.id, { order: "desc", limit: 1 })
      const latestAssistantMessage = messages.data.find((msg) => msg.role === "assistant")?.content[0]

      if (latestAssistantMessage && latestAssistantMessage.type === "text") {
        return { response: latestAssistantMessage.text.value }
      } else {
        return { response: null, error: "No text content found in assistant's response or unexpected message type." }
      }
    } else {
      return { response: null, error: `Assistant run failed with status: ${run.status}` }
    }
  } catch (error: any) {
    console.error("Error in testOpenAIAssistant:", error)
    return { response: null, error: error.message || "An unknown error occurred during test." }
  }
}
