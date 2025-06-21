"use client"

import Link from "next/link"
import Image from "next/image"

/**
 * Shape returned by /api/blog
 */
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: string
  createdAt?: string
  author?: string
  categories?: string[]
  tags?: string[]
}

/**
 * Fetch blog posts from the API route with cache busting.
 */
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log("=== BLOG POSTS FETCH START ===")

    // Figure out which absolute origin we should call from the server side.
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? // Explicit override for all envs
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ?? // Vercel preview/prod
      "http://localhost:3000" // Local dev fallback

    // Add cache-busting timestamp
    const timestamp = Date.now()
    const apiUrl = `${baseUrl}/api/blog?t=${timestamp}`

    console.log(`BlogPosts: Attempting to fetch from: ${apiUrl}`)
    console.log("Environment variables:", {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      NODE_ENV: process.env.NODE_ENV,
    })

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store", // Disable Next.js caching
      next: { revalidate: 0 }, // Force revalidation
    })

    console.log("BlogPosts: Fetch response status:", res.status)
    console.log("BlogPosts: Fetch response headers:", Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      console.error(`BlogPosts: Failed to fetch blog posts: ${res.status} ${res.statusText}`)
      const errorBody = await res.text()
      console.error("BlogPosts: Response body:", errorBody)
      return []
    }

    const data = (await res.json()) as {
      posts: BlogPost[]
      total?: number
      timestamp?: string
      cache?: string
    }

    console.log("BlogPosts: Raw API response:", {
      hasPostsProperty: "posts" in data,
      postsIsArray: Array.isArray(data.posts),
      postsCount: data.posts?.length || 0,
      total: data.total || 0,
      timestamp: data.timestamp,
      cache: data.cache,
      firstPost: data.posts?.[0]?.title || "None",
      allTitles: data.posts?.map((p) => p.title) || [],
      dataKeys: Object.keys(data),
    })

    // Handle both array and object responses for backward compatibility
    let posts: BlogPost[] = []

    if (Array.isArray(data)) {
      // Direct array response
      posts = data
      console.log("BlogPosts: Received direct array response")
    } else if (data.posts && Array.isArray(data.posts)) {
      // Object with posts property
      posts = data.posts
      console.log("BlogPosts: Received object response with posts property")
    } else {
      console.error("BlogPosts: Unexpected response format:", data)
      return []
    }

    if (posts.length === 0) {
      console.warn("BlogPosts: Fetched blog data contains no posts.")
      console.warn("BlogPosts: Full API response:", data)
    }

    console.log("=== BLOG POSTS FETCH END ===")
    return posts
  } catch (error) {
    console.error("=== BLOG POSTS FETCH ERROR ===")
    console.error("BlogPosts: Error fetching blog posts:", error)
    console.error("BlogPosts: Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return []
  }
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-md">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-teal-300 transition-colors">
            {post.title}
          </Link>
        </h2>

        <div className="flex items-center gap-4 text-sm text-white/60">
          {post.createdAt && (
            <time dateTime={post.createdAt}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(post.createdAt))}
            </time>
          )}
          {post.author && <span>by {post.author}</span>}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.categories.slice(0, 3).map((category) => (
              <span key={category} className="px-2 py-1 text-xs bg-teal-500/20 text-teal-300 rounded-full">
                {category}
              </span>
            ))}
          </div>
        )}

        <p className="line-clamp-3 text-white/80">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-block font-medium text-teal-300 underline-offset-4 hover:underline transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">No Blog Posts Found</h3>
        <p className="text-white/80 mb-4">
          We're working on bringing you insightful content about numerology and oracle wisdom.
        </p>
        <p className="text-white/60 text-sm">
          Check back soon for articles on numerology, oracle readings, and spiritual guidance.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur-sm animate-pulse">
          <div className="h-48 w-full bg-white/10 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/10 rounded-full w-16"></div>
              <div className="h-6 bg-white/10 rounded-full w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function BlogPosts() {
  console.log("=== BLOG POSTS COMPONENT RENDER ===")

  const posts = await getBlogPosts()

  console.log("BlogPosts component: Posts received:", {
    count: posts.length,
    titles: posts.map((p) => p.title),
  })

  if (!posts.length) {
    return <EmptyState />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-white/80 text-lg">
          Discover {posts.length} insightful {posts.length === 1 ? "article" : "articles"} about numerology, oracle
          wisdom, and spiritual guidance.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// Export a loading component for Suspense boundaries
export function BlogPostsLoading() {
  return <LoadingState />
}
