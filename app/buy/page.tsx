import { Suspense } from "react"
import BuyPageClient from "./BuyPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy NUMO Oracle | Purchase Your Deck",
  description: "Purchase the official NUMO Oracle Deck and companion products.",
}

export default function BuyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Unique Buy/Shop Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero/mystical-shop-background.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-emerald-600/20 text-emerald-300 rounded-full text-lg font-medium border border-emerald-500/30">
              🛒 Sacred Collection
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Purchase Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              NUMO Oracle
            </span>{" "}
            Deck
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Begin your journey with the NUMO Oracle. Explore our products and find the perfect fit for your spiritual
            path.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            <div className="text-emerald-300">
              <div className="text-2xl mb-2">🎴</div>
              <div className="text-sm">Premium Decks</div>
            </div>
            <div className="text-teal-300">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm">Guidebooks</div>
            </div>
            <div className="text-cyan-300">
              <div className="text-2xl mb-2">💎</div>
              <div className="text-sm">Crystal Sets</div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-white">Loading purchase options...</div>}>
        <BuyPageClient />
      </Suspense>
    </div>
  )
}
