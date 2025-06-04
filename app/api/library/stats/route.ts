import { type NextRequest, NextResponse } from "next/server"
import { getLibraryStats, getUserLibraryStats } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userStats = searchParams.get("userStats") === "true"

    const user = await getUserFromRequest(request)

    if (userStats) {
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const stats = await getUserLibraryStats(user.id)
      return NextResponse.json({ stats })
    } else {
      const stats = await getLibraryStats(user?.id)
      return NextResponse.json({ stats })
    }
  } catch (error) {
    console.error("Error in GET /api/library/stats:", error)
    return NextResponse.json({ error: "Failed to fetch library statistics" }, { status: 500 })
  }
}
