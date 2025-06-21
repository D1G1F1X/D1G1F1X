"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { blogSystem } from "@/lib/enhanced-blog-system"
import type { Post } from "@/lib/content"

interface EnhancedBlogPostsProps {
  initialPosts?: Post[]
  showPagination?: boolean
  postsPerPage?: number
  category?: string
  tag?: string
}

export default function EnhancedBlogPosts({
  initialPosts = [],
  showPagination = true,
  postsPerPage = 10,
  category,
  tag,
}: EnhancedBlogPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [loading, setLoading] = useState(!initialPosts.length)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (!initialPosts.length) {
      fetchPosts()
    }
  }, [currentPage, category, tag])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const offset = (currentPage - 1) * postsPerPage
      const result = await blogSystem.fetchPosts({
        limit: postsPerPage,
        offset,
        category,
        tag,
        published: true,
      })

      setPosts(result.posts)
      setTotalPosts(result.total)
      setHasMore(result.hasMore)
    } catch (err) {
      console.error("Error fetching blog posts:", err)
      setError("Failed to load blog posts. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Smooth scroll to top of blog section
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(dateString))
    } catch {
      return "Recently"
    }
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  if (loading && !posts.length) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <Skeleton className="h-48 w-full rounded-md bg-white/10" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-3/4 bg-white/10" />
              <Skeleton className="h-4 w-1/2 bg-white/10" />
              <Skeleton className="h-20 w-full bg-white/10" />
              <Skeleton className="h-4 w-1/3 bg-white/10" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={fetchPosts} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="text-center py-20">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">No Posts Found</h3>
          <p className="text-white/70">
            {category || tag
              ? `No posts found for the selected ${category ? "category" : "tag"}.`
              : "No blog posts are currently available. Check back later for new content."}
          </p>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage)

  return (
    <div className="space-y-8">
      {/* Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
              <CardHeader className="p-0">
                {post.featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>{getReadingTime(post.content)}</span>
                </div>

                {/* Excerpt */}
                <p className="text-white/80 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                {/* Author */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-white/60">By {post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-white/50">+{post.tags.length - 3} more</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-8">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className={
                    currentPage === pageNum
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-white/20 text-white hover:bg-white/10"
                  }
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-white/60 text-sm">
        Showing {(currentPage - 1) * postsPerPage + 1} to {Math.min(currentPage * postsPerPage, totalPosts)} of{" "}
        {totalPosts} posts
      </div>
    </div>
  )
}
