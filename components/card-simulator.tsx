"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shuffle,
  Save,
  Share2,
  User,
  Clock,
  Info,
  Eye,
  EyeOff,
  AlertCircle,
  Wifi,
  WifiOff,
  MessageCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PrivacyNotice } from "@/components/privacy-notice"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"

// Dynamically import components that might cause SSR issues
const AssistantChat = dynamic(
  () => import("@/components/assistant-chat").then((mod) => ({ default: mod.AssistantChat })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    ),
  },
)

// Complete NUMO Oracle Card Data Structure
export interface Symbol {
  key: string
  value: string
}

export interface OracleCard {
  id: string
  number: string
  suit: string
  fullTitle: string
  symbols: Symbol[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string
  imagePath?: string
}

// User profile interface
interface UserProfile {
  fullName?: string
  preferredSpread?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  readingsCount?: number
  lastUsed?: string
  createdAt?: string
  isMember?: boolean
}

// Simple user data service for client-side storage
const userDataService = {
  hasConsent: (): boolean => {
    if (typeof window === "undefined") return false
    try {
      return localStorage.getItem("cardSimulatorConsent") === "true"
    } catch {
      return false
    }
  },

  getUserProfile: (): UserProfile | null => {
    if (typeof window === "undefined") return null
    try {
      const profile = localStorage.getItem("numoUserProfile")
      return profile ? JSON.parse(profile) : null
    } catch {
      return null
    }
  },

  saveUserProfile: (data: Partial<UserProfile>): void => {
    if (typeof window === "undefined") return
    try {
      const existing = userDataService.getUserProfile() || {}
      const updated = { ...existing, ...data, lastUsed: new Date().toISOString() }
      localStorage.setItem("numoUserProfile", JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save user profile:", error)
    }
  },

  updateLastUsed: (): void => {
    if (typeof window === "undefined") return
    try {
      const profile = userDataService.getUserProfile()
      if (profile) {
        userDataService.saveUserProfile({ lastUsed: new Date().toISOString() })
      }
    } catch (error) {
      console.error("Failed to update last used:", error)
    }
  },

  incrementReadingCount: (): void => {
    if (typeof window === "undefined") return
    try {
      const profile = userDataService.getUserProfile() || {}
      const count = (profile.readingsCount || 0) + 1
      userDataService.saveUserProfile({ readingsCount: count })
    } catch (error) {
      console.error("Failed to increment reading count:", error)
    }
  },

  clearAllData: (): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.removeItem("numoUserProfile")
      localStorage.removeItem("cardSimulatorConsent")
    } catch (error) {
      console.error("Failed to clear data:", error)
    }
  },
}

// Simple card image handler
const getCardImageUrl = async (cardId: string, element: string): Promise<string> => {
  try {
    // Try to construct the image path based on card ID and element
    const imagePath = `/cards/${cardId.toLowerCase()}-${element.toLowerCase()}.jpg`
    return imagePath
  } catch (error) {
    console.error(`Error getting image URL for ${cardId}:`, error)
    return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
  }
}

const preloadCardImages = async (
  cardIds: string[],
  elements: string[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<{ loaded: number; failed: number; totalTime: number }> => {
  const startTime = Date.now()
  let loaded = 0
  let failed = 0

  const total = cardIds.length

  for (let i = 0; i < cardIds.length; i++) {
    try {
      const cardId = cardIds[i]
      const element = elements[i % elements.length]
      await getCardImageUrl(cardId, element)
      loaded++
    } catch {
      failed++
    }

    if (onProgress) {
      onProgress(loaded + failed, total)
    }
  }

  return {
    loaded,
    failed,
    totalTime: Date.now() - startTime,
  }
}

// Complete MASTER Card Data from the JSON
const masterCardData: OracleCard[] = [
  {
    id: "0-Cauldron",
    number: "0",
    suit: "Cauldron",
    fullTitle: "0 Cauldron – The Cauldron of Creation",
    symbols: [
      { key: "Number", value: "0" },
      { key: "Suit", value: "Cauldron" },
      { key: "Element (Base)", value: "Spirit" },
      { key: "Planet (Internal Influence)", value: "Pluto – deep transformation, inner renewal, and hidden power." },
      { key: "Astrology (External Domain)", value: "Scorpio – cycles of death and rebirth, secrets, intensity." },
      { key: "Icon", value: "Pentagram" },
      { key: "Orientation", value: "Cooking" },
      { key: "Sacred Geometry", value: "Dot" },
      { key: "Synergistic Element", value: "Fire" },
    ],
    symbolismBreakdown: [
      "Number: 0 – Symbol of unmanifest potential—the infinite womb of all creation, representing the void from which all possibilities emerge, a state of pure being before differentiation. It is the alpha and omega, containing everything and nothing simultaneously.",
      "Suit (Cauldron): In its cooking orientation, the cauldron stews possibility into reality, slowly combining all elements into creation. This signifies a gentle, nurturing, alchemical process where diverse ingredients (experiences, energies, ideas) are patiently blended and transmuted into a new, unified whole.",
      "Icon (Pentagram): Represents balance of the five elements—earth (stability, form), air (intellect, communication), fire (energy, action), water (emotion, intuition), and spirit (life force, connection to the divine). It symbolizes integration, protection, and the perfected human in harmony with the cosmos.",
      "Orientation (Cooking): Indicates that the creation is in progress, not yet released. This highlights a phase of internal development, gestation, and careful preparation, where the transformative work is happening beneath the surface, shielded from external view until ready.",
      "Sacred Geometry (Dot): The spark of origin—the first point from which all things emerge. It is the singularity, the concentrated seed of potential, the initial impulse of consciousness before expansion into dimension and form. A symbol of unity and wholeness.",
      "Planet (Pluto): Deep, transformative forces working behind the scenes. Pluto governs the subconscious realms, instigating profound metamorphosis by unearthing hidden truths, dismantling old structures, and facilitating regeneration and rebirth from the ashes of what was.",
      "Astrology (Scorpio): Reflects external themes of rebirth, secrecy, and shedding of old layers. Scorpio navigates the depths of existence, confronting power dynamics, intense emotions, and the mysteries of life and death, ultimately leading to profound healing and empowerment.",
      "Synergistic Element (Fire): The combustion of Spirit and Water—the ignition of creation and passion. Fire is the activating, dynamic principle that fuels transformation, provides courage, and illuminates the path, turning inspiration (Spirit) and emotional depth (Water) into tangible manifestation.",
    ],
    keyMeanings: ["Creation in Progress", "Alchemy and Transformation", "Infinite Potential", "Inner Depths"],
    baseElement: "Spirit",
    planetInternalInfluence: "Pluto – deep transformation, inner renewal, and hidden power.",
    astrologyExternalDomain: "Scorpio – cycles of death and rebirth, secrets, intensity.",
    iconSymbol: "Pentagram",
    orientation: "Cooking",
    sacredGeometry: "Dot",
    synergisticElement: "Fire",
  },
  {
    id: "1-Cauldron",
    number: "1",
    suit: "Cauldron",
    fullTitle: "1 Cauldron – The Cauldron of Manifestation",
    symbols: [
      { key: "Number", value: "1" },
      { key: "Suit", value: "Cauldron" },
      { key: "Element (Base)", value: "Fire" },
      { key: "Planet (Internal Influence)", value: "Sun – creative force, willpower, and illumination." },
      { key: "Astrology (External Domain)", value: "Leo – pride in expression, creative passion, dramatic emergence." },
      { key: "Icon", value: "Pentagram" },
      { key: "Orientation", value: "Pouring" },
      { key: "Sacred Geometry", value: "Plus Sign" },
      { key: "Synergistic Element", value: "Fire" },
    ],
    symbolismBreakdown: [
      "Number: 1 – The number of individuality and manifestation—initiation of purpose. It represents the first step, originality, leadership, and the power of focused will to bring ideas into concrete form. The singular point of action.",
      "Suit (Cauldron): Pouring forth its contents—the creation is emerging. The vessel now actively releases what has been brewing, symbolizing the sharing of gifts, ideas, or projects with the world. It's an act of giving and outward expression.",
      "Icon (Pentagram): Balanced elemental structure driving harmonious emergence. Here, the integrated elements provide a stable foundation for the creative output, ensuring that what is manifested is well-rounded and aligned with a greater harmony.",
      "Orientation (Pouring): Indicates readiness to act—release of the creation. This signifies a conscious decision to move from internal preparation to external action, sharing what has been cultivated. It's a dynamic and generous gesture.",
      "Sacred Geometry (Plus Sign): The crossroads of action and potential—energy merging. The plus sign represents the intersection of different planes or energies, creating a focal point where intention meets opportunity, leading to active creation and expansion.",
      "Planet (Sun): Drives inner willpower and identity into radiance. The Sun provides vitality, confidence, and clarity of purpose, illuminating the unique self and empowering its expression. It is the core of one's being shining forth.",
      "Astrology (Leo): External stage—performance, confidence, leadership. Leo embodies the joy of self-expression, the courage to take center stage, and the magnanimity of a natural leader, inspiring others through its radiant and creative presence.",
      "Synergistic Element (Fire): Fire and Spirit igniting the fires of birth and radiant will. This highlights the pure, active, and enthusiastic energy that fuels manifestation, transforming divine inspiration (Spirit) into passionate, visible action.",
    ],
    keyMeanings: ["Manifestation in Motion", "Personal Power", "Creative Expression", "Action-Oriented"],
    baseElement: "Fire",
    planetInternalInfluence: "Sun – creative force, willpower, and illumination.",
    astrologyExternalDomain: "Leo – pride in expression, creative passion, dramatic emergence.",
    iconSymbol: "Pentagram",
    orientation: "Pouring",
    sacredGeometry: "Plus Sign",
    synergisticElement: "Fire",
  },
  {
    id: "2-Sword",
    number: "2",
    suit: "Sword",
    fullTitle: "2 Sword - The Sword of Precision and Perception",
    symbols: [
      { key: "Number", value: "2" },
      { key: "Suit", value: "Sword" },
      { key: "Element (Base)", value: "Water" },
      { key: "Planet (Internal Influence)", value: "Moon – intuition, reflection, inner perception." },
      { key: "Astrology (External Domain)", value: "Cancer – protection, emotional depth, caregiving." },
      { key: "Icon", value: "Delta" },
      { key: "Orientation", value: "Point First" },
      { key: "Sacred Geometry", value: "Vesica Piscis" },
      { key: "Synergistic Element", value: "Water" },
    ],
    symbolismBreakdown: [
      "Number: 2 – Duality, balance, and reflection. Represents choices, partnerships, the weighing of options, and the need to find equilibrium between opposing forces. It highlights receptivity and the consideration of another perspective.",
      "Suit (Sword): The sword reflects clarity, intellect, and decision-making. It is a tool of truth, cutting through confusion and illusion, but here, tempered by Water, its precision is guided by feeling as much as logic.",
      "Icon (Delta): The Greek symbol for change—refinement through separation. Delta signifies a doorway or a point of transition, suggesting that clarity may come from distinguishing one thing from another, or from a shift in perspective.",
      "Orientation (Point First): Focused awareness and precision. The sword is ready for careful, deliberate action, guided by sharp perception. It implies aiming with intent, but not necessarily striking yet; the focus is on clear sight.",
      "Sacred Geometry (Vesica Piscis): The divine intersection—understanding through union. Formed by two overlapping circles, it symbolizes the meeting point of spirit and matter, conscious and unconscious, or two distinct entities, creating a space of shared understanding and creativity.",
      "Planet (Moon): Reflective depth, changeability, and emotional navigation. The Moon governs intuition, the subconscious, and the ebb and flow of emotions. Its influence encourages introspection and listening to inner guidance.",
      "Astrology (Cancer): Emotional awareness applied to outer security and nurturing. Cancer emphasizes the need for a secure emotional foundation, using intuition to protect and care for oneself and others. It brings a sensitive, empathetic quality to perception.",
      "Synergistic Element (Water): Water enhances the sword's clarity by infusing emotional depth into logical discernment, allowing intuition to guide precise thought. This creates a balance where intellect is informed by empathy, leading to more holistic understanding.",
    ],
    keyMeanings: ["Focused Awareness", "Emotional Intelligence", "Hesitation with Purpose", "Mental Alignment"],
    baseElement: "Water",
    planetInternalInfluence: "Moon – intuition, reflection, inner perception.",
    astrologyExternalDomain: "Cancer – protection, emotional depth, caregiving.",
    iconSymbol: "Delta",
    orientation: "Point First",
    sacredGeometry: "Vesica Piscis",
    synergisticElement: "Water",
  },
]

export function CardSimulator() {
  const [selectedCards, setSelectedCards] = useState<OracleCard[]>([])
  const [question, setQuestion] = useState("")
  const [fullName, setFullName] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")
  const [hasConsent, setHasConsent] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [cardsWithImages, setCardsWithImages] = useState<OracleCard[]>([])
  const [imageLoadingProgress, setImageLoadingProgress] = useState(0)
  const [imageLoadingStats, setImageLoadingStats] = useState<{
    loaded: number
    total: number
    failed: number
    isLoading: boolean
  }>({ loaded: 0, total: 0, failed: 0, isLoading: false })
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline" | "slow">("online")
  const [assistantReading, setAssistantReading] = useState("")
  const [conversationThreadId, setConversationThreadId] = useState<string>("")
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [showAssistantChat, setShowAssistantChat] = useState(false)
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [hasGeneratedAIReading, setHasGeneratedAIReading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { toast } = useToast()

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load card images from blob storage
  useEffect(() => {
    if (!mounted) return

    const loadCardImages = async () => {
      setIsLoadingImages(true)
      setImageLoadingStats({ loaded: 0, total: masterCardData.length, failed: 0, isLoading: true })

      try {
        const startTime = Date.now()

        const cardsWithBlobImages = await Promise.all(
          masterCardData.map(async (card, index) => {
            try {
              let imagePath = await getCardImageUrl(card.id, card.baseElement)
              if (imagePath.includes("placeholder.svg")) {
                imagePath = await getCardImageUrl(card.id, card.synergisticElement)
              }
              const loaded = index + 1
              setImageLoadingProgress((loaded / masterCardData.length) * 100)
              setImageLoadingStats((prev) => ({ ...prev, loaded }))
              return { ...card, imagePath }
            } catch (error) {
              console.error(`Error loading image for card ${card.id}:`, error)
              setImageLoadingStats((prev) => ({ ...prev, failed: prev.failed + 1 }))
              return {
                ...card,
                imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
              }
            }
          }),
        )

        setCardsWithImages(cardsWithBlobImages)

        const cardIds = masterCardData.map((card) => card.id)
        const elements = [...new Set(masterCardData.flatMap((card) => [card.baseElement, card.synergisticElement]))]

        const preloadResults = await preloadCardImages(cardIds, elements, (loaded, total) => {
          setImageLoadingProgress((loaded / total) * 100)
        })

        const totalTime = Date.now() - startTime
        if (totalTime > 10000) {
          setNetworkStatus("slow")
        } else if (preloadResults.failed > preloadResults.loaded * 0.5) {
          setNetworkStatus("offline")
        } else {
          setNetworkStatus("online")
        }

        console.log(
          `Image loading completed: ${preloadResults.loaded} loaded, ${preloadResults.failed} failed in ${preloadResults.totalTime}ms`,
        )
      } catch (error) {
        console.error("Error loading card images:", error)
        setNetworkStatus("offline")
        setCardsWithImages(
          masterCardData.map((card) => ({
            ...card,
            imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
          })),
        )
      } finally {
        setIsLoadingImages(false)
        setImageLoadingStats((prev) => ({ ...prev, isLoading: false }))
      }
    }

    loadCardImages()
  }, [mounted])

  // Initial card draw on mount, after images are loaded
  useEffect(() => {
    if (!mounted) return

    if (cardsWithImages.length > 0 && selectedCards.length === 0 && !isLoadingImages) {
      const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
      const shuffled = [...cardsWithImages].sort(() => Math.random() - 0.5)
      const initialDraw = shuffled.slice(0, numCards)
      setSelectedCards(initialDraw)
      setReading("")
      setAssistantReading("")
      setHasGeneratedAIReading(false)
    }
  }, [cardsWithImages, selectedCards.length, isLoadingImages, spreadType, mounted])

  // Load user data on component mount
  useEffect(() => {
    if (!mounted) return

    try {
      const consent = userDataService.hasConsent()
      setHasConsent(consent)

      if (consent) {
        const profile = userDataService.getUserProfile()
        if (profile) {
          setUserProfile(profile)
          setFullName(profile.fullName || "")
          setSpreadType(profile.preferredSpread || "single")
          setBirthDate(profile.birthDate || "")
          setBirthTime(profile.birthTime || "")
          setBirthPlace(profile.birthPlace || "")
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [mounted])

  // Save user data when form changes
  useEffect(() => {
    if (!mounted) return

    if (hasConsent && (fullName || spreadType !== "single" || birthPlace || birthDate || birthTime)) {
      const profileData: Partial<UserProfile> = {}

      if (fullName) profileData.fullName = fullName
      if (spreadType !== "single") profileData.preferredSpread = spreadType
      if (birthDate) profileData.birthDate = birthDate
      if (birthTime) profileData.birthTime = birthTime
      if (birthPlace) profileData.birthPlace = birthPlace

      userDataService.saveUserProfile(profileData)
    }
  }, [fullName, spreadType, birthPlace, birthDate, birthTime, hasConsent, mounted])

  // Memoize handleConsentChange
  const handleConsentChange = useCallback(
    (consent: boolean) => {
      if (!mounted) return

      setHasConsent(consent)

      if (consent) {
        const profile = userDataService.getUserProfile()
        if (profile) {
          setUserProfile(profile)
          setFullName(profile.fullName || "")
          setSpreadType(profile.preferredSpread || "single")
          setBirthDate(profile.birthDate || "")
          setBirthTime(profile.birthTime || "")
          setBirthPlace(profile.birthPlace || "")
        }
      } else {
        userDataService.clearAllData()
        setUserProfile(null)
        setFullName("")
        setSpreadType("single")
        setBirthDate("")
        setBirthTime("")
        setBirthPlace("")
      }
    },
    [mounted],
  )

  const shuffleCards = async () => {
    setIsShuffling(true)
    setReading("")
    setAssistantReading("")
    setHasGeneratedAIReading(false)

    if (hasConsent) {
      userDataService.updateLastUsed()
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
    const shuffled = [...cardsWithImages].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numCards)

    setSelectedCards(selected)
    setIsShuffling(false)
  }

  // Enhanced reading generation using ChatGPT Assistant
  const generateAIReading = async () => {
    if (selectedCards.length === 0) {
      toast({
        title: "No Cards Drawn",
        description: "Please draw cards first before generating an AI reading.",
      })
      return
    }
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question to enable AI reading.",
      })
      return
    }

    setIsGeneratingReading(true)
    setHasGeneratedAIReading(true)

    try {
      console.log("🔮 Generating AI reading...")

      const requestBody = {
        cards: selectedCards.map((card) => ({
          id: card.id,
          name: card.fullTitle,
          element: card.baseElement,
          tool: card.suit,
          number: Number.parseInt(card.number),
          meaning: card.keyMeanings.join(", "),
          description: card.symbolismBreakdown.join(" "),
          keywords: card.keyMeanings,
        })),
        question: question.trim(),
        spread_type: spreadType,
        user_context: JSON.stringify({
          fullName,
          birthDate,
          birthTime,
          birthPlace,
          isMember: userProfile?.isMember ?? false,
        }),
      }

      console.log("📤 Sending request:", {
        cardCount: requestBody.cards.length,
        hasQuestion: !!requestBody.question,
        spreadType: requestBody.spread_type,
      })

      const response = await fetch("/api/ai/reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("📥 Response status:", response.status, response.statusText)

      let data: any = {}
      const responseText = await response.text()
      console.log("📄 Raw response:", responseText.substring(0, 200) + "...")

      try {
        data = JSON.parse(responseText)
        console.log("✅ Parsed response:", {
          success: data.success,
          hasReading: !!data.reading,
          method: data.method,
          error: data.error,
        })
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError)
        data = {
          success: false,
          error: "Invalid JSON response from server",
          reading: "Unable to parse server response. Please try again.",
          interpretation: "The server returned an invalid response format.",
          guidance: "Please try again or contact support if the issue persists.",
        }
      }

      if (!response.ok) {
        console.error("❌ HTTP error:", response.status, data?.error)
        throw new Error(data?.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      if (!data?.success) {
        console.error("❌ API error:", data?.error)
        throw new Error(data?.error || "API returned unsuccessful response")
      }

      // Success case
      console.log("✅ Reading generated successfully")
      setConversationThreadId(data.threadId || "")
      setAssistantReading(data.reading || "")
      setReading(data.reading || "")

      toast({
        title: "Reading Generated!",
        description: "Your personalized oracle reading is ready.",
      })

      if (hasConsent) {
        userDataService.incrementReadingCount()
      }
    } catch (error: any) {
      console.error("💥 Error generating AI reading:", error)

      const errorMessage = error.message || "Unknown error occurred"
      const fallbackReading = `I apologize, but I'm unable to provide an AI reading at this time. Error: ${errorMessage}`

      setReading(fallbackReading)
      setHasGeneratedAIReading(false)

      toast({
        title: "Reading Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReading(false)
    }
  }

  const saveReading = () => {
    if (!question.trim()) {
      toast({
        title: "Question Missing",
        description: "Please enter a question before saving your reading.",
        variant: "destructive",
      })
      return
    }
    if (!reading.trim()) {
      toast({
        title: "No Reading to Save",
        description: "Please generate a reading first before saving.",
        variant: "destructive",
      })
      return
    }

    const readingData = {
      id: `reading-${Date.now()}`,
      question,
      cards: selectedCards,
      reading,
      spreadType,
      fullName,
      birthPlace,
      date: new Date().toISOString(),
      isFavorite: false,
    }

    try {
      if (typeof window !== "undefined") {
        const existingReadings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
        existingReadings.push(readingData)
        localStorage.setItem("numoReadings", JSON.stringify(existingReadings))
        toast({
          title: "Reading Saved!",
          description: "Your reading has been successfully saved.",
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error saving reading:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save reading. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareReading = () => {
    if (!reading.trim()) {
      toast({
        title: "No Reading to Share",
        description: "Please generate a reading first before sharing.",
        variant: "destructive",
      })
      return
    }
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "My NUMO Oracle Reading",
          text: `Question: ${question}

${reading}`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Reading Shared!",
            description: "Your reading has been shared successfully.",
            variant: "default",
          })
        })
        .catch((error) => {
          console.error("Error sharing reading:", error)
          toast({
            title: "Share Failed",
            description: `Could not share reading: ${error.message}.`,
            variant: "destructive",
          })
        })
    } else {
      const shareText = `My NUMO Oracle Reading

Question: ${question}

${reading}`
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
        toast({
          title: "Copied to Clipboard!",
          description: "The reading has been copied to your clipboard.",
          variant: "default",
        })
      } else {
        toast({
          title: "Share Not Supported",
          description: "Your browser does not support sharing or clipboard copy.",
          variant: "destructive",
        })
      }
    }
  }

  // Component for detailed card information
  const CardDetailModal = ({ card }: { card: OracleCard }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-2">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{card.fullTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border">
              <Image
                src={card.imagePath || "/placeholder.svg"}
                alt={card.fullTitle}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline">Number: {card.number}</Badge>
                <Badge variant="outline">Suit: {card.suit}</Badge>
                <Badge variant="outline">Base: {card.baseElement}</Badge>
                <Badge variant="outline">Synergistic: {card.synergisticElement}</Badge>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Icon:</strong> {card.iconSymbol}
                </p>
                <p>
                  <strong>Orientation:</strong> {card.orientation}
                </p>
                <p>
                  <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Symbols</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {card.symbols.map((symbol, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <strong>{symbol.key}:</strong> {symbol.value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Meanings</h3>
            <div className="space-y-3">
              {card.keyMeanings.map((meaning, i) => (
                <div key={i} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm">{meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Symbolism Breakdown</h3>
            <Accordion type="single" collapsible>
              {card.symbolismBreakdown.map((breakdown, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{breakdown.split(":")[0]}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {breakdown.split(":").slice(1).join(":").trim()}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            NUMO Oracle Card Simulator
          </h1>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <PrivacyNotice
        title="Card Simulator Privacy"
        description="This tool can optionally remember your name and preferences to personalize your readings."
        onConsentChange={handleConsentChange}
        storageKey="cardSimulatorConsent"
        features={[
          "Save your name for personalized readings",
          "Remember your preferred spread type",
          "Track usage for better experience",
          "Store birth information for astrological insights",
        ]}
      />

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          NUMO Oracle Card Simulator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Experience the wisdom of the Five Sacred Treasures through digital divination
        </p>

        <div className="flex items-center justify-center gap-2 text-sm">
          {networkStatus === "online" ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : networkStatus === "slow" ? (
            <Wifi className="h-4 w-4 text-yellow-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-gray-500">
            {networkStatus === "online" ? "Connected" : networkStatus === "slow" ? "Slow Connection" : "Offline Mode"}
          </span>
        </div>
      </div>

      {isLoadingImages && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Loading Card Images...</h3>
                <span className="text-sm text-gray-500">
                  {imageLoadingStats.loaded}/{imageLoadingStats.total}
                  {imageLoadingStats.failed > 0 && ` (${imageLoadingStats.failed} failed)`}
                </span>
              </div>
              <Progress value={imageLoadingProgress} className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Preparing your mystical experience...</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Reading Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Your Name (Optional)</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name for personalized readings"
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save your name</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth (Optional)</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime">Time of Birth (Optional)</Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                disabled={!hasConsent}
                placeholder="HH:MM"
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth (Optional)</Label>
              <Input
                id="birthPlace"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="City, Country"
                disabled={!hasConsent}
              />
              {!hasConsent && <p className="text-xs text-gray-500">Enable privacy consent to save birth information</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What guidance do you seek from the Oracle?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Spread Type</Label>
            <Tabs value={spreadType} onValueChange={setSpreadType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="single">Single Card</TabsTrigger>
                <TabsTrigger value="three">Three Cards</TabsTrigger>
                <TabsTrigger value="five">Five Elements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={shuffleCards}
          disabled={isShuffling || isLoadingImages}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isShuffling ? (
            <>
              <Shuffle className="mr-2 h-5 w-5 animate-spin" />
              Shuffling the Sacred Deck...
            </>
          ) : (
            <>
              <Shuffle className="mr-2 h-5 w-5" />
              Draw New Cards
            </>
          )}
        </Button>
      </div>

      {selectedCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Sacred Cards</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDetailedView(!showDetailedView)}>
                  {showDetailedView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showDetailedView ? "Simple View" : "Detailed View"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`grid gap-6 ${selectedCards.length === 1 ? "grid-cols-1 max-w-md mx-auto" : selectedCards.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}
            >
              {selectedCards.map((card, index) => (
                <div key={card.id} className="space-y-4">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border shadow-lg">
                    <Image
                      src={card.imagePath || "/placeholder.svg"}
                      alt={card.fullTitle}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=400&width=300"
                      }}
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">{card.fullTitle}</h3>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Badge variant="secondary">{card.baseElement}</Badge>
                      <Badge variant="outline">{card.synergisticElement}</Badge>
                    </div>
                    {showDetailedView && (
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                        </p>
                        <p>
                          <strong>Orientation:</strong> {card.orientation}
                        </p>
                        <p>
                          <strong>Icon:</strong> {card.iconSymbol}
                        </p>
                      </div>
                    )}
                    <CardDetailModal card={card} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCards.length > 0 && !hasGeneratedAIReading && (
        <div className="text-center">
          <Button
            onClick={generateAIReading}
            disabled={isGeneratingReading || !question.trim()}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
          >
            {isGeneratingReading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating AI Reading...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Get Advanced AI Reading
              </>
            )}
          </Button>
          {!question.trim() && (
            <p className="text-sm text-red-500 mt-2">Please enter a question to enable AI reading.</p>
          )}
        </div>
      )}

      {(reading || isGeneratingReading || hasGeneratedAIReading) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Oracle Reading</span>
              <div className="flex gap-2">
                {conversationThreadId && (
                  <Button variant="outline" size="sm" onClick={() => setShowAssistantChat(true)}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Ask Follow-up
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={saveReading} disabled={!reading.trim()}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={shareReading} disabled={!reading.trim()}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isGeneratingReading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
                  <p className="text-lg font-medium">The Oracle is consulting the sacred wisdom...</p>
                  <p className="text-sm text-gray-600">This may take a moment as we channel divine insights</p>
                </div>
              </div>
            ) : reading ? (
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">{reading}</div>
              </div>
            ) : hasGeneratedAIReading ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-red-600">
                  Failed to generate an AI reading: Malformed server response
                </p>
                <p className="text-sm text-gray-600 mt-2">Please try again later.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* How to Use the Oracle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            How to Use the Oracle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">1</span>
              </div>
              <h3 className="font-semibold">Focus Your Intent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear your mind and formulate a specific question. The more focused your intent, the clearer the
                guidance.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="font-semibold">Choose Your Spread</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select single card for focus, three cards for past-present-future, or five for elemental balance.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <h3 className="font-semibold">Receive Guidance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Draw your cards and receive personalized insights from the Oracle through AI-powered interpretation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Journey Stats */}
      {hasConsent && userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Oracle Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{userProfile.readingsCount || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Readings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{userProfile.preferredSpread || "Single"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Spread</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {userProfile.lastUsed ? new Date(userProfile.lastUsed).toLocaleDateString() : "Today"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Reading</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {userProfile.createdAt
                    ? Math.floor((Date.now() - new Date(userProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24))
                    : 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assistant Chat Dialog */}
      {showAssistantChat && conversationThreadId && (
        <Dialog open={showAssistantChat} onOpenChange={setShowAssistantChat}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Continue Your Conversation with the Oracle</DialogTitle>
            </DialogHeader>
            <AssistantChat
              threadId={conversationThreadId}
              initialContext={{
                cards: selectedCards,
                question,
                reading: assistantReading,
                userProfile: userProfile || undefined,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
