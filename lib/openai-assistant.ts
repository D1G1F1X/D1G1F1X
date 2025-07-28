import OpenAI from "openai"
import { env } from "@/lib/env"

let openaiClient: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables.")
    }
    openaiClient = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    })
  }
  return openaiClient
}

export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
  const openai = getOpenAIClient()
  return openai.beta.threads.create()
}

export async function addMessageToThread(
  threadId: string,
  content: string,
): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
  const openai = getOpenAIClient()
  return openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  })
}

export async function getAssistantResponse(threadId: string): Promise<string> {
  const openai = getOpenAIClient()

  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error("OPENAI_ASSISTANT_ID is not set in environment variables.")
  }

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: env.OPENAI_ASSISTANT_ID,
  })

  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)

  while (
    runStatus.status === "queued" ||
    runStatus.status === "in_progress" ||
    runStatus.status === "tool_calls_in_progress"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
  }

  if (runStatus.status === "completed") {
    const messages = await openai.beta.threads.messages.list(threadId)
    const lastMessageForAssistant = messages.data
      .filter((message) => message.run_id === run.id && message.role === "assistant")
      .pop()

    if (lastMessageForAssistant && lastMessageForAssistant.content[0]?.type === "text") {
      return lastMessageForAssistant.content[0].text.value
    } else {
      throw new Error("No text content found in assistant's response.")
    }
  } else {
    throw new Error(`Assistant run failed with status: ${runStatus.status}`)
  }
}
