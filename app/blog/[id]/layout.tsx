import type React from "react"
import type { Metadata } from "next"
import { posts } from "@/lib/blog"

interface BlogLayoutProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Lumen Helix Solutions Blog`,
    description: post.excerpt,
    keywords: [post.category, "tech blog", "insights", "consulting"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://lumenhelix.com/blog/${post.id}`,
      images: [
        {
          url: `/placeholder.svg?height=630&width=1200&query=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>
}
