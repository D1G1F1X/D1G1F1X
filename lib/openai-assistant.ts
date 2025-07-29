import OpenAI from "openai"

// Initialize OpenAI client
let openai: OpenAI | null = null

function initializeOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not set. OpenAI services will be unavailable.")
    return null
  }
  if (!openai) {
    openai = new OpenAI({ apiKey })
  }
  return openai
}

// Assistant ID from environment variables
const assistantId = process.env.OPENAI_ASSISTANT_ID

// Helper function to get or create a thread
export async function getOrCreateThread(threadId?: string): Promise<OpenAI.Beta.Threads.Thread> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized due to missing API key.")

  if (threadId) {
    try {
      const thread = await client.beta.threads.retrieve(threadId)
      console.log(`Retrieved existing thread: ${thread.id}`)
      return thread
    } catch (error) {
      console.warn(`Failed to retrieve thread ${threadId}, creating a new one. Error:`, error)
    }
  }
  const newThread = await client.beta.threads.create()
  console.log(`Created new thread: ${newThread.id}`)
  return newThread
}

// Helper function to add a message to a thread
export async function addMessageToThread(
  threadId: string,
  content: string,
  role: "user" | "assistant" = "user",
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized due to missing API key.")

  const message = await client.beta.threads.messages.create(threadId, {
    role,
    content,
  })
  console.log(`Added message to thread ${threadId}: ${message.id}`)
  return message
}

// Helper function to run the assistant on a thread
export async function runAssistant(threadId: string, instructions?: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized due to missing API key.")
  if (!assistantId) throw new Error("OPENAI_ASSISTANT_ID is not set. Cannot run assistant.")

  const run = await client.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions:
      instructions ||
      "You are a helpful oracle assistant. Provide insightful and spiritual guidance based on the provided context.",
  })
  console.log(`Started run ${run.id} on thread ${threadId}`)
  return run
}

// Helper function to retrieve run status
export async function retrieveRun(threadId: string, runId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized due to missing API key.")

  const run = await client.beta.threads.runs.retrieve(threadId, runId)
  return run
}

// Helper function to get messages from a thread
export async function getMessages(threadId: string): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage[]> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized due to missing API key.")

  const messagesPage = await client.beta.threads.messages.list(threadId, { order: "asc" })
  return messagesPage.data
}

// Main function to interact with the assistant
export async function interactWithAssistant(
  userMessage: string,
  threadId?: string,
  instructions?: string,
): Promise<{ response: string; threadId: string }> {
  const client = initializeOpenAI()
  if (!client) throw new Error("OpenAI client not initialized. Please check OPENAI_API_KEY.")
  if (!assistantId) throw new Error("OPENAI_ASSISTANT_ID is not set. Please configure your environment variables.")

  const thread = await getOrCreateThread(threadId)
  await addMessageToThread(thread.id, userMessage)

  let run = await runAssistant(thread.id, instructions)

  // Poll for run completion
  while (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
    run = await retrieveRun(thread.id, run.id)
  }

  if (run.status === "completed") {
    const messages = await getMessages(thread.id)
    const assistantMessages = messages.filter((msg) => msg.role === "assistant")
    const latestAssistantMessage = assistantMessages[assistantMessages.length - 1]

    if (latestAssistantMessage && latestAssistantMessage.content[0]?.type === "text") {
      return {
        response: latestAssistantMessage.content[0].text.value,
        threadId: thread.id,
      }
    } else {
      throw new Error("No text response from assistant.")
    }
  } else {
    throw new Error(`Assistant run failed with status: ${run.status}`)
  }
}

// Function to check assistant status
export async function checkAssistantStatus(): Promise<{
  isConfigured: boolean
  assistantExists: boolean
  message: string
}> {
  const client = initializeOpenAI()
  if (!client) {
    return {
      isConfigured: false,
      assistantExists: false,
      message: "OpenAI API Key is not configured.",
    }
  }

  if (!assistantId) {
    return {
      isConfigured: false,
      assistantExists: false,
      message: "OPENAI_ASSISTANT_ID is not configured.",
    }
  }

  try {
    const assistant = await client.beta.assistants.retrieve(assistantId)
    return {
      isConfigured: true,
      assistantExists: true,
      message: `Assistant "${assistant.name}" (ID: ${assistant.id}) is configured and accessible.`,
    }
  } catch (error: any) {
    console.error("Error retrieving OpenAI Assistant:", error)
    return {
      isConfigured: true, // API key is present, but assistant might not exist or be accessible
      assistantExists: false,
      message: `Failed to retrieve OpenAI Assistant with ID "${assistantId}". Error: ${error.message}. Please ensure the ID is correct and the API key has permissions.`,
    }
  }
}
