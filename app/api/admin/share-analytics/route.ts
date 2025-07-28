import { NextResponse } from "next/server"
import { getShareAnalytics, recordShareEvent } from "@/lib/services/share-analytics-service" // Assuming these exist

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
    const { type, platform, url } = await request.json()
    if (!type || !platform || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    await recordShareEvent(type, platform, url)
    return NextResponse.json({ message: "Share event recorded successfully" })
  } catch (error) {
    console.error("Error recording share event:", error)
    return NextResponse.json({ error: "Failed to record share event" }, { status: 500 })
  }
}
