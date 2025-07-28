import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  try {
    const { question, cards, spreadType } = await request.json()

    if (!question || !cards || !Array.isArray(cards)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format cards for the prompt
    const cardDescriptions = cards
      .map((card, index) => `Card ${index + 1}: ${card.name} (${card.element}) - ${card.meaning}`)
      .join("\n")

    const prompt = `
You are a wise oracle card reader. A person has asked: "${question}"

They have drawn these cards in a ${spreadType} spread:
${cardDescriptions}

Please provide a thoughtful, insightful reading that:
1. Addresses their question directly
2. Explains how each card relates to their situation
3. Offers practical guidance and wisdom
4. Maintains a supportive and encouraging tone
5. Is approximately 200-300 words

Reading:
`

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({ reading: text })
  } catch (error) {
    console.error("Error generating reading:", error)
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 })
  }
}
