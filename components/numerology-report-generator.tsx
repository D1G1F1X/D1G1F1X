"\"use client"

export interface NumerologyProfile {
  id: string
  name: string
  birthDate: Date
  lifePathNumber: number
  destinyNumber: number
  personalityNumber: number
  soulUrgeNumber: number
  expressionNumber?: number
  maturityNumber?: number
  birthdayNumber?: number
  balanceNumber?: number
  createdAt: Date
}

export interface ReportSettings {
  detailLevel: number
  includePersonalInsights: boolean
  includeFutureProjections: boolean
  includeCompatibilityInfo: boolean
  includeCharts: boolean
  theme: "classic" | "modern" | "mystical"
  fontSize: "small" | "medium" | "large"
}

export function NumerologyReportGenerator() {
  // ... (rest of the component code remains the same)
}
