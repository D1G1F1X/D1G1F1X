import OpenAI from "openai"
import { environmentManager } from "@/lib/config/environment" // This import is now strictly server-side
import type { OracleCard } from "@/components/card-simulator"

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
  details?: string
}

export interface AssistantMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

class AIServiceManager {
  private static instance: AIServiceManager
  private openaiClient: OpenAI | null = null
  private isConfigured = false
  private config: ReturnType<typeof environmentManager.getConfig>

  private constructor() {
    // Ensure this constructor is only called on the server
    if (typeof window !== "undefined") {
      console.error("❌ AIServiceManager constructor called on client side. This should not happen.")
      // Throwing an error here will prevent the client from loading this module
      throw new Error("AIServiceManager is a server-only module.")
    }
    this.config = environmentManager.getConfig() // environmentManager is now guaranteed server-side
    this.initializeOpenAI()
  }

  public static getInstance(): AIServiceManager {
    if (!AIServiceManager.instance) {
      AIServiceManager.instance = new AIServiceManager()
    }
    return AIServiceManager.instance
  }

  private initializeOpenAI(): void {
    const apiKey = process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY
    const assistantId = process.env.OPENAI_ASSISTANT_ID

    console.log("[AI] Initializing with:", {
      hasApiKey: !!apiKey,
      hasAssistantId: !!assistantId,
      apiKeySource: process.env.OPENAI_ASSISTANT_API_KEY ? "OPENAI_ASSISTANT_API_KEY" : "OPENAI_API_KEY",
    })

    if (!apiKey) {
      console.warn("⚠️ OpenAI API Key is missing. AI features will be disabled.")
      this.isConfigured = false
      this.openaiClient = null
      return
    }

    try {
      this.openaiClient = new OpenAI({
        apiKey: apiKey,
        defaultHeaders: {
          "OpenAI-Beta": "assistants=v2",
        },
        dangerouslyAllowBrowser: true, // Required for some server environments like Vercel Edge
      })
      this.isConfigured = true
      console.log("✅ OpenAI client initialized successfully")
    } catch (error) {
      console.error("❌ Failed to initialize OpenAI client:", error)
      this.isConfigured = false
      this.openaiClient = null
    }
  }

  public isAIConfigured(): boolean {
    // This method should reflect the state set by initializeOpenAI
    return this.isConfigured && this.openaiClient !== null
  }

  /**
   * Returns true only when BOTH an assistant ID and either OPENAI_ASSISTANT_API_KEY
   * or OPENAI_API_KEY are present.
   */
  private supportsAssistants(): boolean {
    return !!process.env.OPENAI_ASSISTANT_ID && !!(process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY)
  }

  public generateFallbackReading(): string {
    return `I apologize, but the AI service is currently unavailable. Here's a general guidance:

• Trust your intuition as you navigate current challenges
• Look for opportunities for growth in unexpected places  
• Remember that every ending creates space for new beginnings
• Stay open to the wisdom that comes from within

While this reading is generated as a fallback, the energy you bring to interpreting these cards is what gives them meaning. Take time to meditate on what resonates with your current situation.`
  }

  /**
   * Fallback path that uses a single chat-completion request when the
   * Assistant tooling is not configured.
   */
  private async generateReadingWithChatCompletion(prompt: string): Promise<ReadingResponse> {
    try {
      // Ensure client is initialized for chat completions if not already
      if (!this.openaiClient) {
        // This should ideally not happen if initializeOpenAI ran correctly,
        // but as a safeguard, try to initialize again for chat completions.
        this.openaiClient = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_ASSISTANT_API_KEY,
          dangerouslyAllowBrowser: true, // Apply here too
        })
      }
      const completion = await this.openaiClient.chat.completions.create({
        model: this.config.openai.model ?? "gpt-4o",
        max_tokens: this.config.openai.maxTokens,
        temperature: this.config.openai.temperature,
        messages: [{ role: "user", content: prompt }],
      })
      return {
        success: true,
        reading: completion.choices[0].message.content ?? "",
      }
    } catch (error: any) {
      console.error("[AI] Chat completion error:", error)
      return {
        success: false,
        error: `Chat completion error: ${String(error.message)}`,
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    }
  }

  public async generateOracleReading(request: ReadingRequest): Promise<ReadingResponse> {
    // --- 0. Ensure client is initialized and configured ---
    if (!this.isAIConfigured()) {
      console.warn("[AI] OpenAI client not initialized or configured, falling back")
      return {
        success: false,
        error: "OpenAI client not ready",
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    }

    // Build the user-prompt once.
    const prompt = await this.generateReadingPrompt(request)

    // --- 1. Figure out if we *really* can use the Assistant endpoint ---------
    const canUseAssistant = this.supportsAssistants()

    if (!canUseAssistant) {
      console.info("[AI] Assistant not usable, switching to chat completion")
      return this.generateReadingWithChatCompletion(prompt)
    }

    // --- 2. Assistant flow --------------------------------------------------
    try {
      console.log("[AI] Starting reading generation for:", request.fullName)

      // Create thread
      const thread = await this.openaiClient!.beta.threads.create() // Use non-null assertion as client is checked above
      console.log("[AI] Thread created:", thread.id)

      // Add message to thread
      await this.openaiClient!.beta.threads.messages.create(thread.id, {
        role: "user",
        content: prompt,
      })

      // Create and poll run
      let run = await this.openaiClient!.beta.threads.runs.create(thread.id, {
        assistant_id: this.config.openai.assistantId!,
      })

      // Poll for completion with better error handling
      const maxAttempts = 30
      let attempts = 0

      while (["queued", "in_progress", "cancelling"].includes(run.status) && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        try {
          run = await this.openaiClient!.beta.threads.runs.retrieve(thread.id, run.id)
        } catch (pollError: any) {
          console.error(`[AI] Error polling run status:`, String(pollError.message))
          return {
            success: false,
            error: `Polling error: ${String(pollError.message)}`,
            fallback: true,
            reading: this.generateFallbackReading(),
          }
        }

        attempts++

        if (attempts % 5 === 0) {
          console.log(`[AI] Polling attempt ${attempts}, status: ${run.status}`)
        }
      }

      if (run.status === "completed") {
        const messages = await this.openaiClient!.beta.threads.messages.list(thread.id, {
          order: "desc",
          limit: 1,
        })

        const assistantMessage = messages.data[0]
        if (assistantMessage?.content[0]?.type === "text") {
          console.log("[AI] Reading generated successfully")
          return {
            success: true,
            reading: assistantMessage.content[0].text.value,
            threadId: thread.id,
            runId: run.id,
          }
        }
      }

      console.warn(`[AI] Run completed with status: ${run.status}`)
      if (run.status === "failed") {
        console.error("[AI] Run failed with error:", run.last_error)
        return {
          success: false,
          error: `AI run failed: ${String(run.last_error?.message || "Unknown error")}`,
          fallback: true,
          reading: this.generateFallbackReading(),
        }
      }

      return {
        success: false,
        error: `AI run completed with unexpected status: ${run.status}`,
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    } catch (error: any) {
      console.error("[AI] Error generating reading:", String(error.message))
      return {
        success: false,
        error: `AI service error: ${String(error.message)}`,
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    }
  }

  public async continueConversation(threadId: string, message: string): Promise<ReadingResponse> {
    if (!this.isAIConfigured() || !this.supportsAssistants()) {
      return {
        success: false,
        error: "AI service not configured for conversation or does not support Assistants",
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    }

    try {
      console.log(`[AI] Continuing conversation in thread: ${threadId}`)

      await this.openaiClient!.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      })

      let run = await this.openaiClient!.beta.threads.runs.create(threadId, {
        assistant_id: this.config.openai.assistantId!,
      })

      // Poll for completion (similar to generateOracleReading)
      const maxAttempts = 30
      let attempts = 0

      while (["queued", "in_progress", "cancelling"].includes(run.status) && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        run = await this.openaiClient!.beta.threads.runs.retrieve(threadId, run.id)
        attempts++
      }

      if (run.status === "completed") {
        const messages = await this.openaiClient!.beta.threads.messages.list(threadId, {
          order: "desc",
          limit: 1,
        })

        const assistantMessage = messages.data[0]
        if (assistantMessage?.content[0]?.type === "text") {
          return {
            success: true,
            reading: assistantMessage.content[0].text.value,
            threadId,
            runId: run.id,
          }
        }
      }

      return {
        success: false,
        error: `Conversation failed with status: ${run.status}`,
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    } catch (error: any) {
      console.error("[AI] Error continuing conversation:", String(error.message))
      return {
        success: false,
        error: `Conversation error: ${String(error.message)}`,
        fallback: true,
        reading: this.generateFallbackReading(),
      }
    }
  }

  public async getConversationHistory(threadId: string): Promise<AssistantMessage[]> {
    if (!this.isAIConfigured() || !this.supportsAssistants()) {
      console.warn("[AI] Service not configured for history retrieval or does not support Assistants")
      return []
    }

    try {
      const messages = await this.openaiClient!.beta.threads.messages.list(threadId, {
        order: "asc",
      })

      return messages.data.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content[0]?.type === "text" ? msg.content[0].text.value : "",
        timestamp: new Date(msg.created_at * 1000),
      }))
    } catch (error: any) {
      console.error("[AI] Error fetching conversation history:", String(error.message))
      return []
    }
  }

  private async generateReadingPrompt(request: ReadingRequest): Promise<string> {
    const cardDescriptions = request.selectedCards
      .map((card) => `${card.fullTitle}: ${card.keyMeanings?.join(" ") || "A card of significance in your reading."}`)
      .join("\n\n")

    return `Please provide a detailed oracle card reading for ${request.fullName}.

Question: ${request.question}
${request.dateOfBirth ? `Date of Birth: ${request.dateOfBirth}` : ""}
${request.birthPlace ? `Birth Place: ${request.birthPlace}` : ""}
Spread Type: ${request.spreadType}

Cards Drawn:
${cardDescriptions}

Please provide an insightful, personalized reading that addresses the question while incorporating the meanings and symbolism of the drawn cards. Focus on practical guidance and spiritual insight.`
  }
}

export const aiServiceManager = AIServiceManager.getInstance()
