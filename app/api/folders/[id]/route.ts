import { NextResponse } from "next/server"
import { getFolderById, updateFolder, deleteFolder } from "@/lib/services/file-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const folder = await getFolderById(params.id)
    if (folder) {
      return NextResponse.json(folder)
    } else {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching folder:", error)
    return NextResponse.json({ error: "Failed to fetch folder" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await request.json()
    const updatedFolder = await updateFolder(params.id, name)
    if (updatedFolder) {
      return NextResponse.json(updatedFolder)
    } else {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating folder:", error)
    return NextResponse.json({ error: "Failed to update folder" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteFolder(params.id)
    if (deleted) {
      return NextResponse.json({ message: "Folder deleted successfully" })
    } else {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting folder:", error)
    return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 })
  }
}
