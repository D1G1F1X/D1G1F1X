import Link from "next/link"
import Image from "next/image"

/**
 * Shape returned by /api/blog
 * Extend this interface only if the API starts returning more fields.
 */
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  date?: string
}

/**
 * Fetch blog posts from the existing API route.
 * If the request fails, we return an empty array so the UI can
 * render an informative “no posts” message instead of crashing.
 */
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/blog`, {
      // Revalidate every minute so content stays fresh but fast.
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error("Failed to fetch blog posts:", res.statusText)
      return []
    }

    const { posts } = (await res.json()) as { posts: BlogPost[] }
    return posts ?? []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPosts() {
  const posts = await getBlogPosts()

  if (!posts.length) {
    return <p className="py-20 text-center text-white/80">No blog posts found. Check back later.</p>
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur-sm">
          {post.coverImage && (
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={600}
              height={400}
              className="h-48 w-full rounded-md object-cover"
            />
          )}

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            {post.date && (
              <time dateTime={post.date} className="block text-sm text-white/60">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(new Date(post.date))}
              </time>
            )}

            <p className="line-clamp-3 text-white/80">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-block font-medium text-teal-300 underline-offset-4 hover:underline"
            >
              Read more →
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
