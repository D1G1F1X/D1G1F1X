import { NextResponse } from "next/server"
import { verifyCardImage } from "@/lib/card-image-blob-handler"

export async function POST(request: Request) {
  try {
    const { cardId, imageUrl } = await request.json()

    if (!cardId || !imageUrl) {
      return NextResponse.json({ error: "Card ID and image URL are required" }, { status: 400 })
    }

    const result = await verifyCardImage(cardId, imageUrl)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error verifying card image:", error)
    return NextResponse.json({ error: "Failed to verify card image" }, { status: 500 })
  }
}
