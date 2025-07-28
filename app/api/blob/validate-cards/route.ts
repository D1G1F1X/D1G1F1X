import { NextResponse } from "next/server"
import { head } from "@vercel/blob"
import { getAllCards } from "@/lib/card-data-access" // Assuming this function exists

interface ImageVerificationResult {
  cardId: string
  baseElement: string
  synergisticElement: string
  baseImageExists: boolean
  synergisticImageExists: boolean
  baseImageUrl?: string
  synergisticImageUrl?: string
  baseImageError?: string
  synergisticImageError?: string
}

export async function GET() {
  try {
    const allCards = getAllCards()
    const results: ImageVerificationResult[] = []

    for (const card of allCards) {
      const baseFilename = `${card.number.padStart(2, "0")}${card.suit.toLowerCase()}-${card.baseElement.toLowerCase()}.jpg`
      const synergisticFilename = `${card.number.padStart(2, "0")}${card.suit.toLowerCase()}-${card.synergisticElement.toLowerCase()}.jpg`

      let baseImageExists = false
      let synergisticImageExists = false
      let baseImageUrl: string | undefined
      let synergisticImageUrl: string | undefined
      let baseImageError: string | undefined
      let synergisticImageError: string | undefined

      try {
        const baseBlob = await head(`cards/${baseFilename}`)
        baseImageExists = !!baseBlob
        baseImageUrl = baseBlob?.url
      } catch (error: any) {
        baseImageError = error.message
      }

      try {
        const synergisticBlob = await head(`cards/${synergisticFilename}`)
        synergisticImageExists = !!synergisticBlob
        synergisticImageUrl = synergisticBlob?.url
      } catch (error: any) {
        synergisticImageError = error.message
      }

      results.push({
        cardId: card.id,
        baseElement: card.baseElement,
        synergisticElement: card.synergisticElement,
        baseImageExists,
        synergisticImageExists,
        baseImageUrl,
        synergisticImageUrl,
        baseImageError,
        synergisticImageError,
      })
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Error validating card images in blob storage:", error)
    return NextResponse.json({ success: false, error: "Failed to validate card images." }, { status: 500 })
  }
}
