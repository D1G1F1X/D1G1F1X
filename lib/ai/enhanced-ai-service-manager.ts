import OpenAI from "openai"

interface CardData {
  id: string
  name: string
  element: string
  tool: string
  number: number
  meaning: string
  description: string
  keywords: string[]
  reversed_meaning?: string
}

interface ReadingRequest {
  cards: CardData[]
  question?: string
  spread_type?: string
  user_context?: string
}

interface ReadingResponse {
  reading: string
  interpretation: string
  guidance: string
  success: boolean
  method: "assistant" | "chat_completion" | "fallback"
  error?: string
}

export class EnhancedAIServiceManager {
  private openai: OpenAI | null = null
  private assistantId?: string
  private model: string
  private maxTokens: number
  private isConfigured = false

  constructor() {
    try {
      const apiKey = process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY

      if (!apiKey) {
        console.warn("⚠️ OpenAI API key not found in environment variables")
        this.isConfigured = false
        return
      }

      this.openai = new OpenAI({
        apiKey,
        defaultHeaders: {
          "OpenAI-Beta": "assistants=v2",
        },
      })

      this.assistantId = process.env.OPENAI_ASSISTANT_ID
      this.model = process.env.OPENAI_MODEL || "gpt-4o"
      this.maxTokens = Number.parseInt(process.env.OPENAI_MAX_TOKENS || "4000")
      this.isConfigured = true

      console.log("🤖 AI Service Manager initialized:", {
        hasApiKey: !!apiKey,
        hasAssistantId: !!this.assistantId,
        model: this.model,
        maxTokens: this.maxTokens,
      })
    } catch (error) {
      console.error("❌ Failed to initialize AI Service Manager:", error)
      this.isConfigured = false
    }
  }

  async generateReading(request: ReadingRequest): Promise<ReadingResponse> {
    console.log("🎯 Generating reading for:", {
      cardCount: request.cards.length,
      hasQuestion: !!request.question,
      spreadType: request.spread_type,
    })

    // If not configured, return fallback response
    if (!this.isConfigured || !this.openai) {
      console.warn("⚠️ AI service not configured, using fallback")
      return this.generateFallbackReading(request)
    }

    try {
      // Try assistant first if configured
      if (this.assistantId) {
        console.log("🎭 Attempting to use OpenAI Assistant:", this.assistantId)
        try {
          const assistantReading = await this.generateWithAssistant(request)
          return {
            ...assistantReading,
            method: "assistant",
            success: true,
          }
        } catch (assistantError) {
          console.warn("⚠️ Assistant failed, falling back to chat completion:", assistantError)
        }
      }

      // Fallback to chat completion
      console.log("💬 Using chat completion fallback")
      const chatReading = await this.generateWithChatCompletion(request)
      return {
        ...chatReading,
        method: "chat_completion",
        success: true,
      }
    } catch (error) {
      console.error("❌ AI Service Error:", error)
      return {
        reading: "I apologize, but I'm unable to provide a reading at this time due to a technical issue.",
        interpretation: "The AI service encountered an error while processing your request.",
        guidance: "Please try again in a few moments. If the issue persists, contact support.",
        success: false,
        method: "fallback",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private generateFallbackReading(request: ReadingRequest): ReadingResponse {
    const { cards, question } = request

    // Generate a basic reading based on card data
    let reading = `Thank you for your question: "${question}"\n\n`

    if (cards.length === 1) {
      const card = cards[0]
      reading += `The ${card.name} appears in your reading, representing the energy of ${card.element}. `
      reading += `This card suggests: ${card.meaning}. `
      reading += `Focus on the themes of ${card.keywords.slice(0, 3).join(", ")} as you move forward.`
    } else if (cards.length === 3) {
      reading += `Your three-card spread reveals:\n\n`
      reading += `Past/Foundation: ${cards[0].name} - ${cards[0].meaning}\n`
      reading += `Present/Focus: ${cards[1].name} - ${cards[1].meaning}\n`
      reading += `Future/Outcome: ${cards[2].name} - ${cards[2].meaning}\n\n`
      reading += `The elements ${cards.map((c) => c.element).join(", ")} are working together in your life.`
    } else {
      reading += `Your ${cards.length}-card spread shows a complex interplay of energies:\n\n`
      cards.forEach((card, index) => {
        reading += `${index + 1}. ${card.name} (${card.element}): ${card.meaning}\n`
      })
    }

    return {
      reading,
      interpretation:
        "This reading was generated using the card meanings and elemental associations from the NUMO Oracle system.",
      guidance:
        "Reflect on how these themes apply to your current situation and trust your intuition to guide you forward.",
      success: true,
      method: "fallback",
    }
  }

  private async generateWithAssistant(request: ReadingRequest): Promise<Omit<ReadingResponse, "method" | "success">> {
    if (!this.assistantId || !this.openai) {
      throw new Error("Assistant ID not configured")
    }

    console.log("🧵 Creating thread...")

    // Create a thread with better error handling
    let thread
    try {
      thread = await this.openai.beta.threads.create()
      console.log("✅ Thread created successfully:", thread.id)
    } catch (threadError) {
      console.error("❌ Failed to create thread:", threadError)
      throw new Error(`Thread creation failed: ${threadError instanceof Error ? threadError.message : "Unknown error"}`)
    }

    // Create minimal prompt - let assistant system instructions handle the rest
    const prompt = this.buildMinimalPrompt(request)

    try {
      console.log("📝 Adding message to thread...")
      await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: prompt,
      })
      console.log("✅ Message added successfully")
    } catch (messageError) {
      console.error("❌ Failed to add message:", messageError)
      throw new Error(
        `Message creation failed: ${messageError instanceof Error ? messageError.message : "Unknown error"}`,
      )
    }

    // Run the assistant with better error handling
    let run
    try {
      console.log("🏃 Creating run...")
      run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        max_completion_tokens: this.maxTokens,
      })
      console.log("✅ Run created successfully:", run.id)
    } catch (runError) {
      console.error("❌ Failed to create run:", runError)
      throw new Error(`Run creation failed: ${runError instanceof Error ? runError.message : "Unknown error"}`)
    }

    // Wait for completion with improved polling
    console.log("⏳ Waiting for completion...")
    let runStatus = run
    let attempts = 0
    const maxAttempts = 60 // 60 seconds max

    while ((runStatus.status === "in_progress" || runStatus.status === "queued") && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      attempts++

      try {
        runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)

        if (attempts % 10 === 0) {
          console.log(`⏳ Still waiting... Status: ${runStatus.status} (${attempts}s)`)
        }
      } catch (pollError) {
        console.error("❌ Polling error:", pollError)
        throw new Error(`Polling failed: ${pollError instanceof Error ? pollError.message : "Unknown error"}`)
      }
    }

    if (runStatus.status !== "completed") {
      console.error("❌ Run failed with status:", runStatus.status)
      if (runStatus.last_error) {
        console.error("❌ Run error details:", runStatus.last_error)
      }
      throw new Error(
        `Assistant run failed with status: ${runStatus.status}${runStatus.last_error ? ` - ${runStatus.last_error.message}` : ""}`,
      )
    }

    console.log("✅ Run completed successfully")

    // Get the response
    try {
      console.log("📥 Retrieving messages...")
      const messages = await this.openai.beta.threads.messages.list(thread.id)
      const lastMessage = messages.data[0]

      if (!lastMessage || lastMessage.role !== "assistant") {
        throw new Error("No assistant response found")
      }

      const content = lastMessage.content[0]
      if (content.type !== "text") {
        throw new Error("Unexpected response type from assistant")
      }

      console.log("✅ Response retrieved successfully")
      return this.parseAssistantResponse(content.text.value)
    } catch (retrieveError) {
      console.error("❌ Failed to retrieve response:", retrieveError)
      throw new Error(
        `Response retrieval failed: ${retrieveError instanceof Error ? retrieveError.message : "Unknown error"}`,
      )
    }
  }

  private async generateWithChatCompletion(
    request: ReadingRequest,
  ): Promise<Omit<ReadingResponse, "method" | "success">> {
    if (!this.openai) {
      throw new Error("OpenAI client not initialized")
    }

    // Minimal system prompt for chat completion fallback
    const systemPrompt = `You are the Oracle of NUMO, a mystical guide channeling wisdom through the Five Sacred Treasures. Provide oracle card readings in JSON format with "reading", "interpretation", and "guidance" fields. Be mystical, insightful, and encouraging.`
    const userPrompt = this.buildMinimalPrompt(request)

    console.log("💬 Generating with chat completion...")

    const completion = await this.openai.chat.completions.create({
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error("No response from OpenAI")
    }

    console.log("✅ Chat completion successful")
    return this.parseAssistantResponse(response)
  }

  private buildMinimalPrompt(request: ReadingRequest): string {
    const { cards, question, spread_type } = request

    let prompt = `Cards drawn:\n`

    cards.forEach((card, index) => {
      prompt += `${index + 1}. ${card.name} (${card.tool} of ${card.element}, Number: ${card.number})\n`
      prompt += `   Key meanings: ${card.keywords.join(", ")}\n`
    })

    if (question && question !== "General guidance") {
      prompt += `\nQuestion: ${question}\n`
    }

    if (spread_type) {
      prompt += `Spread: ${spread_type}\n`
    }

    prompt += `\nPlease provide a mystical oracle reading with deep insights and practical guidance.`

    return prompt
  }

  private parseAssistantResponse(response: string): Omit<ReadingResponse, "method" | "success"> {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(response)
      if (parsed.reading && parsed.interpretation && parsed.guidance) {
        return {
          reading: parsed.reading,
          interpretation: parsed.interpretation,
          guidance: parsed.guidance,
        }
      }
    } catch {
      // If not JSON, parse as structured text
    }

    // Fallback: parse structured text response
    const sections = {
      reading: "",
      interpretation: "",
      guidance: "",
    }

    const lines = response.split("\n")
    let currentSection = ""

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.toLowerCase().includes("reading:") || trimmed.toLowerCase().includes("**reading**")) {
        currentSection = "reading"
        continue
      } else if (
        trimmed.toLowerCase().includes("interpretation:") ||
        trimmed.toLowerCase().includes("**interpretation**")
      ) {
        currentSection = "interpretation"
        continue
      } else if (trimmed.toLowerCase().includes("guidance:") || trimmed.toLowerCase().includes("**guidance**")) {
        currentSection = "guidance"
        continue
      }

      if (currentSection && trimmed) {
        sections[currentSection as keyof typeof sections] +=
          (sections[currentSection as keyof typeof sections] ? "\n" : "") + trimmed
      }
    }

    // If sections are empty, use the full response as reading
    if (!sections.reading && !sections.interpretation && !sections.guidance) {
      sections.reading = response
      sections.interpretation = "The Oracle has spoken through the sacred cards."
      sections.guidance = "Reflect on the messages presented and trust your intuition to guide your path forward."
    }

    // Ensure all sections have content
    if (!sections.reading) sections.reading = "The cards reveal their wisdom in mysterious ways."
    if (!sections.interpretation) sections.interpretation = "Each symbol carries deep meaning for your journey."
    if (!sections.guidance) sections.guidance = "Trust in the guidance provided and follow your inner wisdom."

    return sections
  }

  async testConfiguration(): Promise<{
    success: boolean
    assistant_configured: boolean
    assistant_accessible: boolean
    chat_completion_available: boolean
    error?: string
  }> {
    try {
      const result = {
        success: false,
        assistant_configured: !!this.assistantId,
        assistant_accessible: false,
        chat_completion_available: false,
      }

      if (!this.openai) {
        return {
          ...result,
          error: "OpenAI client not initialized - missing API key",
        }
      }

      // Test chat completion
      try {
        console.log("🧪 Testing chat completion...")
        await this.openai.chat.completions.create({
          model: this.model,
          max_tokens: 10,
          messages: [{ role: "user", content: "Test" }],
        })
        result.chat_completion_available = true
        console.log("✅ Chat completion test passed")
      } catch (error) {
        console.warn("❌ Chat completion test failed:", error)
      }

      // Test assistant if configured
      if (this.assistantId) {
        try {
          console.log("🧪 Testing assistant accessibility...")
          await this.openai.beta.assistants.retrieve(this.assistantId)
          result.assistant_accessible = true
          console.log("✅ Assistant test passed")
        } catch (error) {
          console.warn("❌ Assistant test failed:", error)
        }
      }

      result.success = result.chat_completion_available || result.assistant_accessible
      return result
    } catch (error) {
      console.error("❌ Configuration test failed:", error)
      return {
        success: false,
        assistant_configured: false,
        assistant_accessible: false,
        chat_completion_available: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}

export const aiServiceManager = new EnhancedAIServiceManager()
