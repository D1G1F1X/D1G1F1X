import { notFound } from "next/navigation"
import { blogManager } from "@/lib/blog-manager"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, UserIcon, EyeIcon } from "lucide-react"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogManager.getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | NUMO Oracle",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.seoTitle || `${post.title} | NUMO Oracle`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogManager.getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-purple-600/20 text-purple-300 border-purple-500/30"
              >
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              <span>{post.viewCount} views</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-gray-300 border-gray-600">
                  #{tag}
                </Badge>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  )
}
