import OpenAI from "openai"
import type { OracleCard } from "@/components/card-simulator"
import { generateReadingPrompt } from "@/lib/ai-prompt-manager" // Assuming this exists
import { getEnv } from "@/lib/env" // Import getEnv for robust env var access

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
  details?: string // Added for more detailed error info
}

export interface AssistantMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Initialize OpenAI client with beta header for Assistants API
// Use getEnv for robust access to environment variables
const openaiClient = new OpenAI({
  apiKey: getEnv("OPENAI_API_KEY"),
  beta: {
    assistants: "v2", // This adds the "OpenAI-Beta: assistants=v2" header
  },
})

export async function generateOracleReading(request: ReadingRequest): Promise<ReadingResponse> {
  const OPENAI_API_KEY = getEnv("OPENAI_API_KEY")
  const ASSISTANT_ID = getEnv("OPENAI_ASSISTANT_ID")

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    console.error("ERROR: OpenAI API key or Assistant ID not configured.")
    return {
      success: false,
      error: "AI service not configured. Please check server environment variables.",
      fallback: true,
    }
  }

  try {
    console.log("[generateOracleReading] Starting reading generation process.")
    console.log("[generateOracleReading] Request details:", {
      fullName: request.fullName,
      question: request.question,
      spreadType: request.spreadType,
      numCards: request.selectedCards.length,
    })

    // Create a new thread for each new reading
    console.log("[generateOracleReading] Creating new OpenAI thread...")
    const thread = await openaiClient.beta.threads.create()
    console.log(`[generateOracleReading] Thread created with ID: ${thread.id}`)

    // Generate the prompt using the prompt manager
    const prompt = await generateReadingPrompt(
      request.selectedCards,
      request.question,
      request.fullName,
      request.dateOfBirth,
      request.birthPlace,
      request.spreadType,
      request.isMember,
    )
    console.log("[generateOracleReading] Generated prompt length:", prompt.length)

    // Add the user's message to the thread
    console.log("[generateOracleReading] Adding message to thread...")
    await openaiClient.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    })
    console.log("[generateOracleReading] Message added to thread.")

    // Run the assistant
    console.log(`[generateOracleReading] Creating run for assistant ID: ${ASSISTANT_ID} on thread: ${thread.id}`)
    let run = await openaiClient.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    })
    console.log(`[generateOracleReading] Run created with ID: ${run.id}, status: ${run.status}`)

    // Poll for the run completion
    let pollAttempts = 0
    const maxPollAttempts = 30 // Max 30 seconds (30 * 1000ms wait)
    while (
      (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") &&
      pollAttempts < maxPollAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
      run = await openaiClient.beta.threads.runs.retrieve(thread.id, run.id)
      console.log(`[generateOracleReading] Polling run ${run.id}, status: ${run.status} (attempt ${++pollAttempts})`)
    }

    if (run.status === "completed") {
      console.log("[generateOracleReading] Run completed. Retrieving messages...")
      const messages = await openaiClient.beta.threads.messages.list(thread.id, { order: "desc", limit: 1 })
      const assistantMessage = messages.data[0]

      if (assistantMessage && assistantMessage.content[0].type === "text") {
        console.log("[generateOracleReading] Successfully retrieved assistant message.")
        return {
          success: true,
          reading: assistantMessage.content[0].text.value,
          threadId: thread.id,
          runId: run.id,
        }
      } else {
        console.error("[generateOracleReading] ERROR: Assistant response was not text or empty.", assistantMessage)
        return {
          success: false,
          error: "AI response format error or empty content.",
          fallback: true,
          threadId: thread.id,
          details: assistantMessage ? JSON.stringify(assistantMessage.content) : "No assistant message found.",
        }
      }
    } else {
      console.error(`[generateOracleReading] ERROR: Assistant run failed or timed out with status: ${run.status}`)
      return {
        success: false,
        error: `AI run failed or timed out. Status: ${run.status}`,
        fallback: true,
        threadId: thread.id,
        details: `Run ID: ${run.id}, Final Status: ${run.status}`,
      }
    }
  } catch (error: any) {
    console.error("[generateOracleReading] CRITICAL ERROR during OpenAI interaction:", error)
    return {
      success: false,
      error: "AI service unavailable or encountered an error.",
      fallback: true,
      details: error.message || "Unknown error",
    }
  }
}

export async function continueConversation(threadId: string, message: string): Promise<ReadingResponse> {
  const OPENAI_API_KEY = getEnv("OPENAI_API_KEY")
  const ASSISTANT_ID = getEnv("OPENAI_ASSISTANT_ID")

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    console.error("ERROR: OpenAI API key or Assistant ID not configured for follow-up.")
    return {
      success: false,
      content: "",
      threadId,
      runId: "",
      error: "AI service not configured. Please check server environment variables.",
      fallback: true,
    } as any
  }

  try {
    console.log(`[continueConversation] Continuing conversation in thread: ${threadId}`)
    console.log(`[continueConversation] User message: ${message.substring(0, 100)}...`)

    await openaiClient.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    })
    console.log("[continueConversation] User message added to thread.")

    let run = await openaiClient.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    })
    console.log(`[continueConversation] Run created with ID: ${run.id}, status: ${run.status}`)

    let pollAttempts = 0
    const maxPollAttempts = 30
    while (
      (run.status === "queued" || run.status === "in_progress" || run.status === "cancelling") &&
      pollAttempts < maxPollAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      run = await openaiClient.beta.threads.runs.retrieve(threadId, run.id)
      console.log(`[continueConversation] Polling run ${run.id}, status: ${run.status} (attempt ${++pollAttempts})`)
    }

    if (run.status === "completed") {
      console.log("[continueConversation] Run completed. Retrieving messages...")
      const messages = await openaiClient.beta.threads.messages.list(threadId, { order: "desc", limit: 1 })
      const assistantMessage = messages.data[0]

      if (assistantMessage && assistantMessage.content[0].type === "text") {
        console.log("[continueConversation] Successfully retrieved assistant message.")
        return {
          success: true,
          reading: assistantMessage.content[0].text.value,
          threadId: threadId,
          runId: run.id,
        }
      } else {
        console.error("[continueConversation] ERROR: Assistant response was not text or empty.", assistantMessage)
        return {
          success: false,
          error: "AI response format error or empty content.",
          fallback: true,
          threadId: threadId,
          details: assistantMessage ? JSON.stringify(assistantMessage.content) : "No assistant message found.",
        }
      }
    } else {
      console.error(`[continueConversation] ERROR: Assistant run failed or timed out with status: ${run.status}`)
      return {
        success: false,
        error: `AI run failed or timed out. Status: ${run.status}`,
        fallback: true,
        threadId: threadId,
        details: `Run ID: ${run.id}, Final Status: ${run.status}`,
      }
    }
  } catch (error: any) {
    console.error("[continueConversation] CRITICAL ERROR during OpenAI interaction:", error)
    return {
      success: false,
      error: "AI service unavailable or encountered an error.",
      fallback: true,
      details: error.message || "Unknown error",
    }
  }
}

export async function getConversationHistory(threadId: string): Promise<AssistantMessage[]> {
  const OPENAI_API_KEY = getEnv("OPENAI_API_KEY")
  const ASSISTANT_ID = getEnv("OPENAI_ASSISTANT_ID")

  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    console.error("ERROR: OpenAI API key or Assistant ID not configured for history retrieval.")
    return []
  }

  try {
    console.log(`[getConversationHistory] Fetching history for thread: ${threadId}`)
    const messages = await openaiClient.beta.threads.messages.list(threadId, { order: "asc" })
    console.log(`[getConversationHistory] Retrieved ${messages.data.length} messages.`)
    return messages.data.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content[0].type === "text" ? msg.content[0].text.value : "",
      timestamp: new Date(msg.created_at * 1000),
    }))
  } catch (error: any) {
    console.error("[getConversationHistory] CRITICAL ERROR fetching conversation history:", error)
    return []
  }
}

// New function to integrate the provided Node.js code's intent
export async function createCustomOpenAIResponse(
  promptMessages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  temperature = 1,
  maxOutputTokens = 2048,
  topP = 1,
  tools: any[] = [], // Assuming 'tools' here refers to OpenAI function calling tools
): Promise<ReadingResponse> {
  const OPENAI_API_KEY = getEnv("OPENAI_API_KEY")

  if (!OPENAI_API_KEY) {
    console.warn("OpenAI API key not configured for custom response, using fallback")
    return {
      success: false,
      error: "AI service not configured",
      fallback: true,
    }
  }

  try {
    console.log("[createCustomOpenAIResponse] Generating custom OpenAI response.")
    // Note: "gpt-4.1" is not a standard OpenAI model. Using "gpt-4o" as a common alternative.
    // Please replace with a valid model name if "gpt-4.1" refers to a custom or future model.
    const modelToUse = "gpt-4o"
    console.log(`[createCustomOpenAIResponse] Using model: ${modelToUse}`)
    console.log("[createCustomOpenAIResponse] Prompt messages:", promptMessages)

    const completion = await openaiClient.chat.completions.create({
      model: modelToUse,
      messages: promptMessages.length > 0 ? promptMessages : [{ role: "user", content: "Generate a response." }], // Ensure messages are not empty
      temperature: temperature,
      max_tokens: maxOutputTokens,
      top_p: topP,
      tools: tools.length > 0 ? tools : undefined, // Only include if tools are provided
      // The following parameters from your original snippet are not standard for chat completions:
      // - "text": { "format": { "type": "text" } } - Text format is default for chat completions.
      // - "reasoning": {} - Reasoning is internal to the model, not a direct input/output parameter.
      // - "store": true - Storing the response would be a separate application-level concern.
    })

    const assistantResponse = completion.choices[0].message?.content
    console.log("[createCustomOpenAIResponse] OpenAI completion received.")

    if (assistantResponse) {
      console.log("[createCustomOpenAIResponse] Successfully generated custom response.")
      // If 'store: true' implies saving the response, you would implement that logic here.
      // For example: saveResponseToDatabase(assistantResponse);
      return {
        success: true,
        reading: assistantResponse, // Using 'reading' field as per ReadingResponse interface
      }
    } else {
      console.error("[createCustomOpenAIResponse] ERROR: No content received from OpenAI chat completion.")
      return {
        success: false,
        error: "No content received from AI",
        fallback: true,
      }
    }
  } catch (error: any) {
    console.error("[createCustomOpenAIResponse] CRITICAL ERROR during custom OpenAI response generation:", error)
    return {
      success: false,
      error: error.message || "AI service unavailable",
      fallback: true,
      details: error.message || "Unknown error",
    }
  }
}
