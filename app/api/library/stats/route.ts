import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    // Extract any query parameters if needed
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Return mock stats data
    return NextResponse.json({
      totalDocuments: 42,
      totalReadingLists: 7,
      recentlyViewed: 12,
      savedItems: 18,
      userId: userId || "anonymous",
    })
  } catch (error) {
    console.error("Error fetching library stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch library stats", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
