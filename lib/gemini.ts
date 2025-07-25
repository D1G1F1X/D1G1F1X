// lib/gemini.ts
// This file provides functions for interacting with Google Gemini AI models.

import { generateText, streamText } from "ai"
import { google } from "@ai-sdk/google"

export interface GeminiModelOptions {
  model?: string // e.g., "gemini-pro", "gemini-1.5-flash"
  temperature?: number
  maxTokens?: number
}

/**
 * Generates text using a Google Gemini model.
 * @param prompt The input prompt for text generation.
 * @param options Optional configuration for the Gemini model.
 * @returns A promise that resolves to the generated text.
 */
export async function generateTextWithGemini(prompt: string, options?: GeminiModelOptions): Promise<string> {
  try {
    const model = google(options?.model || "gemini-pro") // Default to gemini-pro
    const { text } = await generateText({
      model: model,
      prompt: prompt,
      temperature: options?.temperature || 0.7,
      maxTokens: options?.maxTokens || 1024,
    })
    return text
  } catch (error) {
    console.error("Error generating text with Gemini:", error)
    throw new Error(`Failed to generate text with Gemini: ${error.message}`)
  }
}

/**
 * Streams text using a Google Gemini model.
 * @param prompt The input prompt for text streaming.
 * @param options Optional configuration for the Gemini model.
 * @param onChunk Callback function to handle each streamed chunk.
 * @returns A promise that resolves when streaming is complete.
 */
export async function streamTextWithGemini(
  prompt: string,
  options?: GeminiModelOptions,
  onChunk?: (chunk: { type: "text-delta"; text: string }) => void,
): Promise<string> {
  try {
    const model = google(options?.model || "gemini-pro") // Default to gemini-pro
    const result = streamText({
      model: model,
      prompt: prompt,
      temperature: options?.temperature || 0.7,
      maxTokens: options?.maxTokens || 1024,
      onChunk: onChunk,
    })

    let fullText = ""
    for await (const chunk of result.textStream) {
      fullText += chunk
    }
    return fullText
  } catch (error) {
    console.error("Error streaming text with Gemini:", error)
    throw new Error(`Failed to stream text with Gemini: ${error.message}`)
  }
}

/**
 * Lists available Google Gemini models.
 * This is a mock function as the AI SDK doesn't directly expose a model listing API.
 * In a real scenario, you might query Google Cloud's API directly or maintain a local list.
 * @returns A promise that resolves to an array of available model names.
 */
export async function listGeminiModels(): Promise<string[]> {
  // This is a simplified mock. In a real application, you'd use Google Cloud's API to list models.
  await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate API call delay
  return ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro"]
}
