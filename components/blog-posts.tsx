"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CalendarIcon,
  UserIcon,
  FolderIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  SearchIcon,
  ClockIcon,
} from "lucide-react"
import type { BlogPost } from "@/types/blog"

interface BlogPostsResponse {
  posts: BlogPost[]
  total: number
  success: boolean
  error?: string
  timestamp: string
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  const fetchPosts = async (search?: string, category?: string) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (category) params.append("category", category)

      const response = await fetch(`/api/blog?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch posts")

      const data: BlogPostsResponse = await response.json()

      if (data.error) throw new Error(data.error)

      setPosts(data.posts)

      // Extract unique categories
      const allCategories = data.posts.flatMap((post) => post.categories)
      setCategories([...new Set(allCategories)])
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchPosts(searchTerm, selectedCategory)
  }

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
    fetchPosts(searchTerm, category)
  }

  const handleRetry = () => {
    fetchPosts(searchTerm, selectedCategory)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryFilter(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="font-medium text-yellow-800">Error loading blog posts</p>
              <p className="text-sm text-yellow-700 mt-1">{error}</p>
            </div>
            <Button onClick={handleRetry} variant="outline" size="sm" className="ml-4">
              <RefreshCwIcon className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Blog Posts Grid */}
      {posts.length === 0 && !loading ? (
        <div className="text-center py-12">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Blog Posts Found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory
              ? "Try adjusting your search or filter criteria."
              : "Check back later for new articles on numerology and spiritual wisdom."}
          </p>
          {(searchTerm || selectedCategory) && (
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
                fetchPosts()
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={post.featuredImage || "/images/placeholder/generic-blog-fallback.png"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/placeholder/generic-blog-fallback.png"
                    }}
                  />
                </div>
              </Link>

              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <CalendarIcon className="h-4 w-4" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-gray-400">•</span>
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readingTime} min</span>
                </div>

                <CardTitle className="line-clamp-2 group-hover:text-purple-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>

                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {post.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.categories.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <UserIcon className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
