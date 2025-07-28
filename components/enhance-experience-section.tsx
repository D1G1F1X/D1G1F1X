"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircleIcon, XCircleIcon, Loader2, SaveIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { MembershipStatus } from "@/lib/membership-types"
import type { NumerologyReportProps } from "@/components/numerology-calculator/numerology-report" // Import the type

interface EnhanceExperienceSectionProps {
  reportData: NumerologyReportProps["data"] | null
  membershipStatus: MembershipStatus
  onSaveReport: (data: NumerologyReportProps["data"]) => Promise<{ success: boolean; id?: string; error?: any }>
  isSaving: boolean
  saveSuccess: boolean
  saveError: any
}

export function EnhanceExperienceSection({
  reportData,
  membershipStatus,
  onSaveReport,
  isSaving,
  saveSuccess,
  saveError,
}: EnhanceExperienceSectionProps) {
  if (!reportData) {
    return null // Only show this section if a report has been generated
  }

  const canSave = membershipStatus.type !== "free" && !isSaving

  const handleSaveClick = async () => {
    if (reportData && canSave) {
      await onSaveReport(reportData)
    }
  }

  return (
    <Card className="mt-10 border-purple-400 dark:border-purple-700 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-200">
          Enhance Your Numerology Experience
        </CardTitle>
        <CardDescription className="text-purple-800 dark:text-purple-300">
          Unlock more features and insights with your personalized report.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSaveClick}
                  disabled={!canSave || saveSuccess}
                  className={cn(
                    "w-full md:w-auto px-8 py-3 text-lg font-semibold",
                    !canSave && "opacity-50 cursor-not-allowed",
                    saveSuccess && "bg-green-500 hover:bg-green-600",
                  )}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircleIcon className="mr-2 h-5 w-5" /> Report Saved!
                    </>
                  ) : (
                    <>
                      <SaveIcon className="mr-2 h-5 w-5" /> Save Your Report
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {membershipStatus.type === "free"
                  ? "Upgrade your membership to save reports."
                  : isSaving
                    ? "Saving in progress..."
                    : saveSuccess
                      ? "Your report has been successfully saved."
                      : saveError
                        ? `Error saving: ${saveError.message || "Unknown error"}`
                        : "Save your personalized numerology report to your account."}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {saveError && (
            <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
              <XCircleIcon className="mr-1 h-4 w-4" /> Failed to save report. Please try again.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/60 dark:bg-black/30">
            <CardHeader>
              <CardTitle className="text-lg">Explore Your Readings</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Access all your saved reports and readings in one place.</CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/user/readings">View Saved Readings</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/60 dark:bg-black/30">
            <CardHeader>
              <CardTitle className="text-lg">Deepen Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Dive into our comprehensive numerology guidebook and articles.</CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/guidebook">Explore Guidebook</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
