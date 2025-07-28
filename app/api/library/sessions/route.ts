import { type NextRequest, NextResponse } from "next/server"
import { recordReadingSession } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { documentId, pagesRead, notes } = await request.json()

    if (!documentId || typeof pagesRead !== "number") {
      return NextResponse.json({ error: "Document ID and pages read are required" }, { status: 400 })
    }

    const session = await recordReadingSession(user.id, documentId, pagesRead, notes)

    if (!session) {
      return NextResponse.json({ error: "Failed to record reading session" }, { status: 500 })
    }

    return NextResponse.json({ session })
  } catch (error: any) {
    console.error("Error in POST /api/library/sessions:", error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to record reading session" }, { status: 500 })
  }
}
