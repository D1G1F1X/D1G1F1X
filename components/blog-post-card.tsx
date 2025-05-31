"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogPostCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    author: string
    image: string
    category: string
    tags?: string[]
  }
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [imageSrc, setImageSrc] = useState(
    post.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(post.category)}`,
  )

  const handleImageError = () => {
    setImageSrc(`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(post.category)}`)
  }

  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-800/50 hover:border-primary-500/50 relative flex flex-col h-full transform hover:-translate-y-1">
      {/* Futuristic digital pattern background */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity duration-500">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="binaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="binary" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="10" className="text-xs" fill="url(#binaryGradient)">
              10110101
            </text>
            <text x="0" y="20" className="text-xs" fill="url(#binaryGradient)">
              01101001
            </text>
            <text x="0" y="30" className="text-xs" fill="url(#binaryGradient)">
              11010110
            </text>
            <text x="0" y="40" className="text-xs" fill="url(#binaryGradient)">
              00101101
            </text>
            <text x="0" y="50" className="text-xs" fill="url(#binaryGradient)">
              10110010
            </text>
            <text x="0" y="60" className="text-xs" fill="url(#binaryGradient)">
              01011010
            </text>
            <text x="0" y="70" className="text-xs" fill="url(#binaryGradient)">
              11001010
            </text>
            <text x="0" y="80" className="text-xs" fill="url(#binaryGradient)">
              01101001
            </text>
            <text x="0" y="90" className="text-xs" fill="url(#binaryGradient)">
              10101100
            </text>
            <text x="0" y="100" className="text-xs" fill="url(#binaryGradient)">
              01010011
            </text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#binary)" />
        </svg>
      </div>

      <div className="h-52 bg-gray-800/90 relative overflow-hidden">
        <div className="w-full h-full relative">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={handleImageError}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>

        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-primary-500 text-white">{post.category}</Badge>
        </div>

        {/* Digital overlay effect */}
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
          <div className="w-full h-1 bg-primary-400/50 animate-[scanline_3s_linear_infinite] blur-[1px]"></div>
        </div>
      </div>

      <div className="p-6 relative flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1 text-primary-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-primary-400" />
            <span>{post.author}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-300 mb-5 line-clamp-3 flex-grow">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-gray-300 border-gray-700 bg-gray-800/50 group-hover:border-primary-500/30 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-gray-300 border-gray-700 bg-gray-800/50 group-hover:border-primary-500/30 transition-colors"
              >
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors mt-auto"
        >
          Read more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        >
          <rect x="48" y="48" width="48" height="48" fill="url(#techGradient)" />
          <defs>
            <linearGradient id="techGradient" x1="48" y1="48" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
