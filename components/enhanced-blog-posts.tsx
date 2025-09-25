"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { blogSystem } from "@/lib/enhanced-blog-system"
import type { Post } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Tag, ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPostsState {
  posts: Post[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  hasMore: boolean
  selectedCategory: string | null
  selectedTag: string | null
}

export default function EnhancedBlogPosts() {
  const [state, setState] = useState<BlogPostsState>({
    posts: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    selectedCategory: null,
    selectedTag: null,
  })

  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    loadPosts()
  }, [state.currentPage, state.selectedCategory, state.selectedTag])

  const loadPosts = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const result = await blogSystem.fetchPosts({
        limit: 10,
        offset: (state.currentPage - 1) * 10,
        category: state.selectedCategory || undefined,
        tag: state.selectedTag || undefined,
        published: true,
      })

      // Extract unique categories and tags
      const allCategories = new Set<string>()
      const allTags = new Set<string>()

      result.posts.forEach((post) => {
        post.categories?.forEach((cat) => allCategories.add(cat))
        post.tags?.forEach((tag) => allTags.add(tag))
      })

      setCategories(Array.from(allCategories))
      setTags(Array.from(allTags))

      setState((prev) => ({
        ...prev,
        posts: result.posts,
        loading: false,
        totalPages: Math.ceil(result.total / 10),
        hasMore: result.hasMore,
      }))
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load blog posts. Please try again later.",
      }))
    }
  }

  const handleCategoryFilter = (category: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedCategory: category,
      selectedTag: null,
      currentPage: 1,
    }))
  }

  const handleTagFilter = (tag: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedTag: tag,
      selectedCategory: null,
      currentPage: 1,
    }))
  }

  const handlePageChange = (page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString))
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  if (state.loading && state.posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        <p className="text-white/80 mt-4">Loading blog posts...</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-300 mb-4">{state.error}</p>
          <Button onClick={loadPosts} variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-900/30">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (state.posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/80 text-lg">No blog posts found.</p>
        {(state.selectedCategory || state.selectedTag) && (
          <Button
            onClick={() => handleCategoryFilter(null)}
            variant="outline"
            className="mt-4 border-purple-500/30 text-purple-300 hover:bg-purple-900/30"
          >
            Clear Filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => handleCategoryFilter(null)}
            variant={state.selectedCategory === null ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              variant={state.selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {(state.selectedCategory || state.selectedTag) && (
        <div className="flex items-center justify-center gap-2 text-sm text-white/60">
          <span>Filtered by:</span>
          {state.selectedCategory && (
            <Badge variant="secondary" className="bg-purple-900/30 text-purple-300">
              {state.selectedCategory}
            </Badge>
          )}
          {state.selectedTag && (
            <Badge variant="secondary" className="bg-blue-900/30 text-blue-300">
              #{state.selectedTag}
            </Badge>
          )}
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {state.posts.map((post) => (
          <article
            key={post.id}
            className="group space-y-4 rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10"
          >
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative overflow-hidden rounded-md">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    // Try fallback images in order
                    if (target.src.includes('mystical-sword-symbolism')) {
                      target.src = "/images/blog/generated/spiritual-significance-cauldron-symbol.png"
                    } else if (target.src.includes('sacred-cord-symbolism')) {
                      target.src = "/images/blog/generated/understanding-five-elements-numerology.png"
                    } else {
                      target.src = "/images/blog/cauldron-symbolism.png"
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Post Content */}
            <div className="space-y-3">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-xs bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 cursor-pointer"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{getReadingTime(post.content)}</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="line-clamp-3 text-white/80 leading-relaxed">{post.excerpt}</p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagFilter(tag)}
                      className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block font-medium text-teal-300 underline-offset-4 hover:underline transition-colors group-hover:text-teal-200"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {state.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            variant="outline"
            size="sm"
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, state.totalPages) }, (_, i) => {
              const pageNum = i + 1
              const isActive = pageNum === state.currentPage

              return (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={isActive ? "bg-purple-600 text-white" : "border-white/20 text-white/80 hover:bg-white/10"}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === state.totalPages}
            variant="outline"
            size="sm"
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {state.loading && state.posts.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
        </div>
      )}
    </div>
  )
}
