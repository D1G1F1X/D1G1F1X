import { NextResponse } from "next/server"
import { getVerifiedCardImage } from "@/lib/verified-blob-handler"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

/**
 * API route for testing individual card image retrieval
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const element = searchParams.get("element")

    if (!cardId || !element) {
      return NextResponse.json({ success: false, error: "Missing cardId or element parameters" }, { status: 400 })
    }

    console.log(`🧪 Testing card image retrieval: ${cardId}-${element}`)

    const startTime = Date.now()
    const result = await getVerifiedCardImage(cardId, element)
    const totalTime = Date.now() - startTime

    return NextResponse.json({
      success: true,
      test: {
        cardId,
        element,
        url: result.url,
        isPlaceholder: result.isPlaceholder,
        loadTime: result.loadTime,
        totalTime,
        cached: result.cached,
        error: result.error,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error testing card image:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Card test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
