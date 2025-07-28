import { NextResponse } from "next/server"
import shareAnalyticsService from "@/lib/services/share-analytics-service"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { platform, url, contentType, contentId, userId, referrer, metadata } = data

    if (!platform || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Record the share event
    const shareId = await shareAnalyticsService.recordShareEvent({
      platform,
      contentType: contentType || "unknown",
      contentId,
      url,
      userId,
      referrer,
      userAgent: request.headers.get("user-agent") || undefined,
      successful: true,
      metadata,
    })

    return NextResponse.json({ success: true, id: shareId })
  } catch (error) {
    console.error("Error tracking share:", error)
    return NextResponse.json({ error: "Failed to track share" }, { status: 500 })
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
    const success = await shareAnalyticsService.recordShareClick(shareId, {
      referrer: request.headers.get("referer") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    })

    return NextResponse.json({ success })
  } catch (error) {
    console.error("Error tracking share click:", error)
    return NextResponse.json({ error: "Failed to track share click" }, { status: 500 })
  }
}
