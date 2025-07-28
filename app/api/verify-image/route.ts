import { NextResponse } from "next/server"
import { verifyImageExistence } from "@/lib/image-utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("imageUrl")

  if (!imageUrl) {
    return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
  }

  try {
    const exists = await verifyImageExistence(imageUrl)
    return NextResponse.json({ exists })
  } catch (error) {
    console.error("Error verifying image existence:", error)
    return NextResponse.json({ error: "Failed to verify image existence" }, { status: 500 })
  }
}
