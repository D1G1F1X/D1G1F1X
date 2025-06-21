"use client"

import { useState, useEffect } from "react"
import { CardSimulator } from "@/components/card-simulator"
import { getMembershipStatus, type MembershipStatus } from "@/lib/membership-types"

export default function CardSimulatorPageClient() {
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>({
    type: "free",
    verified: true,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMembership = async () => {
      try {
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
      {" "}
      {/* Removed flex centering here, parent now handles it */}
      <CardSimulator />
    </div>
  )
}
