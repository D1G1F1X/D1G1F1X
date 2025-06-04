import type { Metadata } from "next"
import { ComprehensiveNumerologyReport } from "@/components/comprehensive-numerology-report"

export const metadata: Metadata = {
  title: "FREE Numerology Report | NUMO Oracle",
  description:
    "Generate a detailed numerology report with insights into your life path, destiny, challenges, and future trends based on your name and birth date.",
}

export default function NumerologyReportPage() {
  return (
    <>
      <div
        className="py-16 md:py-24 text-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/hero/numerology-calculator-hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>{" "}
        {/* Overlay for better text readability */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">FREE Numerology Report</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the hidden patterns in your name and birthdate. Unveil insights into your life path, destiny, and
            potential.
          </p>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <ComprehensiveNumerologyReport />
      </div>
    </>
  )
}
