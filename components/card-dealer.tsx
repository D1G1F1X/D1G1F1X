"use client"

import { useState, useRef, useReducer, useEffect } from "react"
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
import comprehensiveCardData from "@/data/oracle-cards.json" // Import comprehensive card data
import { getCardImagePath, handleCardImageError } from "@/lib/card-image-handler"

// Define a state type for our card dealer
type CardDealerState = {
  drawnCards: { card: OracleCard; endUp: "first" | "second" }[]
  isDrawing: boolean
  showBackside: boolean
  isFlipping: boolean
  showReading: boolean
  activeCardIndex: number | null
  showExpandedReading: boolean
  showDetailedReading: boolean
}

// Define the actions that can be performed
type CardDealerAction =
  | { type: "START_DRAWING" }
  | { type: "SET_CARDS"; payload: { card: OracleCard; endUp: "first" | "second" }[] }
  | { type: "START_FLIPPING" }
  | { type: "SHOW_CARD_FRONTS" }
  | { type: "SHOW_READING" }
  | { type: "SET_ACTIVE_CARD"; payload: number }
  | { type: "HIDE_EXPANDED_READING" }
  | { type: "CLEAR_CARDS" }

// Create a reducer function to handle state transitions
function cardDealerReducer(state: CardDealerState, action: CardDealerAction): CardDealerState {
  switch (action.type) {
    case "START_DRAWING":
      return {
        ...state,
        isDrawing: true,
        showReading: false,
        showBackside: true,
        showExpandedReading: false,
        activeCardIndex: null,
        showDetailedReading: false,
        drawnCards: [],
      }
    case "SET_CARDS":
      return {
        ...state,
        drawnCards: action.payload,
        isDrawing: false,
      }
    case "START_FLIPPING":
      return {
        ...state,
        isFlipping: true,
      }
    case "SHOW_CARD_FRONTS":
      return {
        ...state,
        showBackside: false,
        isFlipping: false,
      }
    case "SHOW_READING":
      return {
        ...state,
        showReading: true,
      }
    case "SET_ACTIVE_CARD":
      return {
        ...state,
        activeCardIndex: action.payload,
        showExpandedReading: true,
      }
    case "HIDE_EXPANDED_READING":
      return {
        ...state,
        showExpandedReading: false,
        activeCardIndex: null,
      }
    case "CLEAR_CARDS":
      return {
        ...state,
        drawnCards: [],
      }
    default:
      return state
  }
}

// Card interfaces remain the same as in the original component
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
    id: "threeElements",
    name: "Three Elements Spread",
    description: "Reveals how three key elements influence your situation.",
    positions: [
      {
        name: "Mind (Air)",
        description: "Mental influences and thoughts affecting the outcome",
      },
      {
        name: "Body (Earth)",
        description: "Physical aspects and material considerations",
      },
      {
        name: "Spirit (Fire)",
        description: "Creative energy and spiritual guidance",
      },
    ],
  },
  {
    id: "five",
    name: "Five Card Spread",
    description: "Provides a deeper insight into your situation.",
    positions: [
      {
        name: "Center",
        description: "The core issue or focus of your question",
      },
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
      {
        name: "Outcome",
        description: "The likely result of your current situation",
      },
    ],
  },
]

// Card data remains the same as in the original component
const cardData: OracleCard[] = comprehensiveCardData // Use comprehensive card data

// Helper functions remain the same
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

export default function CardDealer() {
  // State variables
  const [selectedSpread, setSelectedSpread] = useState<string>("threeElements")
  // Replace these useState declarations:
  // const [drawnCards, setDrawnCards] = useState<{ card: OracleCard; endUp: "first" | "second" }[]>([])
  // const [isDrawing, setIsDrawing] = useState(false)
  // const [showBackside, setShowBackside] = useState(true)
  // const [isFlipping, setIsFlipping] = useState(false)
  // const [showReading, setShowReading] = useState(false)
  // const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  // const [showExpandedReading, setShowExpandedReading] = useState(false)
  // const [showDetailedReading, setShowDetailedReading] = useState(false)

  // With this useReducer:
  const [cardState, dispatch] = useReducer(cardDealerReducer, {
    drawnCards: [],
    isDrawing: false,
    showBackside: true,
    isFlipping: false,
    showReading: false,
    activeCardIndex: null,
    showExpandedReading: false,
    showDetailedReading: false,
  })

  // Destructure the state for easier access
  const {
    drawnCards,
    isDrawing,
    showBackside,
    isFlipping,
    showReading,
    activeCardIndex,
    showExpandedReading,
    showDetailedReading,
  } = cardState
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [question, setQuestion] = useState("")
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [aiGeneratedReading, setAiGeneratedReading] = useState<string>("")
  const dealAreaRef = useRef<HTMLDivElement>(null)

  // Get current spread configuration
  const currentSpread = spreadTypes.find((spread) => spread.id === selectedSpread) || spreadTypes[0]

  // Replace the handleDrawCards function with:
  const handleDrawCards = () => {
    console.log("Draw cards button clicked")

    // Start drawing process
    dispatch({ type: "START_DRAWING" })

    // Scroll to the deal area
    setTimeout(() => {
      console.log("Scrolling to deal area")
      dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    // Simulate card drawing animation
    setTimeout(() => {
      console.log("Drawing new cards")
      const numCards = currentSpread.positions.length
      const shuffled = [...cardData].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, numCards).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      console.log("Selected cards:", selected)
      dispatch({ type: "SET_CARDS", payload: selected })

      // Flip cards after a short delay
      setTimeout(() => {
        console.log("Flipping cards")
        dispatch({ type: "START_FLIPPING" })

        setTimeout(() => {
          console.log("Showing card fronts")
          dispatch({ type: "SHOW_CARD_FRONTS" })

          // Show reading after cards are revealed
          setTimeout(() => {
            console.log("Showing reading")
            dispatch({ type: "SHOW_READING" })
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

    // Log the error for debugging
    console.warn(`Failed to load image for card: ${cardId}`)
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

    try {
      // Call the server action to generate the reading
      const reading = await generateReading(drawnCards, question, currentSpread)

      // Update state with the generated reading
      setAiGeneratedReading(reading)
      // setShowDetailedReading(true) // No longer directly setting state
    } catch (error) {
      console.error("Error generating reading:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setAiGeneratedReading(
        `I apologize, but I'm unable to generate a reading at this time. Please try again later. (Error: ${errorMessage})`,
      )
    } finally {
      setIsGeneratingReading(false)
    }
  }

  // Update the renderCard function:
  const handleCardClick = (index: number) => {
    dispatch({ type: "SET_ACTIVE_CARD", payload: index })
  }

  // Render a card
  const renderCard = (drawnCard: { card: OracleCard; endUp: "first" | "second" } | undefined, index: number) => {
    if (!drawnCard) return null

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
          onClick={() => handleCardClick(index)}
        >
          {showBackside ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <Image
                src="/back.jpg"
                alt="Card Back"
                width={180}
                height={280}
                className="object-cover"
                onError={() => {}}
              />
            </div>
          ) : (
            <>
              {!hasImageError && cardImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={
                      getCardImagePath(card.id, card.element, endUp) ||
                      "/placeholder.svg?height=280&width=180&query=mystical card"
                    }
                    alt={`${card.name} - ${endUp === "first" ? "First End" : "Second End"}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      handleCardImageError(e, card)
                      handleImageError(card.id)
                    }}
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
                            handleCardClick(activeCardIndex === index ? null : index)
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
                  <ReactMarkdown className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-a:text-blue-300">
                    {aiGeneratedReading}
                  </ReactMarkdown>
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

    // Update renderExpandedCardReading function:
    const closeExpandedReading = () => {
      dispatch({ type: "HIDE_EXPANDED_READING" })
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-900 p-4 border-b border-purple-500/30 flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-300">
              {card.name} - {endUp === "first" ? "First End" : "Second End"}
            </h3>
            <button onClick={closeExpandedReading} className="text-gray-400 hover:text-white">
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
                      <span className="text-gray-400">Rules:</span> {cardEnd.astrologicalSign}
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
    } else if (selectedSpread === "threeElements") {
      return (
        <div className="flex justify-center gap-6">
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

  useEffect(() => {
    // Preload common card images when the component mounts
    preloadCommonCardImages()
  }, [])

  const preloadCommonCardImages = () => {
    // Preload images for the first few cards to improve initial loading
    for (let i = 0; i < Math.min(5, cardData.length); i++) {
      const card = cardData[i]
      const firstEndImage = getCardImagePath(card.id, card.element, "first")
      const secondEndImage = getCardImagePath(card.id, card.element, "second")

      if (firstEndImage) {
        new Image().src = firstEndImage
      }
      if (secondEndImage) {
        new Image().src = secondEndImage
      }
    }
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
