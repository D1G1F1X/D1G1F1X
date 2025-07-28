import OpenAI from "openai"
import { env } from "@/lib/env"

let openaiClient: OpenAI | null = null
let openaiAssistant: OpenAI.Beta.Assistants.Assistant | null = null

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
 * Initializes and returns the OpenAI Assistant.
 * Throws an error if OPENAI_ASSISTANT_ID is not set or if the assistant cannot be retrieved.
 */
export async function getOpenAIAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
  if (!env.OPENAI_ASSISTANT_ID) {
    throw new Error("OPENAI_ASSISTANT_ID is not set in environment variables.")
  }
  if (!openaiAssistant) {
    try {
      const openai = getOpenAIClient()
      openaiAssistant = await openai.beta.assistants.retrieve(env.OPENAI_ASSISTANT_ID)
    } catch (error: any) {
      console.error("Failed to retrieve OpenAI Assistant:", error)
      throw new Error(`Failed to retrieve OpenAI Assistant: ${error.message || "Unknown error"}`)
    }
  }
  return openaiAssistant
}
