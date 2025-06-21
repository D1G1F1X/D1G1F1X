import { type NextRequest, NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/content"

export async function GET(request: NextRequest) {
  try {
    console.log("=== BLOG API ROUTE START ===")
    console.log("Blog API: Request received at", new Date().toISOString())

    const posts = await getBlogPosts()
    console.log("Blog API: Retrieved posts count:", posts.length)
    console.log(
      "Blog API: First few post titles:",
      posts.slice(0, 3).map((p) => p.title),
    )

    const response = {
      posts,
      total: posts.length,
      timestamp: new Date().toISOString(),
      cache: "no-cache",
    }

    console.log("Blog API: Sending response with", response.posts.length, "posts")
    console.log("=== BLOG API ROUTE END ===")

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
        "X-Timestamp": new Date().toISOString(),
        "X-Posts-Count": posts.length.toString(),
      },
    })
  } catch (error) {
    console.error("=== BLOG API ERROR ===")
    console.error("Blog API: Error occurred:", error)
    console.error("Blog API: Error stack:", error instanceof Error ? error.stack : "No stack")

    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        posts: [],
        total: 0,
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}
