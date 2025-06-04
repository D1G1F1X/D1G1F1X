"use client"

import type React from "react"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import Head from "next/head"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Rocket,
  CheckCircle,
  Flame,
  Droplets,
  Wind,
  MountainIcon,
  Menu,
  X,
  Layers,
  PenTool,
  HelpCircle,
  GraduationCap,
  Zap,
  BookMarked,
  Library,
} from "lucide-react"

import {
  pairingsData as importedPairingsData,
  individualCardData as importedIndividualCardData, // This might be less relevant now if CardDirectory fetches its own
  chaldeanValues as importedChaldeanValues,
  pythagoreanValues as importedPythagoreanValues,
  compoundNumberMeaningsBriefChaldean as importedCompoundNumberMeaningsBriefChaldean,
  generalElementMeanings as importedGeneralElementMeanings,
} from "@/lib/content"

import { CardDirectory } from "@/components/card-directory" // Import CardDirectory
import YouTubeVideo from "@/components/youtube-video"

// Type definitions (ensure these match your actual data structures in lib/content.ts)
interface CardData {
  name: string
  keyMeaning: string
  suit: string
  dominantElement: string
  pairingRole?: string
}

interface IndividualCardData {
  [key: string]: CardData
}

interface PairingData {
  name: string
  numbers: string
  tarotSuit: string
  visual: string
  metaphysical: string
  dominantElement: string
  energeticDetails: string
  coreTheme: string
}

interface Pairings {
  [key: string]: PairingData
}

interface LetterValues {
  [key: string]: number
}

interface CompoundMeanings {
  [key: number]: string
}

interface ElementMeanings {
  [key: string]: string
}

const pairingsData: Pairings = importedPairingsData
const individualCardData: IndividualCardData = importedIndividualCardData // Keep for other lessons if needed
const chaldeanValues: LetterValues = importedChaldeanValues
const pythagoreanValues: LetterValues = importedPythagoreanValues
const compoundNumberMeaningsBriefChaldean: CompoundMeanings = importedCompoundNumberMeaningsBriefChaldean
const generalElementMeanings: ElementMeanings = importedGeneralElementMeanings

// Type for selected card from CardDirectory
interface SelectedCardInfo {
  id: string
  name: string
  suit: string
  number: number
  // Add other relevant fields from the card object passed by CardDirectory
}

const NumoTutorialPage: React.FC = () => {
  const [currentPageId, setCurrentPageId] = useState("welcome")
  const [selectedNumerologySystem, setSelectedNumerologySystem] = useState("pythagorean")
  const [isClient, setIsClient] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [selectedCardFromDirectory, setSelectedCardFromDirectory] = useState<SelectedCardInfo | null>(null)

  // Refs for DOM elements (ensure these are correctly assigned in JSX)
  const giftInfoDisplayRef = useRef<HTMLDivElement>(null)
  const giftNameElRef = useRef<HTMLHeadingElement>(null)
  const giftDominantElRef = useRef<HTMLSpanElement>(null)
  const giftVisualMetaElRef = useRef<HTMLSpanElement>(null)
  const giftCoreThemeElRef = useRef<HTMLSpanElement>(null)

  const letterValuesTableDisplayRef = useRef<HTMLTableElement>(null)
  const systemDescriptionElRef = useRef<HTMLDivElement>(null)
  const fullNameInputRef = useRef<HTMLInputElement>(null)
  const nameNumerologyResultsRef = useRef<HTMLDivElement>(null)
  const enteredFullNameElRef = useRef<HTMLSpanElement>(null)
  const totalNameSumResultElRef = useRef<HTMLElement>(null)
  const finalNameRootResultElRef = useRef<HTMLElement>(null)
  const masterNumberNoteElRef = useRef<HTMLDivElement>(null)
  const compoundMeaningInfoElRef = useRef<HTMLDivElement>(null)

  const dailyInsightDisplayRef = useRef<HTMLDivElement>(null)
  const insightCardNameElRef = useRef<HTMLParagraphElement>(null)
  const insightCardMeaningElRef = useRef<HTMLSpanElement>(null)
  const insightCardPairingInfoElRef = useRef<HTMLSpanElement>(null)
  const insightCardPromptElRef = useRef<HTMLSpanElement>(null)

  const elementInfoDisplayRef = useRef<HTMLDivElement>(null) // Keep if lesson3 uses it
  const displayedElementNameElRef = useRef<HTMLSpanElement>(null) // Keep if lesson3 uses it
  const displayedElementDescriptionElRef = useRef<HTMLSpanElement>(null) // Keep if lesson3 uses it

  const pages = useMemo(
    () => [
      { id: "welcome", title: "Welcome to NUMO!", icon: Sparkles, category: "Introduction" },
      { id: "lesson1", title: "Core Concepts: Pairs & Gifts", icon: Layers, category: "Foundations" },
      { id: "lesson2", title: "Explore the Oracle Cards", icon: Library, category: "Foundations" }, // Changed
      { id: "lesson3", title: "The Five Elements In-Depth", icon: Zap, category: "Foundations" },
      { id: "lesson4", title: "Name Numerology", icon: PenTool, category: "Personalization" },
      { id: "lesson5", title: "Basic Reading Techniques", icon: HelpCircle, category: "Application" },
      { id: "lesson6", title: "Deeper Mysteries & Lore", icon: BookMarked, category: "Exploration" },
      { id: "lesson7", title: "Your First Steps & Practice", icon: Rocket, category: "Application" },
      { id: "conclusion", title: "Next Steps & Resources", icon: GraduationCap, category: "Conclusion" },
    ],
    [],
  )

  const groupedPages = useMemo(() => {
    return pages.reduce(
      (acc, page) => {
        const category = page.category || "General"
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(page)
        return acc
      },
      {} as Record<string, typeof pages>,
    )
  }, [pages])

  const totalPages = pages.length
  const currentPageIndex = useMemo(() => pages.findIndex((p) => p.id === currentPageId), [pages, currentPageId])
  const progressValue = useMemo(() => ((currentPageIndex + 1) / totalPages) * 100, [currentPageIndex, totalPages])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const goToPage = useCallback(
    (pageId: string) => {
      setCurrentPageId(pageId)
      window.scrollTo(0, 0)
      if (isMobileNavOpen) {
        setIsMobileNavOpen(false)
      }
    },
    [isMobileNavOpen],
  )

  const handleCardSelectedFromDirectory = useCallback((card: any) => {
    // Use 'any' for now, or define a proper type from CardDirectory
    if (card && card.name && card.id) {
      setSelectedCardFromDirectory({
        id: card.id, // Assuming card object has an id
        name: card.name,
        suit: card.suit,
        number: card.number,
      })
    } else {
      setSelectedCardFromDirectory(null)
    }
  }, [])

  const showGiftInfo = useCallback(
    (giftKey: string) => {
      if (
        !giftInfoDisplayRef.current ||
        !giftNameElRef.current ||
        !giftDominantElRef.current ||
        !giftVisualMetaElRef.current ||
        !giftCoreThemeElRef.current ||
        !isClient
      )
        return
      const gift = pairingsData[giftKey as keyof typeof pairingsData]
      giftNameElRef.current.textContent = gift.name
      giftDominantElRef.current.textContent = gift.dominantElement
      giftVisualMetaElRef.current.textContent = gift.visual + " / " + gift.metaphysical
      giftCoreThemeElRef.current.textContent = gift.coreTheme
      giftInfoDisplayRef.current.style.display = "block"
      giftInfoDisplayRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    },
    [isClient],
  )

  const updateNumerologySystemUI = useCallback(
    (system: string) => {
      if (!letterValuesTableDisplayRef.current || !systemDescriptionElRef.current || !isClient) return
      setSelectedNumerologySystem(system)
      const values = system === "pythagorean" ? pythagoreanValues : chaldeanValues
      const systemDescription =
        system === "pythagorean"
          ? "The Pythagorean system is a modern Western approach, assigning values 1-9 to letters."
          : "The Chaldean system is an ancient method with unique values and compound number meanings."
      systemDescriptionElRef.current.textContent = systemDescription
      let tableHTML = `
  <thead><tr><th>Letter</th><th>Value</th></tr></thead>
  <tbody>
`
      for (const letter in values) {
        tableHTML += `<tr><td>${letter}</td><td>${values[letter]}</td></tr>`
      }
      tableHTML += `</tbody>`
      letterValuesTableDisplayRef.current.innerHTML = tableHTML
    },
    [isClient],
  )

  const calculateNameNumbers = useCallback(() => {
    if (
      !fullNameInputRef.current ||
      !nameNumerologyResultsRef.current ||
      !enteredFullNameElRef.current ||
      !totalNameSumResultElRef.current ||
      !finalNameRootResultElRef.current ||
      !masterNumberNoteElRef.current ||
      !compoundMeaningInfoElRef.current ||
      !isClient
    )
      return
    const fullName = fullNameInputRef.current.value.trim().toUpperCase()
    if (!fullName) {
      alert("Please enter a full name.")
      return
    }
    const values = selectedNumerologySystem === "pythagorean" ? pythagoreanValues : chaldeanValues
    let totalSum = 0
    for (let i = 0; i < fullName.length; i++) {
      const letter = fullName[i]
      if (values[letter]) {
        totalSum += values[letter]
      }
    }
    let finalRoot = totalSum
    while (finalRoot > 9 && finalRoot !== 11 && finalRoot !== 22 && finalRoot !== 33) {
      let sum = 0
      const numStr = finalRoot.toString()
      for (let i = 0; i < numStr.length; i++) {
        sum += Number.parseInt(numStr[i])
      }
      finalRoot = sum
    }
    enteredFullNameElRef.current.textContent = fullName
    totalNameSumResultElRef.current.textContent = totalSum.toString()
    finalNameRootResultElRef.current.textContent = finalRoot.toString()
    nameNumerologyResultsRef.current.style.display = "block"
    nameNumerologyResultsRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    if (finalRoot === 11 || finalRoot === 22 || finalRoot === 33) {
      masterNumberNoteElRef.current.textContent = "Master Number - amplified potential."
    } else {
      masterNumberNoteElRef.current.textContent = ""
    }
    if (selectedNumerologySystem === "chaldean" && totalSum > 9) {
      compoundMeaningInfoElRef.current.textContent =
        compoundNumberMeaningsBriefChaldean[totalSum as keyof typeof compoundNumberMeaningsBriefChaldean] ||
        "No specific meaning available."
    } else {
      compoundMeaningInfoElRef.current.textContent = ""
    }
  }, [isClient, selectedNumerologySystem])

  const drawDailyInsight = useCallback(() => {
    if (
      !dailyInsightDisplayRef.current ||
      !insightCardNameElRef.current ||
      !insightCardMeaningElRef.current ||
      !insightCardPairingInfoElRef.current ||
      !insightCardPromptElRef.current ||
      !isClient ||
      Object.keys(individualCardData).length === 0 // Ensure data is available
    )
      return
    const cardKeys = Object.keys(individualCardData)
    const randomCardKey = cardKeys[Math.floor(Math.random() * cardKeys.length)]
    const card = individualCardData[randomCardKey as keyof typeof individualCardData]

    if (!card) {
      // Check if card is found
      console.error("Daily insight card not found for key:", randomCardKey)
      insightCardNameElRef.current.textContent = "Error loading card."
      insightCardMeaningElRef.current.textContent = ""
      insightCardPairingInfoElRef.current.textContent = ""
      insightCardPromptElRef.current.textContent = ""
      dailyInsightDisplayRef.current.style.display = "block"
      return
    }

    const pairing = pairingsData[card.suit.toLowerCase() as keyof typeof pairingsData]

    insightCardNameElRef.current.textContent = card.name
    insightCardMeaningElRef.current.textContent = card.keyMeaning
    insightCardPairingInfoElRef.current.textContent = pairing
      ? `Part of the ${card.suit} Suit, a ${card.dominantElement}-dominant Gift themed around ${pairing.coreTheme.toLowerCase().split(";")[0]}.`
      : `Suit: ${card.suit}, Element: ${card.dominantElement}`
    insightCardPromptElRef.current.textContent = `How can you embody the energy of ${card.name} today?`
    dailyInsightDisplayRef.current.style.display = "block"
    dailyInsightDisplayRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [isClient])

  const showElementInfo = useCallback(
    // Keep if lesson3 uses it
    (elementName: string) => {
      if (
        !elementInfoDisplayRef.current ||
        !displayedElementNameElRef.current ||
        !displayedElementDescriptionElRef.current ||
        !isClient
      )
        return
      displayedElementNameElRef.current.textContent = elementName
      displayedElementDescriptionElRef.current.textContent =
        generalElementMeanings[elementName as keyof typeof generalElementMeanings]
      elementInfoDisplayRef.current.style.display = "block"
      elementInfoDisplayRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    },
    [isClient],
  )

  useEffect(() => {
    if (isClient) {
      if (currentPageId === "lesson4") {
        // Name Numerology
        updateNumerologySystemUI(selectedNumerologySystem)
      }
    }
  }, [isClient, currentPageId, selectedNumerologySystem, updateNumerologySystemUI])

  useEffect(() => {
    if (isClient) {
      goToPage("welcome")
      updateNumerologySystemUI("pythagorean") // Default for Name Numerology section
    }
    // No Three.js cleanup needed anymore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-xl text-purple-400">
        Initializing NUMO Oracle Tutorial...
      </div>
    )
  }

  const CurrentPageIcon = pages[currentPageIndex]?.icon || Sparkles

  const SidebarContent = () => (
    <div className="p-6 pt-16 space-y-4">
      <div className="text-center mb-6">
        <Link href="/" className="inline-block">
          <img
            src="/numero-logo-500x500.png"
            alt="NUMO Oracle Logo"
            className="w-20 h-20 mx-auto rounded-full shadow-lg hover:opacity-90 transition-opacity rotate-180"
          />
        </Link>
        <h1 className="text-xl font-bold text-purple-300 mt-2">NUMO Tutorial</h1>
      </div>
      <nav className="space-y-1">
        {Object.entries(groupedPages).map(([category, categoryPages]) => (
          <div key={category} className="mb-3">
            <h2 className="text-xs font-semibold uppercase text-slate-500 mb-2 px-3">{category}</h2>
            {categoryPages.map(
              (
                page, // Removed index as it's not used
              ) => (
                <button
                  key={page.id}
                  onClick={() => goToPage(page.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 ease-in-out group text-sm",
                    "hover:bg-purple-500/15 hover:text-purple-300",
                    currentPageId === page.id
                      ? "bg-purple-600/30 text-white shadow-md ring-1 ring-purple-500/70 font-medium"
                      : "text-slate-400 hover:text-slate-200",
                  )}
                >
                  {currentPageIndex > pages.findIndex((p) => p.id === page.id) ? (
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <page.icon
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        currentPageId === page.id ? "text-yellow-400" : "text-slate-500 group-hover:text-purple-400",
                      )}
                    />
                  )}
                  <span>{page.title}</span>
                </button>
              ),
            )}
          </div>
        ))}
      </nav>
      <div className="pt-4">
        <Progress
          value={progressValue}
          className="w-full h-2 [&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-purple-500"
        />
        <p className="text-xs text-slate-500 text-center mt-1.5">
          {currentPageIndex + 1} of {totalPages} sections
        </p>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-slate-300 font-sans">
      <Head>
        <title>NUMO Oracle Interactive Tutorial - Learn the System</title>
        <meta
          name="description"
          content="An engaging, step-by-step tutorial to master the NUMO Oracle deck, its numerology systems, and mystical insights."
        />
      </Head>

      <aside className="w-72 bg-slate-900/80 backdrop-blur-md p-0 space-y-6 border-r border-slate-800 shadow-2xl fixed top-0 left-0 h-full overflow-y-auto hidden md:block scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
        <SidebarContent />
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/numero-logo-500x500.png" alt="NUMO Logo" className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-purple-300">NUMO Tutorial</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-slate-900 border-r border-slate-800 shadow-xl z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 md:ml-72 p-4 sm:p-6 md:p-8 lg:p-10 mt-16 md:mt-0 overflow-y-auto">
        <header className="mb-8 p-6 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/80">
          <div className="flex items-center space-x-4">
            <CurrentPageIcon className="h-10 w-10 md:h-12 md:w-12 text-purple-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {pages[currentPageIndex]?.title}
              </h2>
              <CardDescription className="text-slate-400 text-sm mt-1">
                {currentPageId === "welcome" && "Embark on your journey to master the NUMO Oracle system."}
                {currentPageId === "lesson1" &&
                  "Uncover the foundational symmetrical pairings and the Five Gifts of Danu."}
                {currentPageId === "lesson2" &&
                  "Explore the complete NUMO Oracle card collection and their detailed meanings."}{" "}
                {/* Updated */}
                {currentPageId === "lesson3" &&
                  "Dive deep into the symbolism and influence of the five sacred elements."}
                {currentPageId === "lesson4" && "Learn to decode the vibrational power hidden within your name."}
                {currentPageId === "lesson5" && "Grasp essential techniques for conducting insightful NUMO readings."}
                {currentPageId === "lesson6" &&
                  "Explore the rich lore and esoteric wisdom underpinning the NUMO Oracle."}
                {currentPageId === "lesson7" &&
                  "Practical exercises and guidance to begin your NUMO practice confidently."}
                {currentPageId === "conclusion" &&
                  "Consolidate your learning and discover resources for continued growth."}
              </CardDescription>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-6"
          >
            {currentPageId === "welcome" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Welcome, Seeker of Wisdom!</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-4">
                  <p>
                    You stand at the threshold of the NUMO Oracle, a unique system of divination and self-discovery
                    crafted by Raziel Ali. This interactive tutorial is your comprehensive guide to unlocking its
                    profound insights.
                  </p>
                  <p>
                    The NUMO Oracle beautifully melds ancient numerological principles, the wisdom of sacred geometry,
                    elemental energies, and the mystical lore of the Danu goddesses into a cohesive and powerful tool
                    for modern spiritual exploration.
                  </p>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">In this tutorial, you will:</h3>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-400">
                      <li>Master the core concepts of symmetrical number pairings and the Five Gifts.</li>
                      <li>Explore the full NUMO Oracle card deck using the interactive Card Directory.</li>{" "}
                      {/* Updated */}
                      <li>Understand the deep significance of the Five Elements within the NUMO system.</li>
                      <li>Learn to calculate and interpret Name Numerology using Pythagorean and Chaldean methods.</li>
                      <li>Grasp basic techniques for conducting insightful NUMO readings.</li>
                      <li>Delve into the rich lore and esoteric wisdom that underpins the NUMO Oracle.</li>
                      <li>Receive practical guidance and exercises to begin your practice confidently.</li>
                    </ul>
                  </div>
                  <p>
                    Take your time, engage with the interactive elements, and allow the wisdom of NUMO to resonate with
                    you. Your journey of discovery begins now.
                  </p>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson1" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">
                    The Heart of NUMO: Symmetrical Pairs & The Five Gifts
                  </CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        1.1 The Philosophy of Symmetry
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-3">
                        <p>
                          At NUMO's core lies Raziel Ali's discovery of profound geometric and metaphysical symmetries
                          in specific number pairs: 0/1, 2/5, 3/8, 4/7, and 6/9. These aren't mere sequences but
                          "embodiments of cosmic principles," reflecting universal laws like creation from void,
                          stability vs. transformation, and love's journey to completion. The number line itself is seen
                          as encoding a system of deep spiritual insight.
                        </p>
                        <YouTubeVideo
                          videoId="ljJ18kG7zqg"
                          title="NUMO Oracle: The Philosophy of Symmetry"
                          className="my-4 rounded-lg shadow-lg"
                        />
                        <p>
                          These powerful pairings are symbolized by the Five Gifts of Danu, ancient treasures
                          corresponding to the five suits of the NUMO deck. Each Gift, its number pair, and its Dominant
                          Elemental Suit Energy are foundational to NUMO interpretation.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        1.2 The Five Gifts of Danu: Symbols of Power
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-3">
                        <p>
                          These powerful pairings are symbolized by the Five Gifts of Danu, ancient treasures
                          corresponding to the five suits of the NUMO deck. Each Gift, its number pair, and its Dominant
                          Elemental Suit Energy are foundational to NUMO interpretation.
                        </p>
                        <p>
                          Click each Gift to explore its numbers, traditional suit, dominant element,
                          visual/metaphysical link, and core theme.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {(Object.keys(pairingsData) as Array<keyof typeof pairingsData>).map((key) => {
                            const gift = pairingsData[key]
                            const Icon =
                              key === "cauldron"
                                ? Flame
                                : key === "sword"
                                  ? Droplets // Note: Sword is Air in NUMO Guidebook, but icon was Droplets. Keeping for consistency with previous.
                                  : key === "cord"
                                    ? Sparkles // Cord is Spirit
                                    : key === "spear"
                                      ? Wind // Spear is Water
                                      : MountainIcon // Stone is Earth
                            return (
                              <Button
                                key={key}
                                variant="outline"
                                onClick={() => showGiftInfo(key)}
                                className="tutorial-button-outline h-auto text-left flex flex-col items-start p-4 space-y-1 group"
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-5 w-5 text-purple-400 group-hover:text-yellow-400 transition-colors" />
                                  <span className="text-md font-medium text-slate-200 group-hover:text-white">
                                    {gift.name}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-500">
                                  ({gift.numbers}) - {gift.tarotSuit}
                                </span>
                                <span className="text-xs text-pink-400">{gift.dominantElement} Element</span>
                              </Button>
                            )
                          })}
                        </div>
                        <div
                          id="gift-info-display"
                          ref={giftInfoDisplayRef}
                          className="tutorial-info-box"
                          style={{ display: "none" }}
                        >
                          <h4 ref={giftNameElRef} className="text-lg font-semibold text-yellow-300 mb-1.5"></h4>
                          <p className="mb-1 text-sm">
                            <strong className="text-purple-300">Dominant Element:</strong>{" "}
                            <span id="gift-dominant-element" ref={giftDominantElRef}></span>
                          </p>
                          <p className="mb-1 text-sm">
                            <span id="gift-visual-meta" ref={giftVisualMetaElRef}></span>
                          </p>
                          <p className="text-sm">
                            <strong className="text-purple-300">Core Theme:</strong>{" "}
                            <span id="gift-core-theme" ref={giftCoreThemeElRef}></span>
                          </p>
                          <p className="mt-2 text-xs text-slate-500">
                            <em>Consider this theme when cards from this Gift/Suit appear.</em>
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        1.3 The Gifts in Readings (Brief Overview)
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        When a Gift (Suit) is prominent in a reading, its core theme and dominant element set the
                        overarching tone. For example, multiple Cauldron cards might point to themes of creation and
                        emotional processing, while several Stone cards could indicate matters of grounding, security,
                        or reaping what you've sown. We'll explore reading techniques later.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson2" && (
              <Card className="tutorial-card overflow-hidden">
                <CardHeader>
                  <CardTitle className="tutorial-title">Explore the NUMO Oracle Cards</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    Use the interactive Card Directory below to explore each card in the NUMO Oracle deck. You can
                    search, filter by suit or element, and click on a card to see its detailed information, including
                    its name, number, suit, elemental influences, keywords, and symbolism. This is a key tool for
                    familiarizing yourself with the deck.
                  </CardDescription>
                </CardHeader>
                <CardContent className="tutorial-content p-0 md:p-0">
                  {selectedCardFromDirectory && (
                    <div className="p-4 mb-4 bg-purple-900/20 border border-purple-700/30 rounded-lg text-sm">
                      <h3 className="font-semibold text-purple-300">Selected Card from Directory:</h3>
                      <p>
                        <strong>Name:</strong> {selectedCardFromDirectory.name}
                      </p>
                      <p>
                        <strong>Number:</strong> {selectedCardFromDirectory.number} - <strong>Suit:</strong>{" "}
                        {selectedCardFromDirectory.suit}
                      </p>
                    </div>
                  )}
                  <div className="min-h-[70vh] bg-slate-900/50 rounded-lg">
                    {" "}
                    {/* Added a wrapper with min-height */}
                    <CardDirectory onSelectCard={handleCardSelectedFromDirectory} />
                  </div>
                  <div className="p-4 mt-4 text-xs text-slate-400">
                    <p>
                      <strong>How to use the Card Directory:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>
                        <strong>Search:</strong> Use the search bar to find cards by name, keywords, or description.
                      </li>
                      <li>
                        <strong>Filters:</strong> Click "Show Filters" to narrow down cards by Suit or Element.
                      </li>
                      <li>
                        <strong>Card List:</strong> On the left, browse through the filtered list of cards. Click any
                        card to select it.
                      </li>
                      <li>
                        <strong>Card Details:</strong> On the right, the selected card's image and detailed information
                        will appear. Use the tabs (Overview, Elements, Symbolism) to learn more.
                      </li>
                      <li>
                        <strong>Navigation:</strong> Use the arrow buttons above the card title to navigate to the
                        previous or next card in the filtered list.
                      </li>
                      <li>
                        <strong>Print:</strong> You can print a summary of the selected card's details.
                      </li>
                    </ul>
                    <p className="mt-2">
                      <em>
                        Note: The Card Directory fetches live data. Ensure you have an internet connection for the best
                        experience. Card images are crucial for understanding their symbolism.
                      </em>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson3" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">The Five Elements In-Depth</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-4">
                  <p>
                    This lesson expands on the five classical elements (Fire, Water, Air, Earth, Spirit) and their
                    crucial role in the NUMO system. While each Gift/Suit has a Dominant Element, all five elements
                    influence the cards and readings in various ways.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="el-1">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        3.1 Revisiting Elemental Meanings
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(generalElementMeanings).map(([element, meaning]) => {
                          const Icon =
                            element.toLowerCase() === "fire"
                              ? Flame
                              : element.toLowerCase() === "water"
                                ? Droplets
                                : element.toLowerCase() === "air"
                                  ? Wind
                                  : element.toLowerCase() === "earth"
                                    ? MountainIcon
                                    : Sparkles
                          return (
                            <div key={element} className="p-3 bg-slate-800/50 rounded-md border border-slate-700">
                              <div className="flex items-center space-x-2 mb-1">
                                <Icon className="h-5 w-5 text-purple-400" />
                                <h4 className="font-medium text-purple-300">{element.toUpperCase()}</h4>
                              </div>
                              <p className="text-xs text-slate-400">{meaning}</p>
                            </div>
                          )
                        })}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="el-2">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        3.2 Elements in Pairings & Cards
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <p>
                          Each NUMO card is influenced by multiple elemental energies. The primary element of the card's
                          Suit (Gift) sets a general tone. However, the card's number, symbolism, and imagery can bring
                          in nuances from other elements. For example, a card from the Cauldron (Fire dominant) might
                          still carry watery emotional aspects or earthy grounding qualities depending on its specific
                          number and imagery. The Card Directory will help you see these details.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="el-3">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        3.3 Elemental Interactions (Simplified)
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <p>
                          When multiple cards appear in a reading, their elemental energies interact. Fire can energize
                          or consume. Water can soothe or overwhelm. Air can clarify or scatter. Earth can stabilize or
                          stagnate. Spirit connects and transcends. Consider how the elements of drawn cards might
                          support, challenge, or modify each other. For instance, Fire and Water together might create
                          steam (transformation) or conflict. Earth can ground Air's ideas, making them practical.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson4" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Personalizing the Energy: Name Numerology</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-6">
                  <p>
                    Many traditions teach that names carry distinct energetic vibrations. Understanding your name's
                    numerological signature adds another layer of insight when working with NUMO.
                  </p>

                  <RadioGroup
                    defaultValue="pythagorean"
                    onValueChange={(value) => updateNumerologySystemUI(value)}
                    className="my-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <Label className="text-md font-medium text-purple-300 mb-2 block">Choose Numerology System:</Label>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pythagorean" id="pythagorean" className="tutorial-radio" />
                        <Label htmlFor="pythagorean" className="text-slate-300 text-sm">
                          Pythagorean (Modern Western)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="chaldean" id="chaldean" className="tutorial-radio" />
                        <Label htmlFor="chaldean" className="text-slate-300 text-sm">
                          Chaldean (Ancient)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div
                    id="numerology-system-description"
                    ref={systemDescriptionElRef}
                    className="p-3 bg-slate-900/60 rounded-md border border-slate-700 text-xs text-slate-400"
                  ></div>

                  <h3 className="text-lg font-medium text-purple-300 pt-3 border-t border-slate-700/50">
                    Letter Values & Calculation
                  </h3>
                  <div className="letter-values-display-area overflow-x-auto my-3">
                    <table
                      id="letter-values-table-display"
                      ref={letterValuesTableDisplayRef}
                      className="min-w-full text-xs"
                    ></table>
                  </div>

                  <h3 className="text-lg font-medium text-purple-300 pt-3 border-t border-slate-700/50">
                    Calculate Your Name's Energy
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 items-center my-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <Input
                      type="text"
                      id="fullName"
                      ref={fullNameInputRef}
                      placeholder="Enter Full Birth Name"
                      className="tutorial-input flex-grow"
                    />
                    <Button onClick={calculateNameNumbers} className="tutorial-button-primary w-full sm:w-auto">
                      Calculate
                    </Button>
                  </div>
                  <div
                    id="name-numerology-results"
                    ref={nameNumerologyResultsRef}
                    className="tutorial-info-box space-y-1.5"
                    style={{ display: "none" }}
                  >
                    <h4 className="text-md font-semibold text-yellow-300">
                      Your Name Numerology (
                      <span id="activeSystemDisplay" className="text-pink-300">
                        {selectedNumerologySystem}
                      </span>
                      ):
                    </h4>
                    <p className="text-xs text-slate-300">
                      Name:{" "}
                      <span id="enteredFullName" ref={enteredFullNameElRef} className="font-medium text-white"></span>
                    </p>
                    <p className="text-xs text-slate-300">
                      Total Sum:{" "}
                      <strong
                        id="totalNameSumResult"
                        ref={totalNameSumResultElRef}
                        className="text-lg text-yellow-400"
                      ></strong>
                    </p>
                    <p className="text-xs text-slate-300">
                      Expression/Destiny (Root):{" "}
                      <strong
                        id="finalNameRootResult"
                        ref={finalNameRootResultElRef}
                        className="text-xl text-yellow-400"
                      ></strong>
                    </p>
                    <div
                      id="masterNumberNote"
                      ref={masterNumberNoteElRef}
                      className="text-xs text-pink-300 italic"
                    ></div>
                    <div
                      id="compoundMeaningInfo"
                      ref={compoundMeaningInfoElRef}
                      className="text-xs mt-1 pt-1 border-t border-slate-700/50"
                    ></div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="name-insights">
                      <AccordionTrigger className="hover:no-underline text-md font-medium text-purple-300">
                        Brief Insights & Further Study
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 text-xs space-y-2">
                        <p>
                          Pythagorean: Master Numbers (11, 22, 33) are potent. Chaldean: Compound Numbers (10-52) hold
                          unique occult meanings. The NUMO Guidebook offers extensive details on these, plus other
                          name-derived numbers like Soul Urge and Personality Number.
                        </p>
                        <p>
                          Consider how your Name Number's energy might complement or interact with your Life Path Number
                          (derived from your birth date, covered in more advanced NUMO teachings).
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson5" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Basic NUMO Reading Techniques</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-4">
                  <p>
                    This lesson introduces fundamental techniques for performing insightful readings with the NUMO
                    Oracle deck. Effective readings combine system knowledge with intuition.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rt-1">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        5.1 Preparing for a Reading
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-2">
                        <p>
                          <strong>Create Sacred Space:</strong> Find a quiet, comfortable space where you won't be
                          disturbed. You might light a candle, incense, or play calming music.
                        </p>
                        <p>
                          <strong>Center Yourself:</strong> Take a few deep breaths to clear your mind. Release any
                          stress or preconceived notions.
                        </p>
                        <p>
                          <strong>Set Your Intention:</strong> Clearly define what you seek guidance on. A focused
                          intention leads to clearer insights.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rt-2">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        5.2 Formulating Your Question
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <p>Open-ended questions often yield richer answers than yes/no questions. Examples:</p>
                        <ul className="list-disc list-inside pl-4 text-sm text-slate-500">
                          <li>"What energy do I need to embrace regarding [situation]?"</li>
                          <li>"What insight can NUMO offer about my current path?"</li>
                          <li>"What is the underlying lesson in [challenge]?"</li>
                        </ul>
                        <p>
                          Avoid questions that attempt to predict the future with certainty or infringe on others' free
                          will.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rt-3">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        5.3 Shuffling & Selecting Cards (Conceptual)
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <p>
                          If using a physical deck, shuffle while focusing on your question. When you feel ready, select
                          cards. For digital tools like the NumOracle.com AI or the Card Simulator on this site, the
                          selection is often simulated to reflect a random, yet guided, draw.
                        </p>
                        <p>The key is to trust the process and the cards that appear.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rt-4">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        5.4 A Simple Three-Card Spread
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-2">
                        <p>A versatile spread for beginners:</p>
                        <ul className="list-disc list-inside pl-4 text-sm text-slate-500">
                          <li>
                            <strong>Card 1: The Situation / The Core Energy.</strong> Represents the current state or
                            central theme of your query.
                          </li>
                          <li>
                            <strong>Card 2: The Challenge / The Obstacle.</strong> Highlights what needs to be addressed
                            or overcome.
                          </li>
                          <li>
                            <strong>Card 3: The Guidance / The Potential Outcome.</strong> Offers advice or shows a
                            possible path forward if the challenge is met.
                          </li>
                        </ul>
                        <p>
                          Interpret each card individually using insights from the Card Directory. Then look for
                          connections and the overall story they tell. Consider the dominant elements and core themes of
                          the Gifts (Suits) involved.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson6" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Deeper Mysteries & Esoteric Lore of NUMO</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-6">
                  <p>
                    The NUMOracle Deck is born from profound esoteric discoveries. This lesson offers a glimpse into its
                    deeper spiritual architecture.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="mystery-1">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        6.1 Cosmic Patterns in Numbers
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <blockquote className="tutorial-blockquote">
                          "...embodiments of cosmic principles... These number pairs reveal a hidden symmetry,
                          suggesting that the number line encodes a deliberate system of metaphysical insight." - Raziel
                          Ali
                        </blockquote>
                        <p className="mt-2">
                          This means numbers act as "metaphysical markers," reflecting universal laws and occult
                          principles with precision.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mystery-2">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        6.2 The Two Danu Goddesses: A Universal Archetype
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-2">
                        <p>
                          NUMO's spiritual foundation links two powerful, geographically distinct goddesses named Danu:
                          the Celtic Goddess (Earth, creation) and the Indonesian Goddess (Water, cosmic order). Their
                          mythical children's gifts mirror NUMO's five suits.
                        </p>
                        <p>
                          Raziel Ali suggests this "enigmatic link... suggests a deeper, universal truth," pointing to a
                          universal Mother Archetype conveying fundamental truths.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mystery-3">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        6.3 Ancient Wisdom for a Modern Age
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        NUMO honors patterns from ancient Indo-Eastern scribes, bridging this encoded wisdom with modern
                        spiritual needs. This depth invites you to connect with a lineage of wisdom and interconnected
                        meaning.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mystery-4">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        6.4 The Role of Intuition with NUMO
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        While NUMO is a structured system, your intuition is a vital component. The cards and numbers
                        provide a framework; your inner wisdom helps personalize the message. Trust the feelings,
                        images, or thoughts that arise during a reading.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "lesson7" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Your First Steps & Daily Practice with NUMO</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-6">
                  <p>
                    With foundational knowledge, it's time for practical interaction. Divination is a skill developed
                    with practice and connection.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="practice-1">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        7.1 Mindset for Insightful Readings
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <ul className="list-disc list-inside space-y-1.5 pl-4 text-sm text-slate-400">
                          <li>
                            <strong>Center Yourself:</strong> Deep breaths, quiet mind.
                          </li>
                          <li>
                            <strong>Hold Intention/Question (Optional):</strong> Or be open to general guidance.
                          </li>
                          <li>
                            <strong>Be Receptive:</strong> Open heart and mind, ready for subtle or direct insights.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="practice-2">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        7.2 Daily One-Card Guidance
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2 space-y-3">
                        <p>
                          A one-card pull helps familiarize you with core energies. Click for a simulated daily insight
                          (uses a simplified internal card list for this example):
                        </p>
                        <div className="text-center my-4">
                          <Button onClick={drawDailyInsight} className="tutorial-button-primary px-6 py-2.5 text-md">
                            <Sparkles className="mr-2 h-4 w-4" /> Draw Daily Insight
                          </Button>
                        </div>
                        <div
                          id="daily-insight-display"
                          ref={dailyInsightDisplayRef}
                          className="tutorial-info-box space-y-1.5"
                          style={{ display: "none" }}
                        >
                          <h4 className="text-md font-semibold text-yellow-300">Your NUMO Insight:</h4>
                          <p
                            id="insight-card-name"
                            ref={insightCardNameElRef}
                            className="font-medium text-white text-sm"
                          ></p>
                          <p className="text-xs">
                            <strong className="text-purple-300">Core Energy:</strong>{" "}
                            <span
                              id="insight-card-meaning"
                              ref={insightCardMeaningElRef}
                              className="text-slate-300"
                            ></span>
                          </p>
                          <p className="text-xs">
                            <strong className="text-purple-300">Gift/Suit Context:</strong>{" "}
                            <span
                              id="insight-card-pairing-info"
                              ref={insightCardPairingInfoElRef}
                              className="text-slate-300"
                            ></span>
                          </p>
                          <hr className="border-slate-700/50 my-2" />
                          <p className="text-xs">
                            <strong className="text-purple-300">Reflection Prompt:</strong>{" "}
                            <span
                              id="insight-card-prompt"
                              ref={insightCardPromptElRef}
                              className="text-slate-400 italic"
                            ></span>
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="practice-3">
                      <AccordionTrigger className="hover:no-underline text-lg font-medium text-purple-300">
                        7.3 Journaling with NUMO
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pt-2">
                        <p>Keep a NUMO journal. For each reading or daily card:</p>
                        <ul className="list-disc list-inside pl-4 text-sm text-slate-500">
                          <li>Date and your question/intention.</li>
                          <li>The card(s) drawn and their key meanings (use the Card Directory for reference).</li>
                          <li>Your initial intuitive impressions.</li>
                          <li>How the card's message related to your day or situation.</li>
                          <li>Any patterns you notice over time.</li>
                        </ul>
                        <p>Journaling deepens your connection and tracks your growth.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {currentPageId === "conclusion" && (
              <Card className="tutorial-card">
                <CardHeader>
                  <CardTitle className="tutorial-title">Conclusion & Your Continued NUMO Journey</CardTitle>
                </CardHeader>
                <CardContent className="tutorial-content space-y-6">
                  <p className="text-md">
                    Congratulations! You've completed this comprehensive introduction to the NUMOracle Deck. You've
                    gained a solid foundation in a system rich with ancient wisdom and modern relevance.
                  </p>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">Key Learnings Recap:</h3>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-400">
                      <li>Core concepts: Symmetrical number pairings, Five Gifts of Danu.</li>
                      <li>Exploration of the NUMO Oracle cards via the interactive Card Directory.</li> {/* Updated */}
                      <li>The significance and interaction of the Five Elements.</li>
                      <li>Name Numerology basics (Pythagorean & Chaldean).</li>
                      <li>Fundamental reading techniques and question formulation.</li>
                      <li>NUMO's esoteric origins and the lore of Danu.</li>
                      <li>Practical first steps and journaling for daily practice.</li>
                    </ul>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-300 pt-4 border-t border-slate-700/50">
                    This is Just the Beginning...
                  </h3>
                  <p>
                    The true depth and transformative power of NUMO unfolds with continued study and practice. To deepen
                    your mastery, explore these invaluable resources by Raziel Ali:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400 text-sm">
                    <li>
                      The <strong>Full NUMO GuideBook (v5.6)</strong>: Your essential, exhaustive companion.
                    </li>
                    <li>
                      <strong>Advanced Numerology Studies</strong>: Comprehensive Chaldean & Pythagorean insights.
                    </li>
                    <li>
                      The <strong>Lore of Danu</strong> and related mystical traditions.
                    </li>
                    <li>
                      FREE AI Oracle at{" "}
                      <a
                        href="https://NumOracle.com" // Corrected link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tutorial-link"
                      >
                        NumOracle.com
                      </a>
                      .
                    </li>
                    <li>
                      NUMOracle Community on{" "}
                      <a
                        href="https://facebook.com/numocards" // Corrected link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tutorial-link"
                      >
                        Facebook
                      </a>
                      .
                    </li>
                    <li>Additional videos, tutorials, books, and articles.</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-purple-300 pt-4 border-t border-slate-700/50">
                    Practice Exercises:
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-4 text-sm text-slate-400">
                    <li>Perform a one-card daily draw for a week and journal your reflections.</li>
                    <li>Practice the three-card spread for simple questions.</li>
                    <li>Calculate the Name Numerology for friends or family (with permission) to see patterns.</li>
                    <li>Meditate on one of the Five Gifts, considering its numbers, element, and core theme.</li>
                    <li>Spend time browsing the Card Directory, focusing on one suit or element each day.</li>{" "}
                    {/* New exercise */}
                  </ul>
                  <p className="mt-4">
                    May your readings be insightful, your growth profound, and your connection to the universe ever
                    deepening. The wisdom of NUMO is now in your hands.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-between items-center p-3 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/80">
          <Button
            onClick={() => goToPage(pages[Math.max(0, currentPageIndex - 1)].id)}
            disabled={currentPageIndex === 0}
            variant="outline"
            className="tutorial-button-outline text-sm"
          >
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Previous
          </Button>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Section {currentPageIndex + 1} of {totalPages}
          </span>
          <Button
            onClick={() => goToPage(pages[Math.min(totalPages - 1, currentPageIndex + 1)].id)}
            disabled={currentPageIndex === totalPages - 1}
            className="tutorial-button-primary text-sm"
          >
            Next <ChevronRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

export default NumoTutorialPage
