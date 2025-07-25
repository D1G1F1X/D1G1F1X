import type { OracleCard } from "@/types/cards"

export function getSpreadTypeName(spreadType: string): string {
  switch (spreadType) {
    case "single":
      return "Single Card Reading"
    case "three-card":
      return "Three Card Spread"
    case "five-card":
      return "Five Card Spread"
    case "celtic-cross":
      return "Celtic Cross Spread"
    default:
      return "Custom Spread"
  }
}

export function generateReadingPrompt(question: string, spreadType: string, cards: OracleCard[]): string {
  const spreadName = getSpreadTypeName(spreadType)

  let prompt = `You are an oracle card reader. Provide an insightful and spiritual reading based on the user's question, the chosen spread, and the specific cards drawn. Focus on guidance, reflection, and personal growth.

User's Question: "${question}"
Spread Type: ${spreadName}

Cards Drawn:`

  cards.forEach((card, index) => {
    prompt += `\nCard ${index + 1}: ${card.fullTitle} (${card.orientation || "Upright"})`
    prompt += `\n  - Key Meanings: ${card.keyMeanings.join("; ")}`
    prompt += `\n  - Symbolism Breakdown: ${card.symbolismBreakdown.join("; ")}`
    prompt += `\n  - Base Element: ${card.baseElement}`
    if (card.synergisticElement) {
      prompt += `\n  - Synergistic Element: ${card.synergisticElement}`
    }
    prompt += `\n  - Internal Influence (Planet): ${card.planetInternalInfluence}`
    prompt += `\n  - External Domain (Astrology): ${card.astrologyExternalDomain}`
  })

  prompt += `\n\nBased on this information, provide a comprehensive oracle reading. Structure your response with an introduction, a section for each card's interpretation in the context of the question and spread, and a concluding summary with actionable advice. The tone should be mystical, encouraging, and wise. Do not explicitly mention "AI" or "model".`

  return prompt
}

export function generateFollowUpPrompt(
  originalQuestion: string,
  originalReading: string,
  followUpQuestion: string,
): string {
  return `The user previously asked: "${originalQuestion}"
You provided the following reading:
"${originalReading}"

Now, the user has a follow-up question: "${followUpQuestion}"

Please provide a concise and helpful answer to this follow-up question, building upon the previous reading. Keep your response focused and directly address the new query. Maintain the mystical and wise tone.`
}
