import { NextResponse } from "next/server"
import { getFileById, deleteFile } from "@/lib/services/file-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const file = await getFileById(params.id)
    if (file) {
      return NextResponse.json(file)
    } else {
      return NextResponse.json({ message: "File not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching file:", error)
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteFile(params.id)
    if (deleted) {
      return NextResponse.json({ message: "File deleted successfully" })
    } else {
      return NextResponse.json({ message: "File not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
