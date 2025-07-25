import { NextResponse } from "next/server"
import { verifyImage } from "@/lib/image-processor"

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const result = await verifyImage(imageUrl)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error verifying image:", error)
    return NextResponse.json({ error: "Failed to verify image" }, { status: 500 })
  }
}
