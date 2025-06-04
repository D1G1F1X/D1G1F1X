"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Save, Share2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Mock card data
const mockCards = [
  {
    id: "01cauldron-fire",
    name: "Cauldron of Fire",
    element: "Fire",
    imagePath: "/cards/01cauldron-fire.jpg",
    meaning: "Transformation through passion and creative energy",
  },
  {
    id: "25sword-air",
    name: "Sword of Air",
    element: "Air",
    imagePath: "/cards/25sword-air.jpg",
    meaning: "Mental clarity and decisive action",
  },
  {
    id: "47spear-earth",
    name: "Spear of Earth",
    element: "Earth",
    imagePath: "/cards/47spear-earth.jpg",
    meaning: "Grounded strength and practical wisdom",
  },
  {
    id: "69stone-water",
    name: "Stone of Water",
    element: "Water",
    imagePath: "/cards/69stone-water.jpg",
    meaning: "Emotional depth and intuitive understanding",
  },
  {
    id: "83cord-spirit",
    name: "Cord of Spirit",
    element: "Spirit",
    imagePath: "/cards/83cord-spirit.jpg",
    meaning: "Divine connection and spiritual awakening",
  },
  {
    id: "38cord-fire",
    name: "Cord of Fire",
    element: "Fire",
    imagePath: "/cards/38cord-fire.jpg",
    meaning: "Passionate connections and creative bonds",
  },
  {
    id: "52sword-water",
    name: "Sword of Water",
    element: "Water",
    imagePath: "/cards/52sword-water.jpg",
    meaning: "Emotional clarity and intuitive discernment",
  },
  {
    id: "74spear-air",
    name: "Spear of Air",
    element: "Air",
    imagePath: "/cards/74spear-air.jpg",
    meaning: "Mental focus and directed thought",
  },
  {
    id: "96stone-earth",
    name: "Stone of Earth",
    element: "Earth",
    imagePath: "/cards/96stone-earth.jpg",
    meaning: "Material completion and earthly wisdom",
  },
  {
    id: "10cauldron-spirit",
    name: "Cauldron of Spirit",
    element: "Spirit",
    imagePath: "/cards/10cauldron-spirit.jpg",
    meaning: "Spiritual awakening and divine connection",
  },
]

export function CardSimulator() {
  const [selectedCards, setSelectedCards] = useState<typeof mockCards>([])
  const [question, setQuestion] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")

  const shuffleCards = async () => {
    setIsShuffling(true)

    // Simulate shuffling animation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
    const shuffled = [...mockCards].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numCards)

    setSelectedCards(selected)
    generateReading(selected)
    setIsShuffling(false)
  }

  const generateReading = (cards: typeof mockCards) => {
    const meanings = cards.map((card) => `${card.name}: ${card.meaning}`).join("\n\n")
    setReading(
      `Your reading reveals:\n\n${meanings}\n\nThis combination suggests a time of balance between different aspects of your life. Trust your intuition as you move forward.`,
    )
  }

  const saveReading = () => {
    if (!question.trim()) {
      alert("Please enter a question before saving your reading.")
      return
    }

    const readingData = {
      id: `reading-${Date.now()}`,
      question,
      cards: selectedCards,
      reading,
      spreadType,
      date: new Date().toISOString(),
      isFavorite: false,
    }

    try {
      if (typeof window !== "undefined") {
        const existingReadings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
        existingReadings.push(readingData)
        localStorage.setItem("numoReadings", JSON.stringify(existingReadings))
        alert("Reading saved successfully!")
      }
    } catch (error) {
      console.error("Error saving reading:", error)
      alert("Failed to save reading. Please try again.")
    }
  }

  const shareReading = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "My NUMO Oracle Reading",
          text: `Question: ${question}\n\n${reading}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      // Fallback to clipboard
      const shareText = `My NUMO Oracle Reading\n\nQuestion: ${question}\n\n${reading}`
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
        alert("Reading copied to clipboard!")
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NUMO Oracle Card Simulator</h1>
        <p className="text-gray-400">Ask a question and let the cards guide you</p>
      </div>

      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <CardTitle>Your Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What guidance do you seek today?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Spread Type:</label>
            <Tabs value={spreadType} onValueChange={setSpreadType}>
              <TabsList>
                <TabsTrigger value="single">Single Card</TabsTrigger>
                <TabsTrigger value="three">Three Cards</TabsTrigger>
                <TabsTrigger value="five">Five Elements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button onClick={shuffleCards} disabled={isShuffling || !question.trim()} className="w-full">
            <Shuffle className="h-4 w-4 mr-2" />
            {isShuffling ? "Shuffling..." : "Draw Cards"}
          </Button>
        </CardContent>
      </Card>

      {selectedCards.length > 0 && (
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Your Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {selectedCards.map((card, index) => (
                <div key={card.id} className="text-center space-y-2">
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={card.imagePath || "/placeholder.svg"}
                      alt={card.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=200&query=oracle card"
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{card.name}</h3>
                    <Badge variant="outline">{card.element}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {reading && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Reading</h3>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <p className="whitespace-pre-line text-gray-300">{reading}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveReading} variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Reading
                  </Button>
                  <Button onClick={shareReading} variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
