import { type NextRequest, NextResponse } from "next/server"
import { deleteFolder } from "@/lib/services/file-service"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteFolder(params.id)

    if (!success) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting folder:", error)
    return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 })
  }
}
