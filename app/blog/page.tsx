import { Suspense } from "react"
import BlogPosts, { BlogPostsLoading } from "@/components/blog-posts"
import { CacheClearButton } from "@/components/cache-clear-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NUMO Oracle Blog | Insights & Wisdom",
  description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
}

// Disable caching for this page
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Unique Blog Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero/mystical-blog-background-v2.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              Wisdom & Insights
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            NUMO Oracle{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom
          </p>

          {/* Debug cache clear button - only show in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4">
              <CacheClearButton />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts />
        </Suspense>
      </div>
    </div>
  )
}
