import { NextResponse } from "next/server"
import { head } from "@vercel/blob"
import { getCardImageName } from "@/lib/card-data-access" // Assuming this function exists
import { getAllCards } from "@/lib/card-data-access" // To get card data for image name generation
import type { CardElement } from "@/types/cards"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cardId = searchParams.get("cardId")
  const element = searchParams.get("element") as CardElement

  if (!cardId || !element) {
    return NextResponse.json({ error: "cardId and element are required" }, { status: 400 })
  }

  try {
    const allCards = getAllCards()
    const card = allCards.find((c) => c.id === cardId)

    if (!card) {
      return NextResponse.json(
        { filename: `${cardId}-${element}.jpg`, exists: false, error: "Card data not found" },
        { status: 404 },
      )
    }

    // Use the utility to get the expected filename
    const filename = getCardImageName(card, element)
    const pathname = `cards/${filename}` // Assuming blobs are stored under a 'cards/' prefix

    console.log(`Verifying blob existence for pathname: ${pathname}`)

    const blob = await head(pathname) // Use head to check existence without downloading
    console.log(`Blob head result for ${pathname}:`, blob)

    if (blob) {
      return NextResponse.json({ filename, exists: true, url: blob.url })
    } else {
      return NextResponse.json({ filename, exists: false, error: "Blob not found" })
    }
  } catch (error: any) {
    console.error(`Error verifying blob for ${cardId}-${element}:`, error)
    return NextResponse.json(
      { filename: `${cardId}-${element}.jpg`, exists: false, error: error.message || "Unknown error" },
      { status: 500 },
    )
  }
}
