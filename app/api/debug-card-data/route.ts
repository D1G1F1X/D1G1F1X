import { NextResponse } from "next/server"
import { getCardData, checkDataIntegrity } from "@/lib/card-data-access"

export async function GET() {
  try {
    const allCards = getCardData()
    const integrityIssues = checkDataIntegrity()

    return NextResponse.json({
      totalCards: allCards.length,
      integrityIssues: integrityIssues,
      sampleCard: allCards.length > 0 ? allCards[0] : null,
    })
  } catch (error) {
    console.error("Error debugging card data:", error)
    return NextResponse.json({ error: "Failed to debug card data" }, { status: 500 })
  }
}
