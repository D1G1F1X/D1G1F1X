import { type NextRequest, NextResponse } from "next/server"
import { updateReadingListItem, removeFromReadingList } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    const readingListItem = await updateReadingListItem(itemId, updates, user.id)

    if (!readingListItem) {
      return NextResponse.json({ error: "Failed to update reading list item" }, { status: 500 })
    }

    return NextResponse.json({ readingListItem })
  } catch (error: any) {
    console.error(`Error in PUT /api/library/reading-list/${params.id}:`, error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to update reading list item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = params.id
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = await removeFromReadingList(itemId, user.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to remove from reading list" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(`Error in DELETE /api/library/reading-list/${params.id}:`, error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to remove from reading list" }, { status: 500 })
  }
}
