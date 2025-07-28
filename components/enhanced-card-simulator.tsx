"use client"

import { useState, useEffect, useCallback } from "react" // Import useCallback
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
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Activity,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PrivacyNotice } from "@/components/privacy-notice"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"
import {
  getVerifiedCardImage,
  preloadVerifiedCardImages,
  getVerifiedImageMetrics,
  testBlobStorageConnection,
  verifyBlobStorageAndListImages,
} from "@/lib/verified-blob-handler"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Complete NUMO Oracle Card Data Structure
interface Symbol {
  key: string
  value: string
}

interface OracleCard {
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
  imageVerified?: boolean
  loadTime?: number
}

// Enhanced loading state interface
interface LoadingState {
  isLoading: boolean
  progress: number
  loaded: number
  total: number
  failed: number
  currentAction: string
  errors: string[]
}

// Complete MASTER Card Data
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
    keyMeanings: [
      "Creation in Progress: Energy is stirring, but not yet ready to emerge. This signifies a nascent stage where potential is palpable but requires further nurturing and internal development before it can be fully expressed or witnessed externally.",
      "Alchemy and Transformation: Inner metamorphosis is occurring beneath the surface. Like the alchemical process of turning lead into gold, this points to profound internal shifts, healing, and the integration of disparate parts of oneself into a more evolved state.",
      'Infinite Potential: Anything is possible, but it must go through the fire. The "fire" represents a necessary trial, purification, or intense experience that refines and tempers, unlocking the boundless creative power inherent in the initial void.',
      "Inner Depths: The process requires patience and surrender to unseen forces. This emphasizes the need for trust in the natural unfolding, a willingness to delve into one's own subconscious, and the wisdom to allow the creation to mature at its own pace without force.",
    ],
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
    keyMeanings: [
      "Manifestation in Motion: Pour your energy into the world. This is a call to take deliberate action, to channel your creative forces and intentions into tangible outcomes and share your unique contributions.",
      "Personal Power: Lead the creation with your fire. Embrace your innate abilities, willpower, and passion to direct the course of your creations. Own your strength and capacity to make an impact.",
      "Creative Expression: Let your gifts be seen. Do not hide your talents or insights. This is the time to showcase what you have developed, to perform, to publish, to share your unique voice.",
      "Action-Oriented: Time to execute what you've been envisioning. Move beyond planning and dreaming into the realm of doing. Take the necessary steps to bring your visions into reality.",
    ],
    baseElement: "Fire",
    planetInternalInfluence: "Sun – creative force, willpower, and illumination.",
    astrologyExternalDomain: "Leo – pride in expression, creative passion, dramatic emergence.",
    iconSymbol: "Pentagram",
    orientation: "Pouring",
    sacredGeometry: "Plus Sign",
    synergisticElement: "Fire",
  },
  // Additional cards would follow the same pattern...
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
    keyMeanings: [
      "Focused Awareness: Seeing clearly without reacting impulsively. This calls for keen observation and understanding of a situation before taking action, using both intellect and intuition to perceive the truth.",
      "Emotional Intelligence: Understanding one's own and others' inner worlds. It is the ability to recognize, understand, and manage your own emotions, and to understand and influence the emotions of others, leading to better decisions.",
      "Hesitation with Purpose: Listening and weighing choices before action. This is not procrastination, but a deliberate pause to ensure that any decision made is well-informed, balanced, and aligned with deeper intuitive knowing.",
      "Mental Alignment: The mind aligning with emotional intuition. True clarity comes when logical thought processes are harmonized with the wisdom of feelings, leading to choices that are both sound and soulful.",
    ],
    baseElement: "Water",
    planetInternalInfluence: "Moon – intuition, reflection, inner perception.",
    astrologyExternalDomain: "Cancer – protection, emotional depth, caregiving.",
    iconSymbol: "Delta",
    orientation: "Point First",
    sacredGeometry: "Vesica Piscis",
    synergisticElement: "Water",
  },
]

export function EnhancedCardSimulator() {
  const [selectedCards, setSelectedCards] = useState<OracleCard[]>([])
  const [question, setQuestion] = useState("")
  const [fullName, setFullName] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")
  const [hasConsent, setHasConsent] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    loaded: 0,
    total: 0,
    failed: 0,
    currentAction: "",
    errors: [],
  })
  const [cardsWithImages, setCardsWithImages] = useState<OracleCard[]>([])
  const [connectionStatus, setConnectionStatus] = useState<{
    status: "testing" | "connected" | "error" | "offline"
    details?: any
    error?: string
  }>({ status: "testing" })
  const [showDiagnostics, setShowDiagnostics] = useState(false)

  // Test blob storage connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      setConnectionStatus({ status: "testing" })

      try {
        const testResult = await testBlobStorageConnection()

        if (testResult.success) {
          setConnectionStatus({
            status: "connected",
            details: testResult.details,
          })
          await loadCardImages()
        } else {
          setConnectionStatus({
            status: "error",
            error: testResult.error,
            details: testResult.details,
          })
        }
      } catch (error) {
        setConnectionStatus({
          status: "offline",
          error: error instanceof Error ? error.message : "Connection failed",
        })
      }
    }

    testConnection()
  }, [])

  // Load card images with comprehensive verification
  const loadCardImages = async () => {
    setLoadingState({
      isLoading: true,
      progress: 0,
      loaded: 0,
      total: masterCardData.length,
      failed: 0,
      currentAction: "Verifying blob storage...",
      errors: [],
    })

    try {
      // First verify blob storage
      const verification = await verifyBlobStorageAndListImages()
      if (!verification.isValid) {
        throw new Error(`Blob storage verification failed: ${verification.error}`)
      }

      setLoadingState((prev) => ({
        ...prev,
        currentAction: "Loading card images...",
      }))

      // Load images for each card
      const cardsWithVerifiedImages = await Promise.all(
        masterCardData.map(async (card, index) => {
          try {
            // Try base element first, then synergistic element
            let imageResult = await getVerifiedCardImage(card.id, card.baseElement)

            if (imageResult.isPlaceholder) {
              imageResult = await getVerifiedCardImage(card.id, card.synergisticElement)
            }

            const updatedCard: OracleCard = {
              ...card,
              imagePath: imageResult.url,
              imageVerified: !imageResult.isPlaceholder,
              loadTime: imageResult.loadTime,
            }

            // Update progress
            const loaded = index + 1
            const failed = imageResult.isPlaceholder ? 1 : 0

            setLoadingState((prev) => ({
              ...prev,
              progress: (loaded / masterCardData.length) * 100,
              loaded,
              failed: prev.failed + failed,
              currentAction: `Loaded ${card.fullTitle}`,
            }))

            return updatedCard
          } catch (error) {
            const errorMessage = `Failed to load ${card.fullTitle}: ${error instanceof Error ? error.message : "Unknown error"}`

            setLoadingState((prev) => ({
              ...prev,
              failed: prev.failed + 1,
              errors: [...prev.errors, errorMessage],
            }))

            return {
              ...card,
              imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
              imageVerified: false,
              loadTime: 0,
            }
          }
        }),
      )

      setCardsWithImages(cardsWithVerifiedImages)

      // Enhanced preloading with progress tracking
      setLoadingState((prev) => ({
        ...prev,
        currentAction: "Preloading images for optimal performance...",
      }))

      const cardIds = masterCardData.map((card) => card.id)
      const elements = [...new Set(masterCardData.flatMap((card) => [card.baseElement, card.synergisticElement]))]

      const preloadResult = await preloadVerifiedCardImages(cardIds, elements, (loaded, total, failed) => {
        setLoadingState((prev) => ({
          ...prev,
          progress: (loaded / total) * 100,
          currentAction: `Preloading... ${loaded}/${total}`,
        }))
      })

      console.log("✅ Image loading completed:", preloadResult)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("❌ Error loading card images:", errorMessage)

      setLoadingState((prev) => ({
        ...prev,
        errors: [...prev.errors, errorMessage],
      }))

      // Fallback to placeholder images
      setCardsWithImages(
        masterCardData.map((card) => ({
          ...card,
          imagePath: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`,
          imageVerified: false,
          loadTime: 0,
        })),
      )
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        isLoading: false,
        currentAction: "Ready",
      }))
    }
  }

  // Load user data on component mount
  useEffect(() => {
    const consent = userDataService.hasConsent()
    setHasConsent(consent)

    if (consent) {
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setFullName(profile.fullName || "")
        setSpreadType(profile.preferredSpread || "single")
      }
    }
  }, [])

  // Save user data when form changes
  useEffect(() => {
    if (hasConsent && (fullName || spreadType !== "single")) {
      const profileData: Partial<UserProfile> = {}

      if (fullName) profileData.fullName = fullName
      if (spreadType !== "single") profileData.preferredSpread = spreadType

      userDataService.saveUserProfile(profileData)
    }
  }, [fullName, spreadType, hasConsent])

  // Memoize handleConsentChange function
  const handleConsentChange = useCallback((consent: boolean) => {
    setHasConsent(consent)

    if (consent) {
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setFullName(profile.fullName || "")
        setSpreadType(profile.preferredSpread || "single")
      }
    } else {
      setUserProfile(null)
      setFullName("")
      setSpreadType("single")
    }
  }, []) // Empty dependency array means this function is created once

  const shuffleCards = async () => {
    setIsShuffling(true)

    if (hasConsent) {
      userDataService.updateLastUsed()
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
    const shuffled = [...cardsWithImages].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numCards)

    setSelectedCards(selected)
    generateReading(selected)
    setIsShuffling(false)
  }

  const generateReading = (cards: OracleCard[]) => {
    const personalizedGreeting = fullName ? `Dear ${fullName.split(" ")[0]}, your` : "Your"

    let readingText = `${personalizedGreeting} reading reveals:\n\n`

    cards.forEach((card, index) => {
      readingText += `Card ${index + 1}: ${card.fullTitle}\n`
      readingText += `Elements: ${card.baseElement} ⚡ ${card.synergisticElement}\n`
      readingText += `Sacred Geometry: ${card.sacredGeometry} | Icon: ${card.iconSymbol}\n`
      readingText += `Orientation: ${card.orientation}\n\n`

      const randomMeaning = card.keyMeanings[Math.floor(Math.random() * card.keyMeanings.length)]
      readingText += `${randomMeaning}\n\n`

      readingText += `Internal Influence: ${card.planetInternalInfluence}\n`
      readingText += `External Domain: ${card.astrologyExternalDomain}\n`

      if (index < cards.length - 1) {
        readingText += "\n---\n\n"
      }
    })

    const elements = cards.flatMap((card) => [card.baseElement, card.synergisticElement])
    const elementCounts = elements.reduce(
      (acc, element) => {
        acc[element] = (acc[element] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const dominantElement = Object.entries(elementCounts).sort(([, a], [, b]) => b - a)[0]?.[0]

    readingText += `\n\nElemental Analysis: Your reading is strongly influenced by ${dominantElement}, suggesting themes of `

    switch (dominantElement) {
      case "Fire":
        readingText += "passion, action, and creative manifestation."
        break
      case "Water":
        readingText += "emotion, intuition, and flowing adaptation."
        break
      case "Air":
        readingText += "thought, communication, and mental clarity."
        break
      case "Earth":
        readingText += "stability, grounding, and practical manifestation."
        break
      case "Spirit":
        readingText += "transcendence, divine connection, and spiritual awakening."
        break
      default:
        readingText += "balanced elemental energies working in harmony."
    }

    if (spreadType === "single") {
      readingText +=
        "\n\nThis single card illuminates the core energy present in your situation. Meditate on its sacred geometry and orientation to understand how to work with this energy."
    } else if (spreadType === "three") {
      readingText +=
        "\n\nThese three cards form a trinity of guidance: past influences, present moment, and emerging future. Notice how their orientations and elements interact to tell your story."
    } else {
      readingText +=
        "\n\nThis five-card elemental spread reveals the full spectrum of forces at work. Each card's orientation and sacred geometry offers specific guidance for navigating your path."
    }

    setReading(readingText)
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
      fullName,
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
      const shareText = `My NUMO Oracle Reading\n\nQuestion: ${question}\n\n${reading}`
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
        alert("Reading copied to clipboard!")
      }
    }
  }

  // Connection Status Component
  const ConnectionStatusIndicator = () => (
    <div className="flex items-center space-x-2">
      {connectionStatus.status === "testing" && (
        <>
          <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
          <span className="text-sm text-blue-400">Testing connection...</span>
        </>
      )}
      {connectionStatus.status === "connected" && (
        <>
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-sm text-green-400">
            Connected ({connectionStatus.details?.imagesFound} images found)
          </span>
        </>
      )}
      {connectionStatus.status === "error" && (
        <>
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-yellow-400">Connection issues detected</span>
        </>
      )}
      {connectionStatus.status === "offline" && (
        <>
          <XCircle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-400">Offline mode</span>
        </>
      )}
    </div>
  )

  // Diagnostics Panel
  const DiagnosticsPanel = () => {
    const metrics = getVerifiedImageMetrics()

    return (
      <Dialog open={showDiagnostics} onOpenChange={setShowDiagnostics}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>System Diagnostics</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant={connectionStatus.status === "connected" ? "default" : "destructive"}>
                        {connectionStatus.status}
                      </Badge>
                    </div>
                    {connectionStatus.details && (
                      <>
                        <div className="flex justify-between">
                          <span>Images Found:</span>
                          <span>{connectionStatus.details.imagesFound}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Response Time:</span>
                          <span>{connectionStatus.details.averageResponseTime}ms</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Cache Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Images:</span>
                      <span>{metrics.cache.totalImages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verified:</span>
                      <span>{metrics.cache.verifiedImages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Size:</span>
                      <span>{(metrics.cache.totalSize / 1024 / 1024).toFixed(2)}MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{metrics.performance.successfulLoads}</div>
                    <div className="text-xs text-gray-400">Successful</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{metrics.performance.failedLoads}</div>
                    <div className="text-xs text-gray-400">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{metrics.performance.cacheHits}</div>
                    <div className="text-xs text-gray-400">Cache Hits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {Math.round(metrics.performance.averageLoadTime)}ms
                    </div>
                    <div className="text-xs text-gray-400">Avg Load Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Errors */}
            {metrics.errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Errors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {metrics.errors.map((error, index) => (
                      <div key={index} className="text-xs bg-red-900/20 p-2 rounded">
                        <div className="font-medium">{error.key}</div>
                        <div className="text-gray-400">
                          {error.error} (attempts: {error.attempts})
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (loadingState.isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">NUMO Oracle Card Simulator</h1>

          <ConnectionStatusIndicator />

          <div className="space-y-3 max-w-md mx-auto">
            <Progress value={loadingState.progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span>{loadingState.currentAction}</span>
              <span>{Math.round(loadingState.progress)}%</span>
            </div>
            <div className="text-xs text-gray-400">
              {loadingState.loaded} of {loadingState.total} processed
              {loadingState.failed > 0 && (
                <span className="text-yellow-400 ml-2">({loadingState.failed} using placeholders)</span>
              )}
            </div>
          </div>

          {loadingState.errors.length > 0 && (
            <Alert className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {loadingState.errors.length} error(s) occurred during loading. Some images may use placeholders.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NUMO Oracle Card Simulator</h1>
        <p className="text-gray-400">Ask a question and let the cards guide you through the ancient wisdom</p>

        <div className="flex items-center justify-center space-x-4">
          <ConnectionStatusIndicator />
          <Button variant="ghost" size="sm" onClick={() => setShowDiagnostics(true)} className="text-xs">
            <Activity className="h-3 w-3 mr-1" />
            Diagnostics
          </Button>
        </div>
      </div>

      <PrivacyNotice context="card-simulator" onConsentChange={handleConsentChange} />

      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Your Information
            {userProfile?.lastUsed && hasConsent && (
              <Badge variant="outline" className="ml-auto text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Last used: {new Date(userProfile.lastUsed).toLocaleDateString()}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Your Name (Optional)</Label>
            <Input
              id="fullName"
              placeholder="Enter your name for personalized readings"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
            />
            {hasConsent && fullName && (
              <p className="text-xs text-green-400 mt-1">✓ Name will be remembered for future readings</p>
            )}
          </div>

          <div>
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              placeholder="What guidance do you seek from the ancient wisdom?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] mt-1"
            />
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            <label className="text-sm font-medium">Spread Type:</label>
            <Tabs value={spreadType} onValueChange={setSpreadType}>
              <TabsList>
                <TabsTrigger value="single">Single Card</TabsTrigger>
                <TabsTrigger value="three">Three Cards</TabsTrigger>
                <TabsTrigger value="five">Five Elements</TabsTrigger>
              </TabsList>
            </Tabs>
            {hasConsent && spreadType !== "single" && (
              <Badge variant="outline" className="text-xs">
                Preference saved
              </Badge>
            )}
          </div>

          <Button
            onClick={shuffleCards}
            disabled={isShuffling || !question.trim() || cardsWithImages.length === 0}
            className="w-full"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            {isShuffling ? "Shuffling the Ancient Deck..." : "Draw Cards"}
          </Button>
        </CardContent>
      </Card>

      {selectedCards.length > 0 && (
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Your Cards
              <Button variant="ghost" size="sm" onClick={() => setShowDetailedView(!showDetailedView)}>
                {showDetailedView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showDetailedView ? "Simple View" : "Detailed View"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {selectedCards.map((card, index) => (
                <div key={card.id} className="text-center space-y-2">
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={card.imagePath || "/placeholder.svg"}
                      alt={card.fullTitle}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=200"
                      }}
                    />

                    {/* Image verification indicator */}
                    <div className="absolute top-2 right-2">
                      {card.imageVerified ? (
                        <Badge variant="default" className="text-xs bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Placeholder
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm">{card.fullTitle}</h3>
                    <div className="flex flex-wrap gap-1 justify-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {card.baseElement}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-900/30">
                        {card.synergisticElement}
                      </Badge>
                    </div>

                    {showDetailedView && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-400">{card.orientation}</p>
                        <p className="text-xs text-gray-500">{card.sacredGeometry}</p>
                        <p className="text-xs text-gray-500">{card.iconSymbol}</p>
                        {card.loadTime && <p className="text-xs text-blue-400">Load: {card.loadTime}ms</p>}
                      </div>
                    )}
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

      <DiagnosticsPanel />
    </div>
  )
}
