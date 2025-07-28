"use server"

// Types for the card data
import type { OracleCard } from "@/components/card-simulator" // Use OracleCard from CardSimulator
import { masterPromptTemplate } from "./prompt-templates"
import { calculateLifePath } from "@/lib/numerology" // Import the actual numerology function

// Helper function to calculate Sun Sign
function calculateSunSign(birthDate: Date): string {
  const month = birthDate.getMonth() + 1 // getMonth() is 0-indexed
  const day = birthDate.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"
  return "Unknown"
}

export async function generateReadingPrompt(
  selectedCards: OracleCard[], // Use OracleCard type
  question: string,
  fullName: string,
  birthDate?: string,
  birthPlace?: string,
  spreadType?: string,
  isMember?: boolean,
): Promise<string> {
  // Start with the master prompt template (system instructions)
  let prompt = masterPromptTemplate + "\n\n"

  // Add user information
  prompt += `## Seeker Information\n`
  prompt += `Name: ${fullName || "Seeker"}\n`
  if (birthDate) {
    const birthDateObj = new Date(birthDate)
    prompt += `Birth Date: ${birthDateObj.toLocaleDateString()}\n`
    // Numerology Engine
    const lifePathNumber = calculateLifePath(birthDateObj)
    prompt += `Life Path Number: ${lifePathNumber}\n`
    // Astrology Engine (Sun Sign)
    const sunSign = calculateSunSign(birthDateObj)
    prompt += `Sun Sign: ${sunSign}\n`
  }
  if (birthPlace) {
    prompt += `Birth Place: ${birthPlace}\n`
  }
  prompt += `Question: ${question || "General guidance"}\n\n`

  // Add spread type
  prompt += `## Reading Type\n`
  prompt += `${await getSpreadTypeName(spreadType || "single")}\n\n`

  // Add cards information (drawing on "vector store" knowledge by providing full card data)
  prompt += `## Cards Drawn and Their Full Data (Act as your vector store knowledge)\n`
  if (selectedCards && selectedCards.length > 0) {
    for (let index = 0; index < selectedCards.length; index++) {
      const card = selectedCards[index]
      const position = await getPositionName(index, spreadType || "single")

      prompt += `--- Card ${index + 1} (${position}) ---\n`
      prompt += `ID: ${card.id}\n`
      prompt += `Full Title: ${card.fullTitle}\n`
      prompt += `Number: ${card.number}\n`
      prompt += `Suit: ${card.suit}\n`
      prompt += `Base Element: ${card.baseElement}\n`
      prompt += `Synergistic Element: ${card.synergisticElement}\n`
      prompt += `Icon Symbol: ${card.iconSymbol}\n`
      prompt += `Orientation: ${card.orientation}\n`
      prompt += `Sacred Geometry: ${card.sacredGeometry}\n`
      prompt += `Planet (Internal Influence): ${card.planetInternalInfluence}\n`
      prompt += `Astrology (External Domain): ${card.astrologyExternalDomain}\n`
      prompt += `Key Meanings: ${card.keyMeanings.join("; ")}\n`
      prompt += `Symbolism Breakdown:\n`
      card.symbolismBreakdown.forEach((item) => {
        prompt += `- ${item}\n`
      })
      prompt += `\n`
    }
  } else {
    prompt += `No cards provided.\n\n`
  }

  // Add membership level specific instructions
  if (isMember) {
    prompt += `## Premium Reading Instructions\n`
    prompt += `This is a premium reading for a member. Please provide a more detailed and in-depth analysis with additional insights and personalized guidance. Focus on deeper connections between numerology, astrology, and card symbolism.\n\n`
  }

  // Explicit instruction for output format
  prompt += `## Output Format Instructions\n`
  prompt += `Please structure your reading as follows, using Markdown for clear formatting:\n`
  prompt += `\n✨ **Summary Insight**\n[A concise overview of the reading's core message.]\n`
  prompt += `\n🔢 **Numerology Interpretation**\n[Insights based on the seeker's Life Path Number and any significant card numbers.]\n`
  prompt += `\n♈ **Astrology Influence**\n[Interpretation based on the seeker's Sun Sign and any relevant planetary/astrological influences from the cards.]\n`
  prompt += `\n🃏 **Card Spread with Elemental Meanings**\n[Detailed interpretation of each drawn card in its position, emphasizing elemental tone, symbol meaning, and number patterns. Integrate the full card data provided above.]\n`
  prompt += `\n🌱 **Personalized Recommendation**\n[Clear, actionable guidance including practices, mindset shifts, and suggested timing. Optionally suggest further reading, affirmations, or elemental associations.]\n`
  prompt += `\nAlways invite follow-up for deeper inquiry or clarity at the end of your response.`

  return prompt
}

// Helper function to get a human-readable name for the spread type
export async function getSpreadTypeName(spreadType: string): Promise<string> {
  const spreadTypeNames: Record<string, string> = {
    single: "Single Card Reading",
    three: "Three Card Reading (Past-Present-Future)",
    five: "Five Elements Reading",
    celtic: "Celtic Cross Reading",
    relationship: "Relationship Reading",
    career: "Career Path Reading",
    decision: "Decision Making Reading",
  }

  return spreadTypeNames[spreadType] || "Custom Reading"
}

// Helper function to get the position name based on the index and spread type
export async function getPositionName(index: number, spreadType: string): Promise<string> {
  const positions: Record<string, string[]> = {
    single: ["Guidance"],
    three: ["Past", "Present", "Future"],
    five: ["Center (Spirit)", "East (Air)", "South (Fire)", "West (Water)", "North (Earth)"],
    celtic: [
      "Present",
      "Challenge",
      "Foundation",
      "Recent Past",
      "Potential",
      "Near Future",
      "Self",
      "Environment",
      "Hopes/Fears",
      "Outcome",
    ],
    relationship: ["You", "Partner", "Connection", "Challenge", "Potential", "Guidance"],
    career: ["Current Situation", "Strengths", "Challenges", "Hidden Factors", "Next Steps", "Long-term Potential"],
    decision: ["Current Situation", "Option A", "Option B", "Key Factor", "Guidance"],
  }

  const spreadPositions = positions[spreadType] || Array.from({ length: 10 }, (_, i) => `Position ${i + 1}`)
  return index < spreadPositions.length ? spreadPositions[index] : `Position ${index + 1}`
}
