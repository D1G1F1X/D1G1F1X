import { NextResponse } from "next/server"
import { verifyBlobIntegrity } from "@/lib/verified-blob-handler"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cardId = searchParams.get("cardId")
  const element = searchParams.get("element")

  if (!cardId || !element) {
    return NextResponse.json({ error: "cardId and element are required" }, { status: 400 })
  }

  try {
    const result = await verifyBlobIntegrity({ cardId, element })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error testing card blob:", error)
    return NextResponse.json({ error: "Failed to test card blob" }, { status: 500 })
  }
}
