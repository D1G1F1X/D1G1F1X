"use client"

import { useState, useEffect } from "react"
import type { NumerologyProfile, ReportSettings } from "@/components/numerology-report-generator"

export function useReportStorage(isPremium: boolean) {
  const [savedReports, setSavedReports] = useState<NumerologyProfile[]>([])

  // Load saved reports from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined" || !isPremium) return

    try {
      const savedReportsJson = localStorage.getItem("numoracle_saved_reports")
      if (savedReportsJson) {
        const parsedReports = JSON.parse(savedReportsJson)

        // Convert string dates back to Date objects
        const reportsWithDates = parsedReports.map((report: any) => ({
          ...report,
          birthDate: new Date(report.birthDate),
          createdAt: new Date(report.createdAt),
        }))

        setSavedReports(reportsWithDates)
      }
    } catch (error) {
      console.error("Error loading saved reports:", error)
    }
  }, [isPremium])

  // Save a report
  const saveReport = (report: NumerologyProfile) => {
    if (!isPremium) return

    const updatedReports = [...savedReports, report]
    setSavedReports(updatedReports)

    try {
      localStorage.setItem("numoracle_saved_reports", JSON.stringify(updatedReports))
    } catch (error) {
      console.error("Error saving report:", error)
    }
  }

  // Delete a report
  const deleteReport = (reportId: string) => {
    if (!isPremium) return

    const updatedReports = savedReports.filter((report) => report.id !== reportId)
    setSavedReports(updatedReports)

    try {
      localStorage.setItem("numoracle_saved_reports", JSON.stringify(updatedReports))
    } catch (error) {
      console.error("Error deleting report:", error)
    }
  }

  // Load a specific report
  const loadReport = (reportId: string): NumerologyProfile | null => {
    if (!isPremium) return null

    const report = savedReports.find((report) => report.id === reportId)
    return report || null
  }

  // Save settings
  const saveSettings = (settings: ReportSettings) => {
    if (!isPremium) return

    try {
      localStorage.setItem("numoracle_report_settings", JSON.stringify(settings))
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  // Load settings
  const loadSettings = (): ReportSettings | null => {
    if (typeof window === "undefined" || !isPremium) return null

    try {
      const settingsJson = localStorage.getItem("numoracle_report_settings")
      if (settingsJson) {
        return JSON.parse(settingsJson)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }

    return null
  }

  return {
    savedReports,
    saveReport,
    deleteReport,
    loadReport,
    saveSettings,
    loadSettings,
  }
}
