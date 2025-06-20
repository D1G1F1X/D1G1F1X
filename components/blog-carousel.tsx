"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon } from "lucide-react"
import type { BlogPost } from "@/types/blog"

interface BlogCarouselProps {
  maxPosts?: number
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function BlogCarousel({ maxPosts = 5, autoPlay = true, autoPlayInterval = 5000 }: BlogCarouselProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch("/api/blog?featured=true")
        if (!response.ok) throw new Error("Failed to fetch featured posts")

        const data = await response.json()
        setPosts(data.posts.slice(0, maxPosts))
      } catch (err) {
        console.error("Error fetching featured posts:", err)
        setError("Failed to load featured posts")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPosts()
  }, [maxPosts])

  useEffect(() => {
    if (!autoPlay || posts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, posts.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length)
  }

  if (loading) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading featured posts...</div>
        </div>
      </div>
    )
  }

  if (error || posts.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="mb-2">No featured posts available</p>
          <Link href="/blog" className="text-purple-600 hover:text-purple-700">
            View all posts →
          </Link>
        </div>
      </div>
    )
  }

  const currentPost = posts[currentIndex]

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg group">
      {/* Main Slide */}
      <div className="relative w-full h-full">
        <Image
          src={currentPost.featuredImage || "/images/placeholder/generic-blog-fallback.png"}
          alt={currentPost.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2 flex items-center gap-2 text-sm opacity-90">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(currentPost.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-white/60">•</span>
            <ClockIcon className="h-4 w-4" />
            <span>{currentPost.readingTime} min read</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
            <Link href={`/blog/${currentPost.slug}`} className="hover:text-purple-300 transition-colors">
              {currentPost.title}
            </Link>
          </h3>

          <p className="text-gray-200 mb-4 line-clamp-2">{currentPost.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {currentPost.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {category}
                </Badge>
              ))}
            </div>

            <Link
              href={`/blog/${currentPost.slug}`}
              className="inline-flex items-center text-purple-300 hover:text-purple-200 font-medium transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous post"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next post"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
