"use client"

import { useState, useEffect } from "react"
import NumerologyCalculator from "@/components/numerology-calculator"
import { getMembershipStatus, type MembershipStatus } from "@/lib/membership-types"

export default function NumerologyCalculatorPageClient() {
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>({
    type: "free",
    verified: true,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking user's membership status on page load
  useEffect(() => {
    const checkMembership = async () => {
      try {
        // In a real app, you would get the user ID from authentication
        // For demo purposes, we'll use a mock user ID that indicates a regular member
        // who purchased the app
        const userId = localStorage.getItem("numoUserId") || "app-user-123"

        const status = await getMembershipStatus(userId)
        setMembershipStatus(status)
      } catch (error) {
        console.error("Failed to check membership status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkMembership()
  }, [])

  const handleVerifyPurchase = async (purchaseId: string) => {
    if (purchaseId) {
      // In a real app, you would verify the purchase with your backend
      // For demo purposes, we'll simulate a successful verification
      const newStatus: MembershipStatus = {
        type: "regular",
        verified: true,
        purchaseInfo: {
          productType: "card",
          purchaseDate: new Date().toISOString(),
          productId: purchaseId,
        },
      }

      setMembershipStatus(newStatus)

      // Store the user ID for future reference
      localStorage.setItem("numoUserId", `card-user-${purchaseId.substring(0, 6)}`)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-purple-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your membership status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Numerology Calculator</h1>
        <p className="mt-4 text-muted-foreground">
          Calculate your life path number, destiny number, and other important numerological values to understand your
          spiritual journey.
        </p>
      </div>
      <NumerologyCalculator membershipStatus={membershipStatus} onVerifyPurchase={handleVerifyPurchase} />
    </div>
  )
}
