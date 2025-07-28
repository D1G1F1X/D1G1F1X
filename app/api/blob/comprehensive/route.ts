import { NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { getAllCardData } from "@/lib/card-data-access" // Assuming this exists
import type { CardElement } from "@/types/cards"

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "cards/", limit: 1000 }) // Adjust prefix and limit as needed

    const allCards = getAllCardData()
    const elements: CardElement[] = ["Air", "Earth", "Fire", "Spirit", "Water"]

    const comprehensiveData = allCards.map((card) => {
      const cardBlobs: Record<string, string | null> = {}
      elements.forEach((element) => {
        const number = card.number.padStart(2, "0")
        const suit = card.suit.toLowerCase()
        const elementName = element.toLowerCase()
        const filename = `${number}${suit}-${elementName}.jpg`
        const blob = blobs.find((b) => b.pathname === `cards/${filename}`)
        cardBlobs[elementName] = blob ? blob.url : null
      })

      return {
        cardId: card.id,
        fullTitle: card.fullTitle,
        baseElement: card.baseElement,
        synergisticElement: card.synergisticElement,
        blobUrls: cardBlobs,
      }
    })

    return NextResponse.json({ success: true, data: comprehensiveData })
  } catch (error) {
    console.error("Error fetching comprehensive blob data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch comprehensive blob data." }, { status: 500 })
  }
}
