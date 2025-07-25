import { NextResponse } from "next/server"
import { getPopularReadings } from "@/lib/services/reading-service"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const popularReadings = await getPopularReadings()
    return NextResponse.json(popularReadings)
  } catch (error) {
    console.error("Error fetching popular readings:", error)
    return NextResponse.json({ error: "Failed to fetch popular readings" }, { status: 500 })
  }
}
