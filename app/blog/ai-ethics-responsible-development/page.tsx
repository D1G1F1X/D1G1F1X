"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function AIEthicsBlogPost() {
  const post = {
    id: "ai-ethics-responsible-development",
    title: "AI Ethics and Responsible Development: Frameworks for Ethical Innovation",
    excerpt:
      "Learn best practices for developing artificial intelligence systems with ethical considerations at the core, ensuring responsible innovation.",
    date: "July 12, 2025",
    author: "Chris Phillips",
    image: "/images/blog/ai-ethics-responsible.jpg",
    category: "AI",
    tags: ["AI Ethics", "Responsible AI", "Governance", "Ethics"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=AI ethics responsible development`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-96 h-96 bg-amber-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-amber-400 font-medium mb-8 hover:text-amber-300 transition-colors"
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
                <Badge className="bg-amber-600 text-white">{post.category}</Badge>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-8">
                <div className="flex items-center mr-6">
                  <Calendar className="h-5 w-5 mr-2 text-amber-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-amber-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-100 mb-6 text-lg">{post.excerpt}</p>

                <h2>The Ethics Imperative</h2>
                <p>
                  As AI systems influence critical decisions in healthcare, finance, and justice, ethical considerations
                  must move from afterthought to core design principle. Organizations building AI responsibly gain
                  competitive advantage and trust.
                </p>

                <h2>Key Ethical Frameworks</h2>
                <p>
                  Transparency, fairness, accountability, and privacy form the foundation of responsible AI. Each must
                  be intentionally designed into systems from inception.
                </p>

                <h2>Bias Detection and Mitigation</h2>
                <p>
                  Identifying and eliminating bias requires diverse teams, rigorous testing, and continuous monitoring.
                  This is not a one-time task but an ongoing commitment.
                </p>

                <h2>Governance and Oversight</h2>
                <p>
                  Effective AI governance includes clear accountability structures, human oversight mechanisms, and
                  regular audits to ensure systems perform as intended and ethically.
                </p>

                <h2>Building Trust</h2>
                <p>
                  Organizations that prioritize ethics gain stakeholder trust and build competitive moats. The future
                  belongs to companies that innovate responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
