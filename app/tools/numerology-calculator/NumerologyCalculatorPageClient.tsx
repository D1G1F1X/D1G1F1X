"use client"

import { useState, useEffect } from "react"
import NumerologyCalculator from "@/components/numerology-calculator"
import { getMembershipStatus, type MembershipStatus } from "@/lib/membership-types"
import { EnhanceExperienceSection } from "@/components/enhance-experience-section" // Import the new component
import { numerologyReportService, type SavedNumerologyReport } from "@/lib/services/numerology-report-service"
import type { NumerologyReportProps } from "@/components/numerology-calculator/numerology-report" // Import the type

export default function NumerologyCalculatorPageClient() {
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>({
    type: "free",
    verified: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [calculatedReportData, setCalculatedReportData] = useState<NumerologyReportProps["data"] | null>(null) // State to hold the calculated report
  const [isSavingReport, setIsSavingReport] = useState(false)
  const [saveReportSuccess, setSaveReportSuccess] = useState(false)
  const [saveReportError, setSaveReportError] = useState<any>(null)

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

  const handleReportCalculated = (data: NumerologyReportProps["data"]) => {
    setCalculatedReportData(data)
    setSaveReportSuccess(false) // Reset save status on new calculation
    setSaveReportError(null)
  }

  const handleSaveReport = async (data: NumerologyReportProps["data"]) => {
    setIsSavingReport(true)
    setSaveReportSuccess(false)
    setSaveReportError(null)

    try {
      // Map the report data to the SavedNumerologyReport interface
      const reportToSave: SavedNumerologyReport = {
        user_id: localStorage.getItem("numoUserId") || "mock-user-id", // Replace with actual user ID from auth
        birth_name: data.birthName,
        current_name: data.currentName || undefined,
        nicknames: data.nickname || undefined,
        birth_date: data.birthDate.toISOString(),
        life_path_number: data.lifePath,
        expression_number: data.expression,
        soul_urge_number: data.soulUrge,
        personality_number: data.personality,
        // Fill in other required fields with defaults or null if not calculated/available
        destiny_number: 0, // Placeholder
        birthday_number: 0, // Placeholder
        maturity_number: 0, // Placeholder
        challenge_numbers: [], // Placeholder
        pinnacle_numbers: [], // Placeholder
        personal_year: 0, // Placeholder
        personal_month: 0, // Placeholder
        personal_day: 0, // Placeholder
        karmic_lessons: [], // Placeholder
        hidden_passion_number: 0, // Placeholder
        is_public: false, // Default to private
        report_title: `${data.birthName}'s Numerology Report`,
      }

      const result = await numerologyReportService.saveReport(reportToSave)

      if (result.success) {
        setSaveReportSuccess(true)
        console.log("Report saved successfully with ID:", result.id)
      } else {
        setSaveReportError(result.error)
        console.error("Failed to save report:", result.error)
      }
    } catch (error) {
      setSaveReportError(error)
      console.error("Error during save report process:", error)
    } finally {
      setIsSavingReport(false)
    }
    return { success: saveReportSuccess, error: saveReportError } // Return the status
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
      <NumerologyCalculator
        membershipStatus={membershipStatus}
        onVerifyPurchase={handleVerifyPurchase}
        onReportCalculated={handleReportCalculated} // Pass the callback
      />

      {calculatedReportData && (
        <EnhanceExperienceSection
          reportData={calculatedReportData}
          membershipStatus={membershipStatus}
          onSaveReport={handleSaveReport}
          isSaving={isSavingReport}
          saveSuccess={saveReportSuccess}
          saveError={saveReportError}
        />
      )}
    </div>
  )
}
