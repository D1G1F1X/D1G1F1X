import { NextResponse } from "next/server"
import { blogManager } from "@/lib/blog-manager"
import { authManager } from "@/lib/auth-manager"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    let posts = blogManager.getPublishedPosts()

    // Apply filters
    if (featured) {
      posts = blogManager.getFeaturedPosts()
    } else if (category) {
      posts = blogManager.getPostsByCategory(category)
    } else if (tag) {
      posts = blogManager.getPostsByTag(tag)
    } else if (search) {
      posts = blogManager.searchPosts(search)
    }

    return NextResponse.json({
      posts,
      total: posts.length,
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Blog API] Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        posts: [],
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await authManager.getCurrentUser()
    if (!authManager.hasPermission(user, "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const newPost = blogManager.createPost(data)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("[Blog API] Create error:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
