import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Register | NUMO Oracle",
  description: "Register for a NUMO Oracle account.",
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Create Your Account"
        description="Join the NUMO Oracle community and unlock personalized insights."
        backgroundImage="/placeholder.svg?height=500&width=1500"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading registration form...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Register</h1>
          <p className="text-center text-gray-300">Registration form goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
