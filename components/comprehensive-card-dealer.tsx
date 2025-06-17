"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Save, Share2, User, Clock, Info, Eye, EyeOff, Wifi, WifiOff, Sparkles } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PrivacyNotice } from "@/components/privacy-notice"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"
import { Progress } from "@/components/ui/progress"
import { getAllCards } from "@/lib/card-data-access"
import { getCardImageFromBlob, preloadCardImages, getCacheStats } from "@/lib/enhanced-blob-handler"
import type { OracleCard } from "@/types/cards"

interface EnhancedOracleCard extends OracleCard {
  imagePath?: string
}

export function ComprehensiveCardDealer() {
  const [selectedCards, setSelectedCards] = useState<EnhancedOracleCard[]>([])
  const [question, setQuestion] = useState("")
  const [fullName, setFullName] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")
  const [hasConsent, setHasConsent] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [cardsWithImages, setCardsWithImages] = useState<EnhancedOracleCard[]>([])
  const [imageLoadingProgress, setImageLoadingProgress] = useState(0)
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline" | "slow">("online")

  // Get all cards from the master data
  const masterCardData = useMemo(() => getAllCards(), [])

  // Memoize the consent change handler
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
  }, [])

  // Load card images with enhanced blob storage integration
  useEffect(() => {
    const loadCardImages = async () => {
      if (masterCardData.length === 0) return

      setIsLoadingImages(true)
      setImageLoadingProgress(0)

      try {
        const startTime = Date.now()

        // Load images for all cards with better error handling
        const cardsWithPaths = await Promise.all(
          masterCardData.map(async (card, index) => {
            try {
              // Get image path with fallback handling
              const imagePath = await getCardImageFromBlob(card.id, card.baseElement)

              const progress = ((index + 1) / masterCardData.length) * 100
              setImageLoadingProgress(progress)

              return {
                ...card,
                imagePath,
              }
            } catch (error) {
              console.warn(`Error loading image for card ${card.id}:`, error)

              // Use local fallback path
              const fallbackPath = `/cards/${String(card.number).padStart(2, "0")}-${card.suit.toLowerCase()}-${card.baseElement.toLowerCase()}.jpg`

              return {
                ...card,
                imagePath: fallbackPath,
              }
            }
          }),
        )

        setCardsWithImages(cardsWithPaths)

        // Simplified preloading that doesn't fail the entire process
        try {
          const preloadResult = await preloadCardImages(
            masterCardData.map((card) => ({
              id: card.id,
              baseElement: card.baseElement,
              synergisticElement: card.synergisticElement,
            })),
            (loaded, total) => {
              const progress = (loaded / total) * 100
              setImageLoadingProgress(Math.min(progress, 100))
            },
          )

          console.log(`Preload completed: ${preloadResult.loaded} loaded, ${preloadResult.failed} failed`)
        } catch (preloadError) {
          console.warn("Preload failed, but continuing with basic loading:", preloadError)
        }

        const totalTime = Date.now() - startTime
        const cacheStats = getCacheStats()

        console.log(`Image loading completed in ${totalTime}ms`)
        console.log(`Cache stats:`, cacheStats)

        // Determine network status based on cache stats rather than timing
        if (cacheStats.verifiedFromBlob > 0) {
          setNetworkStatus("online")
        } else if (totalTime > 5000) {
          setNetworkStatus("slow")
        } else {
          setNetworkStatus("offline")
        }
      } catch (error) {
        console.error("Error in image loading process:", error)
        setNetworkStatus("offline")

        // Fallback to basic card data with local image paths
        setCardsWithImages(
          masterCardData.map((card) => ({
            ...card,
            imagePath: `/cards/${String(card.number).padStart(2, "0")}-${card.suit.toLowerCase()}-${card.baseElement.toLowerCase()}.jpg`,
          })),
        )
      } finally {
        setIsLoadingImages(false)
        setImageLoadingProgress(100)
      }
    }

    loadCardImages()
  }, [masterCardData])

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

  useEffect(() => {
    if (hasConsent && (fullName || spreadType !== "single")) {
      const profileData: Partial<UserProfile> = {}

      if (fullName) profileData.fullName = fullName
      if (spreadType !== "single") profileData.preferredSpread = spreadType

      userDataService.saveUserProfile(profileData)
    }
  }, [fullName, spreadType, hasConsent])

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

  const generateReading = (cards: EnhancedOracleCard[]) => {
    const personalizedGreeting = fullName ? `Dear ${fullName.split(" ")[0]}, your` : "Your"

    let readingText = `${personalizedGreeting} reading reveals:\n\n`

    cards.forEach((card, index) => {
      readingText += `Card ${index + 1}: ${card.fullTitle}\n`
      readingText += `Elements: ${card.baseElement} ⚡ ${card.synergisticElement}\n`
      readingText += `Sacred Geometry: ${card.sacredGeometry} | Icon: ${card.iconSymbol}\n`
      readingText += `Orientation: ${card.orientation}\n\n`

      // Use the rich key meanings from the master data
      const randomMeaning = card.keyMeanings[Math.floor(Math.random() * card.keyMeanings.length)]
      readingText += `${randomMeaning}\n\n`

      readingText += `Internal Influence: ${card.planetInternalInfluence}\n`
      readingText += `External Domain: ${card.astrologyExternalDomain}\n`

      if (index < cards.length - 1) {
        readingText += "\n---\n\n"
      }
    })

    // Enhanced elemental analysis
    const elements = cards.flatMap((card) => [card.baseElement, card.synergisticElement])
    const elementCounts = elements.reduce(
      (acc, element) => {
        acc[element] = (acc[element] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const dominantElement = Object.entries(elementCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "Spirit"

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

    // Add spread-specific interpretation
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

  const CardDetailModal = ({ card }: { card: EnhancedOracleCard }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-2">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            {card.fullTitle}
          </DialogTitle>
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

          {/* Enhanced Symbols Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Symbols</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {card.symbols.map((symbol, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-medium text-sm text-purple-600 dark:text-purple-400">{symbol.key}</div>
                  <div className="text-sm mt-1">{symbol.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Meanings Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Meanings</h3>
            <div className="space-y-3">
              {card.keyMeanings.map((meaning, index) => (
                <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Symbolism Breakdown Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Symbolism Breakdown</h3>
            <Accordion type="single" collapsible>
              {card.symbolismBreakdown.map((breakdown, index) => {
                const [title, ...content] = breakdown.split(" – ")
                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm">{title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{content.join(" – ")}</p>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>

          {/* Astrological Influences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Internal Influence</h4>
              <p className="text-sm">{card.planetInternalInfluence}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">External Domain</h4>
              <p className="text-sm">{card.astrologyExternalDomain}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (isLoadingImages) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">NUMO Oracle Card Simulator</h1>
          <p className="text-gray-400">Loading the ancient wisdom...</p>

          <div className="flex items-center justify-center space-x-2">
            {networkStatus === "online" ? (
              <Wifi className="h-5 w-5 text-green-400" />
            ) : networkStatus === "slow" ? (
              <Wifi className="h-5 w-5 text-yellow-400" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-400" />
            )}
            <span className="text-sm text-gray-400">
              {networkStatus === "online" && "Connected - Loading from blob storage..."}
              {networkStatus === "slow" && "Slow connection - Please wait..."}
              {networkStatus === "offline" && "Using local images..."}
            </span>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <Progress value={imageLoadingProgress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Preparing oracle cards...</span>
              <span>{Math.round(imageLoadingProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NUMO Oracle Card Simulator</h1>
        <p className="text-gray-400">Ask a question and let the cards guide you through the ancient wisdom</p>
        <div className="text-xs text-gray-500">
          {cardsWithImages.length} cards loaded • {networkStatus === "online" ? "Blob storage active" : "Local mode"}
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
                <div key={`${card.id}-${index}`} className="text-center space-y-2">
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
                      </div>
                    )}
                    <CardDetailModal card={card} />
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

// Export as both named and default for compatibility
export default ComprehensiveCardDealer
