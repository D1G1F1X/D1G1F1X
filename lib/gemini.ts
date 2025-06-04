import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Import the new optimization utilities
import { tryAsync } from "@/lib/error-handler"
import { retryWithBackoff } from "@/lib/api-optimizer"

// Initialize the Google AI API with the API key from environment variables
const API_KEY = process.env.GOOGLE_AI_API_KEY

if (!API_KEY) {
  console.warn("GOOGLE_AI_API_KEY is not set. Gemini API calls will likely fail.")
}

const genAI = new GoogleGenerativeAI(API_KEY || "") // Provide empty string if API_KEY is undefined to avoid constructor error, though calls will fail.

// Safety settings to prevent harmful content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

/**
 * Lists available Gemini models
 */
export async function listAvailableModels(): Promise<string[]> {
  if (!API_KEY) {
    console.error("Cannot list models: GOOGLE_AI_API_KEY is not set.")
    return []
  }
  try {
    const models = await genAI.listGenerativeModels()
    return models.map((model) => model.name)
  } catch (error) {
    console.error("Error listing Gemini models:", error)
    throw error
  }
}

// Optimize the generateGeminiReading function
export async function generateGeminiReading(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "Error: GOOGLE_AI_API_KEY is not configured."
  }
  return await tryAsync(async () => {
    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // Using a common, updated model name
      safetySettings,
    })

    // Use retry with backoff for reliability
    const result = await retryWithBackoff(
      async () => await model.generateContent(prompt),
      3, // max retries
      500, // base delay
    )

    const response = result.response
    const text = response.text()

    return text
  }, "I apologize, but I'm unable to generate a reading at this time. Please try again later.")
}

/**
 * Generate a follow-up response using Google's Gemini API
 */
export async function generateFollowUpResponse(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "Error: GOOGLE_AI_API_KEY is not configured."
  }
  try {
    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // Using a common, updated model name
      safetySettings,
    })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating follow-up response with Gemini:", error)
    throw new Error(`Failed to generate follow-up response: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Optimize the getGeminiResponse function
export async function getGeminiResponse(prompt: string, modelName = "gemini-1.5-flash-latest"): Promise<string> {
  if (!API_KEY) {
    return "Error: GOOGLE_AI_API_KEY is not configured."
  }
  return await tryAsync(async () => {
    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings,
    })

    // Use retry with backoff for reliability
    const result = await retryWithBackoff(
      async () => await model.generateContent(prompt),
      3, // max retries
      500, // base delay
    )

    const response = result.response
    const text = response.text()

    return text
  }, "I apologize, but I'm unable to generate a response at this time. Please try again later.")
}
