import type { OracleCard } from "@/types/cards"
import { getSymbolValue } from "@/lib/card-data-access"
import { getNumerologyReport } from "@/lib/numerology"
import { numoNumberDefinitions } from "@/data/numo-definitions" // Changed import name

interface UserContext {
  fullName?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  isMember: boolean
}

export function generateReadingPrompt(
  cards: OracleCard[],
  question: string,
  spreadType: string,
  userContext: UserContext,
): string {
  let prompt = `You are the NUMO Oracle, a wise and mystical AI designed to provide insightful readings based on the NUMO Oracle Card Deck. Your purpose is to offer guidance, clarity, and deeper understanding to users seeking answers to their questions. You will interpret the drawn cards within the context of the user's question and the chosen spread type, weaving together the symbolism of each card to form a cohesive and meaningful narrative.

When generating a reading, consider the following:
- The individual symbolism of each card (number, suit, base element, planet, astrology, icon, orientation, sacred geometry, synergistic element, key meanings).
- How the cards interact with each other within the chosen spread positions.
- The user's specific question.
- The user's provided context (name, birth date, etc.) to personalize the reading where appropriate.
- The overall theme and energy of the spread.
- Maintain a mystical, insightful, and supportive tone.
- Readings should be comprehensive, typically between 300-600 words, unless the spread is very simple (e.g., single card).
- Conclude with a summary or actionable insight.

Here is the NUMO Oracle Card data and definitions you should reference:
${JSON.stringify(numoNumberDefinitions, null, 2)}

---

User's Question: "${question}"
Spread Type: "${spreadType}"

`

  if (userContext.fullName || userContext.birthDate || userContext.birthPlace) {
    prompt += `User Context:\n`
    if (userContext.fullName) prompt += `- Full Name: ${userContext.fullName}\n`
    if (userContext.birthDate) prompt += `- Birth Date: ${userContext.birthDate}\n`
    if (userContext.birthTime) prompt += `- Birth Time: ${userContext.birthTime}\n`
    if (userContext.birthPlace) prompt += `- Birth Place: ${userContext.birthPlace}\n`

    // Integrate numerology if birth date is available
    if (userContext.birthDate) {
      try {
        const numerologyReport = getNumerologyReport(new Date(userContext.birthDate), userContext.fullName || "User")
        prompt += `\nBased on the user's birth date, their core numerology insights are:\n`
        prompt += `- Life Path Number: ${numerologyReport.lifePath.number} - ${numerologyReport.lifePath.meaning}\n`
        prompt += `- Destiny Number: ${numerologyReport.destiny.number} - ${numerologyReport.destiny.meaning}\n`
        prompt += `- Soul Urge Number: ${numerologyReport.soulUrge.number} - ${numerologyReport.soulUrge.meaning}\n`
        prompt += `- Personality Number: ${numerologyReport.personality.number} - ${numerologyReport.personality.meaning}\n`
        prompt += `Consider these numerological influences when interpreting the cards.\n\n`
      } catch (e) {
        console.error("Error generating numerology report for prompt:", e)
        prompt += `(Could not generate numerology report due to invalid birth date or name.)\n\n`
      }
    }
  }

  prompt += `Drawn Cards for the "${spreadType}" spread:\n`
  cards.forEach((card, index) => {
    prompt += `\nCard ${index + 1} (${getSymbolValue(card, "Orientation") || "Upright"}): ${card.fullTitle}\n`
    prompt += `  - Number: ${card.number}\n`
    prompt += `  - Suit: ${card.suit}\n`
    prompt += `  - Base Element: ${card.baseElement}\n`
    prompt += `  - Synergistic Element: ${card.synergisticElement}\n` // Corrected access
    prompt += `  - Planet (Internal Influence): ${card.planetInternalInfluence}\n` // Corrected access
    prompt += `  - Astrology (External Domain): ${card.astrologyExternalDomain}\n` // Corrected access
    prompt += `  - Icon: ${card.iconSymbol}\n` // Corrected access
    prompt += `  - Sacred Geometry: ${card.sacredGeometry}\n` // Corrected access
    prompt += `  - Key Meanings: ${card.keyMeanings.join("; ")}\n`
    prompt += `  - Symbolism Breakdown: ${card.symbolismBreakdown.join(" ")}\n`
  })

  prompt += `\n\nNow, provide a comprehensive NUMO Oracle reading for the user's question, integrating the symbolism of the drawn cards within the "${spreadType}" spread, and considering the user's context. Structure your response clearly, addressing each card's position and then providing an overall interpretation and actionable advice.`

  return prompt
}

/**
 * Returns a user-friendly name for a given spread type.
 * This is a placeholder function.
 * @param spreadType The internal spread type identifier.
 * @returns A human-readable name for the spread type.
 */
export function getSpreadTypeName(spreadType: string): string {
  switch (spreadType) {
    case "single-card":
      return "Single Card Reading"
    case "three-card":
      return "Three Card Spread"
    case "celtic-cross":
      return "Celtic Cross Spread"
    case "elemental-spread":
      return "Elemental Spread"
    default:
      return spreadType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + " Reading"
  }
}
