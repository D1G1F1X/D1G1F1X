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
  method: "assistant" | "chat_completion"
  error?: string
}

export class EnhancedAIServiceManager {
  private openai: OpenAI
  private assistantId?: string
  private model: string
  private maxTokens: number

  constructor() {
    const apiKey = process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY

    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables")
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

    console.log("🤖 AI Service Manager initialized:", {
      hasApiKey: !!apiKey,
      hasAssistantId: !!this.assistantId,
      model: this.model,
      maxTokens: this.maxTokens,
    })
  }

  async generateReading(request: ReadingRequest): Promise<ReadingResponse> {
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
        method: "chat_completion",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private async generateWithAssistant(request: ReadingRequest): Promise<Omit<ReadingResponse, "method" | "success">> {
    if (!this.assistantId) {
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

    // Create the message with detailed card information
    const prompt = this.buildDetailedPrompt(request)

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
    const systemPrompt = this.buildSystemPrompt()
    const userPrompt = this.buildDetailedPrompt(request)

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

  private buildSystemPrompt(): string {
    return `You are the Oracle of NUMO, a mystical guide specializing in Celtic numerology and elemental wisdom through the sacred NUMO Oracle Cards. The NUMO Oracle features five sacred treasures from Celtic lore:

1. **Cauldron of Dagda** (0) - Abundance, nourishment, infinite potential
2. **Sword of Nuada** (1-9) - Truth, clarity, decisive action  
3. **Cord of Fate** (10-99) - Connection, binding, destiny
4. **Spear of Lugh** (100-999) - Direction, purpose, skill mastery
5. **Stone of Destiny** (1000+) - Foundation, permanence, sovereignty

Each card combines a tool with one of five elements (Air, Earth, Fire, Water, Spirit), creating unique energetic signatures.

Your readings should be:
- Deeply insightful and spiritually meaningful
- Grounded in both Celtic mythology and numerological wisdom
- Practical yet mystical
- Respectful of the sacred nature of divination
- Structured with clear sections for Reading, Interpretation, and Guidance

Always provide responses in this exact JSON format:
{
  "reading": "The overall narrative of the cards drawn",
  "interpretation": "Detailed analysis of each card's meaning and relationships",
  "guidance": "Practical advice and spiritual wisdom for the querent"
}`
  }

  private buildDetailedPrompt(request: ReadingRequest): string {
    const { cards, question, spread_type, user_context } = request

    let prompt = `Please provide a NUMO Oracle reading for the following cards:\n\n`

    cards.forEach((card, index) => {
      prompt += `**Card ${index + 1}: ${card.name}**\n`
      prompt += `- Tool: ${card.tool}\n`
      prompt += `- Element: ${card.element}\n`
      prompt += `- Number: ${card.number}\n`
      prompt += `- Core Meaning: ${card.meaning}\n`
      prompt += `- Description: ${card.description}\n`
      prompt += `- Keywords: ${card.keywords.join(", ")}\n`
      if (card.reversed_meaning) {
        prompt += `- Reversed Meaning: ${card.reversed_meaning}\n`
      }
      prompt += `\n`
    })

    if (question) {
      prompt += `**Question Asked:** ${question}\n\n`
    }

    if (spread_type) {
      prompt += `**Spread Type:** ${spread_type}\n\n`
    }

    if (user_context) {
      prompt += `**Additional Context:** ${user_context}\n\n`
    }

    prompt += `Please provide a comprehensive reading that weaves together the mythological significance, numerological wisdom, and elemental energies of these cards. Focus on the interplay between the sacred tools and elements, and how they relate to the querent's situation.`

    return prompt
  }

  private parseAssistantResponse(response: string): Omit<ReadingResponse, "method" | "success"> {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(response)
      if (parsed.reading && parsed.interpretation && parsed.guidance) {
        return parsed
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
      sections.interpretation = "Please refer to the reading above for detailed insights."
      sections.guidance = "Reflect on the messages presented and trust your intuition."
    }

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
