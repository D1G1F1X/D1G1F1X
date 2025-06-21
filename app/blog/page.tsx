import { Suspense } from "react"
import EnhancedBlogPosts from "@/components/enhanced-blog-posts"
import StandardizedHero from "@/components/standardized-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NUMO Oracle Blog | Insights & Wisdom",
  description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
  keywords: "numerology blog, oracle cards, spiritual guidance, Danu gifts, Celtic mythology, divination",
  openGraph: {
    title: "NUMO Oracle Blog | Insights & Wisdom",
    description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
    type: "website",
    url: "/blog",
  },
}

export default async function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="NUMO Oracle"
        subtitle="Blog"
        description="Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom"
        backgroundImage="/images/hero/mystical-blog-background-v2.png"
        badge={{
          text: "Wisdom & Insights",
          icon: "📚",
        }}
        gradient="from-indigo-900/30 via-purple-900/30 to-pink-900/30"
      />

      <div className="container mx-auto py-8 px-4">
        <Suspense
          fallback={
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
              <p className="text-white/80 mt-4">Loading blog posts...</p>
            </div>
          }
        >
          <EnhancedBlogPosts />
        </Suspense>
      </div>
    </div>
  )
}
