import { getBlogPostBySlug } from "@/lib/enhanced-blog-system"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post does not exist.",
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 150) + "...", // Use first 150 chars as description
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 150) + "...",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        {post.imageUrl && (
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-lg">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold leading-tight mb-2">{post.title}</CardTitle>
          <CardDescription className="flex items-center text-muted-foreground text-sm">
            <User className="h-4 w-4 mr-1" /> {post.author}
            <Calendar className="h-4 w-4 ml-4 mr-1" /> {new Date(post.publishedDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  )
}
