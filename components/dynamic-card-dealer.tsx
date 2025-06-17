"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Shuffle,
  Save,
  Share2,
  RefreshCw,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  EyeOff,
  Database,
  ImageIcon,
  Clock,
  Filter,
  Search,
  FolderOpen,
  Cloud,
  Info,
  Download,
  Globe,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { fetchAllDynamicCardImages, getDynamicCacheStatistics, clearDynamicCache } from "@/lib/dynamic-blob-manager"
import { getCardData } from "@/lib/card-data-access" // Import card data access

// Enhanced card interface for dynamic loading
interface DynamicOracleCard {
  id: string
  number: string
  suit: string
  fullTitle: string
  symbols: Array<{ key: string; value: string }>
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string
  // Dynamic image properties
  availableImages: Array<{
    element: string
    url: string
    verified: boolean
    loadTime?: number
    source: "blob" | "local" | "placeholder"
    retryCount: number
    size: number
  }>
  primaryImageUrl: string
  secondaryImageUrl: string
  imageLoadStatus: "loading" | "loaded" | "error" | "placeholder"
  preferredElement: string
  hasMultipleVariants: boolean
}

// Enhanced loading state
interface DynamicLoadingState {
  isLoading: boolean
  stage: "discovering" | "fetching" | "processing" | "verifying" | "complete"
  progress: number
  currentFile: string
  totalFiles: number
  loadedFiles: number
  failedFiles: number
  blobFiles: number
  localFiles: number
  errors: string[]
  warnings: string[]
  discoveredSources: string[]
}

// Generate comprehensive card data by merging master data with discovered images
function generateCardDataWithImages(
  masterCards: any[],
  discoveredImages: any[],
): { cards: DynamicOracleCard[]; warnings: string[] } {
  const cardMap = new Map<string, DynamicOracleCard>()
  const unmappedImageWarnings: string[] = []

  // 1. Populate cardMap with all master card data first
  masterCards.forEach((masterCard) => {
    cardMap.set(masterCard.id, {
      ...masterCard,
      availableImages: [], // Initialize empty array for images
      primaryImageUrl: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(masterCard.fullTitle)}`, // Default to placeholder
      secondaryImageUrl: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(masterCard.fullTitle)}`,
      imageLoadStatus: "placeholder",
      preferredElement: masterCard.baseElement?.toLowerCase() || "spirit",
      hasMultipleVariants: false,
    })
  })

  // 2. Iterate through discovered images and attach them to existing master cards
  discoveredImages.forEach((image) => {
    if (!image.cardId || !image.isValid) {
      if (image.filename) {
        unmappedImageWarnings.push(
          `Discovered image "${image.filename}" is invalid or missing cardId. It will be ignored.`,
        )
      }
      return
    }

    const targetCard = cardMap.get(image.cardId)
    if (targetCard) {
      targetCard.availableImages.push({
        element: image.element || "unknown",
        url: image.url,
        verified: image.isValid,
        loadTime: image.loadTime,
        source: image.source,
        retryCount: image.retryCount || 0,
        size: image.size || 0,
      })
    } else {
      unmappedImageWarnings.push(
        `Discovered image "${image.filename}" has cardId "${image.cardId}" which does not match any master card. It will be ignored.`,
      )
    }
  })

  // 3. Finalize card data for each card in the map
  cardMap.forEach((card) => {
    // Sort images by preference (blob > local) and then by validity
    card.availableImages.sort((a, b) => {
      const sourceOrder = { blob: 0, local: 1, placeholder: 2 }
      if (sourceOrder[a.source] !== sourceOrder[b.source]) {
        return sourceOrder[a.source] - sourceOrder[b.source]
      }
      // If sources are the same, prioritize valid images
      return (b.verified ? 1 : 0) - (a.verified ? 1 : 0)
    })

    // Find the first valid image, prioritizing blob over local
    const primaryImageCandidate = card.availableImages.find((img) => img.verified)

    // If a valid image is found, use it. Otherwise, use a placeholder.
    card.primaryImageUrl =
      primaryImageCandidate?.url || `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(card.fullTitle)}`
    card.imageLoadStatus = primaryImageCandidate ? "loaded" : "placeholder"

    // For secondary image, find the next best valid image or fallback to primary
    const secondaryImageCandidate =
      card.availableImages.filter((img) => img.verified && img.url !== card.primaryImageUrl)[0] || primaryImageCandidate

    card.secondaryImageUrl = secondaryImageCandidate?.url || card.primaryImageUrl

    card.hasMultipleVariants = card.availableImages.length > 1
  })

  return { cards: Array.from(cardMap.values()), warnings: unmappedImageWarnings }
}

export function DynamicCardDealer() {
  const [cards, setCards] = useState<DynamicOracleCard[]>([])
  const [selectedCards, setSelectedCards] = useState<DynamicOracleCard[]>([])
  const [question, setQuestion] = useState("")
  const [fullName, setFullName] = useState("")
  const [spreadType, setSpreadType] = useState("single")
  const [isShuffling, setIsShuffling] = useState(false)
  const [reading, setReading] = useState("")
  const [loadingState, setLoadingState] = useState<DynamicLoadingState>({
    isLoading: true,
    stage: "discovering",
    progress: 0,
    currentFile: "",
    totalFiles: 0,
    loadedFiles: 0,
    failedFiles: 0,
    blobFiles: 0,
    localFiles: 0,
    errors: [],
    warnings: [],
    discoveredSources: [],
  })
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [imageFilter, setImageFilter] = useState<"all" | "blob" | "local" | "verified">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize dynamic image loading
  useEffect(() => {
    initializeDynamicImages()
  }, [])

  const initializeDynamicImages = async () => {
    setLoadingState({
      isLoading: true,
      stage: "discovering",
      progress: 0,
      currentFile: "Starting comprehensive image discovery...",
      totalFiles: 0,
      loadedFiles: 0,
      failedFiles: 0,
      blobFiles: 0,
      localFiles: 0,
      errors: [],
      warnings: [],
      discoveredSources: [],
    })

    try {
      const result = await fetchAllDynamicCardImages((progress) => {
        setLoadingState((prev) => ({
          ...prev,
          isLoading: true,
          stage: progress.stage,
          progress: progress.percentage,
          currentFile: progress.currentFile,
          totalFiles: progress.total,
          loadedFiles: progress.loaded,
          failedFiles: progress.failed,
          // blobFiles and localFiles will be updated after completion
          errors: progress.errors,
          warnings: progress.warnings,
        }))
      })

      if (result.success) {
        // Get master card data
        const masterCards = getCardData()
        // Generate card data by merging master data with discovered images
        const { cards: dynamicCards, warnings: mappingWarnings } = generateCardDataWithImages(
          masterCards,
          result.images,
        )
        setCards(dynamicCards)

        setLoadingState({
          isLoading: false,
          stage: "complete",
          progress: 100,
          currentFile: "Ready!",
          totalFiles: result.totalFound,
          loadedFiles: result.validImages,
          failedFiles: result.invalidImages,
          blobFiles: result.blobImages,
          localFiles: result.localImages,
          errors: result.errors,
          warnings: [...result.warnings, ...mappingWarnings], // Add mapping warnings
          discoveredSources: ["Vercel Blob Storage", "Local Project Files"],
        })

        console.log(`✅ Initialized ${dynamicCards.length} cards from ${result.totalFound} discovered images`)
        console.log(`📊 Sources: ${result.blobImages} blob, ${result.localImages} local`)
      } else {
        throw new Error(`Failed to discover images: ${result.errors.join(", ")}`)
      }
    } catch (error) {
      console.error("❌ Failed to initialize dynamic images:", error)

      setLoadingState({
        isLoading: false,
        stage: "complete",
        progress: 100,
        currentFile: "Error - using fallback",
        totalFiles: 0,
        loadedFiles: 0,
        failedFiles: 0,
        blobFiles: 0,
        localFiles: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        warnings: [
          "Failed to discover card images from all sources.",
          "Please check your network connection and blob storage configuration.",
        ],
        discoveredSources: [],
      })

      // Set empty cards array as fallback
      setCards([])
    }
  }

  const shuffleCards = async () => {
    if (cards.length === 0) return

    setIsShuffling(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numCards)

    setSelectedCards(selected)
    generateReading(selected)
    setIsShuffling(false)
  }

  const generateReading = (selectedCards: DynamicOracleCard[]) => {
    const personalizedGreeting = fullName ? `Dear ${fullName.split(" ")[0]}, your` : "Your"

    let readingText = `${personalizedGreeting} reading reveals:\n\n`

    selectedCards.forEach((card, index) => {
      readingText += `Card ${index + 1}: ${card.fullTitle}\n`
      readingText += `Elements: ${card.baseElement} ⚡ ${card.synergisticElement}\n`
      readingText += `Sacred Geometry: ${card.sacredGeometry} | Icon: ${card.iconSymbol}\n`
      readingText += `Orientation: ${card.orientation}\n\n`

      const randomMeaning = card.keyMeanings[Math.floor(Math.random() * card.keyMeanings.length)]
      readingText += `${randomMeaning}\n\n`

      readingText += `Internal Influence: ${card.planetInternalInfluence}\n`
      readingText += `External Domain: ${card.astrologyExternalDomain}\n`

      if (index < selectedCards.length - 1) {
        readingText += "\n---\n\n"
      }
    })

    setReading(readingText)
  }

  const refreshImages = async () => {
    clearDynamicCache()
    await initializeDynamicImages()
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

  // Filter cards based on current filter and search
  const filteredCards = cards.filter((card) => {
    const matchesFilter =
      imageFilter === "all" ||
      (imageFilter === "blob" && card.availableImages.some((img) => img.source === "blob")) ||
      (imageFilter === "local" && card.availableImages.some((img) => img.source === "local")) ||
      (imageFilter === "verified" && card.imageLoadStatus === "loaded")

    const matchesSearch =
      searchQuery === "" ||
      card.fullTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.suit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.baseElement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.synergisticElement.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Enhanced Diagnostics Panel
  const DiagnosticsPanel = () => {
    const stats = getDynamicCacheStatistics()

    return (
      <Dialog open={showDiagnostics} onOpenChange={setShowDiagnostics}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Dynamic Image Discovery Diagnostics
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Discovery Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Discovery Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Discovered:</span>
                  <Badge>{stats.totalImages}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Valid Images:</span>
                  <Badge variant="default">{stats.validImages}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Invalid Images:</span>
                  <Badge variant="destructive">{stats.invalidImages}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <Badge variant={stats.validImages > stats.invalidImages ? "default" : "destructive"}>
                    {stats.totalImages > 0 ? Math.round((stats.validImages / stats.totalImages) * 100) : 0}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Source Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Source Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Cloud className="h-3 w-3 mr-1" />
                    Blob Storage:
                  </span>
                  <Badge variant="outline">{stats.blobImages}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <FolderOpen className="h-3 w-3 mr-1" />
                    Local Files:
                  </span>
                  <Badge variant="outline">{stats.localImages}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Size:</span>
                  <span>{(stats.totalSize / 1024 / 1024).toFixed(2)}MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Cache Age:</span>
                  <span>{Math.round(stats.cacheAge / 60000)}min</span>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Coverage Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Cards Covered:</span>
                  <Badge>{stats.cardCoverage}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Suits Covered:</span>
                  <Badge>{stats.suitCoverage}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Elements Covered:</span>
                  <Badge>{stats.elementCoverage}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Multi-variant Cards:</span>
                  <Badge>{cards.filter((c) => c.hasMultipleVariants).length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Discovery Sources */}
          {loadingState.discoveredSources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Discovered Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {loadingState.discoveredSources.map((source, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {source}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Status */}
          {(loadingState.errors.length > 0 || loadingState.warnings.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {loadingState.warnings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-yellow-400 mb-1">Warnings:</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {loadingState.warnings.map((warning, index) => (
                        <div key={index} className="text-xs bg-yellow-900/20 p-2 rounded">
                          {warning}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {loadingState.errors.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-red-400 mb-1">Errors:</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {loadingState.errors.map((error, index) => (
                        <div key={index} className="text-xs bg-red-900/20 p-2 rounded">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={refreshImages} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Discovery
            </Button>
            <Button
              onClick={() => {
                const stats = getDynamicCacheStatistics()
                console.log("Dynamic cache statistics:", stats)
                alert("Cache statistics exported to console")
              }}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Loading Screen
  if (loadingState.isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">NUMO Oracle Dynamic Card Dealer</h1>
          <p className="text-gray-400">Discovering and loading all available card images...</p>

          <div className="space-y-3 max-w-md mx-auto">
            <Progress value={loadingState.progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="capitalize">{loadingState.stage}</span>
              <span>{Math.round(loadingState.progress)}%</span>
            </div>
            <div className="text-xs text-gray-400">{loadingState.currentFile}</div>
            <div className="text-xs text-gray-500">
              {loadingState.loadedFiles} of {loadingState.totalFiles} processed
              {loadingState.failedFiles > 0 && (
                <span className="text-yellow-400 ml-2">({loadingState.failedFiles} failed)</span>
              )}
            </div>
            {(loadingState.blobFiles > 0 || loadingState.localFiles > 0) && (
              <div className="text-xs text-blue-400">
                Sources: {loadingState.blobFiles} blob, {loadingState.localFiles} local
              </div>
            )}
          </div>

          {loadingState.warnings.length > 0 && (
            <Alert className="max-w-md mx-auto">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Discovery in progress. {loadingState.warnings.length} notice(s). Check diagnostics for details.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NUMO Oracle Dynamic Card Dealer</h1>
        <p className="text-gray-400">
          Comprehensive image discovery system with {cards.length} cards from{" "}
          {loadingState.blobFiles + loadingState.localFiles} sources
        </p>

        <div className="flex items-center justify-center space-x-4 flex-wrap">
          <Badge variant="outline" className="flex items-center">
            <Cloud className="h-3 w-3 mr-1" />
            {loadingState.blobFiles} Blob
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <FolderOpen className="h-3 w-3 mr-1" />
            {loadingState.localFiles} Local
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            {cards.filter((c) => c.imageLoadStatus === "loaded").length} Verified
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <ImageIcon className="h-3 w-3 mr-1" />
            {cards.filter((c) => c.hasMultipleVariants).length} Multi-variant
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => setShowDiagnostics(true)}>
            <Activity className="h-3 w-3 mr-1" />
            Diagnostics
          </Button>
          <Button variant="ghost" size="sm" onClick={refreshImages}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {loadingState.warnings.length > 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Dynamic discovery completed with {loadingState.warnings.length} notice(s). Check diagnostics for details.
          </AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <CardTitle>Reading Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Your Name (Optional)</Label>
              <Input
                id="fullName"
                placeholder="Enter your name for personalized readings"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Spread Type</Label>
              <Tabs value={spreadType} onValueChange={setSpreadType} className="mt-1">
                <TabsList>
                  <TabsTrigger value="single">Single Card</TabsTrigger>
                  <TabsTrigger value="three">Three Cards</TabsTrigger>
                  <TabsTrigger value="five">Five Elements</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
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

          <Button
            onClick={shuffleCards}
            disabled={isShuffling || !question.trim() || cards.length === 0}
            className="w-full"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            {isShuffling ? "Shuffling the Ancient Deck..." : "Draw Cards"}
          </Button>
        </CardContent>
      </Card>

      {/* Card Library Browser */}
      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Dynamic Card Library ({filteredCards.length} cards)</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowDetailedView(!showDetailedView)}>
                {showDetailedView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showDetailedView ? "Simple" : "Detailed"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Tabs value={imageFilter} onValueChange={(value: any) => setImageFilter(value)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="blob">Blob</TabsTrigger>
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="verified">Verified</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCards.map((card) => (
              <div key={card.id} className="text-center space-y-2">
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src={card.primaryImageUrl || "/placeholder.svg"}
                    alt={card.fullTitle}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=200"
                    }}
                  />

                  {/* Status indicator */}
                  <div className="absolute top-2 right-2">
                    {card.imageLoadStatus === "loaded" && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        <CheckCircle className="h-3 w-3" />
                      </Badge>
                    )}
                    {card.imageLoadStatus === "placeholder" && (
                      <Badge variant="secondary" className="text-xs">
                        <AlertCircle className="h-3 w-3" />
                      </Badge>
                    )}
                    {card.imageLoadStatus === "error" && (
                      <Badge variant="destructive" className="text-xs">
                        <XCircle className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>

                  {/* Source indicator */}
                  {card.availableImages.length > 0 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="text-xs">
                        {card.availableImages[0].source === "blob" ? (
                          <Cloud className="h-3 w-3" />
                        ) : (
                          <FolderOpen className="h-3 w-3" />
                        )}
                      </Badge>
                    </div>
                  )}

                  {/* Multiple variants indicator */}
                  {card.hasMultipleVariants && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="text-xs">
                        {card.availableImages.length}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-xs">{card.fullTitle}</h3>
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
                      {card.availableImages.length > 0 && (
                        <div className="text-xs text-blue-400">
                          Sources: {Array.from(new Set(card.availableImages.map((img) => img.source))).join(", ")}
                        </div>
                      )}
                      {card.availableImages.length > 0 && (
                        <div className="text-xs text-green-400">
                          Elements: {Array.from(new Set(card.availableImages.map((img) => img.element))).join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No cards message */}
          {filteredCards.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No Cards Found</h3>
              <p className="text-gray-400">
                {cards.length === 0
                  ? "No card images were discovered. Check your network connection and try refreshing."
                  : "No cards match your current filter criteria. Try adjusting your search or filter settings."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Cards Reading */}
      {selectedCards.length > 0 && (
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Your Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {selectedCards.map((card, index) => (
                <div key={card.id} className="text-center space-y-2">
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={card.primaryImageUrl || "/placeholder.svg"}
                      alt={card.fullTitle}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=200"
                      }}
                    />

                    {/* Load time indicator */}
                    {card.availableImages[0]?.loadTime && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {card.availableImages[0].loadTime}ms
                        </Badge>
                      </div>
                    )}

                    {/* Source indicator */}
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-xs">
                        {card.availableImages[0]?.source === "blob" ? (
                          <Cloud className="h-3 w-3" />
                        ) : (
                          <FolderOpen className="h-3 w-3" />
                        )}
                      </Badge>
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
