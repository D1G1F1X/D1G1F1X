"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Info,
  Book,
  Wand2,
  Flame,
  Droplets,
  Wind,
  Leaf,
  Star,
  CalendarIcon,
  User,
  MessageSquare,
  Loader2,
  MapPin,
} from "lucide-react"
import { generateReading } from "@/lib/actions/generate-reading"
import ReactMarkdown from "react-markdown"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { calculateLifePath, calculateDestinyNumber } from "@/lib/numerology"

// Import the image utility functions at the top of the file
import { normalizeImagePath, preloadCriticalImages } from "@/lib/image-utils"

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

// Define user input form data
interface UserFormData {
  fullName: string
  birthDate: Date | undefined
  birthPlace: string
  question: string
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

// Card data with updated numbering scheme
const cardData: OracleCard[] = [
  {
    id: "cauldron-fire-01-10",
    name: "The Cauldron of Fire",
    element: "Fire",
    type: "Cauldron",
    firstEnd: {
      number: 1, // Represented as 01
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
      number: 10, // Represented as 10
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
    id: "sword-air-25-52",
    name: "The Sword of Air",
    element: "Air",
    type: "Sword",
    firstEnd: {
      number: 25, // Represented as 25
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
      number: 52, // Represented as 52
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
    id: "cord-water-38-83",
    name: "The Cord of Water",
    element: "Water",
    type: "Cord",
    firstEnd: {
      number: 3, // Correct number
      meaning:
        "Emotional connections and the flow of feelings. The cord binds hearts together. The knot in the cord is before you.",
      shadowAspect: "Emotional dependency and attachment can lead to suffering.",
      keywords: ["Connection", "Emotion", "Intuition", "Relationships"],
      sacredGeometry: "Finite Symbol - The bounded nature of existence",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      expandedMeaning:
        "The Cord of Water represents the emotional bonds that connect us to others, the intuitive wisdom of the heart, and the flowing nature of feelings. The knot in the cord is before you, representing challenges that must be untangled.",
    },
    secondEnd: {
      number: 83, // Represented as 83
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
    id: "spear-earth-47-74",
    name: "The Spear of Earth",
    element: "Earth",
    type: "Spear",
    firstEnd: {
      number: 47, // Represented as 47
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
      number: 74, // Represented as 74
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
    id: "stone-spirit-69-96",
    name: "The Stone of Spirit",
    element: "Spirit",
    type: "Stone",
    firstEnd: {
      number: 69, // Represented as 69
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
      number: 96, // Represented as 96
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
  // Additional cards for each element
  {
    id: "cauldron-water-01-10",
    name: "The Cauldron of Water",
    element: "Water",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning: "The beginning of emotional awareness and intuitive connection.",
      shadowAspect: "Emotional overwhelm or denial of feelings.",
      keywords: ["Intuition", "Feelings", "Receptivity", "Flow"],
      sacredGeometry: "Point/Dot - The origin of all emotional experience",
      planet: "Moon",
      astrologicalSign: "Cancer",
      expandedMeaning:
        "The Cauldron of Water represents the wellspring of emotions, the source of intuition, and the beginning of your journey into the depths of feeling.",
    },
    secondEnd: {
      number: 10,
      meaning: "Emotional mastery and the ability to navigate the waters of life with grace.",
      shadowAspect: "Emotional manipulation or using feelings to control others.",
      keywords: ["Mastery", "Empathy", "Healing", "Wisdom"],
      sacredGeometry: "Decad - The completion of the emotional cycle",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      expandedMeaning:
        "The second end of the Cauldron of Water represents emotional fulfillment and the wisdom that comes from fully experiencing and integrating your feelings.",
    },
    firstEndImage: "/cards/01cauldron-water.jpg",
    secondEndImage: "/cards/10cauldron-water.jpg",
  },
  {
    id: "cauldron-earth-01-10",
    name: "The Cauldron of Earth",
    element: "Earth",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning: "The beginning of material manifestation and physical existence.",
      shadowAspect: "Materialism or attachment to physical possessions.",
      keywords: ["Manifestation", "Abundance", "Grounding", "Stability"],
      sacredGeometry: "Point/Dot - The seed of physical creation",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      expandedMeaning:
        "The Cauldron of Earth represents the vessel of physical creation, the container for manifestation, and the beginning of your journey into the material world.",
    },
    secondEnd: {
      number: 10,
      meaning: "Mastery of the physical realm and the ability to create lasting abundance.",
      shadowAspect: "Hoarding or excessive focus on material security.",
      keywords: ["Mastery", "Wealth", "Security", "Legacy"],
      sacredGeometry: "Decad - The completion of the material cycle",
      planet: "Venus",
      astrologicalSign: "Taurus",
      expandedMeaning:
        "The second end of the Cauldron of Earth represents material fulfillment and the wisdom that comes from creating and stewarding physical resources.",
    },
    firstEndImage: "/cards/01cauldron-earth.jpg",
    secondEndImage: "/cards/10cauldron-earth.jpg",
  },
  {
    id: "cauldron-air-01-10",
    name: "The Cauldron of Air",
    element: "Air",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning: "The beginning of mental clarity and intellectual understanding.",
      shadowAspect: "Overthinking or mental confusion.",
      keywords: ["Thought", "Communication", "Ideas", "Clarity"],
      sacredGeometry: "Point/Dot - The origin of all thought",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      expandedMeaning:
        "The Cauldron of Air represents the vessel of thought, the container for ideas, and the beginning of your journey into the realm of the mind.",
    },
    secondEnd: {
      number: 10,
      meaning: "Mastery of the mental realm and the ability to communicate with wisdom.",
      shadowAspect: "Intellectual arrogance or using knowledge to manipulate.",
      keywords: ["Mastery", "Wisdom", "Teaching", "Expression"],
      sacredGeometry: "Decad - The completion of the mental cycle",
      planet: "Jupiter",
      astrologicalSign: "Aquarius",
      expandedMeaning:
        "The second end of the Cauldron of Air represents intellectual fulfillment and the wisdom that comes from developing and sharing your thoughts.",
    },
    firstEndImage: "/cards/01cauldron-air.jpg",
    secondEndImage: "/cards/10cauldron-air.jpg",
  },
  {
    id: "cauldron-spirit-01-10",
    name: "The Cauldron of Spirit",
    element: "Spirit",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning: "The beginning of spiritual awakening and connection to the divine.",
      shadowAspect: "Spiritual bypassing or denial of physical reality.",
      keywords: ["Awakening", "Connection", "Divinity", "Transcendence"],
      sacredGeometry: "Point/Dot - The spark of divine consciousness",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      expandedMeaning:
        "The Cauldron of Spirit represents the vessel of divine connection, the container for spiritual growth, and the beginning of your journey into higher consciousness.",
    },
    secondEnd: {
      number: 10,
      meaning: "Spiritual mastery and the ability to bridge worlds.",
      shadowAspect: "Spiritual elitism or using spiritual knowledge to control others.",
      keywords: ["Mastery", "Integration", "Teaching", "Enlightenment"],
      sacredGeometry: "Decad - The completion of the spiritual cycle",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      expandedMeaning:
        "The second end of the Cauldron of Spirit represents spiritual fulfillment and the wisdom that comes from integrating divine consciousness into everyday life.",
    },
    firstEndImage: "/cards/01cauldron-spirit.jpg",
    secondEndImage: "/cards/10cauldron-spirit.jpg",
  },
]

// Helper functions
const formatCardNumber = (number: number): string => {
  // For single-digit numbers (1-9), just return the number as a string
  // For double-digit numbers (10+), format as is
  if (number < 10) {
    return number.toString()
  }
  return number.toString()
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

export default function EnhancedNumoDealer() {
  // State variables
  const [selectedSpread, setSelectedSpread] = useState<string>("three")
  const [drawnCards, setDrawnCards] = useState<{ card: OracleCard; endUp: "first" | "second" }[]>([])
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
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null)
  const dealAreaRef = useRef<HTMLDivElement>(null)

  // Add a useEffect to preload critical images
  useEffect(() => {
    preloadCriticalImages()
  }, [])

  // Debug logging
  useEffect(() => {
    console.log("EnhancedNumoDealer mounted")
    console.log("Card data:", cardData)
    return () => {
      console.log("EnhancedNumoDealer unmounted")
    }
  }, [])

  // Get current spread configuration
  const currentSpread = spreadTypes.find((spread) => spread.id === selectedSpread) || spreadTypes[0]

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

    if (!formData.birthDate) {
      errors.birthDate = "Birth date is required"
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
      // Calculate numerology numbers
      if (formData.fullName && formData.birthDate) {
        const lifePathNumber = calculateLifePath(formData.birthDate)
        setLifePath(lifePathNumber)

        const destNumber = calculateDestinyNumber(formData.fullName)
        setDestinyNumber(destNumber)

        console.log("Life Path Number:", lifePathNumber)
        console.log("Destiny Number:", destNumber)
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
    console.log("Draw cards button clicked")
    setIsDrawing(true)
    setShowReading(false)
    setShowBackside(true)
    setShowExpandedReading(false)
    setActiveCardIndex(null)
    setShowDetailedReading(false)
    setAiGeneratedReading("")

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
            setCurrentStep("reading")

            // Automatically generate detailed reading
            generateDetailedReading()
          }, 500)
        }, 600)
      }, 1000)
    }, 1500)
  }

  // Handle image error
  const handleImageError = (cardId: string) => {
    console.error(`Image error for card: ${cardId}`)
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

    try {
      // Create an enhanced prompt that includes user's personal information
      const enhancedPrompt = {
        userData: {
          name: formData.fullName,
          birthDate: formData.birthDate ? format(formData.birthDate, "yyyy-MM-dd") : "",
          birthPlace: formData.birthPlace,
          lifePath: lifePath,
          destinyNumber: destinyNumber,
        },
        question: formData.question,
        spreadType: currentSpread.id,
      }

      // Call the server action to generate the reading
      const reading = await generateReading(drawnCards, JSON.stringify(enhancedPrompt), currentSpread)

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

    // Format the card number according to the new numbering scheme
    const formattedNumber = formatCardNumber(cardEnd.number)

    // Update the renderCard function to use normalized image paths
    const normalizedCardImage = normalizeImagePath(cardImage)

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
                onError={() => console.error("Error loading card back image")}
                unoptimized={process.env.NODE_ENV === "development"}
                priority
              />
            </div>
          ) : (
            <>
              {!hasImageError && normalizedCardImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={normalizedCardImage || "/placeholder.svg?height=280&width=180&query=mystical card"}
                    alt={`${card.name} - ${endUp === "first" ? "First End" : "Second End"}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(card.id)}
                    priority
                    sizes="(max-width: 768px) 100vw, 180px"
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                    <div className="text-xs font-medium text-white">{card.name}</div>
                    <div className="text-xs text-gray-300">
                      {formattedNumber} • {card.element}
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
                  <div className="text-lg font-bold text-white mt-2">{formattedNumber}</div>
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
        <Tabs defaultValue="detailed" className="w-full">
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
                  {formData.question
                    ? `Question: "${formData.question}"`
                    : "Your cards have been drawn. Here's what they reveal:"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {drawnCards.map((drawnCard, index) => {
                  const { card, endUp } = drawnCard
                  const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
                  const position = currentSpread.positions[index]
                  const formattedNumber = formatCardNumber(cardEnd.number)

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
                      <div className="mt-3 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <span className="text-purple-300">Number:</span> {formattedNumber}
                        </div>
                        <div>
                          <span className="text-purple-300">Sacred Geometry:</span> {cardEnd.sacredGeometry}
                        </div>
                        <div>
                          <span className="text-purple-300">Planet:</span> {cardEnd.planet}
                        </div>
                        <div>
                          <span className="text-purple-300">Astrological Sign:</span> {cardEnd.astrologicalSign}
                        </div>
                      </div>
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
    const formattedNumber = formatCardNumber(cardEnd.number)

    // Update the renderCard function to use normalized image paths
    const normalizedCardImage = normalizeImagePath(cardImage)

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
                  <Image
                    src={normalizedCardImage || "/placeholder.svg?height=280&width=180&query=mystical card"}
                    alt={card.name}
                    width={180}
                    height={280}
                    className="object-cover w-full h-full"
                    onError={() => handleImageError(card.id)}
                    unoptimized={process.env.NODE_ENV === "development"}
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
                      <span className="text-gray-400">Number:</span> {formattedNumber}
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

  // Render user input form
  const renderUserForm = () => {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle>Your Personal Oracle Reading</CardTitle>
          <CardDescription>
            Enter your details to receive a personalized reading that incorporates numerology and sacred symbolism
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`bg-gray-800 border-gray-700 ${formErrors.fullName ? "border-red-500" : ""}`}
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Birth Date <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal bg-gray-800 border-gray-700 ${
                          formErrors.birthDate ? "border-red-500" : ""
                        }`}
                      >
                        {formData.birthDate ? (
                          format(formData.birthDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">Select your birth date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={formData.birthDate}
                        onSelect={(date) => handleInputChange("birthDate", date)}
                        initialFocus
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  {formErrors.birthDate && <p className="text-red-500 text-sm">{formErrors.birthDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Birth Place <span className="text-gray-400 text-sm ml-1">(optional)</span>
                </Label>
                <Input
                  id="birthPlace"
                  placeholder="Enter your birth place"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question" className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Your Question <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="question"
                  placeholder="What guidance do you seek from the oracle?"
                  value={formData.question}
                  onChange={(e) => handleInputChange("question", e.target.value)}
                  className={`bg-gray-800 border-gray-700 min-h-[100px] ${formErrors.question ? "border-red-500" : ""}`}
                />
                {formErrors.question && <p className="text-red-500 text-sm">{formErrors.question}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="spreadType">Spread Type</Label>
                <Select value={selectedSpread} onValueChange={setSelectedSpread}>
                  <SelectTrigger id="spreadType" className="bg-gray-800 border-gray-700">
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
                <p className="text-sm text-gray-400">{currentSpread.description}</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Begin Your Oracle Reading
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "form":
        return renderUserForm()
      case "cards":
        return (
          <div>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                    <span>Draw Your Oracle Cards</span>
                  </h2>
                  <p className="text-gray-300">
                    Focus on your question as you draw your cards. Each card will reveal insights about your situation.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Your Reading Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-gray-400">Name:</span> {formData.fullName}
                      </p>
                      <p>
                        <span className="text-gray-400">Birth Date:</span>{" "}
                        {formData.birthDate ? format(formData.birthDate, "PPP") : "Not provided"}
                      </p>
                      {formData.birthPlace && (
                        <p>
                          <span className="text-gray-400">Birth Place:</span> {formData.birthPlace}
                        </p>
                      )}
                      {lifePath !== null && (
                        <p>
                          <span className="text-gray-400">Life Path Number:</span> {lifePath}
                        </p>
                      )}
                      {destinyNumber !== null && (
                        <p>
                          <span className="text-gray-400">Destiny Number:</span> {destinyNumber}
                        </p>
                      )}
                      <p>
                        <span className="text-gray-400">Question:</span> {formData.question}
                      </p>
                      <p>
                        <span className="text-gray-400">Spread:</span> {currentSpread.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                    onClick={handleDrawCards}
                    disabled={isDrawing}
                  >
                    {isDrawing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Drawing Cards...
                      </>
                    ) : (
                      "Draw Cards"
                    )}
                  </Button>
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
                    <p>Click "Draw Your Cards" to begin your reading</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case "reading":
        return (
          <div>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                    <span>Your Oracle Reading</span>
                  </h2>
                  <p className="text-gray-300">Here is your personalized reading based on the cards you've drawn.</p>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Your Reading Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-gray-400">Name:</span> {formData.fullName}
                      </p>
                      <p>
                        <span className="text-gray-400">Birth Date:</span>{" "}
                        {formData.birthDate ? format(formData.birthDate, "PPP") : "Not provided"}
                      </p>
                      {formData.birthPlace && (
                        <p>
                          <span className="text-gray-400">Birth Place:</span> {formData.birthPlace}
                        </p>
                      )}
                      {lifePath !== null && (
                        <p>
                          <span className="text-gray-400">Life Path Number:</span> {lifePath}
                        </p>
                      )}
                      {destinyNumber !== null && (
                        <p>
                          <span className="text-gray-400">Destiny Number:</span> {destinyNumber}
                        </p>
                      )}
                      <p>
                        <span className="text-gray-400">Question:</span> {formData.question}
                      </p>
                      <p>
                        <span className="text-gray-400">Spread:</span> {currentSpread.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                    onClick={handleDrawCards}
                    disabled={isDrawing}
                  >
                    {isDrawing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Drawing Cards...
                      </>
                    ) : (
                      "Draw Cards"
                    )}
                  </Button>
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
                    <p>Click "Draw Your Cards" to begin your reading</p>
                  </div>
                </div>
              )}
            </div>

            {renderReadingInterpretation()}
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {renderCurrentStep()}
        {renderExpandedCardReading()}
      </div>
    </div>
  )
}
