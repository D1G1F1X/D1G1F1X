"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { blogSystem } from "@/lib/enhanced-blog-system"
import type { Post } from "@/lib/content"

interface BlogCarouselProps {
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function BlogCarousel({ autoPlay = true, autoPlayInterval = 5000 }: BlogCarouselProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCarouselPosts()
  }, [])

  useEffect(() => {
    if (!autoPlay || posts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, posts.length])

  const fetchCarouselPosts = async () => {
    try {
      setLoading(true)
      const carouselPosts = await blogSystem.getCarouselPosts()
      setPosts(carouselPosts)
    } catch (err) {
      console.error("Error fetching carousel posts:", err)
      setError("Failed to load featured posts")
    } finally {
      setLoading(false)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(dateString))
    } catch {
      return "Recent"
    }
  }

  if (loading) {
    return (
      <div className="relative h-96 bg-white/5 rounded-lg animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg" />
      </div>
    )
  }

  if (error || !posts.length) {
    return (
      <div className="relative h-96 bg-white/5 rounded-lg flex items-center justify-center">
        <p className="text-white/70">{error || "No featured posts available"}</p>
      </div>
    )
  }

  const currentPost = posts[currentIndex]

  return (
    <div className="relative h-96 rounded-lg overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        {currentPost.featuredImage ? (
          <Image
            src={currentPost.featuredImage || "/placeholder.svg"}
            alt={currentPost.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-8">
        <div className="space-y-4 max-w-2xl">
          {/* Categories */}
          {currentPost.categories && currentPost.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentPost.categories.slice(0, 2).map((category) => (
                <Badge key={category} className="bg-purple-500/30 text-purple-200 border-purple-400/30">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            <Link href={`/blog/${currentPost.slug}`} className="hover:text-purple-300 transition-colors">
              {currentPost.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-white/90 text-lg leading-relaxed line-clamp-2">{currentPost.excerpt}</p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-white/70">
              <span>{formatDate(currentPost.createdAt)}</span>
              <span>•</span>
              <span>By {currentPost.author}</span>
            </div>
            <Link
              href={`/blog/${currentPost.slug}`}
              className="inline-flex items-center px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
