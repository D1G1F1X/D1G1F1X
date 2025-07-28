import { NextResponse } from "next/server"
import { getReadingListById, updateReadingList, deleteReadingList } from "@/lib/services/library-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const readingList = await getReadingListById(params.id)
    if (readingList) {
      return NextResponse.json(readingList)
    } else {
      return NextResponse.json({ message: "Reading list not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching reading list:", error)
    return NextResponse.json({ error: "Failed to fetch reading list" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await request.json()
    const updatedReadingList = await updateReadingList(params.id, updatedData)
    if (updatedReadingList) {
      return NextResponse.json(updatedReadingList)
    } else {
      return NextResponse.json({ message: "Reading list not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating reading list:", error)
    return NextResponse.json({ error: "Failed to update reading list" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteReadingList(params.id)
    if (deleted) {
      return NextResponse.json({ message: "Reading list deleted successfully" })
    } else {
      return NextResponse.json({ message: "Reading list not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting reading list:", error)
    return NextResponse.json({ error: "Failed to delete reading list" }, { status: 500 })
  }
}
