"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Sparkles, RefreshCw, Info, HelpCircle, Book, Wand2, Flame, Droplets, Wind, Leaf, Star } from "lucide-react"
import { generateReading } from "@/lib/actions/generate-reading"
import ReactMarkdown from "react-markdown"

// Card interfaces
interface CardEnd {
  number: number
  meaning: string
  shadowAspect: string
  keywords: string[]
  sacredGeometry: string
  planet: string
  astrologicalSign: string
  expandedMeaning?: string
  elementalGuidance?:
    | {
        earth?: string
        air?: string
        fire?: string
        water?: string
        spirit?: string
      }
    | string
}

interface OracleCard {
  id: string
  name: string
  element: string
  type: string
  firstEnd: CardEnd
  secondEnd: CardEnd
  firstEndImage: string
  secondEndImage: string
}

// Define spread types
interface SpreadType {
  id: string
  name: string
  description: string
  positions: {
    name: string
    description: string
  }[]
}

const spreadTypes: SpreadType[] = [
  {
    id: "single",
    name: "Single Card",
    description: "A simple draw for daily guidance or a specific question.",
    positions: [
      {
        name: "Guidance",
        description: "The energy or wisdom offered for your consideration",
      },
    ],
  },
  {
    id: "three",
    name: "Three Card Spread",
    description: "Reveals past influences, present situation, and future potential.",
    positions: [
      {
        name: "Past",
        description: "Influences from the past affecting your current situation",
      },
      {
        name: "Present",
        description: "Current energies and immediate concerns",
      },
      {
        name: "Future",
        description: "Potential outcomes and developing energies",
      },
    ],
  },
  {
    id: "five",
    name: "Five Elements Spread",
    description: "Reveals how the five elements influence your situation.",
    positions: [
      {
        name: "Center (Spirit)",
        description: "The core essence of your question or situation",
      },
      {
        name: "East (Air)",
        description: "Mental influences and thoughts affecting the outcome",
      },
      {
        name: "South (Fire)",
        description: "Creative energy and transformative forces at work",
      },
      {
        name: "West (Water)",
        description: "Emotional aspects and intuitive insights",
      },
      {
        name: "North (Earth)",
        description: "Material considerations and practical outcomes",
      },
    ],
  },
]

// Sample card data
const cardData: OracleCard[] = [
  {
    id: "cauldron-fire-1",
    name: "The Cauldron of Fire",
    element: "Fire",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning: "New beginnings and opportunities. The spark of creation ignites your path.",
      shadowAspect: "Impulsiveness and lack of planning can lead to false starts.",
      keywords: ["Beginning", "Creation", "Potential", "Initiative"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Sun",
      astrologicalSign: "Aries",
      expandedMeaning:
        "The Cauldron of Fire represents the primordial spark of creation, the divine inspiration that begins all journeys. When this card appears, it signals a time of new beginnings, fresh ideas, and the courage to embark on a new path.",
    },
    secondEnd: {
      number: 10,
      meaning: "Completion of a cycle and the attainment of mastery in the realm of fire.",
      shadowAspect: "Burnout or the fear of completion leading to self-sabotage.",
      keywords: ["Mastery", "Completion", "Achievement", "Fulfillment"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Mercury",
      astrologicalSign: "Virgo",
      expandedMeaning:
        "The second end of the Cauldron of Fire represents the culmination of your fiery journey. You have mastered the lessons of passion, creativity, and transformation.",
    },
    firstEndImage: "/cards/01cauldron-fire.jpg",
    secondEndImage: "/cards/10cauldron-fire.jpg",
  },
  {
    id: "sword-air-1",
    name: "The Sword of Air",
    element: "Air",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning: "Clarity of thought and communication. The sword cuts through confusion.",
      shadowAspect: "Overthinking and mental anxiety can cloud judgment.",
      keywords: ["Clarity", "Communication", "Intellect", "Truth"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      expandedMeaning:
        "The Sword of Air represents the power of the mind, the ability to discern truth from falsehood, and the clarity that comes from intellectual understanding.",
    },
    secondEnd: {
      number: 52,
      meaning: "Mastery of communication and the ability to share wisdom effectively.",
      shadowAspect: "Using words as weapons or manipulating others through speech.",
      keywords: ["Wisdom", "Teaching", "Expression", "Leadership"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      expandedMeaning:
        "The second end of the Sword of Air represents the mastery of communication and the ability to share wisdom with others. You have learned to use your intellect in service of higher truth.",
    },
    firstEndImage: "/cards/25sword-air.jpg",
    secondEndImage: "/cards/52sword-air.jpg",
  },
  {
    id: "cord-water-1",
    name: "The Cord of Water",
    element: "Water",
    type: "Cord",
    firstEnd: {
      number: 3,
      meaning: "Emotional connections and the flow of feelings. The knot in the cord is before you.",
      shadowAspect: "Emotional dependency and attachment can lead to suffering.",
      keywords: ["Connection", "Emotion", "Intuition", "Relationships"],
      sacredGeometry: "Finite Symbol - The bounded nature of existence",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      expandedMeaning:
        "The Cord of Water represents the emotional bonds that connect us to others, the intuitive wisdom of the heart, and the flowing nature of feelings. The knot in the cord is before you, representing challenges that must be untangled.",
    },
    secondEnd: {
      number: 83,
      meaning: "Deep emotional wisdom and the ability to navigate the waters of the unconscious.",
      shadowAspect: "Emotional manipulation or using empathy to control others.",
      keywords: ["Wisdom", "Depth", "Healing", "Compassion"],
      sacredGeometry: "Spiral - The inward journey to the center of being",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      expandedMeaning:
        "The second end of the Cord of Water represents the mastery of emotional wisdom and the ability to navigate the depths of the unconscious mind.",
    },
    firstEndImage: "/cards/38cord-water.jpg",
    secondEndImage: "/cards/83cord-water.jpg",
  },
  {
    id: "spear-earth-1",
    name: "The Spear of Earth",
    element: "Earth",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning: "Grounding and manifestation. The spear plants firmly in the earth.",
      shadowAspect: "Materialism and attachment to possessions can limit growth.",
      keywords: ["Stability", "Abundance", "Practicality", "Manifestation"],
      sacredGeometry: "Cube - The solid foundation of material existence",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      expandedMeaning:
        "The Spear of Earth represents the power of manifestation, the ability to bring ideas into physical form, and the stability that comes from being grounded in the material world.",
    },
    secondEnd: {
      number: 74,
      meaning: "Mastery of the material realm and the ability to create lasting abundance.",
      shadowAspect: "Hoarding resources or becoming overly rigid in one's approach.",
      keywords: ["Mastery", "Legacy", "Wealth", "Security"],
      sacredGeometry: "Octahedron - The balance of above and below",
      planet: "Venus",
      astrologicalSign: "Taurus",
      expandedMeaning:
        "The second end of the Spear of Earth represents the mastery of the material realm and the ability to create lasting abundance and security.",
    },
    firstEndImage: "/cards/47spear-earth.jpg",
    secondEndImage: "/cards/74spear-earth.jpg",
  },
  {
    id: "stone-spirit-1",
    name: "The Stone of Spirit",
    element: "Spirit",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning: "Spiritual awakening and connection to higher consciousness. The stone holds ancient wisdom.",
      shadowAspect: "Spiritual bypassing or using spirituality to avoid dealing with reality.",
      keywords: ["Awakening", "Connection", "Wisdom", "Transcendence"],
      sacredGeometry: "Merkaba - The vehicle of light for ascension",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      expandedMeaning:
        "The Stone of Spirit represents the connection to higher consciousness, the wisdom of the ancestors, and the transcendent nature of the soul.",
    },
    secondEnd: {
      number: 96,
      meaning: "Mastery of spiritual wisdom and the ability to bridge worlds.",
      shadowAspect: "Spiritual elitism or using spiritual knowledge to manipulate others.",
      keywords: ["Mastery", "Integration", "Teaching", "Enlightenment"],
      sacredGeometry: "Dodecahedron - The cosmic container of all possibilities",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      expandedMeaning:
        "The second end of the Stone of Spirit represents the mastery of spiritual wisdom and the ability to integrate the lessons of all elements into a cohesive whole.",
    },
    firstEndImage: "/cards/69stone-spirit.jpg",
    secondEndImage: "/cards/96stone-spirit.jpg",
  },
]

// Helper functions
const getSacredGeometrySymbol = (number: number) => {
  switch (number) {
    case 0:
      return "• (Point/Dot)"
    case 1:
      return "✚ (Plus/Cross)"
    case 2:
      return "◗◖ (Vesica Piscis)"
    case 3:
      return "∞ (Finite Symbol)"
    case 4:
      return "≡ (Ladder)"
    case 5:
      return "⚬ (Five Fold Circle)"
    case 6:
      return "@ (Spiral)"
    case 7:
      return "∧ (Chevron)"
    case 8:
      return "∞ (Infinity Symbol)"
    case 9:
      return "◉ (Eye)"
    default:
      return "○"
  }
}

// Get element icon
const getElementIcon = (element: string) => {
  switch (element.toLowerCase()) {
    case "earth":
      return <Leaf className="h-5 w-5" />
    case "water":
      return <Droplets className="h-5 w-5" />
    case "fire":
      return <Flame className="h-5 w-5" />
    case "air":
      return <Wind className="h-5 w-5" />
    case "spirit":
      return <Star className="h-5 w-5" />
    default:
      return <Star className="h-5 w-5" />
  }
}

export default function FixedCardDealer() {
  // State variables
  const [selectedSpread, setSelectedSpread] = useState<string>("single")
  const [drawnCards, setDrawnCards] = useState<{ card: OracleCard; endUp: "first" | "second" }[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showBackside, setShowBackside] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showReading, setShowReading] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [showExpandedReading, setShowExpandedReading] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [question, setQuestion] = useState("")
  const [showDetailedReading, setShowDetailedReading] = useState(false)
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [aiGeneratedReading, setAiGeneratedReading] = useState<string>("")
  const [apiError, setApiError] = useState<string | null>(null)
  const dealAreaRef = useRef<HTMLDivElement>(null)

  // Debug logging
  useEffect(() => {
    console.log("FixedCardDealer mounted")
    console.log("Card data:", cardData)
    return () => {
      console.log("FixedCardDealer unmounted")
    }
  }, [])

  useEffect(() => {
    console.log("Drawn cards updated:", drawnCards)
  }, [drawnCards])

  // Get current spread configuration
  const currentSpread = spreadTypes.find((spread) => spread.id === selectedSpread) || spreadTypes[0]

  // Handle drawing cards
  const handleDrawCards = () => {
    console.log("Draw cards button clicked")
    setIsDrawing(true)
    setShowReading(false)
    setShowBackside(true)
    setShowExpandedReading(false)
    setActiveCardIndex(null)
    setShowDetailedReading(false)
    setAiGeneratedReading("")
    setApiError(null)

    // Scroll to the deal area
    setTimeout(() => {
      console.log("Scrolling to deal area")
      dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    // Clear cards first
    setDrawnCards([])
    console.log("Cards cleared")

    // Simulate card drawing animation
    setTimeout(() => {
      console.log("Drawing new cards")
      const numCards = currentSpread.positions.length
      console.log("Number of cards to draw:", numCards)
      console.log("Available cards:", cardData.length)

      // Make sure we have enough cards
      if (cardData.length === 0) {
        console.error("No card data available")
        setIsDrawing(false)
        return
      }

      // If we don't have enough cards, repeat some
      let shuffled = [...cardData]
      while (shuffled.length < numCards) {
        shuffled = [...shuffled, ...cardData]
      }

      shuffled = shuffled.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, numCards).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      console.log("Selected cards:", selected)
      setDrawnCards(selected)
      setIsDrawing(false)

      // Flip cards after a short delay
      setTimeout(() => {
        console.log("Flipping cards")
        setIsFlipping(true)
        setTimeout(() => {
          console.log("Showing card fronts")
          setShowBackside(false)
          setIsFlipping(false)

          // Show reading after cards are revealed
          setTimeout(() => {
            console.log("Showing reading")
            setShowReading(true)
          }, 500)
        }, 600)
      }, 1000)
    }, 1500)
  }

  // Handle image error
  const handleImageError = (cardId: string) => {
    console.log("Image error for card:", cardId)
    setImageErrors((prev) => ({
      ...prev,
      [cardId]: true,
    }))
  }

  // Get element color
  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case "earth":
        return "bg-green-900/20 border-green-500/30 text-green-300"
      case "water":
        return "bg-blue-900/20 border-blue-500/30 text-blue-300"
      case "fire":
        return "bg-red-900/20 border-red-500/30 text-red-300"
      case "air":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-300"
      case "spirit":
        return "bg-purple-900/20 border-purple-500/30 text-purple-300"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-300"
    }
  }

  // Get element symbol
  const getElementSymbol = (element: string) => {
    switch (element.toLowerCase()) {
      case "earth":
        return "⊕"
      case "water":
        return "≈"
      case "fire":
        return "△"
      case "air":
        return "≋"
      case "spirit":
        return "✧"
      default:
        return "★"
    }
  }

  // Generate detailed reading using Google AI API
  const generateDetailedReading = async () => {
    console.log("Generating detailed reading")
    setIsGeneratingReading(true)
    setApiError(null)

    try {
      // Call the server action to generate the reading
      const reading = await generateReading(drawnCards, question, currentSpread)

      // Update state with the generated reading
      setAiGeneratedReading(reading)
      setShowDetailedReading(true)
    } catch (error) {
      console.error("Error generating reading:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setApiError(`Unable to generate reading. Please try again later. ${errorMessage}`)
      setAiGeneratedReading("I apologize, but I'm unable to generate a reading at this time. Please try again later.")
      setShowDetailedReading(true)
    } finally {
      setIsGeneratingReading(false)
    }
  }

  // Render a card
  const renderCard = (drawnCard: { card: OracleCard; endUp: "first" | "second" } | undefined, index: number) => {
    if (!drawnCard) {
      console.log("No drawn card for index:", index)
      return null
    }

    const { card, endUp } = drawnCard
    const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
    const cardImage = endUp === "first" ? card.firstEndImage : card.secondEndImage
    const hasImageError = imageErrors[card.id]

    return (
      <div
        key={`${card.id}-${index}`}
        className={cn(
          "transition-all duration-1000 transform",
          isFlipping ? "scale-[0.01] rotate-y-90" : "scale-100",
          isDrawing ? "opacity-0 scale-95" : "opacity-100",
        )}
        style={{
          transitionDelay: `${index * 300}ms`,
          perspective: "1000px",
        }}
      >
        <div
          className="w-[180px] h-[280px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)] cursor-pointer hover:shadow-[0_0_30px_rgba(128,0,128,0.5)] transition-shadow duration-300"
          onClick={() => {
            setActiveCardIndex(index)
            setShowExpandedReading(true)
          }}
        >
          {showBackside ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <Image
                src="/back.jpg"
                alt="Card Back"
                width={180}
                height={280}
                className="object-cover"
                onError={() => console.log("Error loading card back image")}
              />
            </div>
          ) : (
            <>
              {!hasImageError && cardImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={cardImage || "/placeholder.svg?height=280&width=180&query=mystical card"}
                    alt={`${card.name} - ${endUp === "first" ? "First End" : "Second End"}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(card.id)}
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                    <div className="text-xs font-medium text-white">{card.name}</div>
                    <div className="text-xs text-gray-300">
                      {cardEnd.number} • {card.element}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-full ${getElementColor(card.element).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4`}
                >
                  <div className="text-center mb-2 text-sm font-medium text-white">{card.name}</div>
                  <div className="w-24 h-24 my-4 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
                    <span className={getElementColor(card.element).split(" ").slice(2).join(" ") + " text-4xl"}>
                      {getElementSymbol(card.element)}
                    </span>
                  </div>
                  <div className="text-xs text-center text-white/80 mt-2">
                    {card.type} • {card.element}
                  </div>
                  <div className="text-lg font-bold text-white mt-2">{cardEnd.number}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // Render reading interpretation
  const renderReadingInterpretation = () => {
    if (!showReading || drawnCards.length === 0) return null

    return (
      <div className="mt-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">Basic Reading</TabsTrigger>
            <TabsTrigger value="detailed" disabled={!showDetailedReading && !isGeneratingReading} className="relative">
              Detailed Reading
              {!showDetailedReading && !isGeneratingReading && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Reading Interpretation</span>
                  {!showDetailedReading && !isGeneratingReading && (
                    <Button
                      onClick={generateDetailedReading}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                      disabled={isGeneratingReading}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isGeneratingReading ? "Generating..." : "Generate Detailed Reading"}
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {question ? `Question: "${question}"` : "Your cards have been drawn. Here's what they reveal:"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {drawnCards.map((drawnCard, index) => {
                  const { card, endUp } = drawnCard
                  const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
                  const position = currentSpread.positions[index]

                  return (
                    <div key={`${card.id}-${index}`} className="border-b border-gray-800 pb-4 last:border-0">
                      <h4 className="font-semibold text-purple-300 mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                          {getElementIcon(card.element)}
                          <span className="ml-2">
                            {card.name} ({endUp === "first" ? "First End" : "Second End"}) - {position.name}
                          </span>
                        </span>
                        <button
                          onClick={() => {
                            setActiveCardIndex(activeCardIndex === index ? null : index)
                            setShowExpandedReading(true)
                          }}
                          className="text-xs bg-purple-900/40 hover:bg-purple-900/60 px-2 py-1 rounded flex items-center"
                        >
                          <Info className="w-3 h-3 mr-1" />
                          Expanded Meaning
                        </button>
                      </h4>
                      <p className="text-gray-300 mb-3">{cardEnd.meaning}</p>
                      <div className="flex flex-wrap gap-2">
                        {cardEnd.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-900/20 text-purple-300 text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      {cardEnd.sacredGeometry && (
                        <div className="mt-3 text-sm">
                          <span className="text-purple-300">Sacred Geometry:</span> {cardEnd.sacredGeometry}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
              <CardFooter>
                {currentSpread.id !== "single" && (
                  <div className="w-full bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Overall Reading</h4>
                    <p className="text-gray-300 mb-2">
                      This {currentSpread.name} reveals {currentSpread.description}
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                      {currentSpread.positions.map((position, index) => (
                        <li key={index}>
                          <span className="text-purple-300">{position.name}:</span> {position.description}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-gray-300">
                      Consider how these energies flow together to guide your path forward.
                    </p>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="detailed">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle>Detailed NUMO Oracle Reading</CardTitle>
                <CardDescription>A comprehensive analysis of your cards by NUMOracle</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                {isGeneratingReading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-center text-gray-400">Channeling the wisdom of the cosmos...</p>
                  </div>
                ) : showDetailedReading ? (
                  <>
                    {apiError && (
                      <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-md text-red-300">
                        {apiError}
                      </div>
                    )}
                    <ReactMarkdown className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-a:text-blue-300">
                      {aiGeneratedReading}
                    </ReactMarkdown>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Book className="w-16 h-16 text-gray-500" />
                    <p className="mt-4 text-center text-gray-400">
                      Generate a detailed reading to see the comprehensive analysis
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Update the renderExpandedCardReading function to display the correct information
  const renderExpandedCardReading = () => {
    if (!showExpandedReading || activeCardIndex === null || !drawnCards[activeCardIndex]) return null

    const { card, endUp } = drawnCards[activeCardIndex]
    const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
    const cardImage = endUp === "first" ? card.firstEndImage : card.secondEndImage

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-900 p-4 border-b border-purple-500/30 flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-300">
              {card.name} - {endUp === "first" ? "First End" : "Second End"}
            </h3>
            <button
              onClick={() => {
                setShowExpandedReading(false)
                setActiveCardIndex(null)
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-[180px] h-[280px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)]">
                  <img
                    src={cardImage || "/placeholder.svg?height=280&width=180&query=mystical card"}
                    alt={card.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Card Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Element:</span> {card.element}
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span> {card.type}
                    </div>
                    <div>
                      <span className="text-gray-400">Number:</span> {cardEnd.number}
                    </div>
                    <div>
                      <span className="text-gray-400">Sacred Geometry:</span> {cardEnd.sacredGeometry}
                    </div>
                    <div>
                      <span className="text-gray-400">Planet:</span> {cardEnd.planet}
                    </div>
                    <div>
                      <span className="text-gray-400">Rules:</span> Capricorn
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Meaning</h4>
                  <p className="text-gray-300">{cardEnd.meaning}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Shadow Aspect</h4>
                  <p className="text-gray-300">{cardEnd.shadowAspect}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {cardEnd.keywords.map((keyword, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-900/20 text-purple-300 text-xs rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {cardEnd.expandedMeaning && (
              <div className="mt-6 border-t border-purple-500/30 pt-4">
                <h4 className="text-purple-300 font-semibold mb-2">Expanded Interpretation</h4>
                <p className="text-gray-300 mb-4">{cardEnd.expandedMeaning}</p>
              </div>
            )}

            {cardEnd.elementalGuidance && (
              <div className="mt-6 border-t border-purple-500/30 pt-4">
                <h4 className="text-purple-300 font-semibold mb-2">Elemental Guidance</h4>
                <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-md">
                  {typeof cardEnd.elementalGuidance === "string" ? (
                    <p className="text-gray-300">{cardEnd.elementalGuidance}</p>
                  ) : (
                    <div className="space-y-3">
                      {cardEnd.elementalGuidance.earth && (
                        <div>
                          <h5 className="text-green-300 font-medium">Earth</h5>
                          <p className="text-gray-300 text-sm">{cardEnd.elementalGuidance.earth}</p>
                        </div>
                      )}
                      {cardEnd.elementalGuidance.air && (
                        <div>
                          <h5 className="text-yellow-300 font-medium">Air</h5>
                          <p className="text-gray-300 text-sm">{cardEnd.elementalGuidance.air}</p>
                        </div>
                      )}
                      {cardEnd.elementalGuidance.fire && (
                        <div>
                          <h5 className="text-red-300 font-medium">Fire</h5>
                          <p className="text-gray-300 text-sm">{cardEnd.elementalGuidance.fire}</p>
                        </div>
                      )}
                      {cardEnd.elementalGuidance.water && (
                        <div>
                          <h5 className="text-blue-300 font-medium">Water</h5>
                          <p className="text-gray-300 text-sm">{cardEnd.elementalGuidance.water}</p>
                        </div>
                      )}
                      {cardEnd.elementalGuidance.spirit && (
                        <div>
                          <h5 className="text-purple-300 font-medium">Spirit</h5>
                          <p className="text-gray-300 text-sm">{cardEnd.elementalGuidance.spirit}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render card layout based on spread type
  const renderCardLayout = () => {
    console.log("Rendering card layout, drawnCards:", drawnCards)

    if (drawnCards.length === 0) return null

    if (selectedSpread === "single") {
      return <div className="flex justify-center">{renderCard(drawnCards[0], 0)}</div>
    } else if (selectedSpread === "three") {
      return (
        <div className="flex flex-wrap justify-center gap-6">
          {drawnCards.map((card, index) => (
            <div key={`${card.card.id}-${index}`} className="text-center">
              {renderCard(card, index)}
              <div className="mt-2 text-sm text-purple-300">{currentSpread.positions[index].name}</div>
            </div>
          ))}
        </div>
      )
    } else if (selectedSpread === "five") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          <div className="md:col-start-3 md:col-span-1 flex justify-center relative">
            {renderCard(drawnCards[0], 0)}
            <div className="absolute -mt-8 text-sm text-purple-300">{currentSpread.positions[0].name}</div>
          </div>
          <div className="md:col-start-2 md:col-span-1 flex justify-center items-center relative">
            {renderCard(drawnCards[1], 1)}
            <div className="absolute -ml-16 text-sm text-purple-300">{currentSpread.positions[1].name}</div>
          </div>
          <div className="md:col-start-4 md:col-span-1 flex justify-center items-center relative">
            {renderCard(drawnCards[2], 2)}
            <div className="absolute ml-16 text-sm text-purple-300">{currentSpread.positions[2].name}</div>
          </div>
          <div className="md:col-start-1 md:col-span-1 flex justify-center relative">
            {renderCard(drawnCards[3], 3)}
            <div className="absolute -ml-16 text-sm text-purple-300">{currentSpread.positions[3].name}</div>
          </div>
          <div className="md:col-start-5 md:col-span-1 flex justify-center relative">
            {renderCard(drawnCards[4], 4)}
            <div className="absolute ml-16 text-sm text-purple-300">{currentSpread.positions[4].name}</div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/80 text-white p-6 rounded-lg border border-purple-500/20 shadow-lg">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
              <span>NUMO Card Dealer</span>
            </h2>
            <p className="text-gray-300">
              Draw oracle cards for guidance and insight. Each card has two distinct ends with unique meanings.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300">
                <HelpCircle className="mr-2 h-4 w-4" />
                How It Works
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-purple-500/30">
              <DialogHeader>
                <DialogTitle>How to Use the NUMO Card Dealer</DialogTitle>
                <DialogDescription>A guide to getting the most from your oracle card reading</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Set Your Intention</h4>
                    <p className="text-sm text-gray-400">
                      Enter your question or focus in the input field. Being clear about what you seek guidance on will
                      help focus the reading.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Choose Your Spread</h4>
                    <p className="text-sm text-gray-400">
                      Select from different spread types depending on your question. More cards provide more detailed
                      insights.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Draw Your Cards</h4>
                    <p className="text-sm text-gray-400">
                      Click "Draw Your Cards" to receive your reading. The cards will be shuffled and drawn randomly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Interpret Your Reading</h4>
                    <p className="text-sm text-gray-400">
                      Review the basic reading or generate a detailed interpretation. Click on any card for expanded
                      meanings.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
              Your Question or Focus (optional)
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What guidance do I need right now?"
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring focus:ring-purple-500/20 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <label htmlFor="spread-type" className="block text-sm font-medium text-gray-300 mb-1">
                Spread Type
              </label>
              <Select value={selectedSpread} onValueChange={setSelectedSpread}>
                <SelectTrigger id="spread-type" className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select spread type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {spreadTypes.map((spread) => (
                    <SelectItem key={spread.id} value={spread.id}>
                      {spread.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-gray-300 mb-1">&nbsp;</label>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                onClick={handleDrawCards}
                disabled={isDrawing}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isDrawing ? "Drawing Cards..." : "Draw Your Cards"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div ref={dealAreaRef} className="min-h-[300px] mb-8">
        {drawnCards.length > 0 ? (
          renderCardLayout()
        ) : (
          <div className="h-[300px] flex items-center justify-center text-center text-gray-400">
            <div>
              <Book className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>Select a spread type and draw your cards</p>
            </div>
          </div>
        )}
      </div>

      {renderReadingInterpretation()}
      {renderExpandedCardReading()}

      {drawnCards.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="border-purple-500 text-purple-300" onClick={handleDrawCards}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Draw New Cards
          </Button>
        </div>
      )}
    </div>
  )
}
