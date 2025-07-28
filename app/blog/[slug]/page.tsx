import { getBlogPostBySlug } from "@/lib/enhanced-blog-system" // Assuming this function exists
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
          {post.imageUrl && (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg md:h-96">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-50 lg:text-5xl">{post.title}</h1>
          <div className="text-sm text-gray-400">
            By {post.author} on {format(new Date(post.date), "MMMM dd, yyyy")}
          </div>
        </div>
        <div
          className="prose prose-invert max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
