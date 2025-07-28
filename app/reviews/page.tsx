import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Reviews | NUMO Oracle",
  description: "Read reviews from other NUMO Oracle users.",
}

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Customer Reviews"
        description="See what our community says about the NUMO Oracle experience."
        backgroundImage="/placeholder.svg?height=500&width=1500"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading reviews...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Reviews</h1>
          <p className="text-center text-gray-300">Reviews content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
