import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Your assistant ID
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "asst_b3P7ySL6Kx62ZnZ5xsLlx7F4"

export interface AssistantMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface ReadingRequest {
  fullName?: string
  dateOfBirth?: string
  timeOfBirth?: string
  question?: string
  selectedCards?: any[]
  spreadType?: string
}

export interface AssistantResponse {
  content: string
  threadId: string
  runId: string
  success: boolean
  error?: string
}

/**
 * Create a new conversation thread
 */
export async function createThread(): Promise<string> {
  try {
    const thread = await openai.beta.threads.create()
    return thread.id
  } catch (error) {
    console.error("Error creating thread:", error)
    throw new Error("Failed to create conversation thread")
  }
}

/**
 * Add a message to a thread
 */
export async function addMessageToThread(
  threadId: string,
  content: string,
  role: "user" | "assistant" = "user",
): Promise<void> {
  try {
    await openai.beta.threads.messages.create(threadId, {
      role,
      content,
    })
  } catch (error) {
    console.error("Error adding message to thread:", error)
    throw new Error("Failed to add message to thread")
  }
}

/**
 * Run the assistant on a thread
 */
export async function runAssistant(threadId: string): Promise<string> {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    })

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)

    while (runStatus.status === "queued" || runStatus.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }

    if (runStatus.status === "completed") {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(threadId)
      const lastMessage = messages.data[0]

      if (lastMessage.role === "assistant" && lastMessage.content[0].type === "text") {
        return lastMessage.content[0].text.value
      }
    }

    throw new Error(`Assistant run failed with status: ${runStatus.status}`)
  } catch (error) {
    console.error("Error running assistant:", error)
    throw new Error("Failed to get assistant response")
  }
}

/**
 * Generate a complete NUMO Oracle reading
 */
export async function generateOracleReading(request: ReadingRequest): Promise<AssistantResponse> {
  try {
    // Create a new thread for this reading
    const threadId = await createThread()

    // Format the request for the assistant
    const prompt = formatReadingPrompt(request)

    // Add the message to the thread
    await addMessageToThread(threadId, prompt)

    // Run the assistant
    const response = await runAssistant(threadId)

    return {
      content: response,
      threadId,
      runId: "", // We could store this if needed
      success: true,
    }
  } catch (error) {
    console.error("Error generating oracle reading:", error)
    return {
      content: "",
      threadId: "",
      runId: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Continue a conversation in an existing thread
 */
export async function continueConversation(threadId: string, message: string): Promise<AssistantResponse> {
  try {
    // Add the user's message
    await addMessageToThread(threadId, message)

    // Run the assistant
    const response = await runAssistant(threadId)

    return {
      content: response,
      threadId,
      runId: "",
      success: true,
    }
  } catch (error) {
    console.error("Error continuing conversation:", error)
    return {
      content: "",
      threadId,
      runId: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Format the reading request for the assistant
 */
function formatReadingPrompt(request: ReadingRequest): string {
  let prompt = "Please provide a complete NUMOracle reading with the following information:\n\n"

  if (request.fullName) {
    prompt += `📝 Full Name: ${request.fullName}\n`
  }

  if (request.dateOfBirth) {
    prompt += `📅 Date of Birth: ${request.dateOfBirth}\n`
  }

  if (request.timeOfBirth) {
    prompt += `🕐 Time of Birth: ${request.timeOfBirth}\n`
  }

  if (request.question) {
    prompt += `❓ Question/Focus: ${request.question}\n`
  }

  if (request.selectedCards && request.selectedCards.length > 0) {
    prompt += `\n🃏 Drawn Cards:\n`
    request.selectedCards.forEach((card, index) => {
      prompt += `Card ${index + 1}: ${card.fullTitle}\n`
      prompt += `- Base Element: ${card.baseElement}\n`
      prompt += `- Synergistic Element: ${card.synergisticElement}\n`
      prompt += `- Sacred Geometry: ${card.sacredGeometry}\n`
      prompt += `- Orientation: ${card.orientation}\n`
      prompt += `- Icon: ${card.iconSymbol}\n\n`
    })
  }

  if (request.spreadType) {
    prompt += `🔮 Spread Type: ${request.spreadType}\n`
  }

  prompt += `\nPlease provide a comprehensive reading that includes:
1. Numerology analysis (Life Path, Expression, Soul Urge if name provided)
2. Astrological insights (Sun sign, and other placements if birth time provided)
3. Card interpretation with elemental synthesis
4. Practical guidance and spiritual insights
5. A cohesive narrative that weaves all elements together

Focus on spiritual clarity while keeping the guidance relevant to everyday life.`

  return prompt
}

/**
 * Get conversation history from a thread
 */
export async function getConversationHistory(threadId: string): Promise<AssistantMessage[]> {
  try {
    const messages = await openai.beta.threads.messages.list(threadId)

    return messages.data
      .reverse() // Reverse to get chronological order
      .map((message) => ({
        role: message.role as "user" | "assistant",
        content: message.content[0].type === "text" ? message.content[0].text.value : "",
        timestamp: new Date(message.created_at * 1000),
      }))
  } catch (error) {
    console.error("Error getting conversation history:", error)
    return []
  }
}
