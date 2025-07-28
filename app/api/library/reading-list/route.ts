import { NextResponse } from "next/server"
import { getAllReadingLists, createReadingList } from "@/lib/services/library-service"

export async function GET() {
  try {
    const readingLists = await getAllReadingLists()
    return NextResponse.json(readingLists)
  } catch (error) {
    console.error("Error fetching reading lists:", error)
    return NextResponse.json({ error: "Failed to fetch reading lists" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const readingListData = await request.json()
    const newReadingList = await createReadingList(readingListData)
    return NextResponse.json(newReadingList, { status: 201 })
  } catch (error) {
    console.error("Error creating reading list:", error)
    return NextResponse.json({ error: "Failed to create reading list" }, { status: 500 })
  }
}
