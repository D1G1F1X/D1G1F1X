import { Suspense } from "react"
import PrivateReadingClient from "./PrivateReadingClient"
import StandardizedHero from "@/components/standardized-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Private Reading | Purchase Your Personal Reading",
  description: "Purchase a private, personalized reading session with our expert readers.",
}

export default function PrivateReadingPage() {
  return (
      <div className="relative min-h-screen bg-black">
        <StandardizedHero
          title="Private Reading"
          subtitle="Personalized Guidance"
          description="Experience a deeply personal and private reading session tailored specifically to your questions and needs."
          backgroundImage="/images/hero/mystical-shop-background.png"
          badge={{
            text: "🔮 Exclusive Service",
            icon: "",
          }}
          features={[
            { icon: "✨", text: "Personalized", color: "emerald" },
            { icon: "🔒", text: "Private & Confidential", color: "teal" },
            { icon: "💫", text: "Expert Guidance", color: "cyan" },
          ]}
          gradient="from-purple-900/20 via-indigo-900/20 to-black"
        />
        <Suspense fallback={<div className="text-center py-20 text-white">Loading...</div>}>
          <PrivateReadingClient />
        </Suspense>
      </div>
  )
}

