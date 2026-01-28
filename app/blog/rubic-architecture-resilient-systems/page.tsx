"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"
import BlogPostContent from "@/components/blog-post-content"

export default function RUBICArcitectureBlogPost() {
  const post = {
    id: "rubic-architecture-resilient-systems",
    title: "Building Resilient Systems with RUBIC Architecture: Boundary-First Design",
    excerpt:
      "Learn how RUBIC's reversible unified boundary integration creates systems that are inherently more resilient, maintainable, and efficient.",
    date: "November 3, 2025",
    author: "Chris Phillips",
    image: "/images/blog/rubic-architecture-resilient.jpg",
    category: "Research & Development",
    tags: ["RUBIC", "System Architecture", "Resilience", "Reversibility"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=RUBIC architecture resilient boundary design`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-96 h-96 bg-emerald-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-400 font-medium mb-8 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50">
            <div className="h-80 bg-gray-900/80 relative overflow-hidden">
              <ImageWithFallback
                src={post.image || placeholderImage}
                alt={post.title}
                fallbackSrc={placeholderImage}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary-500 text-white">{post.category}</Badge>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-8 flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <BlogPostContent>
                <p className="text-gray-100 mb-6 text-base leading-relaxed">{post.excerpt}</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Rethinking System Architecture</h2>
                <p className="text-gray-100 mb-6 text-base leading-relaxed">
                  Traditional systems often fail at boundaries—where different components interact. RUBIC (Reversible
                  Unified Boundary Integration Computing) prioritizes these boundaries, creating inherently more
                  resilient architectures.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Boundary-First Philosophy</h2>
                <p className="text-gray-100 mb-6 text-base leading-relaxed">
                  Instead of designing components first and connecting them later, RUBIC starts with boundary design.
                  This approach ensures clean interfaces, predictable interactions, and graceful degradation.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Reversibility as a Feature</h2>
                <p className="text-gray-100">
                  RUBIC systems are reversible by design. Operations can be undone, states can be replayed, and errors
                  can be corrected without cascading failures. This fundamentally changes how we think about resilience.
                </p>

                <h2 className="text-white">Practical Applications</h2>
                <p className="text-gray-100">
                  Financial systems, medical devices, and critical infrastructure all benefit from RUBIC's approach. The
                  cost of failure in these domains makes RUBIC's resilience requirements non-negotiable.
                </p>

                <h2 className="text-white">The Resilience Revolution</h2>
                <p className="text-gray-100">
                  Organizations adopting RUBIC architecture report 85% fewer critical failures and dramatically faster
                  recovery times. This is the future of system design in high-consequence environments.
                </p>
              </BlogPostContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
