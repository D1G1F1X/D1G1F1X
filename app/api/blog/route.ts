import { NextResponse } from "next/server"
import { posts, type Post } from "@/lib/content"

export async function GET() {
  try {
    console.log("API: Starting blog posts fetch")
    console.log("API: Total posts available:", posts?.length || 0)

    // Ensure posts is an array
    if (!Array.isArray(posts)) {
      console.error("API: Posts is not an array:", typeof posts)
      return NextResponse.json({ posts: [] })
    }

    // Filter out unpublished posts
    const publishedPosts = posts.filter((post) => {
      const isPublished = post.isPublished === true
      console.log(`API: Post "${post.title}" - Published: ${isPublished}`)
      return isPublished
    })

    console.log("API: Published posts count:", publishedPosts.length)

    // Sort posts by creation date, newest first
    publishedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log(
      "API: Returning posts:",
      publishedPosts.map((p) => ({ id: p.id, title: p.title, isPublished: p.isPublished })),
    )

    return NextResponse.json({ posts: publishedPosts })
  } catch (error) {
    console.error("API: Error fetching blog posts:", error)
    return NextResponse.json(
      { message: "Failed to fetch blog posts", error: (error as Error).message, posts: [] },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: data.title,
      slug:
        data.slug ||
        data.title
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-"),
      content: data.content,
      excerpt: data.excerpt || data.content.substring(0, 150) + "...",
      author: data.author || "Admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: data.isPublished !== undefined ? data.isPublished : false,
      featuredImage: data.featuredImage || undefined,
      categories: data.categories || [],
      tags: data.tags || [],
    }

    // Note: This will only persist for the current server instance
    // For production, you'd want to use a database
    posts.unshift(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("API: Error creating blog post:", error)
    return NextResponse.json(
      { message: "Failed to create blog post", error: (error as Error).message },
      { status: 500 },
    )
  }
}
