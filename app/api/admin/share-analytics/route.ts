import { NextResponse } from "next/server"
import shareAnalyticsService from "@/lib/services/share-analytics-service"

export async function POST(request: Request) {
  try {
    const { startDate, endDate, platform, contentType } = await request.json()

    // Get share stats
    const stats = await shareAnalyticsService.getShareStats(startDate, endDate, platform, contentType)

    // Get top sharing users
    const topUsers = await shareAnalyticsService.getTopSharingUsers(10)

    return NextResponse.json({ stats, topUsers })
  } catch (error) {
    console.error("Error getting share analytics:", error)
    return NextResponse.json({ error: "Failed to get share analytics" }, { status: 500 })
  }
}
