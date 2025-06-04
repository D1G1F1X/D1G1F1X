import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function GoddessDanuDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative aspect-square max-w-md mx-auto">
        <Image src="/gifts-of-danu.png" alt="Goddess Danu" fill className="object-contain" />
      </div>

      <Card className="bg-black/30 border-purple-900/30">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Goddess Danu</h2>
          <p className="text-gray-300 mb-4">
            The mother goddess of the Tuatha Dé Danann, representing divine wisdom and the cycles of nature. Danu is a
            powerful Celtic deity associated with the earth, water, wisdom, and abundance.
          </p>

          <p className="text-gray-300 mb-4">
            The Numo Oracle Deck is enriched by the mysterious connection between two powerful figures named Danu from
            different pantheons. One is the Celtic Goddess Danu, the mother of the Tuatha Dé Danann, who symbolizes the
            Earth, fertility, and the power of creation. The other is the Indonesian Goddess Danu, a water deity also
            associated with life-giving forces and cosmic order.
          </p>

          <p className="text-gray-300">
            Both goddesses are revered as sources of life and creation, and both had children endowed with powerful
            gifts and weapons, further deepening their mythological significance. The enigmatic link between these two
            deities suggests a deeper, universal truth that transcends cultures and time, and it serves as the spiritual
            foundation for the Numo Oracle Deck.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
