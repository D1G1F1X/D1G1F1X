import { Suspense } from "react"
import BlogPosts from "@/components/blog-posts" // Assuming this component exists
import HeroSection from "@/components/hero-section" // Import HeroSection
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NUMO Oracle Blog | Insights & Wisdom",
  description: "Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom.",
}

export default async function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="NUMO Oracle Blog"
        description="Explore articles on numerology, oracle readings, spiritual tools, and ancient wisdom."
        backgroundImage="/images/hero/mystical-blog-background-v2.png" // Updated image for unique design
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading blog posts...</div>}>
          {/* Assuming BlogPosts component exists and fetches/displays posts */}
          <BlogPosts />
        </Suspense>
      </div>
    </div>
  )
}
