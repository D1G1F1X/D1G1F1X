import { NextResponse } from "next/server"
import { getReadingListById, updateReadingList, deleteReadingList } from "@/lib/services/library-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const readingList = await getReadingListById(params.id)
    if (readingList) {
      return NextResponse.json(readingList)
    } else {
      return NextResponse.json({ error: "Reading list not found" }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error fetching reading list ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch reading list" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await request.json()
    const result = await updateReadingList(params.id, updatedData)
    if (result.success) {
      return NextResponse.json({ message: "Reading list updated successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error updating reading list ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update reading list" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteReadingList(params.id)
    if (result.success) {
      return NextResponse.json({ message: "Reading list deleted successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error deleting reading list ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete reading list" }, { status: 500 })
  }
}
