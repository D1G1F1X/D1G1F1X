import {
  runAssistant,
  createAssistantThread,
  addMessageToAssistantThread,
  getAssistantThreadMessages,
  getAssistantResponse,
  createThread,
  addMessageToThread,
} from "@/lib/openai-assistant"
import { getPromptTemplate, getSystemPrompt, getUserPrompt } from "@/lib/ai-prompt-manager"
import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getOpenAIAssistant, getOpenAIClient } from "@/lib/openai-assistant" // Import the new functions
import type { OracleCard } from "@/types/cards"
import { getCardById } from "@/lib/card-data-access"
import { env } from "@/lib/env"

import { createOpenAI } from "@ai-sdk/openai"
import { createGoogleGenerativeAI } from "@ai-sdk/google-generative-ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createMistral } from "@ai-sdk/mistral"
import { createCohere } from "@ai-sdk/cohere"
import { createPerplexity } from "@ai-sdk/perplexity"
import { createGroq } from "@ai-sdk/groq"
import { createXAI } from "@ai-sdk/xai"
import { createDeepInfra } from "@ai-sdk/deepinfra"
import { createFal } from "@ai-sdk/fal"

// Define a type for the AI model instance
type AIModel =
  | ReturnType<typeof openai>
  | ReturnType<typeof createGoogleGenerativeAI>
  | ReturnType<typeof createAnthropic>
  | ReturnType<typeof createMistral>
  | ReturnType<typeof createCohere>
  | ReturnType<typeof createPerplexity>
  | ReturnType<typeof createGroq>
  | ReturnType<typeof createXAI>
  | ReturnType<typeof createDeepInfra>
  | ReturnType<typeof createFal>

// Initialize AI providers based on environment variables
const openaiProvider = env.OPENAI_API_KEY ? createOpenAI({ apiKey: env.OPENAI_API_KEY }) : undefined
const googleProvider = env.GOOGLE_API_KEY ? createGoogleGenerativeAI({ apiKey: env.GOOGLE_API_KEY }) : undefined
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
  userContext: string
  threadId?: string
}

interface FollowUpQuestionOptions {
  threadId: string
  question: string
  userContext?: string
}

interface AIReadingOptions {
  cards: OracleCard[]
  question: string
  spreadType: string
  userContext?: string // JSON string of user profile data
}

interface AIConversationOptions {
  threadId: string
  message: string
  initialContext?: {
    cards: OracleCard[]
    question: string
    reading: string
    userProfile?: any
  }
}

/**
 * Generates an oracle reading using the AI assistant.
 * It constructs the prompt based on card data, user question, and spread type.
 */
export async function generateOracleReading({
  cards,
  question,
  spreadType,
  userContext,
  threadId: existingThreadId,
}: GenerateReadingOptions): Promise<{ reading: string; threadId: string }> {
  if (!cards || cards.length === 0) {
    throw new Error("No cards provided for reading generation.")
  }
  if (!question) {
    throw new Error("No question provided for reading generation.")
  }

  // Construct the detailed card information string for the AI
  const detailedCardsInfo = cards
    .map((card) => {
      const meanings = card.keyMeanings.join(", ")
      const breakdown = card.symbolismBreakdown.join(" ")
      return `Card ID: ${card.id}, Title: ${card.fullTitle}, Number: ${card.number}, Suit: ${card.suit}, Base Element: ${card.baseElement}, Synergistic Element: ${card.synergisticElement}, Key Meanings: ${meanings}, Symbolism Breakdown: ${breakdown}`
    })
    .join("\n---\n")

  // Get the appropriate prompt template
  const promptTemplate = getPromptTemplate("oracle_reading_generation")
  if (!promptTemplate) {
    throw new Error("Oracle reading generation prompt template not found.")
  }

  // Prepare the content for the AI assistant
  const content = `
  User's Question: "${question}"
  Spread Type: ${spreadType}
  User Context: ${userContext || "No additional user context provided."}

  The following NUMO Oracle Cards were drawn:
  ${detailedCardsInfo}

  Please provide a comprehensive and insightful reading based on the user's question, the drawn cards, and the spread type.
  Focus on integrating the symbolism, key meanings, and breakdown of each card into a cohesive narrative.
  Structure the reading clearly, perhaps with an introduction, interpretation for each card in the context of the question/spread, and a concluding guidance section.
  `

  console.log("AI Service Manager: Sending initial content to AI assistant.")
  const { response: aiResponse, threadId } = await runAssistant(content, existingThreadId)

  if (!aiResponse) {
    throw new Error("Failed to get reading from AI assistant.")
  }

  console.log("AI Service Manager: Received AI response.")
  return { reading: aiResponse, threadId }
}

/**
 * Sends a follow-up question to an existing AI assistant conversation thread.
 */
export async function sendFollowUpQuestion({
  threadId,
  question,
  userContext,
}: FollowUpQuestionOptions): Promise<string> {
  if (!threadId) {
    throw new Error("Thread ID is required for follow-up questions.")
  }
  if (!question) {
    throw new Error("Follow-up question cannot be empty.")
  }

  const content = `User's Follow-up Question: "${question}"
  User Context: ${userContext || "No additional user context provided."}
  Please provide a concise and helpful response based on the previous conversation and this new question.`

  console.log(`AI Service Manager: Sending follow-up question to thread ${threadId}.`)
  const { response: aiResponse } = await runAssistant(content, threadId)

  if (!aiResponse) {
    throw new Error("Failed to get response for follow-up question from AI assistant.")
  }

  console.log("AI Service Manager: Received follow-up response.")
  return aiResponse
}

/**
 * Retrieves the conversation history from an AI assistant thread.
 */
export async function getConversationHistory(threadId: string): Promise<any[]> {
  if (!threadId) {
    throw new Error("Thread ID is required to retrieve conversation history.")
  }
  console.log(`AI Service Manager: Retrieving conversation history for thread ${threadId}.`)
  const messages = await getAssistantThreadMessages(threadId)
  console.log("AI Service Manager: Retrieved conversation history.")
  return messages
}

/**
 * Creates a new AI assistant conversation thread.
 */
export async function createNewConversationThread(): Promise<string> {
  console.log("AI Service Manager: Creating new conversation thread.")
  const thread = await createAssistantThread()
  if (!thread || !thread.id) {
    throw new Error("Failed to create new assistant thread.")
  }
  console.log(`AI Service Manager: New conversation thread created: ${thread.id}.`)
  return thread.id
}

/**
 * Adds a message to an existing AI assistant conversation thread.
 */
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

/**
 * Generates an AI reading using the OpenAI Assistant API.
 * @param options - The options for generating the reading.
 * @returns A promise that resolves to the AI-generated reading and thread ID.
 */
export async function generateAIReadingWithAssistant(
  options: AIReadingOptions,
): Promise<{ reading: string; threadId: string }> {
  const { cards, question, spreadType, userContext } = options
  const openaiClient = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  if (!assistant) {
    throw new Error("OpenAI Assistant not initialized. Check OPENAI_ASSISTANT_ID environment variable.")
  }

  // Prepare card details for the prompt
  const cardDetails = cards
    .map((card) => {
      const masterCard = getCardById(card.id) // Get full card data from master
      if (!masterCard) {
        console.warn(`Card with ID ${card.id} not found in master data. Using provided data.`)
        return `Card: ${card.fullTitle} (${card.baseElement} ${card.suit}), Meanings: ${card.keyMeanings.join(", ")}`
      }
      return `Card: ${masterCard.fullTitle} (Number: ${masterCard.number}, Suit: ${masterCard.suit}, Base Element: ${masterCard.baseElement}, Synergistic Element: ${masterCard.synergisticElement}, Key Meanings: ${masterCard.keyMeanings.join(", ")}, Symbolism: ${masterCard.symbolismBreakdown.join(" ")})`
    })
    .join("\n")

  const initialMessageContent = `
  User's Question: ${question}
  Spread Type: ${spreadType}
  Cards Drawn:
  ${cardDetails}
  ${userContext ? `User Context: ${userContext}` : ""}

  Please provide a comprehensive oracle reading based on the question, spread type, and the meanings of the drawn cards.
  Structure the reading with an introduction, interpretation of each card in the context of the question and spread,
  a synthesis of the cards' combined message, and practical guidance or advice.
  Ensure the tone is mystical, insightful, and supportive.
  `

  // Create a new thread
  const thread = await openaiClient.beta.threads.create()

  // Add the user's message to the thread
  await openaiClient.beta.threads.messages.create(thread.id, {
    role: "user",
    content: initialMessageContent,
  })

  // Run the assistant
  const run = await openaiClient.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  })

  // Poll for the run completion
  let runStatus = await openaiClient.beta.threads.runs.retrieve(thread.id, run.id)
  while (runStatus.status === "queued" || runStatus.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
    runStatus = await openaiClient.beta.threads.runs.retrieve(thread.id, run.id)
  }

  if (runStatus.status === "completed") {
    const messages = await openaiClient.beta.threads.messages.list(thread.id)
    const assistantMessages = messages.data.filter((msg) => msg.role === "assistant")
    const latestAssistantMessage = assistantMessages[0]?.content[0]

    if (latestAssistantMessage && latestAssistantMessage.type === "text") {
      return { reading: latestAssistantMessage.text.value, threadId: thread.id }
    } else {
      throw new Error("No text content found in assistant's response.")
    }
  } else {
    throw new Error(`Assistant run failed with status: ${runStatus.status}`)
  }
}

/**
 * Continues an AI conversation using the OpenAI Assistant API.
 * @param options - The options for continuing the conversation.
 * @returns A promise that resolves to the AI-generated response.
 */
export async function continueAIConversationWithAssistant(
  options: AIConversationOptions,
): Promise<{ response: string }> {
  const { threadId, message, initialContext } = options
  const openaiClient = getOpenAIClient()
  const assistant = await getOpenAIAssistant()

  if (!assistant) {
    throw new Error("OpenAI Assistant not initialized. Check OPENAI_ASSISTANT_ID environment variable.")
  }

  // Add initial context to the thread if provided and it's the first message
  if (initialContext) {
    const cardDetails = initialContext.cards
      .map((card) => {
        const masterCard = getCardById(card.id)
        if (!masterCard) {
          return `Card: ${card.fullTitle} (${card.baseElement} ${card.suit}), Meanings: ${card.keyMeanings.join(", ")}`
        }
        return `Card: ${masterCard.fullTitle} (Number: ${masterCard.number}, Suit: ${masterCard.suit}, Base Element: ${masterCard.baseElement}, Synergistic Element: ${masterCard.synergisticElement}, Key Meanings: ${masterCard.keyMeanings.join(", ")}, Symbolism: ${masterCard.symbolismBreakdown.join(" ")})`
      })
      .join("\n")

    const contextMessage = `
    Initial Reading Context:
    Question: ${initialContext.question}
    Reading: ${initialContext.reading}
    Cards:
    ${cardDetails}
    ${initialContext.userProfile ? `User Profile: ${JSON.stringify(initialContext.userProfile)}` : ""}
    `
    // Check if this context has already been added to the thread to avoid duplication
    // This is a simplified check; a more robust solution might involve checking message history
    const messages = await openaiClient.beta.threads.messages.list(threadId, { limit: 1 })
    if (
      messages.data.length === 0 ||
      messages.data[0]?.content[0]?.type !== "text" ||
      !messages.data[0].content[0].text.value.includes("Initial Reading Context")
    ) {
      await openaiClient.beta.threads.messages.create(threadId, {
        role: "user",
        content: contextMessage,
      })
    }
  }

  // Add the new user message to the thread
  await openaiClient.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  })

  // Run the assistant
  const run = await openaiClient.beta.threads.runs.create(threadId, {
    assistant_id: assistant.id,
  })

  // Poll for the run completion
  let runStatus = await openaiClient.beta.threads.runs.retrieve(threadId, run.id)
  while (runStatus.status === "queued" || runStatus.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
    runStatus = await openaiClient.beta.threads.runs.retrieve(threadId, run.id)
  }

  if (runStatus.status === "completed") {
    const messages = await openaiClient.beta.threads.messages.list(threadId)
    const assistantMessages = messages.data.filter((msg) => msg.role === "assistant")
    const latestAssistantMessage = assistantMessages[0]?.content[0]

    if (latestAssistantMessage && latestAssistantMessage.type === "text") {
      return { response: latestAssistantMessage.text.value }
    } else {
      throw new Error("No text content found in assistant's response.")
    }
  } else {
    throw new Error(`Assistant run failed with status: ${runStatus.status}`)
  }
}

/**
 * Generates a simple text response using the OpenAI Chat Completion API.
 * This is a fallback or alternative to the Assistant API for simpler requests.
 * @param prompt The prompt for text generation.
 * @param systemPrompt An optional system prompt to guide the AI.
 * @returns A promise that resolves to the generated text.
 */
export async function generateSimpleText(prompt: string, systemPrompt?: string): Promise<string> {
  const { text } = await generateText({
    model: openai(env.OPENAI_MODEL || "gpt-4o"),
    prompt: prompt,
    system: systemPrompt,
  })
  return text
}

/**
 * Streams a text response using the OpenAI Chat Completion API.
 * @param prompt The prompt for text streaming.
 * @param systemPrompt An optional system prompt to guide the AI.
 * @returns A readable stream of text.
 */
export function streamSimpleText(prompt: string, systemPrompt?: string) {
  return streamText({
    model: openai(env.OPENAI_MODEL || "gpt-4o"),
    prompt: prompt,
    system: systemPrompt,
  })
}

/**
 * Selects an AI model based on membership type and available providers.
 * Prioritizes premium models for paid members.
 * @param membershipType The user's membership type (e.g., "free", "premium").
 * @returns An initialized AI model.
 * @throws Error if no suitable AI model can be found.
 */
export function getAIModel(membershipType: "free" | "premium"): AIModel {
  // Premium models (prioritize for premium members)
  if (membershipType === "premium") {
    if (xaiProvider) return xaiProvider("grok-1") // Example premium model
    if (anthropicProvider) return anthropicProvider("claude-3-opus-20240229")
    if (openaiProvider) return openaiProvider("gpt-4o")
    if (googleProvider) return googleProvider("gemini-1.5-pro")
    if (groqProvider) return groqProvider("llama3-70b-8192")
    if (mistralProvider) return mistralProvider("mistral-large-latest")
    if (cohereProvider) return cohereProvider("command-r-plus")
    if (perplexityProvider) return perplexityProvider("llama-3-sonar-large-32k-online")
    if (deepinfraProvider) return deepinfraProvider("meta-llama/Llama-3-8B-Instruct")
    if (falProvider) return falProvider("fal-ai/fast-sdxl")
  }

  // Free/Fallback models (for free members or if premium models are unavailable)
  if (openaiProvider) return openaiProvider("gpt-3.5-turbo") // Default for free tier
  if (googleProvider) return googleProvider("gemini-pro")
  if (groqProvider) return groqProvider("llama3-8b-8192")
  if (mistralProvider) return mistralProvider("mistral-small-latest")
  if (cohereProvider) return cohereProvider("command-r")
  if (perplexityProvider) return perplexityProvider("llama-3-sonar-small-32k-online")
  if (deepinfraProvider) return deepinfraProvider("meta-llama/Llama-3-8B-Instruct")
  if (falProvider) return falProvider("fal-ai/fast-sdxl")

  throw new Error("No AI model configured or available. Please check your environment variables.")
}

/**
 * Checks the status of configured AI services.
 * @returns An object indicating the availability of each AI service.
 */
export function getAIServiceStatus() {
  return {
    openai: !!openaiProvider,
    google: !!googleProvider,
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

/**
 * Generates an AI reading based on the provided options.
 * @param options - The options for generating the reading.
 * @returns A promise that resolves to the AI-generated reading, thread ID, and method used.
 */
export async function generateAIReading({
  cards,
  question,
  spreadType,
  userContext,
  threadId: existingThreadId,
}: GenerateReadingOptions): Promise<{ reading: string; threadId: string; method: string }> {
  const systemPrompt = getSystemPrompt(spreadType)
  const userPrompt = getUserPrompt(cards, question, spreadType, userContext)

  // Use OpenAI Assistant API if OPENAI_ASSISTANT_ID is configured
  if (env.OPENAI_ASSISTANT_ID) {
    let threadId = existingThreadId

    if (!threadId) {
      const thread = await createThread()
      threadId = thread.id
    }

    await addMessageToThread(threadId, userPrompt)
    const assistantResponse = await getAssistantResponse(threadId)

    return { reading: assistantResponse, threadId, method: "assistant" }
  } else if (env.OPENAI_API_KEY) {
    // Fallback to OpenAI Chat Completion API if Assistant ID is not set
    const { text } = await generateText({
      model: openai(env.OPENAI_MODEL || "gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: env.OPENAI_MAX_TOKENS || 1000,
      temperature: env.OPENAI_TEMPERATURE || 0.7,
    })
    return { reading: text, threadId: "", method: "chat_completion" }
  } else {
    throw new Error("No OpenAI API key or Assistant ID configured.")
  }
}
