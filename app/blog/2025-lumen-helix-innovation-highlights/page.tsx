"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function LumenHelixHighlightsBlogPost() {
  const post = {
    id: "2025-lumen-helix-innovation-highlights",
    title: "2025 in Review: Lumen Helix Innovation Highlights and What's Ahead",
    excerpt:
      "Reflect on our major achievements, research breakthroughs, and project milestones from 2025, and explore our vision for the future.",
    date: "December 1, 2025",
    author: "Chris Phillips",
    image: "/images/blog/2025-innovation-highlights.jpg",
    category: "Company Updates",
    tags: ["Year in Review", "Innovation", "Research", "Future Vision"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=2025 innovation highlights research breakthroughs`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-orange-400 font-medium mb-8 hover:text-orange-300 transition-colors"
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
                <Badge className="bg-orange-600 text-white">{post.category}</Badge>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-8">
                <div className="flex items-center mr-6">
                  <Calendar className="h-5 w-5 mr-2 text-orange-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-100 mb-6 text-lg">{post.excerpt}</p>

                <h2>A Year of Transformation</h2>
                <p>
                  2025 has been extraordinary for Lumen Helix Solutions. From groundbreaking research to innovative
                  client projects, we've pushed the boundaries of what's possible in quantum computing, AI, and
                  sustainable technology.
                </p>

                <h2>Research Breakthroughs</h2>
                <p>
                  Our R&D team published four major peer-reviewed papers on Cauldron, RUBIC, and NUMO Field frameworks.
                  These contributions have influenced academic research and industry practices worldwide.
                </p>

                <h2>Project Milestones</h2>
                <p>
                  Key projects including M.E.L.T., OIQ, and the NUMO Oracle Cards platform achieved major functionality
                  milestones. Client feedback has been overwhelmingly positive, with retention rates exceeding 98%.
                </p>

                <h2>Team Growth</h2>
                <p>
                  We expanded our team with top talent in quantum computing, AI ethics, and reversible architecture
                  design. Our growing team reflects our commitment to advancing the field.
                </p>

                <h2>Looking Forward to 2026</h2>
                <p>
                  2026 promises even greater innovations. We're launching new research initiatives, expanding into new
                  markets, and pushing toward quantum advantage in practical applications. Join us on this exciting
                  journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
