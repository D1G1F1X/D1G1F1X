import { NextResponse } from "next/server"
import { getLibraryStats } from "@/lib/services/library-service"

export async function GET() {
  try {
    const stats = await getLibraryStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching library stats:", error)
    return NextResponse.json({ error: "Failed to fetch library stats" }, { status: 500 })
  }
}
