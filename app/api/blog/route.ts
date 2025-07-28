import { NextResponse } from "next/server"
import { getAllPosts, getPost, createPost, updatePost, deletePost } from "@/lib/enhanced-blog-system"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  try {
    if (slug) {
      const post = await getPost(slug)
      if (post) {
        return NextResponse.json(post)
      } else {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
      }
    } else {
      const posts = await getAllPosts()
      return NextResponse.json(posts)
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const postData = await request.json()
    const newPost = await createPost(postData)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const postData = await request.json()
    if (!postData.id) {
      return NextResponse.json({ error: "Post ID is required for update" }, { status: 400 })
    }
    const updatedPost = await updatePost(postData.id, postData)
    if (updatedPost) {
      return NextResponse.json(updatedPost)
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Post ID is required for deletion" }, { status: 400 })
    }
    const deleted = await deletePost(id)
    if (deleted) {
      return NextResponse.json({ message: "Post deleted successfully" })
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
