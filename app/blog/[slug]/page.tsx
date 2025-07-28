import { getPostBySlug, getAllPosts } from "@/lib/content"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import { ClientImage } from "@/components/client-image"
import { remark } from "remark"
import html from "remark-html"
import type { Post } from "@/lib/content" // Import Post type for clarity

export async function generateStaticParams() {
  const postsData: Post[] | undefined = await getAllPosts() // Added await

  if (!Array.isArray(postsData)) {
    console.warn(
      `[generateStaticParams /blog/[slug]] Warning: getAllPosts() did not return an array. Received type: ${typeof postsData}. Value:`,
      postsData,
      "No static paths will be generated for blog posts.",
    )
    return []
  }

  const params = postsData
    .filter((post) => {
      const isValid = post && typeof post.slug === "string" && post.slug.trim() !== ""
      if (!isValid) {
        console.warn(
          `[generateStaticParams /blog/[slug]] Warning: Invalid post data or missing/empty slug found in postsData. Post:`,
          post,
        )
      }
      return isValid
    })
    .map((post) => ({ slug: post.slug }))

  return params
}

async function markdownToHtml(markdownContent: string): Promise<string> {
  if (typeof markdownContent !== "string") {
    console.warn("[markdownToHtml] Received non-string content, returning empty string.")
    return ""
  }
  // Process the content to preserve HTML tags
  const processedContent = markdownContent.replace(/<div class="video-container.*?<\/div>/gs, (match) => {
    return "<!-- HTML_PLACEHOLDER -->" + encodeURIComponent(match) + "<!-- /HTML_PLACEHOLDER -->"
  })

  // Convert markdown to HTML using remark
  const result = await remark().use(html).process(processedContent)
  let htmlResult = result.toString()

  // Restore HTML tags
  htmlResult = htmlResult.replace(/<!-- HTML_PLACEHOLDER -->(.*?)<!-- \/HTML_PLACEHOLDER -->/gs, (_, encoded) => {
    return decodeURIComponent(encoded)
  })

  return htmlResult
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug) // Added await

  if (!post || typeof post.content !== "string") {
    console.warn(`[BlogPost] Post not found or content is invalid for slug: ${params.slug}. Post data:`, post)
    notFound()
    return null // Return null after notFound to ensure component stops rendering
  }

  const htmlContent = await markdownToHtml(post.content)

  const featuredImage = post.featuredImage || null

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>

      <article className="bg-black/30 rounded-lg overflow-hidden border border-purple-900/30">
        {featuredImage && (
          <div className="relative h-[300px] w-full">
            <ClientImage
              src={featuredImage}
              alt={post.title}
              fallbackSrc="/gifts-of-danu.png" // Ensure this fallback image exists
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Corrected: Use post.categories (array) instead of post.category (string) */}
            {post.categories && post.categories.length > 0 && (
              <span className="bg-purple-900/50 text-purple-200 text-xs px-3 py-1 rounded-full">
                {post.categories[0]} {/* Displaying the first category */}
              </span>
            )}
            {post.tags &&
              post.tags.map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-400 mb-8">
            <Calendar className="h-4 w-4 mr-1" />
            {/* Corrected: Use post.createdAt instead of post.date */}
            <span className="mr-4">{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>By {post.author}</span>
          </div>

          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <div className="mt-12 pt-6 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400 mr-2">Share this article:</span>
                {/* Consider implementing actual share functionality or using a sharing component */}
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/blog" className="text-purple-400 hover:text-purple-300">
                View all articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
