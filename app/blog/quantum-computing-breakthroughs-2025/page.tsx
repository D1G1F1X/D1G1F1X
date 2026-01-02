"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function QuantumBreakthroughsBlogPost() {
  const post = {
    id: "quantum-computing-breakthroughs-2025",
    title: "Quantum Computing Breakthroughs: Practical Applications in 2025",
    excerpt:
      "Discover the latest advancements in quantum computing and how organizations are translating theoretical breakthroughs into real-world applications.",
    date: "May 18, 2025",
    author: "Chris Phillips",
    image: "/images/blog/quantum-computing-breakthroughs.jpg",
    category: "Research & Development",
    tags: ["Quantum Computing", "Research", "Innovation", "Technology"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=quantum computing breakthroughs`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="quantum" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="20" className="text-xs" fill="url(#quantumGradient)">
              quantum
            </text>
            <text x="0" y="40" className="text-xs" fill="url(#quantumGradient)">
              computing
            </text>
            <text x="0" y="60" className="text-xs" fill="url(#quantumGradient)">
              revolution
            </text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#quantum)" />
        </svg>
      </div>

      <div className="absolute top-40 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-400 font-medium mb-8 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 hover:border-blue-500/20 transition-all duration-500">
            <div className="h-80 bg-gray-900/80 relative overflow-hidden">
              <ImageWithFallback
                src={post.image || placeholderImage}
                alt={post.title}
                fallbackSrc={placeholderImage}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600 text-white">{post.category}</Badge>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-8">
                <div className="flex items-center mr-6">
                  <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-100 mb-6 text-lg">{post.excerpt}</p>

                <h2>The Quantum Era Arrives</h2>
                <p>
                  2025 marks a pivotal moment in quantum computing history. What was once purely theoretical is now
                  delivering measurable business value. Major tech companies, financial institutions, and research
                  organizations are moving beyond proof-of-concept and deploying quantum solutions to real problems.
                </p>

                <h2>Quantum Advantage in Drug Discovery</h2>
                <p>
                  One of the most significant breakthroughs has been in pharmaceutical research. Quantum computers are
                  now simulating molecular interactions with unprecedented accuracy, reducing drug discovery timelines
                  from years to months. This advancement alone could accelerate our ability to respond to health crises.
                </p>

                <h2>Financial Modeling Transformed</h2>
                <p>
                  In finance, quantum algorithms are revolutionizing portfolio optimization and risk analysis.
                  Institutions are using quantum computing to model thousands of scenarios simultaneously, leading to
                  better investment strategies and risk management.
                </p>

                <h2>The Hybrid Future</h2>
                <p>
                  Most practical applications today use hybrid approaches, combining classical and quantum computing.
                  This balanced strategy leverages the strengths of both paradigms while managing quantum's current
                  limitations.
                </p>

                <h2>Challenges Remain</h2>
                <p>
                  Error correction, scalability, and temperature stability remain significant challenges. However,
                  progress is accelerating, and solutions are emerging faster than predicted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
