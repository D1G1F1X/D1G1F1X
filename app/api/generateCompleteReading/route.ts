import { type NextRequest, NextResponse } from "next/server"
import { generateOracleReading, type ReadingRequest, type ReadingResponse } from "@/lib/openai-assistant"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const readingRequest: ReadingRequest = {
      fullName: body.fullName,
      dateOfBirth: body.dateOfBirth,
      timeOfBirth: body.timeOfBirth,
      birthPlace: body.birthPlace,
      question: body.question,
      selectedCards: body.selectedCards,
      spreadType: body.spreadType,
      isMember: body.isMember, // Ensure this is passed if applicable
    }

    console.log("[API/generateCompleteReading] Received request to generate complete reading.")
    console.log("[API/generateCompleteReading] Request payload:", {
      fullName: readingRequest.fullName,
      question: readingRequest.question,
      spreadType: readingRequest.spreadType,
      numCards: readingRequest.selectedCards?.length,
    })

    const readingResponse: ReadingResponse = await generateOracleReading(readingRequest)

    if (readingResponse.success) {
      console.log("[API/generateCompleteReading] Successfully generated reading.")
      return NextResponse.json(readingResponse)
    } else {
      console.error(
        "[API/generateCompleteReading] Failed to generate reading:",
        readingResponse.error,
        readingResponse.details,
      )
      return NextResponse.json(
        {
          error: readingResponse.error || "Failed to generate reading",
          details: readingResponse.details || "No specific details provided.",
          success: false,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("[API/generateCompleteReading] CRITICAL ERROR in generateCompleteReading API route:", error)
    return NextResponse.json(
      {
        error: "Internal server error during reading generation",
        details: error.message || "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
