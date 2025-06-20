import { NextResponse } from "next/server"
import { blogManager } from "@/lib/blog-manager"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = blogManager.getPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Increment view count
    blogManager.incrementViewCount(post.id)

    return NextResponse.json({
      post,
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Blog API] Get post error:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
