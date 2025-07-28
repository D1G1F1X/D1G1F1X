import { Suspense, redirect } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Dashboard | NUMO Oracle",
  description: "Your personalized NUMO Oracle dashboard.",
}

export default function DashboardPage() {
  // Redirect to the user dashboard
  redirect("/user/dashboard")

  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Your NUMO Dashboard"
        description="Access your saved readings, reports, and manage your account."
        backgroundImage="/user-profile-illustration.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading dashboard...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Dashboard</h1>
          <p className="text-center text-gray-300">Dashboard content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
