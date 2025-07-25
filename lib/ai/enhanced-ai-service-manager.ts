import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"
import { env } from "@/lib/config/environment"
import type { AIServiceStatus } from "@/types/cards"

// Define a type for the AI model configuration
type AIModelConfig = {
  provider: "openai" | "anthropic" | "google"
  modelName: string
  apiKey: string | undefined
  assistantId?: string // For OpenAI Assistants API
}

// Function to get the configured AI model
function getAIModel(config: AIModelConfig) {
  switch (config.provider) {
    case "openai":
      return openai(config.modelName, {
        apiKey: config.apiKey,
        // For Assistants API, you might need to pass assistant_id here or in generate/stream options
      })
    case "anthropic":
      return anthropic(config.modelName, { apiKey: config.apiKey })
    case "google":
      return google(config.modelName, { apiKey: config.apiKey })
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`)
  }
}

// Configuration for the primary AI service (e.g., for general chat/reading generation)
const primaryAIConfig: AIModelConfig = {
  provider: "openai", // Default to OpenAI
  modelName: env.OPENAI_MODEL || "gpt-4o",
  apiKey: env.OPENAI_API_KEY,
  assistantId: env.OPENAI_ASSISTANT_ID,
}

// Configuration for a secondary AI service (e.g., for specific tasks or fallback)
// This is an example and can be expanded or removed based on needs
const secondaryAIConfig: AIModelConfig = {
  provider: "google", // Example: Google Gemini
  modelName: "gemini-pro",
  apiKey: env.GOOGLE_AI_API_KEY,
}

export class EnhancedAIServiceManager {
  private static instance: EnhancedAIServiceManager
  private primaryModel: ReturnType<typeof getAIModel>
  private secondaryModel: ReturnType<typeof getAIModel> | null = null

  private constructor() {
    this.primaryModel = getAIModel(primaryAIConfig)
    if (secondaryAIConfig.apiKey) {
      this.secondaryModel = getAIModel(secondaryAIConfig)
    }
  }

  public static getInstance(): EnhancedAIServiceManager {
    if (!EnhancedAIServiceManager.instance) {
      EnhancedAIServiceManager.instance = new EnhancedAIServiceManager()
    }
    return EnhancedAIServiceManager.instance
  }

  public async generateText(
    prompt: string,
    system?: string,
    useSecondaryModel = false,
  ): Promise<{ text: string; finishReason: string; usage: any }> {
    const modelToUse = useSecondaryModel && this.secondaryModel ? this.secondaryModel : this.primaryModel

    try {
      const { text, finishReason, usage } = await generateText({
        model: modelToUse,
        prompt,
        system,
        maxTokens: env.OPENAI_MAX_TOKENS,
        temperature: env.OPENAI_TEMPERATURE,
      })
      return { text, finishReason, usage }
    } catch (error) {
      console.error("Error generating text:", error)
      throw new Error(`AI text generation failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  public async streamText(
    messages: { role: "user" | "assistant" | "system"; content: string }[],
    useSecondaryModel = false,
  ) {
    const modelToUse = useSecondaryModel && this.secondaryModel ? this.secondaryModel : this.primaryModel

    try {
      const result = streamText({
        model: modelToUse,
        messages,
        maxTokens: env.OPENAI_MAX_TOKENS,
        temperature: env.OPENAI_TEMPERATURE,
      })
      return result
    } catch (error) {
      console.error("Error streaming text:", error)
      throw new Error(`AI text streaming failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  public async getServiceStatus(): Promise<AIServiceStatus> {
    const status: AIServiceStatus = {
      success: true,
      assistant_configured: false,
      assistant_accessible: false,
      chat_completion_available: false,
      timestamp: new Date().toISOString(),
    }

    // Check OpenAI Assistant configuration
    if (primaryAIConfig.provider === "openai") {
      status.assistant_configured = !!primaryAIConfig.assistantId && !!primaryAIConfig.apiKey
      if (status.assistant_configured) {
        try {
          // Attempt a simple API call to check accessibility (e.g., list models or a small chat completion)
          // Note: Directly checking assistant accessibility without making a thread/run is complex.
          // This is a simplified check for general API availability.
          const testModel = openai("gpt-3.5-turbo", { apiKey: primaryAIConfig.apiKey })
          await generateText({
            model: testModel,
            prompt: "hello",
            maxTokens: 5,
          })
          status.assistant_accessible = true
          status.chat_completion_available = true
        } catch (error) {
          console.error("OpenAI API accessibility check failed:", error)
          status.assistant_accessible = false
          status.chat_completion_available = false
          status.success = false
          status.error = `OpenAI API error: ${error instanceof Error ? error.message : String(error)}`
        }
      } else {
        status.success = false
        status.error = "OpenAI Assistant ID or API Key not configured."
      }
    }

    // Add checks for other providers if necessary
    if (secondaryAIConfig.provider === "google" && secondaryAIConfig.apiKey) {
      try {
        const testModel = google("gemini-pro", { apiKey: secondaryAIConfig.apiKey })
        await generateText({
          model: testModel,
          prompt: "test",
          maxTokens: 5,
        })
        // If successful, you might want to update a separate status for secondary model
      } catch (error) {
        console.warn("Secondary (Google) AI API check failed:", error)
        // Don't set overall success to false unless primary is also failing
      }
    }

    return status
  }
}

export const aiServiceManager = EnhancedAIServiceManager.getInstance()
