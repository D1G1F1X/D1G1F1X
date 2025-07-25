import { NextResponse } from "next/server"
import {
  getPageContent,
  createPageContent,
  updatePageContent,
  deletePageContent,
  getPageList,
} from "@/lib/enhanced-content"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  try {
    if (id) {
      const content = await getPageContent(id)
      if (content) {
        return NextResponse.json({ id, content })
      } else {
        return NextResponse.json({ error: "Content not found" }, { status: 404 })
      }
    } else {
      const pageList = await getPageList()
      return NextResponse.json(pageList)
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { id, content } = await request.json()
    if (!id || content === undefined) {
      return NextResponse.json({ error: "ID and content are required" }, { status: 400 })
    }
    const result = await createPageContent(id, content)
    if (result.success) {
      return NextResponse.json({ message: "Content created successfully", id }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.message }, { status: 409 }) // Conflict if ID exists
    }
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required for updating content" }, { status: 400 })
  }

  try {
    const { content } = await request.json()
    if (content === undefined) {
      return NextResponse.json({ error: "Content is required for update" }, { status: 400 })
    }
    const result = await updatePageContent(id, content)
    if (result.success) {
      return NextResponse.json({ message: "Content updated successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required for deleting content" }, { status: 400 })
  }

  try {
    const result = await deletePageContent(id)
    if (result.success) {
      return NextResponse.json({ message: "Content deleted successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
