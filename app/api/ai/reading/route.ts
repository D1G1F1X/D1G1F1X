import { NextResponse } from "next/server"
import { generateOracleReading } from "@/lib/ai/enhanced-ai-service-manager"
import type { ReadingRequest, ReadingResponse } from "@/types/readings"

export async function POST(req: Request): Promise<NextResponse<ReadingResponse | { error: string }>> {
  try {
    const requestBody: ReadingRequest = await req.json()

    if (!requestBody.question || !requestBody.cards || requestBody.cards.length === 0) {
      return NextResponse.json({ error: "Missing question or cards in request." }, { status: 400 })
    }

    const readingContent = await generateOracleReading(requestBody)

    return NextResponse.json({ reading: readingContent })
  } catch (error: any) {
    console.error("Error in /api/ai/reading:", error)
    return NextResponse.json({ error: error.message || "Failed to generate AI reading." }, { status: 500 })
  }
}
