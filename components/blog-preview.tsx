"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ClientImage } from "@/components/client-image"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  createdAt: string
  isPublished: boolean
  featuredImage?: string
}

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        // Filter published posts and take the latest 3
        const publishedPosts = data
          .filter((post: BlogPost) => post.isPublished)
          .sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
        setPosts(publishedPosts)
      } catch (err) {
        setError("Error loading blog posts")
        console.error("Error fetching posts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return null // Hide section on error
  }

  if (posts.length === 0) {
    return null // Hide section if no posts
  }

  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest from Our Blog</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover insights, announcements, and wisdom from the world of NUMO Oracle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-black/50 border-purple-800/30 overflow-hidden flex flex-col">
              {post.featuredImage && (
                <div className="h-48 relative">
                  <ClientImage
                    src={post.featuredImage}
                    alt={post.title}
                    fallbackSrc="/gifts-of-danu.png"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-purple-400 transition">
                    {post.title}
                  </Link>
                </CardTitle>
                {/* Fix: Replace CardDescription (which uses <p>) with a custom div */}
                <div className="text-gray-400 text-sm">
                  <div className="flex items-center gap-2 mt-1">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 flex-grow">
                <p className="line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-purple-800/50 hover:bg-purple-800/20 text-purple-400"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View All Blog Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
