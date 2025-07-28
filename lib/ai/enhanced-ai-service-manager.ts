import {
  createThread as createAssistantThread,
  addMessageToThread as addMessageToAssistantThread,
  getAssistantThreadMessages,
  getOpenAIClient,
  getOpenAIAssistant,
  continueAIConversationWithAssistant,
  generateText, // Keep for potential direct model calls if needed
  streamText, // Keep for potential direct model calls if needed
  getAssistantStatus,
  testOpenAIAssistant,
  runAssistant, // Import runAssistant
} from "@/lib/openai-assistant"
import { getReadingPrompt, getFollowUpPrompt } from "@/lib/ai-prompt-manager"
import { openai } from "@ai-sdk/openai"
import { env } from "@/lib/env"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createMistral } from "@ai-sdk/mistral"
import { createCohere } from "@ai-sdk/cohere"
import { createPerplexity } from "@ai-sdk/perplexity"
import { createGroq } from "@ai-sdk/groq"
import { createXAI } from "@ai-sdk/xai"
import { createDeepInfra } from "@ai-sdk/deepinfra"
import { createFal } from "@ai-sdk/fal"
import type { OracleCard } from "@/types/cards"
import type { ReadableStream } from "stream"

// Removed top-level environment variable checks to prevent synchronous crashes.
// These checks are now handled within getOpenAIClient and getOpenAIAssistant.

const openaiModel = openai("gpt-4o")

type AIModel =
  | ReturnType<typeof openai>
  | ReturnType<typeof createAnthropic>
  | ReturnType<typeof createMistral>
  | ReturnType<typeof createCohere>
  | ReturnType<typeof createPerplexity>
  | ReturnType<typeof createGroq>
  | ReturnType<typeof createXAI>
  | ReturnType<typeof createDeepInfra>
  | ReturnType<typeof createFal>

const openaiProvider = env.OPENAI_API_KEY ? createOpenAI({ apiKey: env.OPENAI_API_KEY }) : undefined
const anthropicProvider = env.ANTHROPIC_API_KEY ? createAnthropic({ apiKey: env.ANTHROPIC_API_KEY }) : undefined
const mistralProvider = env.MISTRAL_API_KEY ? createMistral({ apiKey: env.MISTRAL_API_KEY }) : undefined
const cohereProvider = env.COHERE_API_KEY ? createCohere({ apiKey: env.COHERE_API_KEY }) : undefined
const perplexityProvider = env.PERPLEXITY_API_KEY ? createPerplexity({ apiKey: env.PERPLEXITY_API_KEY }) : undefined
const groqProvider = env.GROQ_API_KEY ? createGroq({ apiKey: env.GROQ_API_KEY }) : undefined
const xaiProvider = env.XAI_API_KEY ? createXAI({ apiKey: env.XAI_API_KEY }) : undefined
const deepinfraProvider = env.DEEPINFRA_API_KEY ? createDeepInfra({ apiKey: env.DEEPINFRA_API_KEY }) : undefined
const falProvider = env.FAL_KEY ? createFal({ apiKey: env.FAL_KEY }) : undefined

interface GenerateReadingOptions {
  cards: OracleCard[]
  question: string
  spreadType: string
  userContext?: string // Now explicitly a string or undefined
}

interface FollowUpQuestionOptions {
  threadId: string
  question: string
  userContext?: string
  originalReading?: string
}

export async function generateOracleReading({
  cards,
  question,
  spreadType,
  userContext, // This is now guaranteed to be a string or undefined
}: GenerateReadingOptions): Promise<{ reading: string; threadId: string; method: string }> {
  if (!cards || cards.length === 0) {
    throw new Error("No cards provided for reading generation.")
  }
  if (!question) {
    throw new Error("No question provided for reading generation.")
  }

  let userName: string | undefined
  if (userContext) {
    try {
      const parsedUserContext = JSON.parse(userContext)
      userName = parsedUserContext.fullName
    } catch (e) {
      console.warn("⚠️ Failed to parse userContext string in generateOracleReading (for userName extraction):", e)
      // userName remains undefined if parsing fails
    }
  }

  console.log("DEBUG: Calling getReadingPrompt with:", {
    cards: cards.map((c) => c.id),
    spreadType,
    question,
    userContext: userContext ? "Present (stringified)" : "Absent", // Log the stringified status
    userName,
  })

  let promptContent: string
  try {
    // Pass the userContext string directly to getReadingPrompt
    promptContent = getReadingPrompt(cards, spreadType || "single", question, userContext, userName)
    console.log("DEBUG: Generated prompt content length:", promptContent.length)
  } catch (promptError) {
    console.error("ERROR: Failed to generate prompt content:", promptError)
    throw new Error(
      `Failed to prepare AI prompt: ${promptError instanceof Error ? promptError.message : String(promptError)}`,
    )
  }

  console.log("AI Service Manager: Calling generateAIReadingWithAssistant with prepared prompt.")
  const { reading, threadId } = await generateAIReadingWithAssistant(promptContent)

  console.log("AI Service Manager: Received AI response from Assistant.")
  return { reading, threadId, method: "OpenAI Assistant API" }
}

export async function sendFollowUpQuestion({
  threadId,
  question,
  userContext,
  originalReading,
}: FollowUpQuestionOptions): Promise<string> {
  if (!threadId) {
    throw new Error("Thread ID is required for follow-up questions.")
  }
  if (!question) {
    throw new Error("Follow-up question cannot be empty.")
  }

  let messageContent = getFollowUpPrompt(originalReading || "", question)

  if (userContext) {
    messageContent += `\nUser Context: ${userContext}`
  }

  console.log(`AI Service Manager: Sending follow-up question to thread ${threadId}.`)
  const { response: aiResponse } = await continueAIConversationWithAssistant(threadId, messageContent)

  if (!aiResponse) {
    throw new Error("Failed to get response for follow-up question from AI assistant.")
  }

  console.log("AI Service Manager: Received follow-up response.")
  return aiResponse
}

export async function getConversationHistory(threadId: string): Promise<any[]> {
  if (!threadId) {
    throw new Error("Thread ID is required to retrieve conversation history.")
  }
  console.log(`AI Service Manager: Retrieving conversation history for thread ${threadId}.`)
  const messages = await getAssistantThreadMessages(threadId)
  console.log("AI Service Manager: Retrieved conversation history.")
  return messages
}

export async function createNewConversationThread(): Promise<string> {
  console.log("AI Service Manager: Creating new conversation thread.")
  const thread = await createAssistantThread()
  if (!thread || !thread.id) {
    throw new Error("Failed to create new assistant thread.")
  }
  console.log(`AI Service Manager: New conversation thread created: ${thread.id}.`)
  return thread.id
}

export async function addMessageToConversation(threadId: string, message: string): Promise<void> {
  if (!threadId) {
    throw new Error("Thread ID is required to add a message.")
  }
  if (!message) {
    throw new Error("Message content cannot be empty.")
  }
  console.log(`AI Service Manager: Adding message to thread ${threadId}.`)
  await addMessageToAssistantThread(threadId, message)
  console.log("AI Service Manager: Message added.")
}

export async function generateAIReadingWithAssistant(
  promptContent: string,
): Promise<{ reading: string; threadId: string }> {
  const openaiClient = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  if (!assistant) {
    console.error("ERROR: OpenAI Assistant not initialized. Check OPENAI_ASSISTANT_ID environment variable.")
    throw new Error("OpenAI Assistant not initialized. Check OPENAI_ASSISTANT_ID environment variable.")
  }

  let threadId: string
  try {
    console.log("DEBUG: Creating new OpenAI thread...")
    const thread = await openaiClient.beta.threads.create()
    threadId = thread.id
    console.log(`DEBUG: Thread created with ID: ${threadId}`)
  } catch (threadError) {
    console.error("ERROR: Failed to create OpenAI thread:", threadError)
    throw new Error(
      `Failed to create OpenAI thread: ${threadError instanceof Error ? threadError.message : String(threadError)}`,
    )
  }

  try {
    console.log(`DEBUG: Adding message to thread ${threadId}...`)
    await openaiClient.beta.threads.messages.create(threadId, {
      role: "user",
      content: promptContent,
    })
    console.log("DEBUG: Message added to thread.")
  } catch (messageError) {
    console.error(`ERROR: Failed to add message to thread ${threadId}:`, messageError)
    throw new Error(
      `Failed to add message to thread: ${messageError instanceof Error ? messageError.message : String(messageError)}`,
    )
  }

  let run
  try {
    console.log(`DEBUG: Creating assistant run for thread ${threadId}...`)
    run = await runAssistant(threadId, assistant.id) // Use the imported runAssistant
    console.log(`DEBUG: Assistant run created and completed with ID: ${run.id}`)
  } catch (runError) {
    // Changed variable name to avoid conflict
    console.error(`ERROR: Failed during assistant run for thread ${threadId}:`, runError)
    throw new Error(`Failed during assistant run: ${runError instanceof Error ? runError.message : String(runError)}`)
  }

  if (run.status === "completed") {
    try {
      console.log(`DEBUG: Retrieving messages for thread ${threadId}...`)
      const messages = await openaiClient.beta.threads.messages.list(threadId)
      const assistantMessages = messages.data.filter((msg) => msg.role === "assistant")
      const latestAssistantMessage = assistantMessages[0]?.content[0]

      if (latestAssistantMessage && latestAssistantMessage.type === "text") {
        console.log("DEBUG: Successfully retrieved assistant's text response.")
        return { reading: latestAssistantMessage.text.value, threadId: threadId }
      } else {
        console.error("ERROR: No text content found in assistant's response or unexpected message type.")
        throw new Error("No text content found in assistant's response.")
      }
    } catch (retrieveMessagesError) {
      console.error(`ERROR: Failed to retrieve messages for thread ${threadId}:`, retrieveMessagesError)
      throw new Error(
        `Failed to retrieve assistant messages: ${retrieveMessagesError instanceof Error ? retrieveMessagesError.message : String(retrieveMessagesError)}`,
      )
    }
  } else {
    console.error(`ERROR: Assistant run failed with status: ${run.status}`)
    throw new Error(`Assistant run failed with status: ${run.status}`)
  }
}

export async function generateSimpleText(prompt: string, systemPrompt?: string): Promise<string> {
  const { text } = await generateText({
    model: openaiModel,
    prompt: prompt,
    system: systemPrompt,
  })
  return text
}

export function streamSimpleText(prompt: string, systemPrompt?: string): ReadableStream {
  return streamText({
    model: openaiModel,
    prompt: prompt,
    system: systemPrompt,
  }).toReadableStream()
}

export function getAIModel(membershipType: "free" | "premium"): AIModel {
  if (membershipType === "premium") {
    if (xaiProvider) return xaiProvider("grok-1")
    if (anthropicProvider) return anthropicProvider("claude-3-opus-20240229")
    if (openaiProvider) return openaiProvider("gpt-4o")
    if (groqProvider) return groqProvider("llama3-70b-8192")
    if (mistralProvider) return mistralProvider("mistral-large-latest")
    if (cohereProvider) return cohereProvider("command-r-plus")
    if (perplexityProvider) return perplexityProvider("llama-3-sonar-large-32k-online")
    if (deepinfraProvider) return deepinfraProvider("meta-llama/Llama-3-8B-Instruct")
    if (falProvider) return falProvider("fal-ai/fast-sdxl")
  }

  if (openaiProvider) return openaiProvider("gpt-3.5-turbo")
  if (groqProvider) return groqProvider("llama3-8b-8192")
  if (mistralProvider) return mistralProvider("mistral-small-latest")
  if (cohereProvider) return cohereProvider("command-r") // Corrected the variable name here
  if (perplexityProvider) return perplexityProvider("llama-3-sonar-small-32k-online")
  if (deepinfraProvider) return deepinfraProvider("meta-llama/Llama-3-8B-Instruct")
  if (falProvider) return falProvider("fal-ai/fast-sdxl")

  throw new Error("No AI model configured or available. Please check your environment variables.")
}

export function getAIServiceStatus() {
  return {
    openai: !!openaiProvider,
    anthropic: !!anthropicProvider,
    mistral: !!mistralProvider,
    cohere: !!cohereProvider,
    perplexity: !!perplexityProvider,
    groq: !!groqProvider,
    xai: !!xaiProvider,
    deepinfra: !!deepinfraProvider,
    fal: !!falProvider,
  }
}

export type AIServiceStatus = {
  service: string
  status: "active" | "inactive" | "unknown"
  message?: string
}

export async function getAIServiceStatuses(): Promise<AIServiceStatus[]> {
  const statuses: AIServiceStatus[] = []

  try {
    const assistantStatus = await getAssistantStatus()
    statuses.push({
      service: "OpenAI Assistant",
      status: assistantStatus.status,
      message: assistantStatus.message,
    })
  } catch (error: any) {
    statuses.push({
      service: "OpenAI Assistant",
      status: "inactive",
      message: error.message || "Failed to check OpenAI Assistant status.",
    })
  }

  try {
    // Using generateText for a quick check, as streamText might be harder to test for simple status
    await generateText({
      model: openaiModel,
      prompt: "Hello",
      maxTokens: 5,
    })
    statuses.push({
      service: "OpenAI Text Generation (AI SDK)",
      status: "active",
      message: "Successfully connected to OpenAI text generation.",
    })
  } catch (error: any) {
    statuses.push({
      service: "OpenAI Text Generation (AI SDK)",
      status: "inactive",
      message: error.message || "Failed to connect to OpenAI text generation. Check OPENAI_API_KEY and OPENAI_MODEL.",
    })
  }

  return statuses
}

export async function runAITests(): Promise<{ service: string; testResult: string; error?: string }[]> {
  const testResults: { service: string; testResult: string; error?: string }[] = [] // Corrected type here

  try {
    const { response, error } = await testOpenAIAssistant('Say "hello"')
    testResults.push({
      service: "OpenAI Assistant",
      testResult: response || "No response",
      error: error,
    })
  } catch (error: any) {
    testResults.push({
      service: "OpenAI Assistant",
      testResult: "Test failed",
      error: error.message || "An unknown error occurred during test.",
    })
  }

  try {
    const { text } = await generateText({
      model: openaiModel,
      prompt: "What is 1+1?",
      maxTokens: 10,
    })
    testResults.push({
      service: "OpenAI Text Generation (AI SDK)",
      testResult: text,
    })
  } catch (error: any) {
    testResults.push({
      service: "OpenAI Text Generation (AI SDK)",
      testResult: "Test failed",
      error: error.message || "An unknown error occurred during test.",
    })
  }

  return testResults
}

export const aiServiceManager = {
  generateOracleReading,
  continueAIConversationWithAssistant,
  sendFollowUpQuestion,
}

export async function generateAIReading(prompt: string): Promise<string> {
  try {
    console.log("DEBUG: Calling OpenAI Assistant API for reading generation...")
    const { text } = await generateText({
      model: openaiModel,
      prompt: prompt,
      system:
        "You are a wise and insightful oracle, providing profound numerological and elemental readings based on the provided card data. Your responses are always in a calm, guiding, and encouraging tone. Do not mention that you are an AI or a language model. Focus solely on the spiritual and practical interpretations of the cards.",
    })
    console.log("DEBUG: OpenAI Assistant API call successful.")
    return text
  } catch (error) {
    console.error("ERROR: Failed to generate AI reading with Assistant API:", error)
    throw new Error("Failed to generate AI reading with Assistant API.")
  }
}

export async function continueAIConversation(
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  try {
    console.log("DEBUG: Calling OpenAI Assistant API to continue conversation...")
    const { text } = await generateText({
      model: openaiModel,
      messages: messages,
      system:
        "You are a wise and insightful oracle, providing profound numerological and elemental readings based on the provided card data. Your responses are always in a calm, guiding, and encouraging tone. Do not mention that you are an AI or a language model. Focus solely on the spiritual and practical interpretations of the cards.",
    })
    console.log("DEBUG: OpenAI Assistant API conversation continued successfully.")
    return text
  } catch (error) {
    console.error("ERROR: Failed to continue AI conversation with Assistant API:", error)
    throw new Error("Failed to continue AI conversation with Assistant API.")
  }
}
