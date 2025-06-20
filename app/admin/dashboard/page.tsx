import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Admin Dashboard | NUMO Oracle",
  description: "Admin dashboard for NUMO Oracle.",
}

export default function AdminDashboardPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Admin Dashboard"
        description="Overview of website activity and key metrics."
        backgroundImage="/placeholder.svg?height=500&width=1500"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading admin dashboard...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Dashboard</h1>
          <p className="text-center text-gray-300">Admin dashboard content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
