import type { Metadata } from "next"
import { ElementalDiceRoller } from "@/components/elemental-dice-roller"

export const metadata: Metadata = {
  title: "Elemental Dice Oracle | Numoracle",
  description: "Divine guidance through the five elements: fire, water, earth, air, and spirit.",
}

export default function ElementalDicePage() {
  return (
    <div className="min-h-screen py-12">
      <ElementalDiceRoller />
    </div>
  )
}
