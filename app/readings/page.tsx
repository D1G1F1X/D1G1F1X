import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Your Readings | NUMO Oracle",
  description: "Access your saved NUMO Oracle readings.",
}

export default function ReadingsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Your Oracle Readings"
        description="Review your past oracle readings and gain deeper insights."
        backgroundImage="/numerology-oracle-spread.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading readings...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Readings</h1>
          <p className="text-center text-gray-300">Readings content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
