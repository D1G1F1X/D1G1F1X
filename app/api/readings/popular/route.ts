import { type NextRequest, NextResponse } from "next/server"
import type { SavedReading } from "@/types/saved-readings"
import { ReadingHistoryService } from "@/lib/services/reading-history-service"

export async function GET(request: NextRequest) {
  try {
    const readingHistoryService = new ReadingHistoryService()
    let readings: SavedReading[] = []
    try {
      readings = readingHistoryService.getAllReadings()
    } catch (e) {
      if (e instanceof ReferenceError && e.message.includes("localStorage is not defined")) {
        console.warn(
          "localStorage is not defined in /api/readings/popular. Returning empty popular readings. ReadingHistoryService should be refactored for server-side use.",
        )
        // allReadings will remain an empty array, allowing the function to proceed
      } else {
        // For other errors, re-throw or handle as appropriate
        console.error("Error fetching all readings in /api/readings/popular:", e)
        return NextResponse.json(
          { error: "Failed to fetch popular readings due to an internal error" },
          { status: 500 },
        )
      }
    }

    if (!readings || readings.length === 0) {
      return NextResponse.json({ popularReadings: [] })
    }

    // Count frequency of each reading type
    const readingCounts = readings.reduce(
      (acc, reading) => {
        const type = reading.readingType || "Unknown"
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Sort by frequency and get top 5
    const popularReadings = Object.entries(readingCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }))

    return NextResponse.json({ popularReadings })
  } catch (error) {
    console.error("Error getting popular readings:", error)
    return NextResponse.json({ error: "Failed to fetch popular readings" }, { status: 500 })
  }
}
