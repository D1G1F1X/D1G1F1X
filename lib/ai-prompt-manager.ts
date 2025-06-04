"use server"

// Types for the card data
type Card = {
  id: string
  name: string
  element: string
  number: number
  keywords: string[]
  description: string
  isReversed?: boolean
}

type SpreadType = "single" | "three-card" | "five-card" | "celtic-cross"

// Update the generateReadingPrompt function to use the masterPromptTemplate

import { masterPromptTemplate } from "./prompt-templates"
import type { CardData } from "@/types/cards"
import { getCardPromptTemplate, getFollowUpPromptTemplate } from "@/lib/prompt-templates"

export async function generateReadingPrompt(
  cards: any[],
  question: string,
  userName: string,
  birthDate?: string,
  birthPlace?: string,
  spreadType?: string,
  isMember?: boolean,
): Promise<string> {
  // Start with the master prompt template
  let prompt = masterPromptTemplate + "\n\n"

  // Add user information
  prompt += `## Seeker Information\n`
  prompt += `Name: ${userName || "Seeker"}\n`
  if (birthDate) {
    prompt += `Birth Date: ${new Date(birthDate).toLocaleDateString()}\n`
  }
  if (birthPlace) {
    prompt += `Birth Place: ${birthPlace}\n`
  }
  prompt += `Question: ${question || "General guidance"}\n\n`

  // Add numerology information if birth date is provided
  if (birthDate) {
    const birthDateObj = new Date(birthDate)
    const lifePathNumber = await calculateLifePathNumber(birthDateObj)
    prompt += `Life Path Number: ${lifePathNumber}\n`

    // Add card number analysis
    if (cards && cards.length > 0) {
      const cardNumbers = cards.map((card) => card.number || card.cardEnd?.number).filter(Boolean)
      prompt += `Card Numbers: ${cardNumbers.join(", ")}\n`

      // Calculate numerology connections
      prompt += `\n## Numerology Connections\n`
      prompt += `Please analyze the connection between the seeker's Life Path Number (${lifePathNumber}) and the card numbers drawn (${cardNumbers.join(", ")}).\n`
      prompt += `Include insights about number patterns, resonances, and how these numbers interact with the seeker's personal numerology.\n\n`
    }
  }

  // Add spread type
  prompt += `## Reading Type\n`
  prompt += `${await getSpreadTypeName(spreadType || "")}\n\n`

  // Add cards information
  prompt += `## Cards Drawn\n`
  if (cards && cards.length > 0) {
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index]
      const position = await getPositionName(index, spreadType || "")
      const cardName = card.name || card.card?.name || "Unknown Card"
      const element = card.element || card.card?.element || "Unknown Element"
      const number = card.number || card.cardEnd?.number || "Unknown Number"
      const keywords = card.keywords || card.cardEnd?.keywords || []

      prompt += `Card ${index + 1} (${position}): ${cardName} (${element}, Number: ${number})\n`
      prompt += `Keywords: ${keywords.join(", ") || "Not provided"}\n`
      if (card.orientation || card.endUp) {
        prompt += `Orientation: ${card.orientation || card.endUp}\n`
      }
      prompt += `\n`
    }
  } else {
    prompt += `No cards provided\n\n`
  }

  // Add membership level specific instructions
  if (isMember) {
    prompt += `## Premium Reading Instructions\n`
    prompt += `This is a premium reading for a member. Please provide a more detailed and in-depth analysis with additional insights and personalized guidance.\n\n`
  }

  return prompt
}

// Function to generate a follow-up question prompt
export async function generateFollowUpPromptOld(
  originalReading: string,
  cards: Card[],
  followUpQuestion: string,
  userName: string,
  birthDate?: string,
  birthPlace?: string,
): Promise<string> {
  // Format the cards for the prompt
  const formattedCards = cards
    .map((card) => {
      const position = card.isReversed ? "reversed" : "upright"
      return `${card.name} (${position}) - Element: ${card.element}, Number: ${card.number}, Keywords: ${card.keywords.join(", ")}`
    })
    .join("\n")

  // Add birth information if available
  const birthInfo =
    birthDate || birthPlace
      ? `\nBirth Date: ${birthDate ? new Date(birthDate).toLocaleDateString() : "Not provided"}\nBirth Place: ${birthPlace || "Not provided"}`
      : ""

  const prompt = `You are NUMO ORACLE, a mystical AI oracle reader with deep knowledge of numerology, elements, and spiritual symbolism.

You previously provided this reading for ${userName}:${birthInfo}
"""
${originalReading}
"""

The cards drawn in the original spread were:
${formattedCards}

${userName} has a follow-up question: "${followUpQuestion}"

Provide a thoughtful response to this follow-up question, maintaining consistency with your original reading. Reference specific cards from the original spread where relevant. Keep the same mystical and insightful tone as the original reading.

Format your response with clear paragraphs and end with a concise piece of advice related to the follow-up question.`

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
  // Position names for different spread types
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

  // Get the positions for the requested spread type, or use generic positions
  const spreadPositions = positions[spreadType] || Array.from({ length: 10 }, (_, i) => `Position ${i + 1}`)

  // Return the position name if it exists, otherwise return a generic position name
  return index < spreadPositions.length ? spreadPositions[index] : `Position ${index + 1}`
}

// Dummy function for calculating life path number. Replace with actual implementation or import.
async function calculateLifePath(birthDate: Date): Promise<number> {
  // Replace this with your actual life path calculation logic
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()

  let sum = (await sumDigits(day)) + (await sumDigits(month)) + (await sumDigits(year))
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = await sumDigits(sum)
  }
  return sum
}

async function calculateLifePathNumber(birthDate: Date): Promise<number> {
  return await calculateLifePath(birthDate)
}

async function sumDigits(num: number): Promise<number> {
  return num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0)
}

export async function generateCardReadingPrompt(cards: CardData[], question = ""): Promise<string> {
  const template = getCardPromptTemplate()

  // Format card information
  const cardDetails = cards
    .map((card, index) => {
      return `Card ${index + 1}: ${card.name} (${card.element} - ${card.archetype})`
    })
    .join("\n")

  // Replace placeholders in the template
  let prompt = template.replace("{{CARD_COUNT}}", cards.length.toString()).replace("{{CARD_DETAILS}}", cardDetails)

  // Add question context if provided
  if (question && question.trim()) {
    prompt = prompt.replace(
      "{{QUESTION_CONTEXT}}",
      `The querent has asked: "${question}". Please address this specific question in your reading.`,
    )
  } else {
    prompt = prompt.replace("{{QUESTION_CONTEXT}}", "")
  }

  return prompt
}

export async function generateFollowUpPrompt(originalReading: string, followUpQuestion: string): Promise<string> {
  const template = getFollowUpPromptTemplate()

  return template.replace("{{ORIGINAL_READING}}", originalReading).replace("{{FOLLOW_UP_QUESTION}}", followUpQuestion)
}
