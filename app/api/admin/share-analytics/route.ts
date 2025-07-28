import { NextResponse } from "next/server"
import { getShareAnalytics, recordShareEvent } from "@/lib/services/share-analytics-service"

export async function GET() {
  try {
    const analyticsData = await getShareAnalytics()
    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Error fetching share analytics:", error)
    return NextResponse.json({ error: "Failed to fetch share analytics" }, { status: 500 })
  }
}

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
