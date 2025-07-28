import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Newsletter | NUMO Oracle",
  description: "Sign up for the NUMO Oracle newsletter.",
}

export default function NewsletterPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Join Our Newsletter"
        description="Stay updated with the latest NUMO Oracle insights, news, and special offers."
        backgroundImage="/open-book-knowledge.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading newsletter signup...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Newsletter</h1>
          <p className="text-center text-gray-300">Newsletter signup form goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
