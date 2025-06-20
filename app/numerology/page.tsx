import { Suspense } from "react"
import type { Metadata } from "next"
import NumerologyCalculator from "@/components/numerology-calculator" // Assuming this component exists
// import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Numerology Calculator | Discover Your Life Path",
  description: "Calculate your life path number, destiny number, and more with our free numerology tools.",
}

export default function NumerologyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Unique Numerology Calculator Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-pink-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/numerology-diagram-hero.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-rose-600/20 text-rose-300 rounded-full text-lg font-medium border border-rose-500/30">
              🔢 Sacred Mathematics
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Numerology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Calculator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Uncover your life path, destiny, and soul urge numbers through the ancient science of numerology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
            <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-700/30">
              <div className="text-3xl mb-2">🛤️</div>
              <div className="text-rose-300 font-medium">Life Path</div>
              <div className="text-gray-400 text-sm">Your life's journey</div>
            </div>
            <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-700/30">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-pink-300 font-medium">Destiny Number</div>
              <div className="text-gray-400 text-sm">Your life's purpose</div>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
              <div className="text-3xl mb-2">💫</div>
              <div className="text-purple-300 font-medium">Soul Urge</div>
              <div className="text-gray-400 text-sm">Your inner desires</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading numerology calculator...</div>}>
          {/* Assuming NumerologyCalculator component exists */}
          <NumerologyCalculator />
        </Suspense>
      </div>
    </div>
  )
}
