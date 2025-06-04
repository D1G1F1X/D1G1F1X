import { type NextRequest, NextResponse } from "next/server"
import { getUserReadingList, addToReadingList } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const readingList = await getUserReadingList(user.id)

    return NextResponse.json({ readingList })
  } catch (error) {
    console.error("Error in GET /api/library/reading-list:", error)
    return NextResponse.json({ error: "Failed to fetch reading list" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { documentId } = await request.json()

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    const readingListItem = await addToReadingList(user.id, documentId)

    if (!readingListItem) {
      return NextResponse.json({ error: "Failed to add document to reading list" }, { status: 500 })
    }

    return NextResponse.json({ readingListItem })
  } catch (error: any) {
    console.error("Error in POST /api/library/reading-list:", error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    if (error.message.includes("already in reading list")) {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to add document to reading list" }, { status: 500 })
  }
}
