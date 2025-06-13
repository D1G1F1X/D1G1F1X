"use client"

import type React from "react"

import { useState, useRef, useEffect, useReducer } from "react"
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
import {
  Sparkles,
  RefreshCw,
  Info,
  HelpCircle,
  Book,
  Wand2,
  Flame,
  Droplets,
  Wind,
  Leaf,
  Star,
  AlertTriangle,
} from "lucide-react"
import { generateReading } from "@/lib/actions/generate-reading"
import { getAllCards, getCardImagePath } from "@/lib/card-data-access" // Updated import
import type { OracleCard } from "@/types/cards"

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
  isGeneratingReading: boolean
  dataErrors: Record<string, string[]>
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
  | { type: "SET_GENERATING_READING"; payload: boolean }
  | { type: "SET_DATA_ERRORS"; payload: Record<string, string[]> }

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
        dataErrors: {},
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
        dataErrors: {},
      }
    case "SET_GENERATING_READING":
      return {
        ...state,
        isGeneratingReading: action.payload,
      }
    case "SET_DATA_ERRORS":
      return {
        ...state,
        dataErrors: action.payload,
      }
    default:
      return state
  }
}

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

// Get all cards from the master data source
const cardData = getAllCards()

// Validate card data
function validateCardData(card: OracleCard): string[] {
  const errors: string[] = []

  if (!card.id) errors.push("Missing card ID")
  if (!card.fullTitle) errors.push("Missing full title")
  if (!card.baseElement) errors.push("Missing base element")
  if (!card.suit) errors.push("Missing suit")

  if (!card.keyMeanings || card.keyMeanings.length < 4) {
    errors.push("Missing or insufficient key meanings (expected at least 4)")
  }

  if (!card.symbolismBreakdown || !Array.isArray(card.symbolismBreakdown) || card.symbolismBreakdown.length === 0) {
    errors.push("Missing or empty symbolism breakdown")
  }

  if (!card.symbols || !Array.isArray(card.symbols) || card.symbols.length === 0) {
    errors.push("Missing or empty symbols array")
  }

  return errors
}

// Get element icon
const getElementIcon = (element: string) => {
  switch (element?.toLowerCase()) {
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

interface CardDealerProps {
  cards?: OracleCard[]
  onReadingGenerated?: (reading: any) => void
  className?: string
  allowFreeReading?: boolean
  maxCards?: number
  defaultSpread?: "single" | "three"
}

export default function CardDealer({
  cards,
  onReadingGenerated,
  className,
  allowFreeReading = false,
  maxCards = 3,
  defaultSpread = "three",
}: CardDealerProps) {
  // Use provided cards or fall back to the master card data
  const availableCards = cards || cardData

  // State variables
  const [selectedSpread, setSelectedSpread] = useState<string>("threeElements")
  const [question, setQuestion] = useState("")
  const dealAreaRef = useRef<HTMLDivElement>(null)
  const [showExpandedReading, setShowExpandedReading] = useState(false) // Declare showExpandedReading variable

  // UseReducer for managing card dealer state
  const [cardState, dispatch] = useReducer(cardDealerReducer, {
    drawnCards: [],
    isDrawing: false,
    showBackside: true,
    isFlipping: false,
    showReading: false,
    activeCardIndex: null,
    showDetailedReading: false,
    isGeneratingReading: false,
    dataErrors: {},
  })

  // Destructure the state for easier access
  const {
    drawnCards,
    isDrawing,
    showBackside,
    isFlipping,
    showReading,
    activeCardIndex,
    showDetailedReading,
    isGeneratingReading,
    dataErrors,
  } = cardState

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Get current spread configuration
  const currentSpread = spreadTypes.find((spread) => spread.id === selectedSpread) || spreadTypes[0]

  // Handle draw cards function
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
      const shuffled = [...availableCards].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, numCards).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      console.log("Selected cards:", selected)
      dispatch({ type: "SET_CARDS", payload: selected })

      // Validate card data
      const errors: Record<string, string[]> = {}
      selected.forEach(({ card }) => {
        const cardErrors = validateCardData(card)
        if (cardErrors.length) {
          errors[card.id] = cardErrors
        }
      })

      if (Object.keys(errors).length) {
        console.warn("Card data validation errors:", errors)
        dispatch({ type: "SET_DATA_ERRORS", payload: errors })
      }

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

  // Handle image error with improved fallback strategy
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, card: OracleCard, endUp: "first" | "second") => {
    console.log(`Image error for card: ${card.id}, end: ${endUp}`)

    const target = e.target as HTMLImageElement
    const cardId = card.id

    // Try alternative path formats before falling back
    if (!target.src.includes("placeholder")) {
      // First fallback: Try with different case for element
      const element = endUp === "first" ? card.baseElement : card.synergisticElement
      const elementVariations = [
        element?.toLowerCase(),
        element?.toUpperCase(),
        element?.charAt(0).toUpperCase() + element?.slice(1).toLowerCase(),
      ]

      // Try each variation
      for (const elementVar of elementVariations) {
        const altPath = `/cards/${card.number}${card.suit?.toLowerCase()}-${elementVar || "spirit"}.jpg`

        // If we haven't tried this path yet, try it
        if (target.src !== altPath) {
          target.src = altPath
          return
        }
      }

      // If all variations fail, use placeholder
      target.src = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`
    }

    // Record the error
    setImageErrors((prev) => ({
      ...prev,
      [`${cardId}-${endUp}`]: true,
    }))
  }

  // Get element color
  const getElementColor = (element: string) => {
    switch (element?.toLowerCase()) {
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
    switch (element?.toLowerCase()) {
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
    dispatch({ type: "SET_GENERATING_READING", payload: true })

    try {
      // Call the server action to generate the reading
      const reading = await generateReading(drawnCards, question, currentSpread)

      // Update state with the generated reading
      // Note: The actual AI generated content would be returned here and set to state
      // For now, we'll just set showDetailedReading to true
      dispatch({ type: "SET_GENERATING_READING", payload: false })
      // Assuming generateReading returns the full reading content
      // setAiGeneratedReading(reading.content); // Uncomment if generateReading returns content
      // setShowDetailedReading(true); // Uncomment if you want to show it immediately
    } catch (error) {
      console.error("Error generating reading:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      dispatch({ type: "SET_GENERATING_READING", payload: false })
      // setAiGeneratedReading(`Error: ${errorMessage}`); // Uncomment if you want to show error
    }
  }

  // Handle card click
  const handleCardClick = (index: number) => {
    dispatch({ type: "SET_ACTIVE_CARD", payload: index })
    setShowExpandedReading(true) // Set showExpandedReading to true on card click
  }

  // Get card image with fallback handling
  const getCardImage = (card: OracleCard, endUp: "first" | "second") => {
    const hasImageError = imageErrors[`${card.id}-${endUp}`]
    const imagePath = getCardImagePath(card, endUp)
    const fallbackPath = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`

    if (hasImageError) {
      return (
        <div
          className={`w-full h-full ${getElementColor(card.baseElement).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4`}
        >
          <div className="text-center mb-2 text-sm font-medium text-white">{card.fullTitle}</div>
          <div className="w-24 h-24 my-4 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
            <span className={getElementColor(card.baseElement).split(" ").slice(2).join(" ") + " text-4xl"}>
              {getElementSymbol(card.baseElement)}
            </span>
          </div>
          <div className="text-xs text-center text-white/80 mt-2">
            {card.suit} • {card.baseElement}
          </div>
          <div className="text-lg font-bold text-white mt-2">{card.number}</div>
        </div>
      )
    }

    return (
      <Image
        src={imagePath || fallbackPath}
        alt={`${card.fullTitle} - ${endUp === "first" ? "Base Element" : "Synergistic Element"}`}
        fill
        className="object-cover"
        onError={(e) => handleImageError(e, card, endUp)}
        priority
      />
    )
  }

  // Render a card
  const renderCard = (drawnCard: { card: OracleCard; endUp: "first" | "second" } | undefined, index: number) => {
    if (!drawnCard) return null

    const { card, endUp } = drawnCard
    const hasErrors = dataErrors[card.id]?.length > 0

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
          className={cn(
            "w-[180px] h-[280px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)] cursor-pointer hover:shadow-[0_0_30px_rgba(128,0,128,0.5)] transition-shadow duration-300",
            hasErrors ? "border-2 border-red-500" : "",
          )}
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
            <div className="relative w-full h-full">
              {getCardImage(card, endUp)}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                <div className="text-xs font-medium text-white">{card.fullTitle}</div>
                <div className="text-xs text-gray-300">
                  {card.number} • {endUp === "first" ? card.baseElement : card.synergisticElement}
                </div>
              </div>
              {hasErrors && (
                <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1" title="Data errors detected">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
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
                {Object.keys(dataErrors).length > 0 && (
                  <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-md mb-4">
                    <h4 className="font-semibold text-red-300 mb-2 flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Data Inconsistencies Detected
                    </h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Some cards have data inconsistencies that may affect your reading. Please report this issue.
                    </p>
                    <details className="text-xs text-gray-400">
                      <summary className="cursor-pointer hover:text-gray-300">View Details</summary>
                      <pre className="mt-2 p-2 bg-black/30 rounded overflow-auto">
                        {JSON.stringify(dataErrors, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}

                {drawnCards.map((drawnCard, index) => {
                  const { card, endUp } = drawnCard
                  const position = currentSpread.positions[index]
                  const meaning = endUp === "first" ? card.keyMeanings?.[0] : card.keyMeanings?.[2] // Use keyMeanings directly

                  return (
                    <div key={`${card.id}-${index}`} className="border-b border-gray-800 pb-4 last:border-0">
                      <h4 className="font-semibold text-purple-300 mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                          {getElementIcon(card.baseElement)}
                          <span className="ml-2">
                            {card.fullTitle} ({endUp === "first" ? "Base Element" : "Synergistic Element"}) -{" "}
                            {position.name}
                          </span>
                        </span>
                        <button
                          onClick={() => {
                            handleCardClick(index)
                          }}
                          className="text-xs bg-purple-900/40 hover:bg-purple-900/60 px-2 py-1 rounded flex items-center"
                        >
                          <Info className="w-3 h-3 mr-1" />
                          Expanded Meaning
                        </button>
                      </h4>
                      <p className="text-gray-300 mb-3">{meaning || "No meaning available"}</p>
                      <div className="flex flex-wrap gap-2">
                        {card.keyMeanings.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-900/20 text-purple-300 text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      {card.sacredGeometry && (
                        <div className="mt-3 text-sm">
                          <span className="text-purple-300">Sacred Geometry:</span> {card.sacredGeometry}
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
                  <div className="flex flex-col items-center justify-center py-12">
                    <Book className="w-16 h-16 text-gray-500" />
                    <p className="mt-4 text-center text-gray-400">
                      Generate a detailed reading to see the comprehensive analysis
                    </p>
                  </div>
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
    const cardImage = getCardImagePath(card, endUp)
    const hasErrors = dataErrors[card.id]?.length > 0
    const meaning = endUp === "first" ? card.keyMeanings?.[0] : card.keyMeanings?.[2] // Use keyMeanings directly

    const closeExpandedReading = () => {
      setShowExpandedReading(false) // Use setShowExpandedReading instead of dispatch
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-900 p-4 border-b border-purple-500/30 flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-300">
              {card.fullTitle} - {endUp === "first" ? "Base Element" : "Synergistic Element"}
            </h3>
            <button onClick={closeExpandedReading} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          <div className="p-6">
            {hasErrors && (
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-md mb-4">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Data Inconsistencies Detected
                </h4>
                <ul className="list-disc pl-5 text-sm text-red-200">
                  {dataErrors[card.id].map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-[180px] h-[280px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)]">
                  {getCardImage(card, endUp)}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Card Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Base Element:</span> {card.baseElement || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Synergistic Element:</span> {card.synergisticElement || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Suit:</span> {card.suit || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Number:</span> {card.number || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Sacred Geometry:</span> {card.sacredGeometry || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Planet:</span> {card.planetInternalInfluence || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Astrological Sign:</span>{" "}
                      {card.astrologyExternalDomain || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Icon:</span> {card.iconSymbol || "Unknown"}
                    </div>
                    <div>
                      <span className="text-gray-400">Orientation:</span> {card.orientation || "Unknown"}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-purple-300 font-semibold mb-1">Meaning</h4>
                  <p className="text-gray-300">{meaning || "No meaning available"}</p>
                </div>

                {card.keyMeanings && card.keyMeanings.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-purple-300 font-semibold mb-1">Key Meanings</h4>
                    <div className="flex flex-wrap gap-2">
                      {card.keyMeanings.map((meaning, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-900/20 text-purple-300 text-xs rounded-full">
                          {meaning}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {card.symbolismBreakdown && card.symbolismBreakdown.length > 0 && (
                  <div className="mt-6 border-t border-purple-500/30 pt-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Symbolism Breakdown</h4>
                    <div className="space-y-2">
                      {card.symbolismBreakdown.map((item, i) => (
                        <p key={i} className="text-gray-300 text-sm">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
    for (let i = 0; i < Math.min(5, availableCards.length); i++) {
      const card = availableCards[i]
      if (!card) continue

      const firstEndImage = getCardImagePath(card, "first")
      const secondEndImage = getCardImagePath(card, "second")

      if (firstEndImage) {
        new Image().src = firstEndImage
      }
      if (secondEndImage) {
        new Image().src = secondEndImage
      }
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto bg-black/80 text-white p-6 rounded-lg border border-purple-500/20 shadow-lg",
        className,
      )}
      ref={dealAreaRef}
    >
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
