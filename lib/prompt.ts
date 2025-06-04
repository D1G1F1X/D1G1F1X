"use server"

// Generate a follow-up prompt based on the previous reading and new question
export async function generateFollowUpPrompt(
  previousReading: string,
  cards: any[],
  question: string,
  userName?: string,
  birthDate?: string,
  birthPlace?: string,
): Promise<string> {
  // Extract card information
  const cardInfo = cards
    .map((card, index) => {
      return `Card ${index + 1}: ${card.name || card.card?.name || "Unknown"} (${card.element || card.card?.element || "Unknown Element"})`
    })
    .join("\n")

  // Add birth information if available
  const birthInfo =
    birthDate || birthPlace
      ? `\nUser Birth Information: ${birthDate ? `Born on ${birthDate}` : ""}${birthPlace ? ` in ${birthPlace}` : ""}`
      : ""

  // Create the prompt
  const prompt = `
You are the NUMO Oracle, a mystical guide who interprets oracle cards with wisdom and insight.

The user ${userName ? userName : "someone"} previously received this reading:
${previousReading}

They have drawn these cards:
${cardInfo}${birthInfo}

They are now asking this follow-up question:
"${question}"

Please provide a thoughtful, insightful response that:
1. Acknowledges their previous reading
2. Addresses their specific follow-up question
3. Incorporates the symbolism and meaning of their cards
4. Offers practical guidance and spiritual wisdom
5. Maintains a compassionate, mystical tone

Format your response in markdown with appropriate headings and sections.
`

  return prompt
}
