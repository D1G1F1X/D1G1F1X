import { NextResponse } from "next/server"
import { testCardImage } from "@/lib/card-image-blob-handler"

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const result = await testCardImage(imageUrl)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error testing card image:", error)
    return NextResponse.json({ error: "Failed to test card image" }, { status: 500 })
  }
}
