import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import SignInForm from "@/components/auth/sign-in-form"

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
        <div className="container mx-auto py-8 px-4">
          <SignInForm />
        </div>
      </Suspense>
    </div>
  )
}
