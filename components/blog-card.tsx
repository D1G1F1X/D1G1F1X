"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    author: string
    image: string
    category: string
    tags: string[]
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imageSrc, setImageSrc] = useState(
    post.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(post.category)}`,
  )

  const handleImageError = () => {
    setImageSrc(`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(post.category)}`)
  }

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-700/50 hover:border-primary-500/50 relative">
      {/* Futuristic digital pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="binaryGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="binary3" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="10" className="text-xs" fill="url(#binaryGradient3)">
              10110101
            </text>
            <text x="0" y="20" className="text-xs" fill="url(#binaryGradient3)">
              01101001
            </text>
            <text x="0" y="30" className="text-xs" fill="url(#binaryGradient3)">
              11010110
            </text>
            <text x="0" y="40" className="text-xs" fill="url(#binaryGradient3)">
              00101101
            </text>
            <text x="0" y="50" className="text-xs" fill="url(#binaryGradient3)">
              10110010
            </text>
            <text x="0" y="60" className="text-xs" fill="url(#binaryGradient3)">
              01011010
            </text>
            <text x="0" y="70" className="text-xs" fill="url(#binaryGradient3)">
              11001010
            </text>
            <text x="0" y="80" className="text-xs" fill="url(#binaryGradient3)">
              01101001
            </text>
            <text x="0" y="90" className="text-xs" fill="url(#binaryGradient3)">
              10101100
            </text>
            <text x="0" y="100" className="text-xs" fill="url(#binaryGradient3)">
              01010011
            </text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#binary3)" />
        </svg>
      </div>

      <div className="h-48 bg-gray-900/80 relative overflow-hidden">
        <div className="w-full h-full relative">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <img
          src={`/abstract-geometric-shapes.png?height=192&width=300&query=${encodeURIComponent(post.title + " subtle overlay pattern")}`}
          alt="" // Decorative, as it's an overlay
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary-500 text-white">{post.category}</Badge>
        </div>

        {/* Hover effect overlay */}
        <img
          src={`/abstract-geometric-shapes.png?height=192&width=300&query=${encodeURIComponent(post.title + " abstract hover pattern")}`}
          alt="Decorative hover pattern"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        />
      </div>

      <div className="p-6 relative">
        <div className="flex items-center text-sm text-gray-200 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1 text-primary-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-primary-400" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-white mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-gray-200 border-gray-700 bg-gray-900/50 group-hover:border-primary-500/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors"
        >
          Read more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        >
          <rect x="32" y="32" width="32" height="32" fill="url(#techGradient3)" />
          <defs>
            <linearGradient id="techGradient3" x1="32" y1="32" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
