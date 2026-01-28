"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"
import BlogPostContent from "@/components/blog-post-content"

export default function ReversibleComputingBlogPost() {
  const post = {
    id: "reversible-computing-future",
    title: "The Future of Reversible Computing: Energy Efficiency and Sustainability",
    excerpt:
      "Explore how reversible computing architectures promise to revolutionize data processing with minimal energy consumption and environmental impact.",
    date: "June 15, 2025",
    author: "Chris Phillips",
    image: "/images/blog/reversible-computing-future.jpg",
    category: "Research & Development",
    tags: ["Reversible Computing", "Sustainability", "Energy Efficiency", "Architecture"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&query=reversible computing energy efficient`

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-400 font-medium mb-8 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 hover:border-primary-500/20 transition-all duration-500">
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
                <p>{post.excerpt}</p>

                <h2>Computing's Energy Crisis</h2>
                <p>
                  Data centers consume approximately 1% of global electricity. As computational demands grow, this
                  figure threatens to explode. Reversible computing offers a fundamental solution by operating without
                  generating heat waste.
                </p>

                <h2>How Reversible Computing Works</h2>
                <p>
                  Unlike traditional computing, which requires energy dissipation at each step, reversible computing
                  performs operations that theoretically can be reversed—like rewinding a movie. This eliminates the
                  thermodynamic losses that plague conventional systems.
                </p>

                <h2>Real-World Implementation</h2>
                <p>
                  Companies are now building prototype reversible processors. Early results show 70% energy reduction
                  compared to traditional architectures with equivalent computational power.
                </p>

                <h2>The Path Forward</h2>
                <p>
                  While still in early stages, reversible computing represents the future of sustainable computing
                  infrastructure. Organizations investing now will lead the next generation of green computing.
                </p>

                <h2>Sustainability Implications</h2>
                <p>
                  Beyond energy efficiency, reversible computing has profound environmental implications. As enterprises
                  scale their AI and data processing operations, transitioning to reversible architectures could reduce
                  global energy consumption by trillions of kilowatt-hours annually.
                </p>

                <h2>Business Case for Adoption</h2>
                <p>
                  The business case for reversible computing is compelling. Lower energy costs translate directly to
                  improved margins and reduced carbon footprint. Companies can market their operations as
                  environmentally responsible while gaining competitive advantages.
                </p>
              </BlogPostContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
