import { NextResponse } from "next/server"
import { listCardImages } from "@/lib/card-image-blob-handler"

export async function GET() {
  try {
    const cardImages = await listCardImages()
    return NextResponse.json(cardImages)
  } catch (error) {
    console.error("Error fetching card image paths:", error)
    return NextResponse.json({ error: "Failed to fetch card image paths" }, { status: 500 })
  }
}
