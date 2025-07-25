// lib/openai-assistant.ts
// This file provides functions for interacting with an OpenAI Assistant,
// including managing conversations and generating follow-up questions.

import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createStreamableValue } from "ai/rsc"

export interface Message {
  role: "user" | "assistant" | "system" | "tool"
  content: string
}

/**
 * Continues a conversation with the OpenAI assistant, streaming the response.
 * @param history The conversation history.
 * @param systemPrompt An optional system prompt to guide the assistant's behavior.
 * @returns An object containing the updated messages and a streamable value for the new message.
 */
export async function continueConversation(history: Message[], systemPrompt?: string) {
  const stream = createStreamableValue()
  ;(async () => {
    try {
      const { textStream } = await streamText({
        model: openai(process.env.OPENAI_MODEL || "gpt-4o"), // Use model from env or default
        system: systemPrompt || "You are a helpful assistant.",
        messages: history,
        maxTokens: Number.parseInt(process.env.OPENAI_MAX_TOKENS || "1024"),
        temperature: Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
      })

      for await (const text of textStream) {
        stream.update(text)
      }
      stream.done()
    } catch (error) {
      console.error("Error in continueConversation:", error)
      stream.error(error)
    }
  })()

  return {
    messages: history, // Return the history as is, new message will be streamed
    newMessage: stream.value,
  }
}

/**
 * Generates a follow-up question based on the last message in the conversation.
 * This is a simplified example and can be enhanced with more sophisticated logic.
 * @param lastMessage The last message in the conversation.
 * @returns A generated follow-up question.
 */
export async function generateFollowUpQuestion(lastMessage: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o"),
      prompt: `Based on the following statement, generate a concise and relevant follow-up question. Do not provide any other text, just the question.
      Statement: "${lastMessage}"
      Follow-up question:`,
      maxTokens: 50,
      temperature: 0.8,
    })
    return text.trim()
  } catch (error) {
    console.error("Error generating follow-up question:", error)
    return "Is there anything else I can help you with?"
  }
}
