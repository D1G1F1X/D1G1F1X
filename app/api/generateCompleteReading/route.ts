import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading } from "@/lib/openai-assistant"

// ---------- helper: simple fallback -----------------
function generateFallbackReading(cards: any[], question: string, fullName: string, spreadType: string): string {
  const personalizedGreeting = fullName ? `Dear ${fullName.split(" ")[0]}, your` : "Your"
  let readingText = `${personalizedGreeting} reading reveals:\n\n`

  cards.forEach((card: any, index: number) => {
    readingText += `Card ${index + 1}: ${card.fullTitle}\n`
    readingText += `Elements: ${card.baseElement} ⚡ ${card.synergisticElement}\n`
    readingText += `Sacred Geometry: ${card.sacredGeometry} | Icon: ${card.iconSymbol}\n`
    readingText += `Orientation: ${card.orientation}\n\n`
    const randomMeaning = card.keyMeanings[Math.floor(Math.random() * card.keyMeanings.length)] ?? "Insight awaits."
    readingText += `${randomMeaning}\n\n`
    readingText += `Internal Influence: ${card.planetInternalInfluence}\n`
    readingText += `External Domain: ${card.astrologyExternalDomain}\n`
    if (index < cards.length - 1) readingText += "\n---\n\n"
  })

  readingText += `\n\nElemental Analysis: Fire, Water, Air, Earth and Spirit interplay within your spread.`

  if (spreadType === "single") {
    readingText += "\n\nThis single card highlights the core energy of your situation. Meditate on its lesson."
  } else if (spreadType === "three") {
    readingText += "\n\nThese three cards show your past, present and potential future. Observe their flow."
  } else {
    readingText += "\n\nThis elemental spread reveals the spectrum of forces guiding you. Balance is key."
  }
  return readingText
}
// -----------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName = "",
      dateOfBirth = "",
      timeOfBirth = "",
      birthPlace = "",
      question = "",
      selectedCards = [],
      spreadType = "single",
    } = body

    try {
      const ai = await generateOracleReading({
        fullName,
        dateOfBirth,
        timeOfBirth,
        birthPlace,
        question,
        selectedCards,
        spreadType,
      })

      // If the AI responded successfully, forward it
      if (ai.success && ai.reading) {
        return NextResponse.json({ success: true, content: ai.reading, threadId: ai.threadId ?? null }, { status: 200 })
      }

      // AI unavailable or failed – produce fallback and indicate failure
      const fallback = generateFallbackReading(selectedCards, question, fullName, spreadType)
      return NextResponse.json(
        {
          success: false, // <--- Changed to false when AI fails
          content: fallback,
          fallback: true,
          error: ai.error ?? "AI service unavailable or failed to generate reading", // <--- More specific fallback
        },
        { status: 200 },
      )
    } catch (err) {
      console.error("generateCompleteReading fatal error:", err)
      // Any unhandled error → fallback
      const fallbackReading = generateFallbackReading(selectedCards, question, fullName, spreadType)
      return NextResponse.json(
        {
          success: false, // <--- Changed to false on error
          content: fallbackReading,
          fallback: true,
          error: err instanceof Error && err.message ? err.message : "Unknown AI generation error",
        },
        { status: 200 }, // ← always return 200 so the client doesn't throw
      )
    }
  } catch (err) {
    console.error("generateCompleteReading fatal:", err)

    // ---- fallback text (minimal so it always works) ----
    const {
      selectedCards = [],
      question = "",
      fullName = "",
      spreadType = "single",
    } = typeof err === "object" && err && "body" in err ? ((err as any).body ?? {}) : {}

    const fallback = generateFallbackReading(selectedCards, question, fullName, spreadType)

    return NextResponse.json(
      {
        success: false, // <--- Changed to false on fatal error
        content: fallback,
        fallback: true,
        error: String(err || "Unknown fatal error during request processing"),
      },
      { status: 200 },
    )
  }
}
