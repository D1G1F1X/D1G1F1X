"use client"

import { useRef } from "react"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { generateReading } from "@/lib/actions/generate-reading"
import { useToast } from "@/components/ui/use-toast"
import type { CardData } from "@/types/cards"
import type { ReadingData } from "@/types/readings"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardByNumber, getBaseElement } from "@/lib/card-data-access"
import { Badge } from "@/components/ui/badge"

import { calculateLifePath } from "@/lib/numerology"
import { useMembership } from "@/lib/membership-context"
import type { SavedReading } from "@/types/saved-readings"
import type { OracleCard } from "@/types/cards" // Import the types
import comprehensiveCardData from "@/lib/comprehensive-card-data" // Import the comprehensive card data

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

// Define user input form data
interface UserFormData {
  fullName: string
  birthDate: Date | undefined
  birthPlace: string
  question: string
}

// Basic spread types (available to all users)
const basicSpreadTypes: SpreadType[] = [
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

// Advanced spread types (available only to members)
const advancedSpreadTypes: SpreadType[] = [
  ...basicSpreadTypes,
  {
    id: "celtic",
    name: "Celtic Cross",
    description: "A comprehensive spread that examines multiple aspects of your question.",
    positions: [
      {
        name: "Present",
        description: "The central issue or present situation",
      },
      {
        name: "Challenge",
        description: "The immediate challenge or crossing influence",
      },
      {
        name: "Foundation",
        description: "The foundation or root of the matter",
      },
      {
        name: "Recent Past",
        description: "Recent events or influences that are still relevant",
      },
      {
        name: "Potential",
        description: "Potential outcome or what could manifest",
      },
      {
        name: "Near Future",
        description: "Upcoming influences or what's beginning to unfold",
      },
      {
        name: "Self",
        description: "Your attitude or approach to the situation",
      },
      {
        name: "Environment",
        description: "External influences, other people's attitudes",
      },
      {
        name: "Hopes/Fears",
        description: "Your hopes and/or fears about the situation",
      },
      {
        name: "Outcome",
        description: "The likely outcome if the current course is maintained",
      },
    ],
  },
  {
    id: "relationship",
    name: "Relationship Reading",
    description: "Explores the dynamics and potential of a relationship.",
    positions: [
      {
        name: "You",
        description: "Your energy in the relationship",
      },
      {
        name: "Partner",
        description: "The other person's energy in the relationship",
      },
      {
        name: "Connection",
        description: "The nature of your connection",
      },
      {
        name: "Challenge",
        description: "Current challenges in the relationship",
      },
      {
        name: "Potential",
        description: "Potential for growth and development",
      },
      {
        name: "Guidance",
        description: "Advice for nurturing the relationship",
      },
    ],
  },
  {
    id: "career",
    name: "Career Path",
    description: "Guidance for your professional life and career decisions.",
    positions: [
      {
        name: "Current Situation",
        description: "Your current career position",
      },
      {
        name: "Strengths",
        description: "Your professional strengths and assets",
      },
      {
        name: "Challenges",
        description: "Obstacles or areas for growth",
      },
      {
        name: "Hidden Factors",
        description: "Unseen influences affecting your career",
      },
      {
        name: "Next Steps",
        description: "Immediate actions to consider",
      },
      {
        name: "Long-term Potential",
        description: "Future possibilities and direction",
      },
    ],
  },
  {
    id: "decision",
    name: "Decision Making",
    description: "Helps clarify options and factors in an important decision.",
    positions: [
      {
        name: "Current Situation",
        description: "The context of your decision",
      },
      {
        name: "Option A",
        description: "First choice or path",
      },
      {
        name: "Option B",
        description: "Second choice or path",
      },
      {
        name: "Key Factor",
        description: "Important consideration that may be overlooked",
      },
      {
        name: "Guidance",
        description: "Advice for making the best decision",
      },
    ],
  },
]

// Get element icon
const getElementIcon = (element: string) => {
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

interface EnhancedCardDealerProps {
  cards: CardData[]
  onReadingGenerated?: (reading: ReadingData) => void
  className?: string
  allowFreeReading?: boolean
  maxCards?: number
  defaultSpread?: "single" | "three"
}

export default function EnhancedCardDealer({
  cards,
  onReadingGenerated,
  className,
  allowFreeReading = false,
  maxCards = 3,
  defaultSpread = "three",
}: EnhancedCardDealerProps) {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [flippedCards, setFlippedCards] = useState<boolean[]>([])
  const [isDealing, setIsDealing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reading, setReading] = useState<ReadingData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [spreadType, setSpreadType] = useState<"single" | "three">(defaultSpread)
  const [question, setQuestion] = useState("")
  const { toast } = useToast()
  const dealerRef = useRef<HTMLDivElement>(null)
  // State variables
  const [selectedSpread, setSelectedSpread] = useState<string>("three")
  const [drawnCardsState, setDrawnCardsState] = useState<{ card: OracleCard; endUp: "first" | "second" }[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showBackside, setShowBackside] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showReading, setShowReading] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [showExpandedReading, setShowExpandedReading] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [showDetailedReading, setShowDetailedReading] = useState(false)
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [aiGeneratedReading, setAiGeneratedReading] = useState<string>("")
  const [currentStep, setCurrentStep] = useState<"form" | "cards" | "reading">("form")
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    birthDate: undefined,
    birthPlace: "",
    question: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<UserFormData>>({})
  const [lifePath, setLifePath] = useState<number | null>(null)
  const dealAreaRef = useRef<HTMLDivElement>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [readingMode, setReadingMode] = useState<"basic" | "advanced">("basic")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedReading, setSelectedReading] = useState<SavedReading | null>(null)
  const [readingTitle, setReadingTitle] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [readingNotes, setReadingNotes] = useState<string>("")
  const [membership, setMembership] = useState({
    isAuthenticated: false,
    checkMembership: () => false,
    login: () => Promise.resolve(false),
    logout: () => {},
  })

  const [isAdvancedModeAvailable, setIsAdvancedModeAvailable] = useState(false)
  const [drawnCards, setDrawnCards] = useState<any[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const context = useMembership()
  const { isAuthenticated, checkMembership } = context
  setMembership(context)

  useEffect(() => {
    setIsAdvancedModeAvailable(isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    resetDealer()
  }, [spreadType])

  const resetDealer = () => {
    setSelectedCards([])
    setFlippedCards([])
    setIsDealing(false)
    setReading(null)
    setError(null)
  }

  const dealCards = async () => {
    if (isDealing) return

    resetDealer()
    setIsDealing(true)

    const numCards = spreadType === "single" ? 1 : 3
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    const newSelectedCards = shuffled.slice(0, numCards)

    // Deal cards one by one with animation
    for (let i = 0; i < numCards; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSelectedCards((prev) => [...prev, newSelectedCards[i]])
      setFlippedCards((prev) => [...prev, false])
    }

    setIsDealing(false)
  }

  const flipCard = (index: number) => {
    if (isDealing || flippedCards[index]) return

    const newFlippedCards = [...flippedCards]
    newFlippedCards[index] = true
    setFlippedCards(newFlippedCards)
  }

  const generateReadingFromCards = async () => {
    if (isGenerating || selectedCards.length === 0) return

    // Check if all cards are flipped
    if (!flippedCards.every((flipped) => flipped)) {
      toast({
        title: "Flip all cards",
        description: "Please flip all cards before generating a reading",
        variant: "destructive",
      })
      return
    }

    // Check if question is provided
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter your question for the reading",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const readingData = await generateReading({
        cards: selectedCards,
        question: question,
      })

      setReading(readingData)
      if (onReadingGenerated) {
        onReadingGenerated(readingData)
      }
    } catch (err) {
      console.error("Error generating reading:", err)
      setError("Failed to generate reading. Please try again.", err)
      toast({
        title: "Error",
        description: "Failed to generate reading. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const cardWidth = spreadType === "single" ? "w-64" : "w-48"
  const cardHeight = spreadType === "single" ? "h-96" : "h-72"

  // Get current spread configuration based on reading mode
  const availableSpreadTypes = readingMode === "basic" ? basicSpreadTypes : advancedSpreadTypes
  const currentSpread = availableSpreadTypes.find((spread) => spread.id === selectedSpread) || availableSpreadTypes[0]

  // Handle form input changes
  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Clear error for this field if it exists
    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

  // Validate form
  const validateForm = () => {
    const errors: Partial<UserFormData> = {}

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
    }

    if (!formData.question.trim()) {
      errors.question = "Question is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Calculate life path number
      if (formData.birthDate) {
        const lifePathNumber = calculateLifePath(formData.birthDate)
        setLifePath(lifePathNumber)
      }

      // Move to card drawing step
      setCurrentStep("cards")

      // Scroll to the deal area
      setTimeout(() => {
        dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  // Handle drawing cards
  const handleDrawCards = () => {
    setIsDrawing(true)
    setShowReading(false)
    setShowBackside(true)
    setShowExpandedReading(false)
    setActiveCardIndex(null)
    setShowDetailedReading(false)
    setAiGeneratedReading("")
    setReadingTitle("")
    setSaveSuccess(false)

    // Scroll to the deal area
    setTimeout(() => {
      dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    // Clear cards first
    setDrawnCards([])

    // Simulate card drawing animation
    setTimeout(() => {
      const numCards = currentSpread.positions.length

      // Make sure we have enough cards
      if (!comprehensiveCardData || comprehensiveCardData.length === 0) {
        console.error("No card data available")
        setIsDrawing(false)
        return
      }

      // If we don't have enough cards, repeat some
      let shuffled = [...comprehensiveCardData]
      while (shuffled.length < numCards) {
        shuffled = [...shuffled, ...comprehensiveCardData]
      }

      shuffled = shuffled.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, numCards).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      setDrawnCards(selected)
      setIsDrawing(false)

      // Flip cards after a short delay
      setTimeout(() => {
        setIsFlipping(true)
        setTimeout(() => {
          setShowBackside(false)
          setIsFlipping(false)

          // Show reading after cards are revealed
          setTimeout(() => {
            setShowReading(true)
            setCurrentStep("reading")
          }, 500)
        }, 600)
      }, 1000)
    }, 1500)
  }

  // Handle image error
  const handleImageError = (cardId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [cardId]: true,
    }))
  }

  // Add memoization to expensive calculations
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
    setIsGeneratingReading(true)

    try {
      // In a real app, this would call an API endpoint
      // For demo purposes, we'll simulate a response

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a simulated reading
      const reading = generateSimulatedReading()

      // Update state with the generated reading
      setAiGeneratedReading(reading)
      setShowDetailedReading(true)
    } catch (error) {
      console.error("Error generating reading:", error)
      setAiGeneratedReading("I apologize, but I'm unable to generate a reading at this time. Please try again later.")
    } finally {
      setIsGeneratingReading(false)
    }
  }

  // Generate a simulated reading
  const generateSimulatedReading = (): string => {
    const userName = formData.fullName.split(" ")[0] || "Seeker"
    const question = formData.question
    const spreadName = currentSpread.name

    // Create sections for the reading
    const intro = `# NUMO Oracle Reading for ${userName}

## Your Question
"${question}"

I've consulted the NUMO Oracle cards to provide guidance on your question. The ${spreadName} reveals important insights about your situation.`

    const cardInterpretations = drawnCards
      .map((drawnCard, index) => {
        const { card, endUp } = drawnCard
        const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
        const position = currentSpread.positions[index]

        return `
### ${position.name}: ${card.name} (${card.element})

This ${card.element} card in the ${position.name} position reveals ${cardEnd.meaning}

The number ${cardEnd.number} suggests ${getNumberMeaning(cardEnd.number)}.

${cardEnd.keywords.join(", ")} are key themes to consider here.`
      })
      .join("\n")

    const patterns = `
## Patterns and Connections

${getPatternInsight()}

${getElementalInsight()}

${getNumerologicalInsight()}`

    const guidance = `
## Guidance and Recommendations

Based on these cards, consider the following actions:

1. ${getActionRecommendation(1)}
2. ${getActionRecommendation(2)}
3. ${getActionRecommendation(3)}

## Timing Considerations

${getTimingInsight()}

## Final Thoughts

Remember that you have the power to shape your path forward. These cards offer guidance, but your free will and choices ultimately determine your journey. Trust your intuition as you integrate these insights.`

    return `${intro}\n\n## Card Interpretations\n${cardInterpretations}\n${patterns}\n${guidance}`
  }

  // Helper functions for simulated reading
  const getNumberMeaning = (number: number): string => {
    const meanings = {
      0: "infinite potential and the void from which all creation emerges",
      1: "new beginnings, independence, and leadership",
      2: "balance, partnership, and duality",
      3: "creativity, expression, and growth",
      4: "stability, structure, and foundation",
      5: "change, freedom, and adventure",
      6: "harmony, responsibility, and nurturing",
      7: "spirituality, wisdom, and inner knowing",
      8: "abundance, power, and manifestation",
      10: "completion of a cycle and the beginning of a new one",
      25: "intuitive wisdom and spiritual insight",
      38: "creative expression through relationships",
      47: "practical analysis and structured growth",
      52: "transformation through communication",
      69: "compassionate service and spiritual responsibility",
      74: "practical wisdom and material mastery",
      83: "abundance through creative expression",
      96: "completion and spiritual fulfillment",
    }

    return meanings[number as keyof typeof meanings] || "personal transformation and spiritual growth"
  }

  const getPatternInsight = (): string => {
    const elements = drawnCards.map((item) => item.card.element.toLowerCase())
    const dominantElement = getMostCommonElement(elements)

    return `The cards show a predominance of ${dominantElement} energy, suggesting that ${getElementalAdvice(dominantElement)}.`
  }

  const getElementalInsight = (): string => {
    const elements = drawnCards.map((item) => item.card.element.toLowerCase())
    const missingElements = ["fire", "water", "air", "earth", "spirit"].filter((el) => !elements.includes(el))

    if (missingElements.length > 0) {
      return `You may benefit from consciously incorporating more ${missingElements.join(", ")} energy into your approach, as these elements are not strongly represented in your reading.`
    } else {
      return `Your reading shows a balanced representation of all elemental energies, suggesting a holistic approach to your situation.`
    }
  }

  const getNumerologicalInsight = (): string => {
    if (lifePath) {
      return `Your Life Path number ${lifePath} resonates with the energy of ${getLifePathMeaning(lifePath)}. This core vibration influences how you interact with the energies shown in the cards.`
    } else {
      return `The numerical vibrations in your cards suggest patterns of ${getRandomNumerologicalInsight()}.`
    }
  }

  const getLifePathMeaning = (lifePath: number): string => {
    const meanings = {
      1: "independence, leadership, and pioneering new paths",
      2: "cooperation, diplomacy, and sensitivity to others",
      3: "creative expression, joy, and communication",
      4: "stability, practicality, and building solid foundations",
      5: "freedom, change, and adaptability",
      6: "responsibility, nurturing, and harmony",
      7: "analysis, wisdom, and spiritual seeking",
      8: "abundance, power, and material mastery",
      9: "compassion, humanitarianism, and completion",
      11: "spiritual insight, intuition, and inspiration",
      22: "practical mastery and building for the greater good",
      33: "selfless service and spiritual teaching",
    }

    return meanings[lifePath as keyof typeof meanings] || "personal growth and spiritual development"
  }

  const getRandomNumerologicalInsight = (): string => {
    const insights = [
      "transformation and personal growth",
      "stability balanced with necessary change",
      "creative expression and emotional depth",
      "practical wisdom and spiritual insight",
      "building new foundations while honoring the past",
    ]

    return insights[Math.floor(Math.random() * insights.length)]
  }

  const getActionRecommendation = (index: number): string => {
    const recommendations = [
      "Trust your intuition more fully, especially regarding matters of timing.",
      "Create more structure in your approach to this situation.",
      "Express your feelings more openly with those involved.",
      "Research additional information before making a final decision.",
      "Allow yourself time for reflection before taking action.",
      "Seek input from someone with expertise in this area.",
      "Consider how your past experiences are influencing your current perspective.",
      "Focus on practical, step-by-step progress rather than seeking immediate results.",
      "Explore creative solutions that you haven't previously considered.",
      "Pay attention to recurring symbols or patterns in your daily life.",
      "Balance your analytical thinking with emotional intelligence.",
      "Create a specific ritual or practice to help you connect with your inner wisdom.",
    ]

    // Use the index to select different recommendations each time
    const adjustedIndex = (index * 3 + drawnCards.length) % recommendations.length
    return recommendations[adjustedIndex]
  }

  const getTimingInsight = (): string => {
    const insights = [
      "The cards suggest that timing is particularly important in this situation. The presence of multiple elemental energies indicates that you may need to coordinate different aspects carefully.",
      "This reading indicates that the coming month will be particularly significant for developments related to your question.",
      "The energies shown here suggest that patience is needed. Allow situations to develop naturally rather than forcing outcomes.",
      "There appears to be an acceleration of energy around your situation. Be prepared for developments to unfold more quickly than expected.",
      "Cycles are highlighted in this reading. Pay attention to patterns from your past as they may offer insights about timing.",
    ]

    return insights[Math.floor(Math.random() * insights.length)]
  }

  const getMostCommonElement = (elements: string[]): string => {
    const counts: Record<string, number> = {}
    elements.forEach((element) => {
      counts[element] = (counts[element] || 0) + 1
    })

    let maxElement = elements[0]
    let maxCount = 0

    Object.entries(counts).forEach(([element, count]) => {
      if (count > maxCount) {
        maxElement = element
        maxCount = count
      }
    })

    return maxElement
  }

  const getElementalAdvice = (element: string): string => {
    const advice = {
      fire: "passion, creativity, and transformation are key themes in your situation",
      water: "emotions, intuition, and relationships are central to your question",
      air: "communication, mental clarity, and new ideas will be important",
      earth: "practical matters, stability, and material concerns need attention",
      spirit: "spiritual connection, purpose, and higher guidance are significant",
    }

    return advice[element as keyof typeof advice] || "balance between different aspects of life is important"
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
                onError={() => {}}
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

  // Update the renderExpandedCardReading function to display the correct information
  const renderExpandedCardReading = () => {
    if (!showExpandedReading || activeCardIndex === null || !drawnCards[activeCardIndex]) return null

    const selectedCard = drawnCards[activeCardIndex]
    if (!selectedCard) return null

    const { card, endUp } = selectedCard
    const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
    const cardImage = endUp === "first" ? card.firstEndImage : card.secondEndImage

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">{card.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {cardImage ? (
                  <Image
                    src={cardImage || "/placeholder.svg"}
                    alt={`${card.name} - ${endUp === "first" ? "First End" : "Second End"}`}
                    width={300}
                    height={420}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[420px] bg-gray-800 flex items-center justify-center text-white">
                    No Image Available
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Card Details</h3>
                <div className="text-gray-300 space-y-2">
                  <div>
                    <strong>Number:</strong> {cardEnd.number}
                  </div>
                  <div>
                    <strong>Element:</strong> {card.element}
                  </div>
                  <div>
                    <strong>Type:</strong> {card.type}
                  </div>
                  <div>
                    <strong>Meaning:</strong> {cardEnd.meaning}
                  </div>
                  <div>
                    <strong>Shadow Aspect:</strong> {cardEnd.shadowAspect}
                  </div>
                  <div>
                    <strong>Keywords:</strong> {cardEnd.keywords.join(", ")}
                  </div>
                  <div>
                    <strong>Sacred Geometry:</strong> {cardEnd.sacredGeometry}
                  </div>
                  <div>
                    <strong>Planet:</strong> {cardEnd.planet}
                  </div>
                  <div>
                    <strong>Astrological Sign:</strong> {cardEnd.astrologicalSign}
                  </div>
                  <div>
                    <strong>Suit Orientation:</strong>{" "}
                    {selectedCard?.endUp === "first"
                      ? selectedCard.card.firstEnd.suitOrientation
                      : selectedCard.card.secondEnd.suitOrientation}
                  </div>
                  <div>
                    <strong>Base Element:</strong>{" "}
                    {selectedCard?.endUp === "first"
                      ? selectedCard.card.firstEnd.baseElement
                      : selectedCard.card.secondEnd.baseElement}
                  </div>
                  <div>
                    <strong>Dominant Element:</strong>{" "}
                    {selectedCard?.endUp === "first"
                      ? selectedCard.card.firstEnd.dominantElement
                      : selectedCard.card.secondEnd.dominantElement}
                  </div>
                  <div>
                    <strong>Icon:</strong>{" "}
                    {selectedCard?.endUp === "first"
                      ? selectedCard.card.firstEnd.icon
                      : selectedCard.card.secondEnd.icon}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowExpandedReading(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const drawCard = () => {
    // Generate a random number between 0 and 9
    const randomNumber = Math.floor(Math.random() * 10)

    // Get the card data for this number
    const cardData = getCardByNumber(randomNumber)

    if (cardData) {
      // Generate a random element (Water, Fire, Earth, Air, Spirit)
      const elements = ["Water", "Fire", "Earth", "Air", "Spirit"]
      const randomElement = elements[Math.floor(Math.random() * elements.length)]

      setSelectedElement(randomElement)
      setDrawnCards([...drawnCardsState, { ...cardData, selectedElement: randomElement }])
    }
  }

  const resetCards = () => {
    setDrawnCards([])
    setSelectedElement(null)
  }

  const getCardImagePath = (card: any) => {
    if (!card) return ""
    return `/cards/${card.number}${card.suit.toLowerCase()}-${card.selectedElement.toLowerCase()}.jpg`
  }

  return (
    <div className={cn("flex flex-col items-center gap-6", className)} ref={dealerRef}>
      {allowFreeReading && (
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              placeholder="What would you like to ask the oracle?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label>Reading Type</Label>
            <RadioGroup
              defaultValue={spreadType}
              onValueChange={(value) => setSpreadType(value as "single" | "three")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="three" id="three" />
                <Label htmlFor="three">Three Card Spread</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {selectedCards.map((card, index) => (
          <div
            key={index}
            className={`relative w-64 h-96 perspective-1000 cursor-pointer transition-transform duration-500 transform hover:scale-105`}
            onClick={() => flipCard(index)}
          >
            <div
              className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
                flippedCards[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Card Back */}
              <div className="absolute w-full h-full backface-hidden">
                <Image
                  src="/back.jpg"
                  alt="Card Back"
                  width={300}
                  height={450}
                  className="rounded-lg object-cover w-64 h-96"
                />
              </div>

              {/* Card Front */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180">
                <Image
                  src={card.imagePath || "/placeholder.svg"}
                  alt={card.name}
                  width={300}
                  height={450}
                  className="rounded-lg object-cover w-64 h-96"
                />
              </div>
            </div>
          </div>
        ))}

        {isDealing && (
          <div className="w-64 h-96 flex items-center justify-center">
            <Skeleton className="w-64 h-96 rounded-lg" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Button onClick={dealCards} disabled={isDealing || isGenerating} size="lg">
          {selectedCards.length === 0 ? "Deal Cards" : "Redeal"}
        </Button>

        {selectedCards.length > 0 && (
          <Button
            onClick={generateReadingFromCards}
            disabled={isGenerating || !selectedCards.length || !flippedCards.every((flipped) => flipped)}
            size="lg"
            variant="secondary"
          >
            {isGenerating ? "Generating..." : "Generate Reading"}
          </Button>
        )}
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {reading && (
        <Card className="w-full max-w-3xl mt-8">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">Your Reading</h3>
            <div className="prose dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: reading.content }} />
            </div>
          </CardContent>
        </Card>
      )}

      {drawnCards.length > 0 ? (
        <div className="space-y-8">
          {drawnCards.map((card, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-4 flex justify-center items-center">
                  <div className="relative w-full aspect-[3/4] bg-muted rounded-md overflow-hidden">
                    <Image
                      src={getCardImagePath(card) || "/placeholder.svg"}
                      alt={card.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback if element-specific image doesn't exist
                        e.currentTarget.src = `/cards/${card.number}${card.suit.toLowerCase()}.jpg`
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-4">
                  <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{card.suit}</Badge>
                    <Badge>Number: {card.number}</Badge>
                    <Badge variant="outline">Pair: {card.pair}</Badge>
                    <Badge variant="destructive">Element: {card.selectedElement}</Badge>
                    {getBaseElement(card) === card.selectedElement && (
                      <Badge className="bg-amber-500">Base Element Match!</Badge>
                    )}
                  </div>

                  <Tabs defaultValue="overview">
                    <TabsList className="w-full">
                      <TabsTrigger value="overview" className="flex-1">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="element" className="flex-1">
                        Element Influence
                      </TabsTrigger>
                      <TabsTrigger value="symbolism" className="flex-1">
                        Symbolism
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p>{card.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Number Meaning</h3>
                        <p>{card.numberMeaning}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="element" className="space-y-4">
                      {card.elements && card.selectedElement && card.elements[card.selectedElement] && (
                        <div className="border rounded-lg p-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {card.selectedElement}
                            {card.elements[card.selectedElement].baseElementNote && (
                              <Badge variant="destructive">Base Element</Badge>
                            )}
                          </h3>
                          <div className="mt-2">
                            <h4 className="font-medium">Influence:</h4>
                            <p>{card.elements[card.selectedElement].influence}</p>
                          </div>
                          <div className="mt-2">
                            <h4 className="font-medium">Guidance:</h4>
                            <p>{card.elements[card.selectedElement].guidance}</p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="symbolism" className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Sacred Geometry</h3>
                        <p className="font-medium">{card.sacredGeometryName}</p>
                        <p>{card.sacredGeometryMeaning}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Center Icon</h3>
                        <p className="font-medium">{card.centerIconName}</p>
                        <p>{card.centerIconMeaning}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Planetary Association</h3>
                        <p className="font-medium">{card.planetName}</p>
                        <p>{card.planetMeaning}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Astrological Sign</h3>
                        <p className="font-medium">{card.astroSignName}</p>
                        <p>{card.astroSignMeaning}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-muted rounded-lg">
          <p className="text-lg text-muted-foreground">Draw a card to begin your reading</p>
        </div>
      )}
    </div>
  )
}
