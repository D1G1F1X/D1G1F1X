import type { Metadata } from "next"
import BuyPageClient from "./BuyPageClient"

export const metadata: Metadata = {
  title: "The NUMO Oracle Card Deck | Shop & Inquire",
  description:
    "Purchase the NUMO Oracle Card Deck and accessories by Kraftwerk Numerology, or submit an inquiry for custom orders.",
}

export default function BuyPage() {
  return <BuyPageClient />
}
