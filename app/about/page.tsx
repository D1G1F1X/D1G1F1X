import { Suspense } from "react"
import type { Metadata } from "next"
import AboutPageContent from "@/components/about-page-content"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "About NUMO Oracle | Ancient Wisdom, Modern Vision",
  description:
    "Discover the NUMO Oracle Deck - a sacred system of divination that fuses numerology, myth, and the wisdom of dualism into a transformative spiritual tool.",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="About NUMO Oracle"
        description="Discover the ancient wisdom and modern vision behind our unique divination system."
        backgroundImage="/images/about/goddess-danu-art.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading about NUMO Oracle...</div>}>
        <AboutPageContent />
      </Suspense>
    </div>
  )
}
