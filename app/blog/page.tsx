import { Suspense } from "react"
import type { Metadata } from "next"
import EnhancedBlogPosts from "@/components/enhanced-blog-posts"
import { blogSystem } from "@/lib/enhanced-blog-system"

export const metadata: Metadata = {
  title: "NUMO Oracle Blog | Insights & Wisdom",
  description:
    "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom from the NUMO Oracle team.",
  keywords: "numerology blog, oracle cards, spiritual wisdom, ancient knowledge, divination, Celtic mythology",
  openGraph: {
    title: "NUMO Oracle Blog | Insights & Wisdom",
    description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "NUMO Oracle Blog | Insights & Wisdom",
    description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
  },
}

async function getInitialPosts() {
  try {
    const result = await blogSystem.fetchPosts({
      limit: 12,
      published: true,
    })
    return result.posts
  } catch (error) {
    console.error("Error fetching initial posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const initialPosts = await getInitialPosts()

  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero/mystical-blog-background-v2.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              Wisdom & Insights
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            NUMO Oracle{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom. Discover the deeper
            meanings behind numbers, symbols, and the mystical arts.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="text-center py-20 text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
              Loading blog posts...
            </div>
          }
        >
          <EnhancedBlogPosts initialPosts={initialPosts} showPagination={true} postsPerPage={12} />
        </Suspense>
      </div>

      {/* Newsletter Signup Section */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-t border-white/10">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with NUMO Oracle</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Get the latest insights on numerology, oracle readings, and spiritual wisdom delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
