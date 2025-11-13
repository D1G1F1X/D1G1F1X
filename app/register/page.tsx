import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import SignUpForm from "@/components/auth/sign-up-form"

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
        <div className="container mx-auto py-8 px-4">
          <SignUpForm />
        </div>
      </Suspense>
    </div>
  )
}
