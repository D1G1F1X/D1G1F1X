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
 * Fetch blog posts from the API route.
 */
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Use absolute URL for server-side rendering
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const apiUrl = `${baseUrl}/api/blog`
    console.log(`Client: Attempting to fetch blog posts from: ${apiUrl}`)

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      console.error(`Client: Failed to fetch blog posts: ${res.status} ${res.statusText}`)
      const errorBody = await res.text()
      console.error("Client: Response body:", errorBody)
      return []
    }

    const data = (await res.json()) as { posts: BlogPost[] }
    console.log("Client: Successfully fetched blog data:", {
      postsCount: data.posts?.length || 0,
      firstPost: data.posts?.[0]?.title || "None",
    })

    const posts = data.posts ?? []
    if (posts.length === 0) {
      console.warn("Client: Fetched blog data contains no posts. The API might be returning an empty array.")
    }

    return posts
  } catch (error) {
    console.error("Client: Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPosts() {
  const posts = await getBlogPosts()

  if (!posts.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-white/80 mb-4">No blog posts found. Check back later.</p>
        <p className="text-white/60 text-sm">
          If you're seeing this message, there might be an issue with loading the blog content.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur-sm">
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
      ))}
    </div>
  )
}
