import type { Metadata } from "next"
import CardDirectoryPageClient from "./CardDirectoryPageClient"

export const metadata: Metadata = {
  title: "Card Directory | NUMO Oracle",
  description:
    "Browse the complete NUMO Oracle card collection with detailed information about each card's meaning, elements, and symbolism.",
}

export default function CardDirectoryPage() {
  return <CardDirectoryPageClient />
}
