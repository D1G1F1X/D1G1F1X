import { NextResponse } from "next/server"
import { posts as allPostsFromLib, type Post } from "@/lib/content" // Import posts from lib/content

// Use a mutable copy for runtime modifications if needed by POST, PUT, DELETE
const runtimePosts: Post[] = [...allPostsFromLib]

export async function GET() {
  // Return the potentially modified runtimePosts or the static allPostsFromLib
  // For simplicity and consistency with lib/content as source of truth for GET:
  return NextResponse.json(
    allPostsFromLib.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  )
}

export async function POST(request: Request) {
  const data = await request.json()

  // Validate the data
  if (!data.title || !data.content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
  }

  // Create a new post
  const newPost: Post = {
    id: Date.now().toString(), // Simple ID generation for mock
    title: data.title,
    slug:
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-"),
    content: data.content,
    excerpt: data.excerpt || data.content.substring(0, 150) + "...",
    author: data.author || "Admin", // Default author
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: data.isPublished !== undefined ? data.isPublished : false, // Default to draft
    featuredImage: data.featuredImage || undefined,
    categories: data.categories || [],
    tags: data.tags || [],
  }

  // Add the new post to the runtime array (this won't persist across server restarts for a mock)
  runtimePosts.unshift(newPost) // Add to the beginning to appear first

  return NextResponse.json(newPost, { status: 201 })
}
