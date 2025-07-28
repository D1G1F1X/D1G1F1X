"use client"

import { useState, useEffect } from "react"
import NumerologyCalculator from "@/components/numerology-calculator"
import { getMembershipStatus, type MembershipStatus } from "@/lib/membership-types"
import { EnhanceExperienceSection } from "@/components/enhance-experience-section"
import { numerologyReportService, type SavedNumerologyReport } from "@/lib/services/numerology-report-service"
import type { NumerologyReportProps } from "@/components/numerology-calculator/numerology-report"
import { InlinePrivacyNotice } from "@/components/inline-privacy-notice"
import { Check } from "lucide-react"

export default function NumerologyCalculatorPageClient() {
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>({
    type: "free",
    verified: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [calculatedReportData, setCalculatedReportData] = useState<NumerologyReportProps["data"] | null>(null)
  const [isSavingReport, setIsSavingReport] = useState(false)
  const [saveReportSuccess, setSaveReportSuccess] = useState(false)
  const [saveReportError, setSaveReportError] = useState<any>(null)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [dataRestorationStatus, setDataRestorationStatus] = useState<"loading" | "restored" | "none">("none")

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

  const handleVerifyPurchase = async (purchaseId: string) => {
    if (purchaseId) {
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
      localStorage.setItem("numoUserId", `card-user-${purchaseId.substring(0, 6)}`)
    }
  }

  const handleReportCalculated = (data: NumerologyReportProps["data"]) => {
    setCalculatedReportData(data)
    setSaveReportSuccess(false)
    setSaveReportError(null)
  }

  const handleSaveReport = async (data: NumerologyReportProps["data"]) => {
    setIsSavingReport(true)
    setSaveReportSuccess(false)
    setSaveReportError(null)

    try {
      const reportToSave: SavedNumerologyReport = {
        user_id: localStorage.getItem("numoUserId") || "mock-user-id",
        birth_name: data.birthName,
        current_name: data.currentName || undefined,
        nicknames: data.nickname || undefined,
        birth_date: data.birthDate.toISOString(),
        life_path_number: data.lifePath,
        expression_number: data.expression,
        soul_urge_number: data.soulUrge,
        personality_number: data.personality,
        destiny_number: 0,
        birthday_number: 0,
        maturity_number: 0,
        challenge_numbers: [],
        pinnacle_numbers: [],
        personal_year: 0,
        personal_month: 0,
        personal_day: 0,
        karmic_lessons: [],
        hidden_passion_number: 0,
        is_public: false,
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
    return { success: saveReportSuccess, error: saveReportError }
  }

  const handlePrivacyConsentChange = (hasConsent: boolean) => {
    setPrivacyAccepted(hasConsent)

    if (hasConsent) {
      setDataRestorationStatus("loading")
      // Allow time for data restoration
      setTimeout(() => {
        setDataRestorationStatus("restored")
      }, 1000)
    } else {
      setDataRestorationStatus("none")
      setCalculatedReportData(null)
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
    <div className="container py-10 flex flex-col items-center">
      {" "}
      {/* This container already centers its children */}
      {/* Inline Privacy Notice */}
      <InlinePrivacyNotice context="numerology-calculator" onConsentChange={handlePrivacyConsentChange} />
      {dataRestorationStatus === "loading" && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            <p className="text-blue-800 dark:text-blue-200">Checking for saved data...</p>
          </div>
        </div>
      )}
      {dataRestorationStatus === "restored" && privacyAccepted && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-200">
              Data restoration complete. Your previous calculations and preferences have been loaded.
            </p>
          </div>
        </div>
      )}
      <NumerologyCalculator
        membershipStatus={membershipStatus}
        onVerifyPurchase={handleVerifyPurchase}
        onReportCalculated={handleReportCalculated}
        hasPrivacyConsent={privacyAccepted}
      />
      {calculatedReportData && privacyAccepted && (
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
