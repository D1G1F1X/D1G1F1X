import { GoogleGenerativeAI, type GenerativeModel, type Content } from "@google/generative-ai"

let genAI: GoogleGenerativeAI | null = null
let model: GenerativeModel | null = null

export function initializeGemini(apiKey: string, modelName = "gemini-pro") {
  try {
    genAI = new GoogleGenerativeAI(apiKey)
    model = genAI.getModel({ model: modelName })
    return { success: true, error: null }
  } catch (error) {
    console.error("Error initializing Gemini in lib/gemini:", error)
    return { success: false, error: `Failed to initialize Gemini: ${(error as Error).message}` }
  }
}

export async function listAvailableModels() {
  try {
    // Ensure genAI is initialized
    if (!genAI) {
      console.error("Gemini AI client not initialized in listAvailableModels.")
      return { models: ["gemini-1.5-flash-latest"], error: "Gemini AI client not initialized." } // Fallback
    }
    // Check if the method exists before calling
    if (typeof genAI.listGenerativeModels !== "function") {
      console.error(
        "genAI.listGenerativeModels is not a function. SDK might have changed or not initialized correctly.",
      )
      return { models: ["gemini-1.5-flash-latest"], error: "Gemini SDK error: listGenerativeModels not available." } // Fallback
    }
    const result = await genAI.listGenerativeModels() // API call
    const models = result.models.map((model) => ({
      name: model.name,
      version: model.version,
      description: model.description,
      inputTokenLimit: model.inputTokenLimit,
      outputTokenLimit: model.outputTokenLimit,
      supportedGenerationMethods: model.supportedGenerationMethods,
    }))
    return { models: models, error: null }
  } catch (error) {
    console.error("Error listing Gemini models (lib/gemini.ts):", error)
    return { models: ["gemini-1.5-flash-latest"], error: `Failed to list models: ${(error as Error).message}` } // Fallback in case of other errors
  }
}

export async function generateTextFromModel(prompt: string, history?: Content[]) {
  try {
    if (!model) {
      console.warn("Gemini model not initialized. Cannot generate text.")
      return { text: "", error: "Gemini model not initialized." }
    }

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(prompt) // API call

    let text = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      if (chunkText) {
        text += chunkText
      }
    }
    return { text, error: null }
  } catch (error) {
    console.error("Error generating text from Gemini in lib/gemini:", error)
    return { text: "", error: `Failed to generate text: ${(error as Error).message}` }
  }
}

export async function generateFollowUp(prompt: string, history: Content[]) {
  try {
    if (!model) {
      console.warn("Gemini model not initialized. Cannot generate follow-up.")
      return { text: "", error: "Gemini model not initialized." }
    }

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(prompt) // API call

    let text = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      if (chunkText) {
        text += chunkText
      }
    }
    return { text, error: null }
  } catch (error) {
    console.error("Error generating follow-up from Gemini in lib/gemini:", error)
    return { text: "", error: `Failed to generate follow-up: ${(error as Error).message}` }
  }
}
