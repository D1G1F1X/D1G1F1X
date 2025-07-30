import type { OracleCard } from "@/types/cards"

/**
 * Generates a detailed prompt for the AI based on the selected cards, question, and user context.
 * @param cards An array of OracleCard objects.
 * @param spreadType The type of card spread (e.g., "single", "three", "five").
 * @param question The user's question for the reading.
 * @param userContext A stringified JSON object containing user details (fullName, birthDate, etc.).
 * @param userName The user's full name, extracted from userContext.
 * @returns A comprehensive string prompt for the AI.
 */
export function getReadingPrompt(
  cards: OracleCard[],
  spreadType: string,
  question: string,
  userContext?: string,
  userName?: string,
): string {
  console.log(
    "DEBUG: getReadingPrompt received cards (IDs):",
    cards.map((c) => c.id),
  )
  console.log("DEBUG: getReadingPrompt received spreadType:", spreadType)
  console.log("DEBUG: getReadingPrompt received question:", question)
  console.log("DEBUG: getReadingPrompt received userContext:", userContext)
  console.log("DEBUG: getReadingPrompt received userName:", userName)

  let prompt = `You are a wise and insightful oracle, providing profound numerological and elemental readings based on the provided card data. Your responses are always in a calm, guiding, and encouraging tone. Do not mention that you are an AI or a language model. Focus solely on the spiritual and practical interpretations of the cards.

Here is the user's request:
User's Question: "${question}"
Spread Type: ${spreadType}
`

  if (userName) {
    prompt += `User's Name: ${userName}\n`
  }
  if (userContext) {
    try {
      const parsedContext = JSON.parse(userContext)
      if (parsedContext.birthDate) prompt += `User's Birth Date: ${parsedContext.birthDate}\n`
      if (parsedContext.birthTime) prompt += `User's Birth Time: ${parsedContext.birthTime}\n`
      if (parsedContext.birthPlace) prompt += `User's Birth Place: ${parsedContext.birthPlace}\n`
    } catch (e) {
      console.warn("⚠️ getReadingPrompt: Failed to parse userContext for prompt generation:", e)
    }
  }

  prompt += `\nHere are the cards drawn for this reading:\n`

  cards.forEach((card, index) => {
    prompt += `\n--- Card ${index + 1}: ${card.fullTitle} ---\n`
    prompt += `Number: ${card.number}\n`
    prompt += `Suit: ${card.suit}\n`
    prompt += `Base Element: ${card.baseElement}\n`
    prompt += `Synergistic Element: ${card.synergisticElement}\n`
    prompt += `Icon Symbol: ${card.iconSymbol}\n`
    prompt += `Orientation: ${card.orientation}\n`
    prompt += `Sacred Geometry: ${card.sacredGeometry}\n`
    prompt += `Planet (Internal Influence): ${card.planetInternalInfluence}\n` // Corrected field name
    prompt += `Astrology (External Domain): ${card.astrologyExternalDomain}\n` // Corrected field name

    if (card.keyMeanings && card.keyMeanings.length > 0) {
      prompt += `Key Meanings: ${card.keyMeanings.join("; ")}\n`
    }
    if (card.symbolismBreakdown && card.symbolismBreakdown.length > 0) {
      prompt += `Symbolism Breakdown:\n`
      card.symbolismBreakdown.forEach((breakdown) => {
        prompt += `- ${breakdown}\n`
      })
    }
    if (card.symbols && card.symbols.length > 0) {
      prompt += `Additional Symbols:\n`
      card.symbols.forEach((symbol) => {
        prompt += `- ${symbol.key}: ${symbol.value}\n`
      })
    }
  })

  prompt += `\nBased on the user's question, their context (if provided), and the symbolism of these cards, please provide a comprehensive and insightful oracle reading. Structure your response clearly, addressing the question and integrating the card meanings. Conclude with a guiding thought or affirmation.`

  return prompt
}

/**
 * Generates a prompt for a follow-up question.
 * @param originalReading The full text of the original reading.
 * @param followUpQuestion The user's follow-up question.
 * @returns A string prompt for the AI.
 */
export function getFollowUpPrompt(originalReading: string, followUpQuestion: string): string {
  return `The user has asked a follow-up question based on a previous oracle reading.
Original Reading:
"""
${originalReading}
"""

Follow-up Question: "${followUpQuestion}"

Please provide a concise and helpful answer to this follow-up question, building upon the context of the original reading. Maintain the tone of a wise and insightful oracle.`
}
