import { NextResponse } from "next/server"
import { validateCardImages } from "@/lib/card-image-blob-handler"

export async function GET() {
  try {
    const validationResults = await validateCardImages()
    return NextResponse.json(validationResults)
  } catch (error) {
    console.error("Error validating card images:", error)
    return NextResponse.json({ error: "Failed to validate card images" }, { status: 500 })
  }
}
