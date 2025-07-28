import { NextResponse } from "next/server"
import { getAllCards, getCardById } from "@/lib/card-data-access"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (id) {
      const card = getCardById(id)
      if (!card) {
        return NextResponse.json({ error: `Card with ID ${id} not found` }, { status: 404 })
      }
      return NextResponse.json(card)
    }

    const element = url.searchParams.get("element")
    const suit = url.searchParams.get("suit")

    let cards = getAllCards()

    if (element) {
      cards = cards.filter(
        (card) =>
          card.baseElement?.toLowerCase() === element.toLowerCase() ||
          card.synergisticElement?.toLowerCase() === element.toLowerCase(),
      )
    }

    if (suit) {
      cards = cards.filter((card) => card.suit?.toLowerCase() === suit.toLowerCase())
    }

    return NextResponse.json(cards)
  } catch (error) {
    console.error("Error in card directory API:", error)
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
