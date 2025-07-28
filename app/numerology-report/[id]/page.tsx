"use client"
import { ComprehensiveNumerologyReport } from "@/components/comprehensive-numerology-report"
import { notFound } from "next/navigation"
import { getReportById } from "@/lib/services/numerology-report-service"

interface NumerologyReportPageProps {
  params: {
    id: string
  }
}

export default async function NumerologyReportPage({ params }: NumerologyReportPageProps) {
  const report = await getReportById(params.id)

  if (!report) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ComprehensiveNumerologyReport report={report} />
    </div>
  )
}
