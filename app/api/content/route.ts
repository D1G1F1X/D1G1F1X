import { NextResponse } from "next/server"
import { getAllContent, getContent, createContent, updateContent, deleteContent } from "@/lib/enhanced-content"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const type = searchParams.get("type") // 'page' or 'post'

  try {
    if (slug) {
      const content = await getContent(slug, type || undefined)
      if (content) {
        return NextResponse.json(content)
      } else {
        return NextResponse.json({ message: "Content not found" }, { status: 404 })
      }
    } else {
      const allContent = await getAllContent(type || undefined)
      return NextResponse.json(allContent)
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const contentData = await request.json()
    const newContent = await createContent(contentData)
    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const contentData = await request.json()
    if (!contentData.id) {
      return NextResponse.json({ error: "Content ID is required for update" }, { status: 400 })
    }
    const updatedContent = await updateContent(contentData.id, contentData)
    if (updatedContent) {
      return NextResponse.json(updatedContent)
    } else {
      return NextResponse.json({ message: "Content not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Content ID is required for deletion" }, { status: 400 })
    }
    const deleted = await deleteContent(id)
    if (deleted) {
      return NextResponse.json({ message: "Content deleted successfully" })
    } else {
      return NextResponse.json({ message: "Content not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
