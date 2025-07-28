import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Login | NUMO Oracle",
  description: "Log in to your NUMO Oracle account.",
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Welcome Back"
        description="Log in to access your personalized NUMO Oracle experience."
        backgroundImage="/abstract-login-background.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading login form...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Login</h1>
          <p className="text-center text-gray-300">Login form goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
