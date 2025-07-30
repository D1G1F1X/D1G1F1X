import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading } from "@/lib/ai/enhanced-ai-service-manager"
import { getCardById } from "@/lib/card-data-access" // Import getCardById
import type { OracleCard } from "@/types/cards"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    console.log("🔮 API Route: /api/ai/reading POST request received.")

    let requestBody: any

    try {
      requestBody = await req.json()
      console.log("📥 Request body parsed successfully")
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { cardIds, spread_type, question, user_context } = requestBody // Expect cardIds instead of full cards

    if (!cardIds || !Array.isArray(cardIds) || cardIds.length === 0) {
      console.warn("WARN: Invalid or empty cardIds array received.")
      return NextResponse.json({ success: false, error: "Invalid card data provided." }, { status: 400 })
    }

    // Fetch full OracleCard objects using the provided IDs
    const oracleCards: OracleCard[] = cardIds
      .map((id: string) => getCardById(id))
      .filter((card): card is OracleCard => card !== undefined) // Filter out undefined cards

    if (oracleCards.length !== cardIds.length) {
      console.warn(
        `WARN: Some card IDs provided by client were not found in master data. Expected ${cardIds.length}, found ${oracleCards.length}.`,
      )
      // If no cards are found, this could lead to an empty `cards` array being passed to generateOracleReading,
      // which is handled by a specific error in that function.
      if (oracleCards.length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid cards found for the provided IDs." },
          { status: 400 },
        )
      }
    }

    console.log(
      "DEBUG: Full OracleCard objects fetched for AI reading:",
      oracleCards.map((c) => ({
        id: c.id,
        fullTitle: c.fullTitle,
        planetInternalInfluence: c.planetInternalInfluence, // Log these specific fields
        astrologyExternalDomain: c.astrologyExternalDomain, // Log these specific fields
      })),
    )
    console.log("DEBUG: Spread Type:", spread_type)
    console.log("DEBUG: User Question:", question)
    console.log("DEBUG: User Context:", user_context ? "Present (stringified)" : "Absent")

    console.log("🔮 Generating AI reading...")
    const { reading, threadId } = await generateOracleReading({
      cards: oracleCards, // This is the array of full OracleCard objects
      question: question,
      spreadType: spread_type,
      userContext: user_context,
    })
    console.log("✅ AI reading generated successfully.")

    return NextResponse.json({ success: true, reading, threadId })
  } catch (error: any) {
    console.error("💥 Error generating AI reading:", error)
    const errorMessage =
      typeof error === "string" ? error : error instanceof Error ? error.message : JSON.stringify(error)
    return NextResponse.json(
      {
        success: false,
        error: errorMessage || "An unexpected error occurred while generating the reading. Please try again.",
      },
      { status: 500 },
    )
  }
}
