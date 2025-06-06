import { NextResponse } from "next/server"
// Ensure 'posts' is exported from '@/lib/content'
import { posts as allPostsFromLib, type Post } from "@/lib/content"

// Use a mutable copy for runtime modifications if needed by POST, PUT, DELETE
// Check if allPostsFromLib is actually an array before spreading
const runtimePosts: Post[] = Array.isArray(allPostsFromLib) ? [...allPostsFromLib] : []

export async function GET() {
  // Ensure allPostsFromLib is an array before trying to sort it
  if (!Array.isArray(allPostsFromLib)) {
    console.error("Error in GET /api/blog: allPostsFromLib is not an array.", allPostsFromLib)
    // Return an empty array or an error response
    return NextResponse.json({ error: "Failed to load posts." }, { status: 500 })
  }
  return NextResponse.json(
    [...allPostsFromLib].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  )
}

export async function POST(request: Request) {
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

  // This modification will only affect the runtimePosts array in memory for this instance of the server.
  // It won't persist if the server restarts or if you have multiple server instances,
  // as `lib/content.ts` re-initializes `posts` from its static definition on each import.
  // For persistent changes, you would need a database or write back to the `lib/content.ts` file (not recommended for server files).
  if (Array.isArray(allPostsFromLib)) {
    // If you intend to modify the original source for subsequent GET requests in the same server instance:
    allPostsFromLib.unshift(newPost) // Modifies the imported array directly if it's mutable and shared
  } else {
    // Fallback or error handling if allPostsFromLib wasn't an array
    console.error("Cannot add post, allPostsFromLib is not an array.")
  }
  runtimePosts.unshift(newPost) // This is a separate copy

  return NextResponse.json(newPost, { status: 201 })
}
