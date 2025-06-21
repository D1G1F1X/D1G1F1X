import { NextResponse } from "next/server"
import { blogSystem } from "@/lib/enhanced-blog-system"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const category = searchParams.get("category") || undefined
    const tag = searchParams.get("tag") || undefined
    const published = searchParams.get("published") !== "false"

    const result = await blogSystem.fetchPosts({
      limit,
      offset,
      category,
      tag,
      published,
    })

    return NextResponse.json({
      posts: result.posts,
      total: result.total,
      hasMore: result.hasMore,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
    })
  } catch (error) {
    console.error("Blog API error:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
