import { Card, CardContent } from "@/components/ui/card"
import { Flame, Wind, Mountain, Sparkles } from "lucide-react"
import Image from "next/image"

const gifts = [
  {
    name: "The Cauldron",
    element: "Fire",
    numbers: "0 and 1",
    description:
      "Symbolizes creation and inspiration. It represents the creative force, the potential for new beginnings, and the spark of life that Danu, as the mother goddess, offers.",
    icon: Flame,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "The Sword",
    element: "Air",
    numbers: "2 and 5",
    description:
      "Represents clarity, intellect, and decision-making. This gift reflects Danu's wisdom, helping us to see clearly and make choices that cut through confusion.",
    icon: Wind,
    color: "from-blue-400 to-cyan-300",
  },
  {
    name: "The Cord",
    element: "Spirit",
    numbers: "3 and 8",
    description:
      "Represents spiritual connection and continuity. This final gift ties together all of Danu's other gifts, reminding us that we are always connected to the flow of life.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-400",
  },
  {
    name: "The Spear",
    element: "Earth",
    numbers: "4 and 7",
    description:
      "A symbol of strength, stability, and spiritual guidance. The Spear offers the ability to navigate challenges with resilience and insight.",
    icon: Mountain,
    color: "from-green-500 to-emerald-400",
  },
  {
    name: "The Stone",
    element: "Earth",
    numbers: "6 and 9",
    description:
      "Symbolizes grounding, stability, and fulfillment. This gift reflects Danu's nurturing role as a goddess of fertility and abundance.",
    icon: Mountain,
    color: "from-amber-500 to-yellow-400",
  },
]

export default function DanuGifts() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">The Five Gifts of Danu</h2>

      <div className="relative w-full h-[300px] mb-8">
        <Image
          src="/gifts-of-danu.png"
          alt="The Five Sacred Treasures of Danu"
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map((gift) => (
          <Card key={gift.name} className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${gift.color} mr-4`}
                >
                  <gift.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-300">{gift.name}</h3>
                  <p className="text-sm text-gray-400">
                    {gift.element} • {gift.numbers}
                  </p>
                </div>
              </div>
              <p className="text-gray-300">{gift.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
