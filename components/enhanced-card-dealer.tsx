"use client"

import { Input } from "@/components/ui/input"

import type React from "react"
import { useRef } from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import type { ReadingData } from "@/types/readings"
import { cn } from "@/lib/utils"
import { getAllOracleCards as getOracleCards } from "@/lib/card-data-access"
import { parseCardImageFilename } from "@/lib/card-image-utils"
import { calculateLifePath } from "@/lib/numerology"
import { useMembership } from "@/lib/membership-context"
import type { OracleCard, DrawnCardForAI, UserContext } from "@/types/cards" // Updated import for types
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, RefreshCw, Share2 } from "lucide-react"
import { ShareReadingDialog } from "@/components/share-reading-dialog"

interface SpreadTypeDefinition {
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

const basicSpreadTypes: SpreadTypeDefinition[] = [
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

const advancedSpreadTypes: SpreadTypeDefinition[] = [
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
  const [allCards, setAllCards] = useState<OracleCard[]>([])
  const [drawnCards, setDrawnCards] = useState<DrawnCardForAI[]>([]) // Stores cards with their orientation
  const [isDrawing, setIsDrawing] = useState(false)
  const [showBackside, setShowBackside] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showReading, setShowReading] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [showExpandedCardModal, setShowExpandedCardModal] = useState(false) // Renamed for clarity
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [aiGeneratedReading, setAiGeneratedReading] = useState<string>("")
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
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
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>(defaultSpread) // Renamed for clarity
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const { toast } = useToast()
  const { isAuthenticated } = useMembership()

  const currentSpread =
    (isAuthenticated ? advancedSpreadTypes : basicSpreadTypes).find((s) => s.id === selectedSpreadId) ||
    basicSpreadTypes[0]

  useEffect(() => {
    const loadCards = () => {
      const cards = propAllCards || getOracleCards()
      setAllCards(cards)
    }
    loadCards()
  }, [propAllCards])

  useEffect(() => {
    // Reset dealer when spread type changes
    setDrawnCards([])
    setShowBackside(true)
    setShowReading(false)
    setAiGeneratedReading("")
    setIsGeneratingReading(false)
    setActiveCardIndex(null)
    setShowExpandedCardModal(false)
  }, [selectedSpreadId])

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
    setShowExpandedCardModal(false)
    setAiGeneratedReading("")
    setActiveCardIndex(null)

    setTimeout(() => {
      dealAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    setDrawnCards([])

    setTimeout(() => {
      const numCards = currentSpread.positions.length

      if (!allCards || allCards.length === 0) {
        console.error("No card data available")
        setIsDrawing(false)
        return
      }

      let shuffled = [...allCards]
      while (shuffled.length < numCards) {
        shuffled = [...shuffled, ...allCards] // Ensure enough cards for large spreads
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
          // Automatically generate reading after cards are flipped
          startAIReadingGeneration(selected)
        }, 600)
      }, 1000)
    }, 1500)
  }

  const startAIReadingGeneration = async (cardsToRead: DrawnCardForAI[]) => {
    setIsGeneratingReading(true)
    setAiGeneratedReading("") // Clear previous reading
    setShowReading(true) // Show reading area immediately with loading state

    try {
      const userContext: UserContext = {
        fullName: formData.fullName,
        birthDate: formData.birthDate?.toISOString(),
        birthPlace: formData.birthPlace,
        isMember: isAuthenticated,
      }

      const response = await fetch("/api/ai/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: cardsToRead.map((dc) => ({
            card: {
              id: dc.card.id,
              fullTitle: dc.card.fullTitle,
              imageUrl: dc.card.imageUrl,
              orientation: dc.card.orientation,
            }, // Send minimal card data
            orientation: dc.endUp === "first" ? dc.card.firstEnd?.orientation : dc.card.secondEnd?.orientation,
          })),
          question: formData.question,
          spreadType: currentSpread, // Pass the full spread object
          userContext: userContext,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate reading from AI.")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Failed to get reader from response body.")
      }

      const decoder = new TextDecoder()
      let accumulatedText = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulatedText += decoder.decode(value, { stream: true })
        setAiGeneratedReading(accumulatedText) // Update state with each chunk
      }
    } catch (error: any) {
      console.error("Error generating AI reading:", error)
      setAiGeneratedReading(
        `I apologize, but I encountered an error generating your reading: ${error.message}. Please try again later.`,
      )
      toast({
        title: "Error",
        description: "Failed to generate AI reading. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReading(false)
      setCurrentStep("reading")
    }
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

  const renderCard = (drawnCard: DrawnCardForAI | undefined, index: number) => {
    if (!drawnCard) return null

    const { card, endUp } = drawnCard
    const hasImageError = imageErrors[card.id]
    const cardNumber = card.number || "0"

    const filename = card.imageUrl.split("/").pop() || ""
    const parsedImage = parseCardImageFilename(filename)
    const dynamicSynergisticElement = parsedImage.isValid ? parsedImage.element : card.synergisticElement

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
            setShowExpandedCardModal(true)
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
                  cardId={card.id}
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={dynamicSynergisticElement}
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

  const renderExpandedCardModal = () => {
    if (!showExpandedCardModal || activeCardIndex === null || !drawnCards[activeCardIndex]) return null

    const selectedCard = drawnCards[activeCardIndex]
    if (!selectedCard) return null

    const { card, endUp } = selectedCard
    const cardNumber = card.number || "0"

    const filename = card.imageUrl.split("/").pop() || ""
    const parsedImage = parseCardImageFilename(filename)
    const dynamicSynergisticElement = parsedImage.isValid ? parsedImage.element : card.synergisticElement

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">{card.fullTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <EnhancedCardImage
                  cardId={card.id}
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={dynamicSynergisticElement}
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
                    <strong>Synergistic Element:</strong> {dynamicSynergisticElement}
                  </div>
                  <div>
                    <strong>Icon:</strong> {card.iconSymbol}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowExpandedCardModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleDownloadImage = () => {
    if (drawnCards.length > 0 && activeCardIndex !== null) {
      const card = drawnCards[activeCardIndex].card
      const link = document.createElement("a")
      link.href = card.imageUrl
      link.download = `${card.fullTitle.replace(/\s/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getCardOrientationDescription = (card: OracleCard, endUp: "first" | "second") => {
    const activeEnd = endUp === "first" ? card.firstEnd : card.secondEnd
    if (!activeEnd || !activeEnd.orientation) return "Upright" // Default if no specific end orientation

    switch (card.suit) {
      case "Cauldron":
        return activeEnd.orientation === "Cooking" ? "Cooking" : "Pouring"
      case "Sword":
        return activeEnd.orientation === "Edge First" ? "Edge First" : "Point First"
      case "Cord":
        return activeEnd.orientation === "Knot Before You" ? "Knot Before You" : "Knot Away"
      case "Spear":
        return activeEnd.orientation === "Shaft First" ? "Shaft First" : "Tip First"
      case "Stone":
        return activeEnd.orientation === "Rough Side" ? "Rough Side" : "Smooth Side"
      default:
        return activeEnd.orientation // Fallback to raw orientation if suit not matched
    }
  }

  if (currentStep === "form") {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            NUMO Oracle Card Reading
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Begin your journey by providing some details for a personalized reading.
          </p>
        </div>

        <Card className="max-w-md w-full bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Reading Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName" className="text-purple-200">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="John Doe"
                  className="bg-purple-800 border-purple-700 text-white placeholder:text-purple-300"
                />
                {formErrors.fullName && <p className="text-red-400 text-sm">{formErrors.fullName}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="birthDate" className="text-purple-200">
                  Birth Date
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate ? formData.birthDate.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value ? new Date(e.target.value) : undefined)
                  }
                  className="bg-purple-800 border-purple-700 text-white placeholder:text-purple-300"
                />
                {formErrors.birthDate && <p className="text-red-400 text-sm">{formErrors.birthDate}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="birthPlace" className="text-purple-200">
                  Birth Place (Optional)
                </Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                  placeholder="City, Country"
                  className="bg-purple-800 border-purple-700 text-white placeholder:text-purple-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="question" className="text-purple-200">
                  Your Question for the Oracle
                </Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => handleInputChange("question", e.target.value)}
                  placeholder="What guidance do I need regarding...?"
                  rows={4}
                  className="bg-purple-800 border-purple-700 text-white placeholder:text-purple-300"
                />
                {formErrors.question && <p className="text-red-400 text-sm">{formErrors.question}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="spreadType" className="text-purple-200">
                  Choose Your Spread
                </Label>
                <Select value={selectedSpreadId} onValueChange={setSelectedSpreadId}>
                  <SelectTrigger id="spreadType" className="bg-purple-800 border-purple-700 text-white">
                    <SelectValue placeholder="Select a spread type" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-700 text-white">
                    {(isAuthenticated ? advancedSpreadTypes : basicSpreadTypes).map((spread) => (
                      <SelectItem key={spread.id} value={spread.id}>
                        {spread.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-purple-300 mt-1">{currentSpread.description}</p>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Cards
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "cards") {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Draw Your Cards
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click "Draw Cards" to shuffle and reveal your {currentSpread.positions.length} cards for the{" "}
            {currentSpread.name}.
          </p>
        </div>

        <div ref={dealAreaRef} className="flex flex-wrap justify-center gap-6 mb-8">
          {isDrawing
            ? Array.from({ length: currentSpread.positions.length }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="w-[180px] h-[280px] flex items-center justify-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              ))
            : drawnCards.map((drawnCard, index) => renderCard(drawnCard, index))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleDrawCards}
            disabled={isDrawing || isGeneratingReading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isDrawing ? "animate-spin" : ""}`} />
            {isDrawing ? "Shuffling..." : drawnCards.length > 0 ? "Draw Again" : "Draw Cards"}
          </Button>
        </div>

        {renderExpandedCardModal()}
      </div>
    )
  }

  if (currentStep === "reading") {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Oracle Reading
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here is the personalized interpretation of your cards for the {currentSpread.name}.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {drawnCards.map((drawnCard, index) => renderCard(drawnCard, index))}
        </div>

        <Card className="w-full max-w-4xl bg-gradient-to-br from-indigo-900 to-purple-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-300">Reading Interpretation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isGeneratingReading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Sparkles className="h-12 w-12 animate-pulse text-purple-400 mb-4" />
                <p className="text-lg text-purple-200">Generating your personalized reading...</p>
                <p className="text-sm text-purple-300 mt-2">This may take a moment.</p>
              </div>
            ) : (
              <div className="prose dark:prose-invert prose-lg max-w-none text-gray-200">
                {/* Render the AI-generated reading directly */}
                {aiGeneratedReading ? (
                  <div dangerouslySetInnerHTML={{ __html: aiGeneratedReading.replace(/\n/g, "<br/>") }} />
                ) : (
                  <p>No reading content available. Please try drawing cards again.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={() => setIsShareDialogOpen(true)}
            disabled={!aiGeneratedReading || isGeneratingReading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Reading
          </Button>
          <Button
            onClick={() => setCurrentStep("form")}
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            Start New Reading
          </Button>
        </div>

        {renderExpandedCardModal()}

        {isShareDialogOpen && (
          <ShareReadingDialog
            open={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            readingText={aiGeneratedReading}
            question={formData.question}
            spreadType={currentSpread.name}
            cards={drawnCards.map((dc) => dc.card)} // Pass only the OracleCard objects
          />
        )}
      </div>
    )
  }

  return null // Should not reach here
}
