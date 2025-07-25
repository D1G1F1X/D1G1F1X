"use client"

import { CardSimulator } from "@/components/card-simulator"
import type { OracleCard } from "@/types/cards"

interface CardSimulatorPageClientProps {
  allCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

export function CardSimulatorPageClient({ allCards, suits, elements, numbers }: CardSimulatorPageClientProps) {
  return <CardSimulator allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
