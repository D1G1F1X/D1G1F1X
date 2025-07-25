import { NextResponse } from "next/server"
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/enhanced-blog-system"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  try {
    if (slug) {
      const post = await getBlogPosts(slug)
      if (post) {
        return NextResponse.json(post)
      } else {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
      }
    } else {
      const posts = await getBlogPosts()
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
    const result = await createBlogPost(postData)
    if (result.success) {
      return NextResponse.json({ message: "Blog post created successfully", slug: result.slug }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required for updating a post" }, { status: 400 })
  }

  try {
    const postData = await request.json()
    const result = await updateBlogPost(slug, postData)
    if (result.success) {
      return NextResponse.json({ message: "Blog post updated successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required for deleting a post" }, { status: 400 })
  }

  try {
    const result = await deleteBlogPost(slug)
    if (result.success) {
      return NextResponse.json({ message: "Blog post deleted successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
