import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"
import type { DrawnCardForAI, UserContext, SpreadType } from "@/types/cards"
import type { StreamResult } from "ai"

/**
 * Generates a detailed NUMO Oracle reading based on drawn cards, user context, and a question.
 * This function constructs a comprehensive prompt for the AI model.
 * @param drawnCards An array of drawn cards, including their orientation.
 * @param question The user's question for the reading.
 * @param spreadType The type of spread used (e.g., "Three Card Spread", "Celtic Cross").
 * @param userContext User-specific information like name, birth date, etc.
 * @returns A StreamResult object from the AI SDK for streaming the reading.
 */
export async function generateReading(
  drawnCards: DrawnCardForAI[],
  question: string,
  spreadType: SpreadType,
  userContext: UserContext,
): Promise<StreamResult> {
  const cardDetails = drawnCards
    .map((dc, index) => {
      const card = dc.card
      const activeEnd = dc.endUp === "first" ? card.firstEnd : card.secondEnd
      const orientationDisplay = activeEnd?.orientation || card.orientation || "Upright" // Fallback to card.orientation if specific end orientation is missing

      return `
Card ${index + 1} (${spreadType.positions[index]}):
  Title: ${card.fullTitle}
  Number: ${card.number}
  Suit: ${card.suit}
  Base Element: ${card.baseElement}
  Synergistic Element: ${card.synergisticElement}
  Orientation: ${orientationDisplay}
  Key Meanings: ${card.keyMeanings.join(", ")}
  Specific Meaning for this Orientation: ${activeEnd?.meaning || "No specific meaning provided for this orientation."}
  Keywords for this Orientation: ${activeEnd?.keywords?.join(", ") || "No keywords provided."}
  Planet Influence: ${card.planetInternalInfluence}
  Astrology Domain: ${card.astrologyExternalDomain}
  Icon Symbol: ${card.iconSymbol}
  Sacred Geometry: ${card.sacredGeometry}
`
    })
    .join("\n---\n")

  const userProfileInfo = `
User Profile:
  Full Name: ${userContext.fullName || "Not provided"}
  Birth Date: ${userContext.birthDate || "Not provided"}
  Birth Time: ${userContext.birthTime || "Not provided"}
  Birth Place: ${userContext.birthPlace || "Not provided"}
  Membership Status: ${userContext.isMember ? "Member" : "Guest"}
`

  const systemPrompt = `You are the NUMO Oracle, a wise and mystical guide. Your purpose is to provide insightful, compassionate, and comprehensive readings based on the NUMO Oracle cards drawn and the user's question.
  
  Follow these guidelines for your reading:
  1.  **Structure**: Start with an introduction, then interpret each card in its position within the spread, and conclude with a summary and actionable advice.
  2.  **Tone**: Maintain a mystical, encouraging, and insightful tone.
  3.  **Depth**: Connect the card's symbolism, elements, numbers, and orientation to the user's question and life context.
  4.  **Clarity**: Explain how each card's meaning contributes to the overall message of the spread.
  5.  **Actionable Advice**: Offer practical, empowering guidance based on the reading.
  6.  **Length**: Provide a detailed reading, aiming for a comprehensive response that feels complete and valuable.
  7.  **Format**: Use clear paragraphs and line breaks for readability. Do NOT use markdown headings (e.g., #, ##) within the reading itself, as it will be rendered in a pre-formatted block.
  8.  **Focus**: Directly address the user's question using the insights from the cards.
  9.  **Avoid Repetition**: Do not simply list the card's properties again; integrate them into the interpretation.
  10. **No Disclaimers**: Do not include disclaimers about the reading being for entertainment purposes.
  11. **No External Information**: Base the reading solely on the provided card data and user context.
  `

  const userPrompt = `
I have drawn the following NUMO Oracle cards for a "${spreadType.name}" spread in response to my question. Please provide a comprehensive reading.

My Question: "${question}"

${userProfileInfo}

Drawn Cards:
${cardDetails}

Please provide the reading now, focusing on how these cards answer my question within the context of the "${spreadType.name}" spread.
`

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userPrompt },
  ]

  return aiServiceManager.streamText(messages)
}
