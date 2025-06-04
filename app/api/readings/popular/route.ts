import { NextResponse } from "next/server"
import { CacheService } from "@/lib/services/cache-service"
import { ReadingHistoryService } from "@/lib/services/reading-history-service"

export async function GET() {
  try {
    // Get all readings
    const allReadings = ReadingHistoryService.getAllReadings()

    // Get view counts for each reading
    const readingsWithViews = await Promise.all(
      allReadings.map(async (reading) => {
        const viewCount = await CacheService.getViewCount("reading", reading.id)
        return {
          id: reading.id,
          title: reading.title,
          spreadType: reading.spreadType,
          viewCount,
        }
      }),
    )

    // Sort by view count and take top 5
    const popularReadings = readingsWithViews.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5)

    return NextResponse.json(popularReadings)
  } catch (error) {
    console.error("Error fetching popular readings:", error)
    return NextResponse.json({ error: "Failed to fetch popular readings" }, { status: 500 })
  }
}
