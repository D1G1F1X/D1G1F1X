import type { Metadata } from "next"
import { CardSimulatorPageClient } from "./CardSimulatorPageClient"
import { getCardData, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"
import { Sparkles } from "lucide-react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Oracle Card Simulator | Numoracle",
  description:
    "Draw random oracle cards with filtering options. Explore the mystical world of numerology through interactive card simulation.",
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
      <Sparkles className="h-6 w-6 animate-spin mr-2" />
      Loading card simulator...
    </div>
  )
}

export default async function CardSimulatorPage() {
  const allCards = await getCardData()
  const suits = getUniqueSuits(allCards)
  const elements = getUniqueElements(allCards)
  const numbers = getUniqueNumbers(allCards)

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CardSimulatorPageClient allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
    </Suspense>
  )
}
