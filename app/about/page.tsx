import { Suspense } from "react"
import type { Metadata } from "next"
import AboutPageContent from "@/components/about-page-content"

export const metadata: Metadata = {
  title: "About NUMO Oracle | Ancient Wisdom, Modern Vision",
  description:
    "Discover the NUMO Oracle Deck - a sacred system of divination that fuses numerology, myth, and the wisdom of dualism into a transformative spiritual tool.",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Suspense fallback={<div className="text-center py-20 text-white">Loading about NUMO Oracle...</div>}>
        <AboutPageContent />
      </Suspense>
    </div>
  )
}
