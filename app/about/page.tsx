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
      {/* Unique About Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/about/goddess-danu-art.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-purple-400">NUMO Oracle</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Discover the ancient wisdom and modern vision behind our unique divination system
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="text-purple-300 text-lg">✨ Ancient Celtic Wisdom</div>
            <div className="hidden md:block text-gray-500">•</div>
            <div className="text-blue-300 text-lg">🔮 Modern Numerology</div>
            <div className="hidden md:block text-gray-500">•</div>
            <div className="text-green-300 text-lg">🌟 Elemental Magic</div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-white">Loading about NUMO Oracle...</div>}>
        <AboutPageContent />
      </Suspense>
    </div>
  )
}
