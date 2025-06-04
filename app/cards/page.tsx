import { CardLibrary } from "@/components/card-library"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NUMO Oracle Cards | Card Directory",
  description:
    "Explore the complete collection of NUMO Oracle cards, featuring the five sacred treasures: Cauldron, Sword, Cord, Spear, and Stone.",
}

export default function CardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">NUMO Oracle Card Directory</h1>
      <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
        Explore our complete collection of oracle cards, organized by suit and element. Each card represents a unique
        combination of numerical energy and elemental influence.
      </p>

      <CardLibrary />
    </div>
  )
}
