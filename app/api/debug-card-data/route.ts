import { NextResponse } from "next/server"
import { getCardData, getCardById } from "@/lib/card-data-access"

export async function GET() {
  try {
    const allCards = getCardData()
    const nineStone = getCardById("9-Stone")

    return NextResponse.json({
      totalCards: allCards.length,
      nineStoneCard: nineStone,
      allCardNumbers: allCards.map((card) => ({
        id: card.id,
        number: card.number,
        numberType: typeof card.number,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch card data" }, { status: 500 })
  }
}
