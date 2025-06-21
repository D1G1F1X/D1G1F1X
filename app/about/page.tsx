import { Suspense } from "react"
import type { Metadata } from "next"
import AboutPageContent from "@/components/about-page-content"
import StandardizedHero from "@/components/standardized-hero"

export const metadata: Metadata = {
  title: "About NUMO Oracle | Ancient Wisdom, Modern Vision",
  description:
    "Discover the NUMO Oracle Deck - a sacred system of divination that fuses numerology, myth, and the wisdom of dualism into a transformative spiritual tool.",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="About"
        subtitle="NUMO Oracle"
        description="Discover the ancient wisdom and modern vision behind our unique divination system"
        backgroundImage="/images/about/goddess-danu-art.png"
        badge={{
          text: "Ancient Celtic Wisdom",
          icon: "✨",
        }}
        features={[
          { icon: "✨", text: "Ancient Celtic Wisdom", color: "purple" },
          { icon: "🔮", text: "Modern Numerology", color: "blue" },
          { icon: "🌟", text: "Elemental Magic", color: "green" },
        ]}
        gradient="from-purple-900/20 via-blue-900/20 to-black"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading about NUMO Oracle...</div>}>
        <AboutPageContent />
      </Suspense>
    </div>
  )
}
