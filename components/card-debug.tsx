"use client"

import { useEffect, useState } from "react"
import { getCardData } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"

export default function CardDebug() {
  const [cards, setCards] = useState<OracleCard[]>([])
  const [selectedCard, setSelectedCard] = useState<OracleCard | null>(null)

  useEffect(() => {
    const cardData = getCardData()
    setCards(cardData)

    // Find the 9-Stone card specifically
    const nineStone = cardData.find((card) => card.id === "9-Stone")
    if (nineStone) {
      setSelectedCard(nineStone)
      console.log("9-Stone card data:", nineStone)
    }
  }, [])

  if (!selectedCard) {
    return <div>Loading card data...</div>
  }

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Card Debug Information</h2>
      <div className="space-y-2">
        <div>
          <strong>Card ID:</strong> {selectedCard.id}
        </div>
        <div>
          <strong>Number (direct):</strong> {selectedCard.number}
        </div>
        <div>
          <strong>Number (typeof):</strong> {typeof selectedCard.number}
        </div>
        <div>
          <strong>Full Title:</strong> {selectedCard.fullTitle}
        </div>
        <div>
          <strong>Suit:</strong> {selectedCard.suit}
        </div>
        <div>
          <strong>Base Element:</strong> {selectedCard.baseElement}
        </div>
        <div>
          <strong>Synergistic Element:</strong> {selectedCard.synergisticElement}
        </div>

        <h3 className="text-lg font-semibold mt-4">Symbols Array:</h3>
        {selectedCard.symbols?.map((symbol, index) => (
          <div key={index} className="ml-4">
            <strong>{symbol.key}:</strong> {symbol.value}
          </div>
        ))}

        <h3 className="text-lg font-semibold mt-4">Raw JSON:</h3>
        <pre className="bg-gray-900 p-2 text-xs overflow-auto">{JSON.stringify(selectedCard, null, 2)}</pre>
      </div>
    </div>
  )
}
