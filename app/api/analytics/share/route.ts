import { NextResponse } from "next/server"
import { recordShareEvent, recordShareClick } from "@/lib/services/share-analytics-service"

export async function POST(request: Request) {
  try {
    const { platform, contentId, contentType } = await request.json()
    if (!platform || !contentId || !contentType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    await recordShareEvent(platform, contentId, contentType)
    return NextResponse.json({ message: "Share event recorded" }, { status: 200 })
  } catch (error) {
    console.error("Error recording share event:", error)
    return NextResponse.json({ error: "Failed to record share event" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const shareId = searchParams.get("id")

    if (!shareId) {
      return NextResponse.json({ error: "Share ID is required" }, { status: 400 })
    }

    // Record the click event
    const success = await recordShareClick(shareId, {
      referrer: request.headers.get("referer") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    })

    return NextResponse.json({ success })
  } catch (error) {
    console.error("Error tracking share click:", error)
    return NextResponse.json({ error: "Failed to track share click" }, { status: 500 })
  }
}
