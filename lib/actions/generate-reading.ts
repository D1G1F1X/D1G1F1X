"use server"

import { generateCardReadingPrompt, generateReadingPrompt } from "@/lib/ai-prompt-manager"
import { getGeminiResponse } from "@/lib/gemini"
import type { CardData } from "@/types/cards"

// Import the new optimization utilities
import { cachedRequest, retryWithBackoff } from "@/lib/api-optimizer"
import { tryAsync } from "@/lib/error-handler"

// Optimize the generateReading function
export async function generateReading(
  drawnCards: { card: any; endUp: "first" | "second" }[],
  question: string,
  spreadType: any = null,
): Promise<string> {
  // Use the cached request utility
  return await tryAsync(
    async () => {
      // Try to get a cached reading first using the cachedRequest utility
      const cacheKey = `reading:${JSON.stringify(drawnCards)}:${question}:${spreadType?.id || "single"}`

      return await cachedRequest(cacheKey, async () => {
        // Format the cards for the prompt
        const formattedCards = drawnCards.map((drawnCard, index) => {
          const { card, endUp } = drawnCard
          const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
          const position = spreadType?.positions?.[index]?.name || `Position ${index + 1}`

          return {
            name: card.name,
            number: cardEnd.number,
            element: card.element,
            type: card.type,
            meaning: cardEnd.meaning,
            position,
          }
        })

        // Generate the prompt using our AI prompt manager
        const prompt = await generateReadingPrompt(formattedCards, question, spreadType)

        // Use retry with backoff for reliability
        const aiResponse = await retryWithBackoff(
          async () => await getGeminiResponse(prompt),
          3, // max retries
          500, // base delay
        )

        if (!aiResponse) {
          throw new Error("Failed to generate AI response")
        }

        // Cache the successful response is handled by cachedRequest
        return aiResponse
      })
    },
    createFallbackReading(drawnCards, question, spreadType),
  )
}

// Add a helper function to create fallback readings
function createFallbackReading(
  drawnCards: { card: any; endUp: "first" | "second" }[],
  question: string,
  spreadType: any,
): string {
  // Create a simple reading based on the card meanings
  let reading = `# Reading for: "${question || "General Guidance"}"\n\n`

  drawnCards.forEach((drawnCard, index) => {
    const { card, endUp } = drawnCard
    const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
    const position = spreadType?.positions?.[index]?.name || `Position ${index + 1}`

    reading += `## ${position}: ${card.name} (${cardEnd.number})\n\n`
    reading += `${cardEnd.meaning}\n\n`

    if (cardEnd.keywords && cardEnd.keywords.length > 0) {
      reading += `**Keywords**: ${cardEnd.keywords.join(", ")}\n\n`
    }
  })

  reading +=
    "This reading was generated from the core meanings of your cards. For a more personalized interpretation, please try again later."

  return reading
}

// Optimize the generateCardReading function
export async function generateCardReading(cards: CardData[], question = "") {
  return await tryAsync(
    async () => {
      // Create a cache key based on the cards and question
      const cacheKey = `card-reading:${cards.map((c) => c.id).join(",")}:${question}`

      // Use the cachedRequest utility
      return await cachedRequest(cacheKey, async () => {
        // Generate the prompt for the AI
        const prompt = await generateCardReadingPrompt(cards, question)

        // Use retry with backoff for reliability
        const reading = await retryWithBackoff(
          async () => await getGeminiResponse(prompt),
          3, // max retries
          500, // base delay
        )

        return {
          success: true,
          reading,
          cached: false,
        }
      })
    },
    {
      success: false,
      error: "Failed to generate reading. Please try again.",
    },
  )
}
