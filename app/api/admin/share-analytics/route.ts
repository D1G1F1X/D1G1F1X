import { NextResponse } from "next/server"
import { getShareAnalytics } from "@/lib/services/share-analytics-service"

export async function GET() {
  try {
    const analyticsData = await getShareAnalytics()
    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Error fetching share analytics:", error)
    return NextResponse.json({ error: "Failed to fetch share analytics" }, { status: 500 })
  }
}
