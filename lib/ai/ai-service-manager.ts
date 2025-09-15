import OpenAI from "openai"
import { environmentManager } from "@/lib/config/environment"
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
    this.config = environmentManager.getConfig()
    this.initializeOpenAI()
  }

  public static getInstance(): AIServiceManager {
    if (!AIServiceManager.instance) {
      AIServiceManager.instance = new AIServiceManager()
    }
    return AIServiceManager.instance
  }

  private initializeOpenAI(): void {
    // Only initialize on server side
    if (typeof window !== "undefined") {
      console.warn("⚠️ AI Service Manager should only be initialized on server side")
      return
    }

    // Prioritize ChatGPT Assistant API key
    const apiKey = process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY
    const assistantId = process.env.OPENAI_ASSISTANT_ID

    console.log("[AI] Initializing with:", {
      hasApiKey: !!apiKey,
      hasAssistantId: !!assistantId,
      apiKeySource: process.env.OPENAI_ASSISTANT_API_KEY ? "OPENAI_ASSISTANT_API_KEY" : "OPENAI_API_KEY",
    })

    if (apiKey && assistantId) {
      try {
        this.openaiClient = new OpenAI({
          apiKey: apiKey,
          defaultHeaders: {
            "OpenAI-Beta": "assistants=v2",
          },
        })
        this.isConfigured = true
        console.log("✅ OpenAI Assistant client initialized successfully")
      } catch (error) {
        console.error("❌ Failed to initialize OpenAI Assistant client:", error)
        this.isConfigured = false
      }
    } else {
      console.warn("⚠️ OpenAI Assistant configuration incomplete:")
      console.warn(`  - API Key: ${apiKey ? "Present" : "Missing"}`)
      console.warn(`  - Assistant ID: ${assistantId ? "Present" : "Missing"}`)
      this.isConfigured = false
    }
  }

  public isAIConfigured(): boolean {
    const hasApiKey = !!(process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY)
    const hasAssistantId = !!process.env.OPENAI_ASSISTANT_ID
    const isServer = typeof window === "undefined"

    return this.isConfigured && hasApiKey && hasAssistantId && isServer
  }

  /**
   * Returns true only when BOTH an assistant ID and either OPENAI_ASSISTANT_API_KEY
   * or OPENAI_API_KEY are present.  If we have only an API key, we can still fall
   * back to Chat Completions.
   */
  private supportsAssistants(): boolean {
    return !!process.env.OPENAI_ASSISTANT_ID && !!(process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY)
  }

  private createFallbackResponse(error: string): ReadingResponse {
    return {
      success: false,
      error,
      fallback: true,
      reading: this.generateFallbackReading(),
    }
  }

  private generateFallbackReading(): string {
    return `I apologize, but the AI service is currently unavailable. Here's a general guidance:

The cards you've drawn suggest a time of reflection and potential transformation. Consider the following:

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
      if (!this.openaiClient) this.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
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
      return this.createFallbackResponse(`Chat completion error: ${error.message}`)
    }
  }

  public async generateOracleReading(request: ReadingRequest): Promise<ReadingResponse> {
    // --- 0. Ensure we have at least some API key ----------------------------
    if (!process.env.OPENAI_ASSISTANT_API_KEY && !process.env.OPENAI_API_KEY) {
      console.warn("[AI] No OpenAI API key configured, falling back")
      return this.createFallbackResponse("OpenAI key missing")
    }

    // Build the user-prompt once.
    const prompt = await this.generateReadingPrompt(request)

    // --- 1. Figure out if we *really* can use the Assistant endpoint ---------
    const canUseAssistant = this.supportsAssistants() && this.isConfigured && this.openaiClient !== null

    if (!canUseAssistant) {
      console.info("[AI] Assistant not usable, switching to chat completion")
      return this.generateReadingWithChatCompletion(prompt)
    }

    // --- 2. Assistant flow (unchanged) --------------------------------------

    try {
      console.log("[AI] Starting reading generation for:", request.fullName)
      console.log("[AI] Client status:", {
        hasClient: !!this.openaiClient,
        isConfigured: this.isConfigured,
        assistantId: this.config.openai.assistantId
      })

      // Create thread with detailed logging
      console.log("[AI] Creating thread...")
      const thread = await this.openaiClient!.beta.threads.create()
      console.log("[AI] Thread object:", JSON.stringify(thread, null, 2))

      const threadId = thread.id
      console.log("[AI] Thread created with ID:", threadId)
      console.log("[AI] Thread ID type:", typeof threadId)

      // Validate thread ID
      if (!threadId) {
        console.error("[AI] Thread creation failed - no ID returned")
        console.error("[AI] Full thread object:", thread)
        return this.createFallbackResponse("Failed to create conversation thread")
      }

      // Additional validation for thread ID format
      if (typeof threadId !== 'string' || !threadId.startsWith('thread_')) {
        console.error("[AI] Invalid thread ID format:", threadId)
        return this.createFallbackResponse("Invalid thread ID format")
      }

      // Add message to thread
      await this.openaiClient!.beta.threads.messages.create(threadId, {
        role: "user",
        content: prompt,
      })

      // Create run and immediately return IDs for client-side polling
      const run = await this.openaiClient!.beta.threads.runs.create(threadId, {
        assistant_id: this.config.openai.assistantId!,
      })

      return {
        success: true,
        reading: "Response is being generated...",
        threadId: threadId,
        runId: run.id,
      }
    } catch (error: any) {
      console.error("[AI] Error generating reading:", error)
      return this.createFallbackResponse(`AI service error: ${error.message}`)
    }
  }

  public async continueConversation(threadId: string, message: string): Promise<ReadingResponse> {
    if (!this.isAIConfigured()) {
      return this.createFallbackResponse("AI service not configured")
    }

    try {
      console.log(`[AI] Continuing conversation in thread: ${threadId}`)

      await this.openaiClient!.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      })

      // Create run and immediately return IDs for client-side polling
      const run = await this.openaiClient!.beta.threads.runs.create(threadId, {
        assistant_id: this.config.openai.assistantId!,
      })

      return {
        success: true,
        reading: "Response is being generated...",
        threadId,
        runId: run.id,
      }
    } catch (error: any) {
      console.error("[AI] Error continuing conversation:", error)
      return this.createFallbackResponse(`Conversation error: ${error.message}`)
    }
  }

  public async getConversationHistory(threadId: string): Promise<AssistantMessage[]> {
    if (!this.isAIConfigured()) {
      console.warn("[AI] Service not configured for history retrieval")
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
      console.error("[AI] Error fetching conversation history:", error)
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
