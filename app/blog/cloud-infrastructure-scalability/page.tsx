"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function CloudInfrastructureBlogPost() {
  const post = {
    id: "cloud-infrastructure-scalability",
    title: "Cloud Infrastructure and Scalability: Building for the Future",
    excerpt:
      "Understand modern cloud architecture patterns and strategies for building scalable systems that grow with your organization's needs.",
    date: "August 10, 2025",
    author: "Chris Phillips",
    image: "/images/blog/cloud-infrastructure-scalability.jpg",
    category: "Cloud Computing",
    tags: ["Cloud Architecture", "Scalability", "Infrastructure", "DevOps"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=cloud infrastructure scalability`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-cyan-400 font-medium mb-8 hover:text-cyan-300 transition-colors"
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
                <Badge className="bg-cyan-600 text-white">{post.category}</Badge>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-8">
                <div className="flex items-center mr-6">
                  <Calendar className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-100 mb-6 text-lg">{post.excerpt}</p>

                <h2>Scalability as a Strategic Asset</h2>
                <p>
                  Modern businesses must handle unpredictable growth. Cloud infrastructure enables organizations to
                  scale seamlessly, paying only for resources used while maintaining performance.
                </p>

                <h2>Architecture Patterns for Scale</h2>
                <p>
                  Microservices, containerization, and serverless computing have revolutionized how we build scalable
                  systems. Each pattern offers unique advantages for different workloads.
                </p>

                <h2>Distributed Database Strategies</h2>
                <p>
                  Scaling databases requires careful planning. Techniques like sharding, replication, and distributed
                  transactions enable databases to handle massive scale while maintaining consistency.
                </p>

                <h2>Monitoring and Observability</h2>
                <p>
                  As systems scale, visibility becomes critical. Advanced monitoring and observability tools allow teams
                  to maintain performance and reliability at scale.
                </p>

                <h2>Future-Proofing Infrastructure</h2>
                <p>
                  The best scalable systems are built with flexibility in mind. Organizations should design
                  infrastructure that adapts to future needs without complete overhauls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
