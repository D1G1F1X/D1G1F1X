import { NextResponse } from "next/server"
import { getFileById, updateFile, deleteFile } from "@/lib/services/file-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const file = await getFileById(params.id)
    if (file) {
      return NextResponse.json(file)
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error fetching file ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await request.json()
    const result = await updateFile(params.id, updatedData)
    if (result.success) {
      return NextResponse.json({ message: "File updated successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error updating file ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteFile(params.id)
    if (result.success) {
      return NextResponse.json({ message: "File deleted successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error deleting file ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
