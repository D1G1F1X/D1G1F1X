"use client"

import type React from "react"

import { useRef } from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { generateReading } from "@/lib/actions/generate-reading"
import { useToast } from "@/components/ui/use-toast"
import type { ReadingData } from "@/types/readings"
import { cn } from "@/lib/utils"
import { getSymbolValue, getAllOracleCards as getOracleCards, filterCards } from "@/lib/card-data-access" // Corrected import for getOracleCards
import { parseCardImageFilename } from "@/lib/card-image-utils"
import { Badge } from "@/components/ui/badge"
import { calculateLifePath } from "@/lib/numerology"
import { useMembership } from "@/lib/membership-context"
import type { SavedReading } from "@/types/saved-readings"
import type { OracleCard } from "@/types/cards"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, RefreshCw, Share2, Download } from "lucide-react"
import { ShareReadingDialog } from "@/components/share-reading-dialog"

interface SpreadType {
  id: string
  name: string
  description: string
  positions: {
    name: string
    description: string
  }[]
}

interface UserFormData {
  fullName: string
  birthDate: Date | undefined
  birthPlace: string
  question: string
}

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

// Removed getElementIcon as it's redundant with getElementSymbol
// Removed getDynamicSynergisticElement as it's replaced by filename parsing

interface EnhancedCardDealerProps {
  onReadingGenerated?: (reading: ReadingData) => void
  className?: string
  allowFreeReading?: boolean
  maxCards?: number
  defaultSpread?: "single" | "three"
  allCards?: OracleCard[]
  suits?: string[]
  elements?: string[]
  numbers?: string[]
}

export default function EnhancedCardDealer({
  onReadingGenerated,
  className,
  allowFreeReading = false,
  maxCards = 3,
  defaultSpread = "three",
  allCards: propAllCards,
  suits,
  elements,
  numbers,
}: EnhancedCardDealerProps) {
  const [allCards, setAllCards] = useState<OracleCard[]>([]) // Use allCards from central data
  const [selectedCards, setSelectedCards] = useState<OracleCard[]>([])
  const [flippedCards, setFlippedCards] = useState<boolean[]>([])
  const [isDealing, setIsDealing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reading, setReading] = useState<ReadingData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [spreadType, setSpreadType] = useState<"single" | "three">(defaultSpread)
  const [question, setQuestion] = useState("")
  const { toast } = useToast()
  const dealerRef = useRef<HTMLDivElement>(null)
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
  const [drawnCard, setDrawnCard] = useState<OracleCard | null>(null)
  const [selectedSuit, setSelectedSuit] = useState<string>("any")
  const [selectedNumber, setSelectedNumber] = useState<string>("any")
  const [loading, setLoading] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const context = useMembership()
  const { isAuthenticated, checkMembership } = context
  setMembership(context)

  useEffect(() => {
    // Load all cards from the central data access layer
    const loadCards = async () => {
      const cards = propAllCards || getOracleCards() // Await the async function
      setAllCards(cards)
    }
    loadCards()
  }, [propAllCards])

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
    const shuffled = [...allCards].sort(() => Math.random() - 0.5) // Use allCards here
    const newSelectedCards = shuffled.slice(0, numCards)

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

    if (!flippedCards.every((flipped) => flipped)) {
      toast({
        title: "Flip all cards",
        description: "Please flip all cards before generating a reading",
        variant: "destructive",
      })
      return
    }

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
      setError("Failed to generate reading. Please try again.")
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

  const availableSpreadTypes = readingMode === "basic" ? basicSpreadTypes : advancedSpreadTypes
  const currentSpread = availableSpreadTypes.find((spread) => spread.id === selectedSpread) || availableSpreadTypes[0]

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData({ ...formData, [field]: value })

    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      if (formData.birthDate) {
        const lifePathNumber = calculateLifePath(formData.birthDate)
        setLifePath(lifePathNumber)
      }

      setCurrentStep("cards")

      setTimeout(() => {
        dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const handleDrawCards = () => {
    setIsDrawing(true)
    setShowReading(false)
    setShowBackside(true)
    setShowExpandedReading(false)
    setShowDetailedReading(false)
    setAiGeneratedReading("")
    setReadingTitle("")
    setSaveSuccess(false)

    setTimeout(() => {
      dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    setDrawnCards([])

    setTimeout(() => {
      const numCards = currentSpread.positions.length

      if (!allCards || allCards.length === 0) {
        // Use allCards here
        console.error("No card data available")
        setIsDrawing(false)
        return
      }

      let shuffled = [...allCards] // Use allCards here
      while (shuffled.length < numCards) {
        shuffled = [...shuffled, ...allCards] // Use allCards here
      }

      shuffled = shuffled.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, numCards).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      setDrawnCards(selected)
      setIsDrawing(false)

      setTimeout(() => {
        setIsFlipping(true)
        setTimeout(() => {
          setShowBackside(false)
          setIsFlipping(false)

          setTimeout(() => {
            setShowReading(true)
            setCurrentStep("reading")
          }, 500)
        }, 600)
      }, 1000)
    }, 1500)
  }

  const handleImageError = (cardId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [cardId]: true,
    }))
  }

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

  const generateDetailedReading = async () => {
    setIsGeneratingReading(true)

    try {
      // Call the new server-side API
      const response = await fetch("/api/generateReading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Generate a detailed reading for: ${formData.question}`,
          fullName: formData.fullName,
          dateOfBirth: formData.birthDate?.toISOString(),
          question: formData.question,
          selectedCards: drawnCards.map((dc) => dc.card),
          spreadType: selectedSpread,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store the thread ID for potential follow-up questions
        // You could expand this to actually get the assistant's response
        console.log("Reading thread created:", data.threadId)

        // For now, continue with the simulated reading
        const reading = generateSimulatedReading()
        setAiGeneratedReading(reading)
        setShowDetailedReading(true)
      } else {
        console.warn("API reading failed, using simulated reading:", data?.error)
        const reading = generateSimulatedReading()
        setAiGeneratedReading(reading)
        setShowDetailedReading(true)
      }
    } catch (error) {
      console.error("Error generating reading:", error)
      // Fallback to simulated reading
      const reading = generateSimulatedReading()
      setAiGeneratedReading(reading)
      setShowDetailedReading(true)
    } finally {
      setIsGeneratingReading(false)
    }
  }

  const generateSimulatedReading = (): string => {
    const userName = formData.fullName.split(" ")[0] || "Seeker"
    const question = formData.question
    const spreadName = currentSpread.name

    const intro = `# NUMO Oracle Reading for ${userName}

## Your Question
"${question}"

I've consulted the NUMO Oracle cards to provide guidance on your question. The ${spreadName} reveals important insights about your situation.`

    const cardInterpretations = drawnCards
      .map((drawnCard, index) => {
        const { card, endUp } = drawnCard
        const position = currentSpread.positions[index]

        const planet = getSymbolValue(card, "Planet (Internal Influence)")
        const astrology = getSymbolValue(card, "Astrology (External Domain)")
        const sacredGeometry = getSymbolValue(card, "Sacred Geometry")
        const icon = getSymbolValue(card, "Icon")
        const orientation = getSymbolValue(card, "Orientation")

        // Use the correct number from the card data - directly from the number field
        const cardNumber = card.number || "0"

        // Dynamically determine the synergistic element from the filename
        const filename = card.imageUrl.split("/").pop() || ""
        const parsedImage = parseCardImageFilename(filename)
        // Use the element from the filename, fallback to baseElement if parsing fails
        const elementForReading = parsedImage.isValid ? parsedImage.element : card.baseElement

        return `
### ${position.name}: ${card.fullTitle} (${card.baseElement})

**Card Number:** ${cardNumber}
**Element:** ${elementForReading}

This ${card.baseElement} card in the ${position.name} position reveals:
- **Key Meanings:** ${card.keyMeanings?.join(", ") || "N/A"}

**Symbolism Breakdown:**
${card.symbolismBreakdown.map((s) => `- ${s.replace(/^Number: \d+ – /, "")}`).join("\n")}

**Additional Symbolism:**
- **Sacred Geometry:** ${sacredGeometry}
- **Planet (Internal Influence):** ${planet}
- **Astrology (External Domain):** ${astrology}
- **Icon:** ${icon}
- **Orientation:** ${orientation}
`
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
      9: "completion, humanitarianism, and wisdom",
    }

    return meanings[number as keyof typeof meanings] || "personal transformation and spiritual growth"
  }

  const getPatternInsight = (): string => {
    const elements = drawnCards.map((item) => item.card.baseElement.toLowerCase())
    const dominantElement = getMostCommonElement(elements)

    return `The cards show a predominance of ${dominantElement} energy, suggesting that ${getElementalAdvice(dominantElement)}.`
  }

  const getElementalInsight = (): string => {
    const elements = drawnCards.map((item) => item.card.baseElement.toLowerCase())
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
      const cardNumbers = drawnCards.map((item) => Number.parseInt(item.card.number || "0", 10))
      const averageNumber = Math.round(cardNumbers.reduce((sum, num) => sum + num, 0) / cardNumbers.length)
      return `The numerical vibrations in your cards (${cardNumbers.join(", ")}) suggest patterns of ${getNumberMeaning(averageNumber)}.`
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

  const renderCard = (drawnCard: { card: OracleCard; endUp: "first" | "second" } | undefined, index: number) => {
    if (!drawnCard) return null

    const { card, endUp } = drawnCard
    const hasImageError = imageErrors[card.id]

    // Use the correct numerical value from the card - directly from the number field
    const cardNumber = card.number || "0"

    // Dynamically determine the synergistic element from the filename
    const filename = card.imageUrl.split("/").pop() || ""
    const parsedImage = parseCardImageFilename(filename)
    const dynamicSynergisticElement = parsedImage.isValid ? parsedImage.element : card.synergisticElement // Fallback to existing if parsing fails

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
              {!hasImageError ? (
                <EnhancedCardImage
                  cardId={card.id} // Use card.id, which now correctly maps to imagePath
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={dynamicSynergisticElement} // Use the dynamically derived element
                  className="w-full h-full"
                  onImageLoad={(success) => {
                    if (!success) handleImageError(card.id)
                  }}
                />
              ) : (
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
                  <div className="text-lg font-bold text-white mt-2">{cardNumber}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  const renderExpandedCardReading = () => {
    if (!showExpandedReading || activeCardIndex === null || !drawnCards[activeCardIndex]) return null

    const selectedCard = drawnCards[activeCardIndex]
    if (!selectedCard) return null

    const { card, endUp } = selectedCard
    const cardNumber = card.number || "0"

    // Dynamically determine the synergistic element for the expanded view
    const filename = card.imageUrl.split("/").pop() || ""
    const parsedImage = parseCardImageFilename(filename)
    const dynamicSynergisticElement = parsedImage.isValid ? parsedImage.element : card.synergisticElement // Fallback to existing if parsing fails

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">{card.fullTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <EnhancedCardImage
                  cardId={card.id} // Use card.id, which now correctly maps to imagePath
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={dynamicSynergisticElement} // Use the dynamically derived element
                  className="w-[300px] h-[420px]"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Card Details</h3>
                <div className="text-gray-300 space-y-2">
                  <div>
                    <strong>Number:</strong> {cardNumber}
                  </div>
                  <div>
                    <strong>Element:</strong> {card.baseElement}
                  </div>
                  <div>
                    <strong>Suit:</strong> {card.suit}
                  </div>
                  <div>
                    <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                  </div>
                  <div>
                    <strong>Planet:</strong> {card.planetInternalInfluence}
                  </div>
                  <div>
                    <strong>Astrological Sign:</strong> {card.astrologyExternalDomain}
                  </div>
                  <div>
                    <strong>Orientation:</strong> {card.orientation}
                  </div>
                  <div>
                    <strong>Synergistic Element:</strong> {dynamicSynergisticElement}{" "}
                    {/* Display the dynamically derived element */}
                  </div>
                  <div>
                    <strong>Icon:</strong> {card.iconSymbol}
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

  const drawRandomCard = useCallback(
    (cardsToDrawFrom: OracleCard[], suitFilter: string, elementFilter: string, numberFilter: string) => {
      setLoading(true)
      try {
        const filtered = filterCards(cardsToDrawFrom, {
          suit: suitFilter === "any" ? undefined : suitFilter,
          element: elementFilter === "any" ? undefined : elementFilter,
          number: numberFilter === "any" ? undefined : numberFilter,
        })

        if (filtered.length > 0) {
          const randomIndex = Math.floor(Math.random() * filtered.length)
          setDrawnCard(filtered[randomIndex])
        } else {
          setDrawnCard(null)
        }
      } catch (error) {
        console.error("Error drawing card:", error)
        setDrawnCard(null)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (allCards.length > 0 && !drawnCard) {
      drawRandomCard(allCards, "any", "any", "any")
    }
  }, [allCards, drawnCard, drawRandomCard])

  const handleDrawCard = () => {
    drawRandomCard(allCards, selectedSuit, selectedElement, selectedNumber)
  }

  const handleDownloadImage = () => {
    if (drawnCard) {
      const link = document.createElement("a")
      link.href = drawnCard.imageUrl
      link.download = `${drawnCard.fullTitle.replace(/\s/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Use the imported getSymbolValue from lib/card-data-access
  const getSymbolValueSafe = (card: OracleCard, key: keyof OracleCard | string): string => {
    const value = getSymbolValue(card, key as any) // Cast to any because CardSymbolKey is more specific
    return value !== undefined ? value : "N/A"
  }

  if (loading && !drawnCard) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Sparkles className="h-6 w-6 animate-spin mr-2" />
        Loading cards for dealer...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Enhanced Oracle Card Dealer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Draw a random card from the deck, or filter by suit, element, or number to get a specific insight.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Draw Your Card</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Card Display */}
          <div className="flex flex-col items-center justify-center">
            {drawnCard ? (
              <>
                <EnhancedCardImage
                  cardId={drawnCard.id}
                  cardTitle={drawnCard.fullTitle}
                  baseElement={drawnCard.baseElement}
                  synergisticElement={drawnCard.synergisticElement}
                  className="w-full max-w-[270px] mb-4"
                  showStatus={true}
                />
                <h3 className="text-xl font-bold text-center mb-2">{drawnCard.fullTitle}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {drawnCard.suit}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {drawnCard.baseElement}
                  </Badge>
                  {drawnCard.synergisticElement && drawnCard.synergisticElement !== drawnCard.baseElement && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      {drawnCard.synergisticElement}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    Number: {drawnCard.number}
                  </Badge>
                  {drawnCard.sacredGeometry && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      Sacred Geometry: {getSymbolValueSafe(drawnCard, "Sacred Geometry")}
                    </Badge>
                  )}
                  {drawnCard.iconSymbol && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      Icon: {getSymbolValueSafe(drawnCard, "Icon")}
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full max-w-[270px] h-[360px] bg-purple-800 rounded-lg flex items-center justify-center text-purple-300 text-center">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <Sparkles className="h-8 w-8 animate-spin mb-2" />
                    <span>Drawing card...</span>
                  </div>
                ) : (
                  "Draw a card to begin"
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Label htmlFor="suit-filter" className="text-purple-200">
                Filter by Suit
              </Label>
              <Select value={selectedSuit} onValueChange={setSelectedSuit}>
                <SelectTrigger id="suit-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Suit" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Suit</SelectItem>
                  {suits.map((suit) => (
                    <SelectItem key={suit} value={suit}>
                      {suit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="element-filter" className="text-purple-200">
                Filter by Element
              </Label>
              <Select value={selectedElement} onValueChange={setSelectedElement}>
                <SelectTrigger id="element-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Element" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Element</SelectItem>
                  {elements.map((element) => (
                    <SelectItem key={element} value={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="number-filter" className="text-purple-200">
                Filter by Number
              </Label>
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger id="number-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Number" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Number</SelectItem>
                  {numbers.map((number) => (
                    <SelectItem key={number} value={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleDrawCard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Drawing..." : "Draw Card"}
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={() => setIsShareDialogOpen(true)}
                disabled={!drawnCard || loading}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={handleDownloadImage}
                disabled={!drawnCard || loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {drawnCard && (
        <div className="mt-8 max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Card Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drawnCard.keyMeanings && drawnCard.keyMeanings.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-purple-200 mb-2">Key Meanings:</h4>
                    <ul className="space-y-1">
                      {drawnCard.keyMeanings.slice(0, 3).map((meaning, index) => (
                        <li key={index} className="text-sm text-purple-100">
                          • {meaning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {drawnCard.symbolismBreakdown && drawnCard.symbolismBreakdown.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-purple-200 mb-2">Symbolism:</h4>
                    <p className="text-sm text-purple-100">{drawnCard.symbolismBreakdown[0]}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {drawnCard && (
        <ShareReadingDialog
          open={isShareDialogOpen}
          onOpenChange={setIsShareDialogOpen}
          reading={{
            id: drawnCard.id,
            title: drawnCard.fullTitle,
            summary: drawnCard.keyMeanings?.[0] || "No summary available.",
            imageUrl: drawnCard.imageUrl,
            createdAt: new Date().toISOString(),
            type: "single-card",
            cards: [drawnCard],
          }}
        />
      )}
    </div>
  )
}
