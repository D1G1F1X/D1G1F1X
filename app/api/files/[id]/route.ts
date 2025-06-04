import { type NextRequest, NextResponse } from "next/server"
import { getFileById, updateFile, deleteFile } from "@/lib/services/file-service"
import { deleteFromBlob } from "@/lib/blob"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const file = await getFileById(params.id)

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.json({ file })
  } catch (error) {
    console.error("Error retrieving file:", error)
    return NextResponse.json({ error: "Failed to retrieve file" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    await requireAuth()

    const data = await request.json()
    const updatedFile = await updateFile(params.id, data)

    if (!updatedFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return NextResponse.json({ file: updatedFile })
  } catch (error) {
    console.error("Error updating file:", error)
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    await requireAuth()

    // Get the file to get its URL
    const file = await getFileById(params.id)

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Delete from Blob storage
    await deleteFromBlob(file.url)

    // Delete from database
    const success = await deleteFile(params.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete file record" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
