import { NextResponse } from "next/server"
import { CacheService } from "@/lib/services/cache-service"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Since we can't access localStorage on the server, return mock data
    // In a real app, this would come from a database
    const mockReadings = [
      {
        id: "reading-1",
        title: "Three Card Spread",
        spreadType: "three-card",
        viewCount: 0,
      },
      {
        id: "reading-2",
        title: "Celtic Cross",
        spreadType: "celtic-cross",
        viewCount: 0,
      },
      {
        id: "reading-3",
        title: "Single Card Draw",
        spreadType: "single-card",
        viewCount: 0,
      },
    ]

    // Get view counts for each reading
    const readingsWithViews = await Promise.all(
      mockReadings.map(async (reading) => {
        try {
          const viewCount = await CacheService.getViewCount("reading", reading.id)
          return {
            ...reading,
            viewCount,
          }
        } catch (error) {
          console.error(`Error getting view count for reading ${reading.id}:`, error)
          return {
            ...reading,
            viewCount: 0,
          }
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
