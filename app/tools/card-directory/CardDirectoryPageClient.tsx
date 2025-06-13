"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface OracleCard {
  id: string
  suit: string
  number: string
  meaning: string
}

const CardDirectoryPageClient = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [cards, setCards] = React.useState<OracleCard[]>([
    { id: "1", suit: "Hearts", number: "Ace", meaning: "Love and new beginnings" },
    { id: "2", suit: "Hearts", number: "Two", meaning: "Partnership and balance" },
    { id: "3", suit: "Diamonds", number: "Ace", meaning: "New opportunities and wealth" },
    { id: "4", suit: "Spades", number: "Ace", meaning: "Challenges and obstacles" },
    { id: "5", suit: "Clubs", number: "Ace", meaning: "Growth and knowledge" },
  ])

  const filteredCards = cards.filter(
    (card) =>
      card.suit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderCard = (card: OracleCard) => (
    <Link href={`/tools/card-directory/${card.id}`} key={card.id}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <CardHeader className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="text-lg font-bold text-purple-900 dark:text-purple-200">
            {card.number} {card.suit}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">{card.meaning}</CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Label htmlFor="search">Search Cards:</Label>
        <Input
          type="text"
          id="search"
          placeholder="Search by suit, number, or meaning..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map(renderCard)}
      </div>
    </div>
  )
}

export default CardDirectoryPageClient
