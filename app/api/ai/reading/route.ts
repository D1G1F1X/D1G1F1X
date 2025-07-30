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
      .filter((card): card is OracleCard => card !== undefined) // Filter out any undefined cards

    if (oracleCards.length !== cardIds.length) {
      console.warn("WARN: Some card IDs provided by client were not found in master data.")
      // Optionally, return an error or proceed with available cards
    }

    console.log(
      "DEBUG: Initial cards drawn for AI reading (full data fetched):",
      oracleCards.map((c) => c.id),
    )
    console.log("DEBUG: Spread Type:", spread_type)
    console.log("DEBUG: User Question:", question)
    console.log("DEBUG: User Context:", user_context ? "Present (stringified)" : "Absent")

    console.log("🔮 Generating AI reading...")
    const { reading, threadId } = await generateOracleReading({
      cards: oracleCards,
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
