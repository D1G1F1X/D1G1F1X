import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Reading } from "@/types/readings"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getCardById } from "@/lib/card-data-access"
import { getNumerologyReport } from "@/lib/numerology"
import { getCompleteReadingPrompt } from "@/lib/prompt-templates" // Assuming this exists

export async function getReadingById(id: string): Promise<Reading | null> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("readings").select("*").eq("id", id).single()
  if (error) {
    console.error("Error fetching reading:", error)
    return null
  }
  return data
}

export async function getPopularReadings(): Promise<Reading[]> {
  const supabase = createServerClient(cookies())
  // This is a placeholder for actual popularity logic (e.g., based on views, shares, likes)
  // For now, it just fetches a few recent readings.
  const { data, error } = await supabase.from("readings").select("*").order("created_at", { ascending: false }).limit(5)
  if (error) {
    console.error("Error fetching popular readings:", error)
    return []
  }
  return data || []
}

export async function generateReading(
  userId: string,
  cardIds: string[],
  birthDate?: string,
  fullName?: string,
): Promise<Reading | null> {
  const supabase = createServerClient(cookies())

  try {
    // 1. Fetch card details
    const cards = await Promise.all(cardIds.map((id) => getCardById(id)))
    const validCards = cards.filter(Boolean)

    if (validCards.length === 0) {
      throw new Error("No valid cards found for reading generation.")
    }

    // 2. Generate numerology report if birthDate and fullName are provided
    let numerologyReport = null
    if (birthDate && fullName) {
      const date = new Date(birthDate)
      if (!isNaN(date.getTime())) {
        numerologyReport = getNumerologyReport(date, fullName)
      } else {
        console.warn("Invalid birth date provided for numerology report.")
      }
    }

    // 3. Construct prompt for AI
    const prompt = getCompleteReadingPrompt(validCards, numerologyReport)

    // 4. Call AI to generate reading content
    const { text: aiGeneratedContent } = await generateText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o"),
      prompt: prompt,
      maxTokens: Number.parseInt(process.env.OPENAI_MAX_TOKENS || "2000"),
      temperature: Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
    })

    // 5. Save the generated reading to Supabase
    const { data, error } = await supabase
      .from("readings")
      .insert({
        user_id: userId,
        cards_used: cardIds,
        reading_content: aiGeneratedContent,
        birth_date: birthDate || null,
        full_name: fullName || null,
        reading_type: "custom", // Or derive from input
        title: `Reading for ${fullName || "User"} on ${new Date().toLocaleDateString()}`,
        summary: aiGeneratedContent.substring(0, 150) + "...", // Simple summary
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving reading to database:", error)
      throw new Error("Failed to save reading.")
    }

    return data
  } catch (error) {
    console.error("Error generating reading:", error)
    return null
  }
}
