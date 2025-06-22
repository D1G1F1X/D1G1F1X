import type { Metadata } from "next"
import GuidebookClientPage from "./GuidebookClientPage"

export const metadata: Metadata = {
  title: "NUMO Oracle Guidebook | Complete Guide to the NUMO Oracle Card Deck",
  description:
    "Access the comprehensive guidebook for the NUMO Oracle Card Deck, including detailed card meanings, spreads, and numerological concepts.",
}

export default function GuidebookPage() {
  return <GuidebookClientPage />
}
