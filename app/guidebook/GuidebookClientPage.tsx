"use client" // Added 'use client' directive

import { useState, useCallback } from "react" // Added useCallback
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Lock } from "lucide-react"
import { MembershipVerification } from "@/components/membership-verification"
import { useAuth } from "@/contexts/auth-context" // Added useAuth hook
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Added Accordion components
import { Label } from "@/components/ui/label" // Added Label component
import { Input } from "@/components/ui/input" // Added Input component
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table" // Added Table components
import { cn } from "@/lib/utils"

// Numerology values for calculators
const pythagoreanValues: { [key: string]: number } = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
}

// This is not used in the provided HTML but keeping for completeness if needed for Chaldean
const chaldeanValues: { [key: string]: number } = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
}

export default function GuidebookClientPage() {
  const { isAuthenticated, isMember } = useAuth() // Using useAuth for membership check
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // State for Life Path Calculator
  const [lpMonth, setLpMonth] = useState<number | "">("")
  const [lpDay, setLpDay] = useState<number | "">("")
  const [lpYear, setLpYear] = useState<number | "">("")
  const [lifePathResult, setLifePathResult] = useState<string>("")

  // State for Destiny Number Calculator
  const [destinyName, setDestinyName] = useState<string>("")
  const [destinyResult, setDestinyResult] = useState<string>("")

  const handleAccessClick = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
    }
  }

  // Utility function for numerology calculations
  const reduceNumber = useCallback((num: number): number => {
    let currentNum = num
    while (currentNum > 9 && currentNum !== 11 && currentNum !== 22 && currentNum !== 33) {
      currentNum = String(currentNum)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0)
    }
    return currentNum
  }, [])

  const calculateLifePath = useCallback(() => {
    const month = Number(lpMonth)
    const day = Number(lpDay)
    const year = Number(lpYear)

    if (isNaN(month) || isNaN(day) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) {
      setLifePathResult("Please enter a valid date.")
      return
    }

    const reducedMonth = reduceNumber(month)
    const reducedDay = reduceNumber(day)

    let yearSum = year
    while (yearSum > 9 && yearSum !== 11 && yearSum !== 22 && yearSum !== 33) {
      yearSum = String(yearSum)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0)
    }
    const reducedYear = yearSum

    const total = reducedMonth + reducedDay + reducedYear
    const lifePath = reduceNumber(total)

    setLifePathResult(`Your Life Path Number is: ${lifePath}`)
  }, [lpMonth, lpDay, lpYear, reduceNumber])

  const calculateDestiny = useCallback(() => {
    if (!destinyName) {
      setDestinyResult("Please enter a name.")
      return
    }

    const name = destinyName.toUpperCase()
    let totalSum = 0
    for (const char of name) {
      if (pythagoreanValues[char]) {
        totalSum += pythagoreanValues[char]
      }
    }

    const compoundNum = totalSum
    const destinyNumber = reduceNumber(totalSum)

    let resultText = `Your Destiny Number is: ${destinyNumber}`
    const significantCompoundNumbers = [11, 13, 14, 16, 19, 22, 33]
    if (significantCompoundNumbers.includes(compoundNum) && compoundNum !== destinyNumber) {
      // Check if compound is a master/karmic number AND different from final root
      resultText += ` (from significant Compound Number ${compoundNum})`
    }
    setDestinyResult(resultText)
  }, [destinyName, reduceNumber])

  // Teaser content for non-members, slightly modified to match existing
  const guidebookTeaser = (
    <div className="space-y-4">
      <p className="text-gray-300">
        The NUMO Oracle Guidebook is your essential companion to understanding and working with the NUMO Oracle Card
        Deck. This comprehensive guide includes:
      </p>
      <ul className="list-disc pl-6 text-gray-300 space-y-2">
        <li>Detailed interpretations of all 25 cards in the deck</li>
        <li>Explanation of the five sacred suits and their elemental associations</li>
        <li>Introduction to the numerological system behind the NUMO Oracle</li>
        <li>Sample readings and spread layouts</li>
        <li>And much more...</li>
      </ul>
      <p className="text-gray-300 italic mt-4">
        Become a member to access the complete guidebook and unlock the full potential of your NUMO Oracle Deck.
      </p>
    </div>
  )

  // Combined styling classes to match HTML's aesthetic where appropriate
  const sectionCardClasses = "bg-container-bg border border-border-color shadow-lg rounded-xl mb-8 font-body"
  const titleClasses = "font-serif text-heading"
  const subtitleClasses = "font-serif text-accent-gold"
  const bodyTextClasses = "text-text-main leading-relaxed"
  const linkClasses = "text-accent-gold hover:underline font-medium"
  const strongClasses = "text-text-heading font-semibold"
  const blockquoteClasses = "border-l-4 border-accent-gold pl-5 my-5 italic text-text-main"
  const calculatorBoxClasses = "bg-[#333] border border-border-color rounded-lg p-6 mt-5"
  const inputClasses =
    "w-full p-2.5 mb-4 rounded-md border border-border-color bg-[#444] text-text-main text-base focus:outline-none focus:border-accent-gold"
  const buttonClasses =
    "bg-accent-gold text-bg-dark px-5 py-3 border-none rounded-md cursor-pointer text-base font-semibold uppercase hover:bg-[#ffdf6c]"
  const resultClasses = "mt-4 text-lg font-bold text-accent-gold"
  const tableClasses = "w-full border-collapse mt-5 mb-5 text-sm"
  const thClasses = "border border-border-color p-2.5 text-center bg-[#333] text-accent-gold font-serif"
  const tdClasses = "border border-border-color p-2.5 text-center"
  const summaryClasses = "font-serif text-2xl font-semibold p-5 cursor-pointer outline-none relative text-heading"
  const detailsContentClasses = "p-0 pl-10 pb-6 pr-6" // Adjusted padding for list items
  const subHeadingClasses = "font-serif text-xl mt-6 mb-2"
  const subSubHeadingClasses = "font-serif text-lg mt-5 mb-1.5 text-text-main font-semibold"
  const tocClasses = "bg-[#333] p-5 rounded-md border border-border-color mb-10"

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-2">
          <span className="text-sm text-gray-400">by</span>
          <span className="ml-1 text-sm font-semibold tracking-wider text-white">KRAFTWERK NUMEROLOGY</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">NUMO Oracle </span>
          <span className="text-purple-400">Guidebook</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your comprehensive guide to understanding and working with the NUMO Oracle Card Deck.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden">
            <Image src="/open-book-knowledge.png" alt="NUMO Oracle Guidebook" fill className="object-cover" />
            {!isMember && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Lock className="h-16 w-16 text-purple-400 opacity-70" />
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <MembershipVerification teaser={guidebookTeaser}>
            {/* Start of new guidebook content, styled to match HTML */}
            <div className={cn("max-w-4xl mx-auto p-5 md:p-10", sectionCardClasses, "bg-container-bg")}>
              <div className="text-center py-10 md:py-16 bg-black text-heading rounded-t-lg border-b-2 border-accent-gold">
                <h1 className={cn("text-6xl md:text-7xl mb-0 tracking-widest", titleClasses)}>NUMO</h1>
                <h2 className={cn("text-3xl md:text-4xl mt-2 font-normal", titleClasses, "text-text-main")}>
                  Guidebook 6.0
                </h2>
              </div>

              <div className={cn("p-6", tocClasses)}>
                <h3 className={cn("text-2xl text-center mb-4", subtitleClasses)}>Table of Contents</h3>
                <ol className="list-decimal list-inside pl-4 space-y-2 text-text-main">
                  <li>
                    <Link href="#introduction-section" className={linkClasses}>
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch1" className={linkClasses}>
                      Chapter 1: The NUMO System Philosophy
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch2" className={linkClasses}>
                      Chapter 2: The Cards & Their Meanings
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch3" className={linkClasses}>
                      Chapter 3: Interpreting Elemental Layers
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch4" className={linkClasses}>
                      Chapter 4: Personalizing Readings with Numerology
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch5" className={linkClasses}>
                      Chapter 5: Advanced Reading Techniques
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch6" className={linkClasses}>
                      Chapter 6: Interpreting Compound Numbers
                    </Link>
                  </li>
                  <li>
                    <Link href="#ch7" className={linkClasses}>
                      Chapter 7: The Ethical Responsibilities of a Reader
                    </Link>
                  </li>
                </ol>
              </div>

              <Tabs defaultValue="introduction-section" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 mb-8 bg-slate-800/50 p-2 rounded-lg">
                  <TabsTrigger
                    value="introduction-section"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Introduction
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch1"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    System Philosophy
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch2"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Card Meanings
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch3"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Elemental Layers
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch4"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Personal Numerology
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch5"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Advanced Readings
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch6"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Compound Numbers
                  </TabsTrigger>
                  <TabsTrigger
                    value="ch7"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Ethical Reading
                  </TabsTrigger>
                  <TabsTrigger
                    value="download"
                    className="data-[state=active]:bg-purple-600/70 text-sm md:text-base px-2 py-1 md:px-4 md:py-2"
                  >
                    Download Options
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="introduction-section" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>Introduction</CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        The NUMOracle Deck is not just another divination tool; it is a powerful system designed to
                        harmonize ancient wisdom with modern insights, offering users a deeper understanding of
                        themselves and the universe around them. Created by visionary mystic Raziel Ali, this deck
                        weaves together the disciplines of numerology, astrology, and mystical traditions into a
                        comprehensive tool for spiritual exploration and self-discovery.
                      </p>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>What Makes the NUMOracle Deck Unique?</h4>
                      <ol className="list-decimal list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>Numerical Symmetry and Patterns:</strong> At the heart of
                          the NUMOracle Deck lies the discovery of symmetrical numerical patterns on the number line.
                          This discovery reveals the hidden relationships between numbers, energies, and cosmic forces.
                          The number pairings demonstrate the universal principle of duality—how opposites like creation
                          and destruction, expansion and contraction, attract and balance one another. This framework is
                          inspired by ancient Indo-Arabic and Pythagorean philosophies, which viewed numbers not as mere
                          quantities but as archetypal forces representing divine order.
                        </li>
                        <li>
                          <strong className={strongClasses}>Astrological Integration:</strong> Each card is imbued with
                          astrological energies, linking planetary archetypes to everyday life. Planets are not just
                          celestial bodies but represent fundamental psychological functions: Saturn embodies structure
                          and discipline; Venus governs love and harmony; Mars signifies action and desire; Pluto
                          represents deep transformation. Understanding these archetypes gives each card a rich,
                          multi-layered context for guidance.
                        </li>
                        <li>
                          <strong className={strongClasses}>Elemental Influences:</strong> The deck draws heavily on the
                          five classical elements—Earth, Air, Fire, Water, and Spirit (Aether). These are the
                          fundamental building blocks of existence. Earth represents the material world and grounding;
                          Air governs the intellect and communication; Fire is the force of passion and will; Water
                          rules the emotional and intuitive realms; and Spirit is the unifying life force that connects
                          all things.
                        </li>
                        <li>
                          <strong className={strongClasses}>Divine Connection to Danu:</strong> The Goddess Danu, a
                          central figure in both Celtic and Indonesian mythology, provides the spiritual foundation.
                          This remarkable parallel across cultures points to a universal Mother Archetype. The Celtic
                          Danu is the ancestral mother of the Tuatha Dé Danann, associated with the land, fertility, and
                          wisdom. The Balinese Dewi Danu is the supreme Water Goddess of Lake Batur, providing
                          life-giving irrigation and prosperity. Both are sources of life and abundance, and their
                          presence in the deck symbolizes the nurturing, creative power of the divine feminine.
                        </li>
                        <li>
                          <strong className={strongClasses}>Blending Modern and Ancient Practices:</strong> The
                          NUMOracle Deck bridges ancient mystical traditions with modern psychological and spiritual
                          insights. It makes the profound symbolism of numerology and astrology accessible and relevant
                          to contemporary life, offering a tool for self-discovery suitable for both seasoned
                          practitioners and those just beginning their spiritual journey.
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch1" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 1: The NUMO System Philosophy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        The NUMO system introduces a revolutionary understanding of numerology by pairing numbers based
                        on their visual, energetic, and symbolic properties. This system emphasizes how numbers are not
                        isolated entities but interrelated forces that create balance and transformation.
                      </p>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>
                        Visual Symbolism of the Number Pairings
                      </h4>
                      <ul className="list-disc list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>0 and 1 – The Cauldron:</strong> The primordial polarity of
                          Being and Non-Being. The <strong className={strongClasses}>0</strong> is the cosmic egg of
                          infinite potential; the <strong className={strongClasses}>1</strong> is the divine spark that
                          begins creation.
                        </li>
                        <li>
                          <strong className={strongClasses}>2 and 5 – The Sword:</strong> The relationship between
                          stasis and dynamics. The number <strong className={strongClasses}>2</strong> symbolizes
                          reflective harmony; the number <strong className={strongClasses}>5</strong> represents the
                          dynamic change necessary for growth.
                        </li>
                        <li>
                          <strong className={strongClasses}>3 and 8 – The Cord:</strong> The interplay between finite
                          creation and infinite cycles. The number <strong className={strongClasses}>3</strong> is the
                          spark of creative expression; the number <strong className={strongClasses}>8</strong> (the
                          lemniscate) is the symbol of eternity and karma.
                        </li>
                        <li>
                          <strong className={strongClasses}>4 and 7 – The Spear:</strong> The tension between material
                          structure and spiritual seeking. The number <strong className={strongClasses}>4</strong> is
                          earthly stability; the number <strong className={strongClasses}>7</strong> represents
                          introspection and reaching for higher wisdom.
                        </li>
                        <li>
                          <strong className={strongClasses}>6 and 9 – The Stone:</strong> The cycle of service and
                          release. The number <strong className={strongClasses}>6</strong> represents nurturing care;
                          the number <strong className={strongClasses}>9</strong> symbolizes completion and humanitarian
                          wisdom.
                        </li>
                      </ul>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>
                        The Five Gifts of Danu: The Thematic Suits
                      </h4>
                      <p>
                        The Goddess Danu provides the spiritual and mythological backbone for the five suits of the
                        deck. Each suit is one of her sacred gifts, representing an essential aspect of life.
                      </p>
                      <ul className="list-disc list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>The Cauldron (Fire):</strong> Symbolizing creation and
                          inspiration, this is the gift of new beginnings.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Sword (Water):</strong> Representing clarity that arises
                          from emotional depth, this is the gift of intuitive decision-making.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Spear (Air):</strong> Representing ambition and
                          strategy, this is the gift of purposeful action guided by intellect.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Stone (Earth):</strong> Symbolizing stability and
                          fulfillment, this is the gift of grounding and abundance.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Cord (Spirit):</strong> Representing connection and
                          destiny, this is the gift of understanding the threads of fate that connect all things.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch2" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 2: The Cards & Their Meanings
                      </CardTitle>
                      <CardDescription className={cn("text-sm", bodyTextClasses)}>
                        This chapter provides the detailed symbolic meanings for each of the primary cards in the
                        NUMOracle Deck. Each entry synthesizes the card's foundational numerology, astrology, and
                        elemental power. Click on any card title to expand its details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <Accordion type="single" collapsible className="w-full space-y-6">
                        {/* Card 0 Cauldron */}
                        <AccordionItem
                          value="card-0-cauldron"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.1: 0 Cauldron – The Cauldron of Creation
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 0 Cauldron card, paired with the 1 Cauldron, represents the first Gift of Danu, the
                              Cauldron of Creation. It embodies the number of infinite potential and the unmanifest
                              void. This card is ruled by the transformative power of{" "}
                              <strong className={strongClasses}>Pluto</strong> and the deep, mystical cycles of{" "}
                              <strong className={strongClasses}>Scorpio</strong>. Its core message is about the
                              alchemical process of creation that happens in the unseen depths, before anything becomes
                              tangible.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 0
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Cauldron
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Spirit
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Pluto – deep
                                transformation, inner renewal, and hidden power.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Scorpio – cycles
                                of death and rebirth, secrets, intensity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Pentagram
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Cooking
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Dot
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Fire
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 0</strong> – Symbol of unmanifest
                                potential—the infinite womb of all creation, representing the void from which all
                                possibilities emerge.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Cauldron):</strong> In its cooking orientation,
                                the cauldron stews possibility into reality, slowly combining all elements into creation
                                in a gentle, alchemical process.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Pentagram):</strong> Represents balance of the
                                five elements, symbolizing integration, protection, and harmony with the cosmos.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Cooking):</strong> Indicates that the
                                creation is in progress, highlighting a phase of internal development and careful
                                preparation.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Dot):</strong> The spark of
                                origin—the first point from which all things emerge. It is the singularity, the
                                concentrated seed of potential.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Pluto):</strong> Deep, transformative forces
                                working behind the scenes. Pluto governs the subconscious, dismantling old structures
                                and facilitating regeneration.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Scorpio):</strong> Reflects external themes
                                of rebirth, secrecy, and shedding of old layers, leading to profound healing and
                                empowerment.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Fire):</strong> The combustion of
                                Spirit and Water—the ignition of creation and passion. Fire is the activating principle
                                that turns inspiration into manifestation.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Creation in Progress:</strong> Energy is stirring, but
                                not yet ready to emerge. A nascent stage requiring further nurturing.
                              </li>
                              <li>
                                <strong className={strongClasses}>Alchemy and Transformation:</strong> Inner
                                metamorphosis is occurring beneath the surface, pointing to profound internal shifts and
                                healing.
                              </li>
                              <li>
                                <strong className={strongClasses}>Infinite Potential:</strong> Anything is possible, but
                                it must go through the fire of a necessary trial or purification.
                              </li>
                              <li>
                                <strong className={strongClasses}>Inner Depths:</strong> The process requires patience
                                and surrender to unseen forces, trusting the natural unfolding.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 1 Cauldron */}
                        <AccordionItem
                          value="card-1-cauldron"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.2: 1 Cauldron – The Cauldron of Manifestation
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 1 Cauldron is the dynamic counterpart to the 0. It represents the number of
                              individuality, action, and the first step of manifestation. This card is ruled by the
                              brilliant and life-giving <strong className={strongClasses}>Sun</strong> and the proud,
                              expressive energy of <strong className={strongClasses}>Leo</strong>. Where the 0 was
                              potential, the 1 is performance; it is the moment the contents of the Cauldron are poured
                              forth into the world with confidence and creative power.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 1
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Cauldron
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Fire
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Sun – creative
                                force, willpower, and illumination.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Leo – pride in
                                expression, creative passion, dramatic emergence.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Pentagram
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Pouring
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Plus Sign
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Fire
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 1</strong> – The number of individuality and
                                manifestation—initiation of purpose. It represents the first step, originality, and the
                                power of focused will.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Cauldron):</strong> Pouring forth its
                                contents—the creation is emerging. The vessel now actively releases what has been
                                brewing, an act of giving and outward expression.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Pentagram):</strong> Balanced elemental
                                structure driving harmonious emergence. The integrated elements provide a stable
                                foundation for the creative output.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Pouring):</strong> Indicates readiness to
                                act—release of the creation. A conscious decision to move from internal preparation to
                                external action.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Plus Sign):</strong> The crossroads
                                of action and potential—energy merging. The plus sign represents the intersection of
                                different planes or energies.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Sun):</strong> Drives inner willpower and
                                identity into radiance. The Sun provides vitality, confidence, and clarity of purpose.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Leo):</strong> External stage—performance,
                                confidence, leadership. Leo embodies the joy of self-expression and the courage to take
                                center stage.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Fire):</strong> Fire and Spirit
                                igniting the fires of birth and radiant will. Highlights pure, active, and enthusiastic
                                energy that fuels manifestation.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Manifestation in Motion:</strong> Pour your energy
                                into the world. A call to take deliberate action and share your unique contributions.
                              </li>
                              <li>
                                <strong className={strongClasses}>Personal Power:</strong> Lead the creation with your
                                fire. Embrace your innate abilities and willpower to direct the course of your
                                creations.
                              </li>
                              <li>
                                <strong className={strongClasses}>Creative Expression:</strong> Let your gifts be seen.
                                Do not hide your talents or insights. It is time to showcase what you have developed.
                              </li>
                              <li>
                                <strong className={strongClasses}>Action-Oriented:</strong> Time to execute what you've
                                been envisioning. Move beyond planning into the realm of doing.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 2 Sword */}
                        <AccordionItem
                          value="card-2-sword"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.3: 2 Sword – The Sword of Precision and Perception
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 2 Sword, paired with the 5 Sword, forms the Sword suit, representing the Gift of
                              Clarity. It embodies the reflective, balancing energy of the number 2. Ruled by the{" "}
                              <strong className={strongClasses}>Moon</strong> and the emotionally intelligent sign of{" "}
                              <strong className={strongClasses}>Cancer</strong>, this card's primary domain is not logic
                              alone, but perception that is deeply informed by intuition. It is about weighing choices
                              with a blend of mental and emotional insight before any decisive action is taken.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 2
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Sword
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Water
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Moon –
                                intuition, reflection, inner perception.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Cancer –
                                protection, emotional depth, caregiving.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Delta
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Point First
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Vesica Piscis
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Water
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 2</strong> – Duality, balance, and reflection.
                                Represents choices, partnerships, and the need to find equilibrium between opposing
                                forces.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Sword):</strong> The sword reflects clarity,
                                intellect, and decision-making, but here, its precision is guided by feeling as much as
                                logic.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Delta):</strong> The Greek symbol for
                                change—refinement through separation. It signifies a doorway or a point of transition.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Point First):</strong> Focused awareness
                                and precision. The sword is ready for careful, deliberate action, guided by sharp
                                perception.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Vesica Piscis):</strong> The divine
                                intersection—understanding through union. It symbolizes the meeting point of spirit and
                                matter.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Moon):</strong> Reflective depth,
                                changeability, and emotional navigation. The Moon governs intuition and the
                                subconscious.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Cancer):</strong> Emotional awareness
                                applied to outer security and nurturing. It brings a sensitive, empathetic quality to
                                perception.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Water):</strong> Water enhances
                                the sword's clarity by infusing emotional depth into logical discernment.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Focused Awareness:</strong> Seeing clearly without
                                reacting impulsively. Using both intellect and intuition to perceive the truth.
                              </li>
                              <li>
                                <strong className={strongClasses}>Emotional Intelligence:</strong> Understanding one's
                                own and others' inner worlds to make better decisions.
                              </li>
                              <li>
                                <strong className={strongClasses}>Hesitation with Purpose:</strong> A deliberate pause
                                to ensure that any decision made is well-informed and aligned with intuitive knowing.
                              </li>
                              <li>
                                <strong className={strongClasses}>Mental Alignment:</strong> The mind aligning with
                                emotional intuition, leading to choices that are both sound and soulful.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 3 Cord */}
                        <AccordionItem
                          value="card-3-cord"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.4: 3 Cord – The Cord of Purpose and Time
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 3 Cord, paired with the 8 Cord, forms the Cord suit, representing the Gift of
                              Connection to fate and destiny. This card embodies the creative, expansive energy of the
                              number 3. It is ruled by the benevolent planet{" "}
                              <strong className={strongClasses}>Jupiter</strong> and the philosophical sign of{" "}
                              <strong className={strongClasses}>Sagittarius</strong>. It speaks of a creative cycle
                              reaching a point of culmination, where the purpose of a particular life lesson or journey
                              is about to be revealed and understood within the grand flow of time.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 3
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Cord
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Fire
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Jupiter –
                                expansion, purpose, trust in time.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Sagittarius –
                                truth-seeking, life journey, philosophical freedom.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Hourglass
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Knot Before
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Finite Symbol
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Spirit
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 3</strong> – Completion of a small cycle—body,
                                mind, spirit. Represents initial synthesis, creativity, and expression.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Cord):</strong> Binds, restrains, or ends that
                                which must be sealed. It symbolizes connection, commitment, or the conclusion of a
                                phase.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Hourglass):</strong> Measures time,
                                inevitability, and clarity in limitation. It highlights cycles and deadlines.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Knot Before):</strong> Suggests the
                                binding is imminent—preparation for conclusion. Signifies commitment or a process being
                                secured.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Finite Symbol):</strong> The edge of
                                infinity-what is bounded must resolve. Refers to a closed loop where completion is
                                sought.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Jupiter):</strong> Inner expansion through
                                boundaries and endings. It ensures that an ending paves the way for greater
                                understanding.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Sagittarius):</strong> External
                                truth-seeking mission concluding a cycle. A journey of discovery reaching culmination.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Spirit):</strong> As the earthly
                                cycle completes, there's an opportunity for a release of energy to a higher level.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Countdown to Release:</strong> A lesson or binding is
                                reaching its final moment, preparing for a transition.
                              </li>
                              <li>
                                <strong className={strongClasses}>Truth Before Binding:</strong> A need to recognize
                                what must be seen before closure, acknowledging all truths and insights.
                              </li>
                              <li>
                                <strong className={strongClasses}>Purpose Realized:</strong> The result of your actions
                                must be accepted. It's time to own the outcomes and learn from them.
                              </li>
                              <li>
                                <strong className={strongClasses}>Time's End:</strong> A cycle completes, but a journey
                                continues inward. The internal process of integration carries on.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 4 Spear */}
                        <AccordionItem
                          value="card-4-spear"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.5: 4 Spear – The Spear of Drive and Direction
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 4 Spear, paired with the 7 Spear, forms the Spear suit, the Gift of Strength and
                              Guidance. This card embodies the stable, foundational energy of the number 4. It is
                              uniquely ruled by <strong className={strongClasses}>Uranus</strong>, the planet of
                              revolution, and its associated sign, <strong className={strongClasses}>Aquarius</strong>.
                              This brings a fascinating tension: the drive to build a solid, earthly foundation (4 and
                              Earth Base) that is simultaneously innovative, progressive, and geared toward a higher,
                              humanitarian vision.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 4
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Spear
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Earth
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Uranus –
                                revolution, innovation, and personal awakening.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Aquarius –
                                humanitarian focus, idealism, breaking tradition.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Direction Arrows
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Shaft First
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Ladder
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Air
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 4</strong> – Stability, foundation, the four
                                corners of effort and space. Represents structure, order, and building something
                                lasting.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Spear):</strong> A symbol of forward movement
                                and protection through assertion. It implies courage and a clear aim.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Direction Arrows):</strong> Symbolizes the many
                                directions our focus and purpose can take. Highlights choices in path and clear
                                guidance.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Shaft First):</strong> Emphasizes the
                                need to develop stable momentum and a strong inner stance, signifying thorough
                                preparation.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Ladder):</strong> Represents
                                ascension through structured effort. A symbol of step-by-step progress.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Uranus):</strong> Brings disruptive insight
                                and personal change, challenging the status quo with sudden breakthroughs.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Aquarius):</strong> Connects external
                                breakthroughs to idealistic purpose, championing progress and unconventional thinking.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Air):</strong> Air brings clarity
                                and momentum to the grounded Earth base, providing strategic thinking to propel
                                initiatives forward.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Drive With Vision:</strong> Structured energy moving
                                toward an ideal, combining motivation with a practical plan.
                              </li>
                              <li>
                                <strong className={strongClasses}>Foundation for Action:</strong> Building what will
                                carry the force forward by establishing a stable base and support structures.
                              </li>
                              <li>
                                <strong className={strongClasses}>Revolutionary Roots:</strong> A new direction built on
                                idealism and truth, encouraging breaking from outdated norms.
                              </li>
                              <li>
                                <strong className={strongClasses}>Strategic Advancement:</strong> A call to ground your
                                inspiration into method, transforming visionary ideas into actionable steps.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 5 Sword */}
                        <AccordionItem
                          value="card-5-sword"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.6: 5 Sword – The Sword of Power and Conflict
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              As the counterpart to the 2 Sword, the 5 Sword represents the active, disruptive, and
                              often conflict-driven energy of the number 5. It is ruled by the quick-witted planet{" "}
                              <strong className={strongClasses}>Mercury</strong> and the dualistic sign of{" "}
                              <strong className={strongClasses}>Gemini</strong>. This card speaks to the moment when
                              balance is broken, and change must be navigated through mental sharpness, communication,
                              and the force of ideas. It is the cutting edge of the Sword, used to sever ties or win a
                              debate.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 5
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Sword
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Earth
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Mercury –
                                communication, mental sharpness, adaptability.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Gemini – dual
                                perspectives, clever problem solving, sharp intellect.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Delta
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Edge First
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Fivefold Circles
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Water
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 5</strong> – Change, challenge, the turning
                                point that provokes growth. Represents instability, conflict, and the disruption of
                                equilibrium.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Sword):</strong> Conveys precision, cutting
                                through illusion or stagnation. In the context of 5, it highlights mental conflict,
                                debates, and difficult truths.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Delta):</strong> A symbol of forceful change and
                                active transformation, a gateway to a new state often passed through challenge.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Edge First):</strong> Reflects initiating
                                movement through force, often in conflict. Implies a confrontational stance.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Fivefold Circles):</strong>{" "}
                                Represents harmony in chaos. Suggests that even within conflict, an underlying order or
                                potential for new harmony exists.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Mercury):</strong> Speaks to swift action,
                                persuasion, and agility, bringing quick thinking and mental dexterity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Gemini):</strong> External engagement
                                through mental versatility. Excels at debate and can see multiple sides of an issue.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Water):</strong> Water tempers
                                the sword's force with adaptability and flow, enabling emotional resilience in
                                confrontation.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Power Through Speech:</strong> A situation may demand
                                clarity, assertion, or confrontation. Use your words carefully but decisively.
                              </li>
                              <li>
                                <strong className={strongClasses}>Conflict as Catalyst:</strong> Tension can lead to
                                needed movement. Disagreements, while uncomfortable, often highlight areas that require
                                change.
                              </li>
                              <li>
                                <strong className={strongClasses}>Mental Dexterity:</strong> Use adaptability and
                                cleverness to handle resistance. Approach challenges with a flexible and resourceful
                                mind.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sharp Direction:</strong> Know when to cut ties or
                                move forward with bold clarity. Sometimes resolution requires decisive action.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 6 Stone */}
                        <AccordionItem
                          value="card-6-stone"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.7: 6 Stone – The Stone of Foundation and Ritual
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 6 Stone, paired with the 9 Stone, forms the Stone suit, representing the Gift of
                              Stability. This card embodies the harmonious, nurturing, and responsible energy of the
                              number 6. It is ruled by <strong className={strongClasses}>Venus</strong>, the planet of
                              love and beauty, and the grounded, sensual sign of{" "}
                              <strong className={strongClasses}>Taurus</strong>. The 6 Stone speaks to creating harmony
                              in the material world through consistent care, ritual, and an appreciation for the simple,
                              sustaining beauty of life. It is the foundation of our physical and emotional well-being.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 6
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Stone
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Earth
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Venus – beauty,
                                receptivity, and embodied wisdom.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Taurus –
                                sensual-grounding, steady values, security.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Pentagon
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Rough Side
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Spiral
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Earth
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 6</strong> – Harmony through repetition,
                                balance, and organic growth. Represents reciprocity, community, family, and peaceful
                                coexistence.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Stone):</strong> The material realm, the body,
                                rituals, earth's memory. It connects to foundations, traditions, and physical
                                well-being.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Pentagon):</strong> Symbolizes the human form
                                and the material temple, representing the harmonious integration of elements within a
                                sacred space.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Rough Side):</strong> Roughness
                                represents rawness, potential, and growth through abrasion. It suggests foundations are
                                built through effort.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Spiral):</strong> Reflects growth,
                                cycles, and evolution through persistence. A universal symbol of continuous development
                                and deepening understanding.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Venus):</strong> Brings beauty, receptivity,
                                and sensual expression, encouraging the creation of a pleasant and nurturing
                                environment.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Taurus):</strong> Externalizes comfort,
                                stability, and persistent building. It seeks security in the material world and values
                                dependability.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Earth):</strong> Earth reinforces
                                stability and grounding, deepening the bond between physical ritual and long-lasting
                                structure.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Rituals of Becoming:</strong> Establish patterns that
                                shape who you're becoming. The power of consistent practices to build character.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Groundwork:</strong> Root in what nourishes and
                                sustains you. Connect with core elements that provide fundamental support.
                              </li>
                              <li>
                                <strong className={strongClasses}>Embodied Cycles:</strong> Growth takes time—trust
                                organic rhythms. True development unfolds naturally; patience is key.
                              </li>
                              <li>
                                <strong className={strongClasses}>Earth as Teacher:</strong> The path of grounded wisdom
                                begins in the body. Practical experience and connection to nature offer profound
                                lessons.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 7 Spear */}
                        <AccordionItem
                          value="card-7-spear"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.8: 7 Spear – The Spear of Intuition and Service
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 7 Spear is the mystical counterpart to the 4 Spear. It represents the introspective,
                              spiritual, and mysterious energy of the number 7. Ruled by the ethereal planet{" "}
                              <strong className={strongClasses}>Neptune</strong> and the compassionate sign of{" "}
                              <strong className={strongClasses}>Pisces</strong>, this card is about directing one's will
                              not through force, but through profound intuition, empathy, and a connection to unseen
                              truths. It is the Spear aimed in service of a higher, spiritual, or compassionate cause.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 7
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Spear
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Air
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Neptune –
                                dreamlike guidance, spiritual defense, and inner clarity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Pisces –
                                empathy-driven service, defending those unseen, romantic sensitivity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Direction Arrows
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Point First
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Chevron
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Air
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 7</strong> – Mystery, inner knowledge,
                                spiritual vision. Represents introspection, wisdom gained through solitude, and a quest
                                for deeper understanding.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Spear):</strong> Symbol of proactive force and
                                chosen direction. The spear's aim is guided by inner wisdom towards a higher purpose.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Direction Arrows):</strong> Suggests attunement
                                to inner guidance through movement. Action should follow subtle cues and the internal
                                compass.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Point First):</strong> Directs action
                                guided by feeling and subtle knowing. Precision comes from a deep, intuitive sense of
                                rightness.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Chevron):</strong> Represents
                                directional clarity and sacred alignment. A strong directional marker for a focused,
                                upward movement.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Neptune):</strong> Connects you to subtle
                                truths and intuitive flow, dissolving boundaries and opening channels to psychic
                                awareness.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Pisces):</strong> Brings empathy,
                                receptivity, and imagination to the external journey, serving others through intuitive
                                understanding.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Air):</strong> Air inspires the
                                spear's focus with creative insight, facilitating clear communication and intellectual
                                agility in acts of service.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Guided Service:</strong> Let higher intuition shape
                                your efforts. Allow dreams and spiritual insights to direct how you help others.
                              </li>
                              <li>
                                <strong className={strongClasses}>Inspired Defenses:</strong> Protecting others may
                                require imagination and sensitivity. Employ empathy and creative problem-solving.
                              </li>
                              <li>
                                <strong className={strongClasses}>Spiritual Targeting:</strong> Aim your will at what
                                only you can see. Direct your focus towards goals revealed through your unique
                                perception.
                              </li>
                              <li>
                                <strong className={strongClasses}>Fluid Precision:</strong> Act on subtle truths with
                                clarity and compassion. Combine sharp insight with a gentle, understanding approach.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 8 Cord */}
                        <AccordionItem
                          value="card-8-cord"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.9: 8 Cord – The Cord of Binding and Resolution
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              As the powerful counterpart to the 3 Cord, the 8 Cord embodies the energy of karmic
                              return, mastery, and resolution. The number 8 is deeply connected to universal law. This
                              card is ruled by <strong className={strongClasses}>Saturn</strong>, the great teacher and
                              lord of karma, and the ambitious, structured sign of{" "}
                              <strong className={strongClasses}>Capricorn</strong>. It signifies a point where long-term
                              efforts culminate, debts are paid, and one must take responsibility for the structures
                              they have built over time. It is the final knotting of a karmic thread.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 8
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Cord
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Spirit
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Saturn –
                                responsibility, karmic patterns, mastery through boundaries.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Capricorn –
                                structure, long-term goals, integrity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Hourglass
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Knot Away
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Infinity Symbol
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Spirit
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 8</strong> – Karmic return, balance of effort,
                                cycles of resolution. Represents cause and effect, power, and balancing material and
                                spiritual realms.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Cord):</strong> Represents connections, bonds,
                                and energetic ties. Symbolizes commitments or links that are now up for review or
                                resolution.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Hourglass):</strong> Measures time,
                                inevitability, and clarity in limitation. It highlights cycles, deadlines, and the
                                importance of using time wisely.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Knot Away):</strong> Something may be
                                sealed, finished, or removed from current influence. A deliberate act of concluding or
                                releasing.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Infinity Loop):</strong> Represents
                                eternal return, looping timelines, or continuous connection. Highlights that resolutions
                                often lead to new beginnings.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Saturn):</strong> Speaks to long-term
                                structure, karmic duty, and life's harder lessons. It brings discipline, responsibility,
                                and mastery.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Capricorn):</strong> Grounded ambition,
                                duty, and achievement. Strives for tangible accomplishments through hard work and
                                strategic planning.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Spirit):</strong> Spirit weaves
                                through bonds, elevating connections beyond the material to reveal karmic lessons and
                                soul-level integration.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Closure and Finality:</strong> Tied energy has reached
                                its endpoint. A cycle of effort or a relationship is coming to a definitive conclusion.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Obligation:</strong> A contract must be
                                honored—or ended with care. Commitments require fulfillment or a conscious dissolution.
                              </li>
                              <li>
                                <strong className={strongClasses}>Mastery Through Boundaries:</strong> Limits clarify
                                power. Working within defined structures can lead to greater focus and strength.
                              </li>
                              <li>
                                <strong className={strongClasses}>Fated Resolution:</strong> Karmic threads are being
                                woven or cut. Events unfold that seem destined, bringing resolution to long-standing
                                issues.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Card 9 Stone */}
                        <AccordionItem
                          value="card-9-stone"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              2.10: 9 Stone – The Stone of Witness and Completion
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              The 9 Stone is the culmination of the Stone suit, representing the wisdom of completion
                              that comes from the number 9. It is ruled by the assertive energy of{" "}
                              <strong className={strongClasses}>Mars</strong> and the pioneering spirit of{" "}
                              <strong className={strongClasses}>Aries</strong>. This card signifies the final stage of a
                              material or foundational journey. It is not just about having built something (like in the
                              6 Stone), but about having the wisdom and courage to witness its completion, protect its
                              legacy, and courageously initiate the next cycle by letting go with honor.
                            </p>
                            <h5 className={cn(subSubHeadingClasses)}>Symbols:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number:</strong> 9
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit:</strong> Stone
                              </li>
                              <li>
                                <strong className={strongClasses}>Element (Base):</strong> Air
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Internal Influence):</strong> Mars –
                                assertion, willpower, protection.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (External Domain):</strong> Aries –
                                courageous movement, initiating closure, leading through resolve.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon:</strong> Pentagon
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation:</strong> Smooth Side
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry:</strong> Eye
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element:</strong> Earth
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Symbolism Breakdown:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Number: 9</strong> – Completion, spiritual wisdom,
                                closure. Represents the culmination of a cycle, attainment, and humanitarianism.
                              </li>
                              <li>
                                <strong className={strongClasses}>Suit (Stone):</strong> The physical, ritual witness,
                                the stone of remembrance. A tangible marker of the journey's end and the wisdom
                                consolidated.
                              </li>
                              <li>
                                <strong className={strongClasses}>Icon (Pentagon):</strong> Symbolizes the human form
                                and the material temple. Represents the harmonious integration of elements in a sacred
                                space.
                              </li>
                              <li>
                                <strong className={strongClasses}>Orientation (Smooth Side):</strong> Completion and
                                ease—what has been shaped can now be released. Indicates the work is done with a sense
                                of peace.
                              </li>
                              <li>
                                <strong className={strongClasses}>Sacred Geometry (Eye):</strong> Symbol of clear
                                knowing, sacred witness, and divine attention. Signifies enlightenment and the ability
                                to see things as they truly are.
                              </li>
                              <li>
                                <strong className={strongClasses}>Planet (Mars):</strong> Brings energy to assert
                                finality or protection. Provides the courage to definitively conclude matters.
                              </li>
                              <li>
                                <strong className={strongClasses}>Astrology (Aries):</strong> Direct action, courage,
                                and leadership in ending cycles. Applied to courageously finalizing a chapter.
                              </li>
                              <li>
                                <strong className={strongClasses}>Synergistic Element (Earth):</strong> Where Air
                                unveils patterns, Earth gives them substance, grounding insights into tangible
                                understanding.
                              </li>
                            </ul>
                            <h5 className={cn(subSubHeadingClasses)}>Key Meanings:</h5>
                            <ul className="list-disc list-inside pl-4 space-y-1">
                              <li>
                                <strong className={strongClasses}>Completion With Honor:</strong> What was built can now
                                be let go. Acknowledge accomplishments with grace and integrity.
                              </li>
                              <li>
                                <strong className={strongClasses}>Witness to the Journey:</strong> Acknowledge what has
                                been seen and learned. A time for deep understanding of the path traveled.
                              </li>
                              <li>
                                <strong className={strongClasses}>Spiritual Protection:</strong> Guard sacred truths and
                                endings. Preserve the wisdom acquired and ensure the closure process is respected.
                              </li>
                              <li>
                                <strong className={strongClasses}>Release With Awareness:</strong> Let go, but let it
                                teach you. Consciously release people, situations, or beliefs, carrying the lessons
                                forward.
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch3" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 3: Interpreting Elemental Layers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        One of the most advanced features of the NUMOracle Deck is its use of multiple elemental layers.
                        Understanding how these layers interact provides a profoundly nuanced reading. Each card has
                        three potential elemental influences: the inherent{" "}
                        <strong className={strongClasses}>Base Element</strong>, the supportive{" "}
                        <strong className={strongClasses}>Synergistic Element</strong>, and the variable{" "}
                        <strong className={strongClasses}>Drawn Element (or Elemental Accent)</strong>, which is
                        indicated by the color of the central icon on the card you draw.
                      </p>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>The Three Elemental Layers Defined</h4>
                      <ol className="list-decimal list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>The Base Element:</strong> This is the card's fundamental,
                          unchanging nature. It defines the core domain of the card's energy. Think of it as the
                          &quot;subject&quot; of the sentence—<strong className={strongClasses}>what</strong> the card
                          is fundamentally about. For example, the Base Element of the 2 Sword is{" "}
                          <strong className={strongClasses}>Water</strong>, meaning the card is always, at its core,
                          about emotional balance, intuition, and reflection.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Synergistic Element:</strong> This is a secondary
                          inherent element that supports, enhances, or modifies the Base Element. It adds a specific
                          flavor or depth to the card's core theme, acting like an &quot;adjective.&quot; For the 2
                          Sword, the Synergistic Element is also <strong className={strongClasses}>Water</strong>,
                          powerfully deepening its focus on emotional intelligence and intuitive depth.
                        </li>
                        <li>
                          <strong className={strongClasses}>The Drawn Element (Elemental Accent):</strong> This is the
                          most dynamic layer. Indicated by the color of the central icon, this element represents the
                          *situational lens* through which the card's core message is being experienced. It answers the
                          question of &quot;how&quot; or &quot;where&quot; the core theme is manifesting. It modifies
                          the reading without changing the card's fundamental nature.
                        </li>
                      </ol>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>
                        How to Synthesize the Elements: A Step-by-Step Guide
                      </h4>
                      <p>To create a layered interpretation, follow these steps:</p>
                      <ol className="list-decimal list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>
                            Identify the Core Theme (Base + Synergistic Elements):
                          </strong>{" "}
                          First, establish the card's foundational meaning. What is its unchangeable subject?
                        </li>
                        <li>
                          <strong className={strongClasses}>Identify the Situational Flavor (Drawn Element):</strong>{" "}
                          Look at the color of the icon. What element does it represent? This tells you how the core
                          theme is currently manifesting.
                        </li>
                        <li>
                          <strong className={strongClasses}>Synthesize the Meaning:</strong> Combine the core theme with
                          the situational flavor. Ask: &quot;How is the Drawn Element influencing the Base and
                          Synergistic Elements right now?&quot;
                        </li>
                      </ol>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Examples in Practice</h4>
                      <h5 className={cn(subSubHeadingClasses)}>
                        Example 1: 2 Sword (Water Base) with an Air (Yellow) Accent
                      </h5>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>
                          <strong className={strongClasses}>Core Theme (Water):</strong> The fundamental issue is one of
                          deep emotional balance, reflection, and intuition. You are facing a choice that requires
                          emotional intelligence.
                        </li>
                        <li>
                          <strong className={strongClasses}>Situational Flavor (Air):</strong> The current energy
                          influencing this situation is Air—intellect, communication, analysis, and rational thought.
                        </li>
                        <li>
                          <strong className={strongClasses}>Synthesized Interpretation:</strong>
                          <blockquote className={blockquoteClasses}>
                            You are facing a deeply emotional decision (Water), but you are trying to approach it with
                            your mind (Air). There is a conflict between what you feel and what you think. The guidance
                            of this card, with this specific elemental accent, is to use the clarity of Air not to
                            overrule your feelings, but to *understand* and articulate them, aligning thought with
                            intuition.
                          </blockquote>
                        </li>
                      </ul>

                      <h5 className={cn(subSubHeadingClasses)}>
                        Example 2: 1 Cauldron (Fire Base) with a Water (Blue) Accent
                      </h5>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>
                          <strong className={strongClasses}>Core Theme (Fire):</strong> The fundamental subject is
                          manifestation, action, personal power, and creative expression. The querent feels a drive to
                          act and create something new.
                        </li>
                        <li>
                          <strong className={strongClasses}>Situational Flavor (Water):</strong> The current energy is
                          Water—emotions, intuition, and flow.
                        </li>
                        <li>
                          <strong className={strongClasses}>Synthesized Interpretation:</strong>
                          <blockquote className={blockquoteClasses}>
                            Your drive to manifest (Fire) is currently being filtered through your emotions (Water).
                            Your passion might feel dampened by uncertainty, or your actions may need to be guided by
                            your intuition rather than pure willpower. This isn't a halt, but a call to ensure your
                            creative actions are emotionally authentic. Are you pouring your heart into this, or are
                            your emotions making you hesitant to act?
                          </blockquote>
                        </li>
                      </ul>

                      <h5 className={cn(subSubHeadingClasses)}>
                        Example 3: 6 Stone (Earth Base) with an Air (Yellow) Accent
                      </h5>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>
                          <strong className={strongClasses}>Core Theme (Earth):</strong> The fundamental issue is about
                          material stability, grounding, daily rituals, and physical well-being. The focus is on the
                          tangible foundations of life.
                        </li>
                        <li>
                          <strong className={strongClasses}>Situational Flavor (Air):</strong> The current energy is
                          Air—intellect, planning, communication, and new ideas.
                        </li>
                        <li>
                          <strong className={strongClasses}>Synthesized Interpretation:</strong>
                          <blockquote className={blockquoteClasses}>
                            Your focus is on practical stability (Earth), but the situation is being influenced by new
                            ideas or communication (Air). This could mean it&apos;s time to create a budget (Air +
                            Earth), discuss household responsibilities (Air + Earth), or think strategically about your
                            health routines. It advises using your intellect to organize and improve your material
                            foundations.
                          </blockquote>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch4" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 4: Personalizing Readings with Numerology
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        Beyond the universal meanings of the cards, the NUMOracle system is designed to resonate deeply
                        with the querent&apos;s personal energetic blueprint. By calculating and understanding a few key
                        numbers from their life, you can unlock a powerful layer of personalization in every reading.
                      </p>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Calculating Your Core Numbers</h4>
                      <p>
                        Two of the most important numbers are the Life Path Number (from your birth date) and the
                        Destiny Number (from your birth name).
                      </p>

                      <div className={calculatorBoxClasses}>
                        <h4 className={cn("text-2xl", subHeadingClasses, "mt-0")}>Life Path Calculator</h4>
                        <p>
                          Your Life Path Number represents the primary journey and lessons of your life. Enter your
                          birth date below.
                        </p>
                        <Label htmlFor="lp_month" className="block mb-2 font-semibold text-text-main">
                          Month (1-12):
                        </Label>
                        <Input
                          type="number"
                          id="lp_month"
                          min="1"
                          max="12"
                          placeholder="e.g., 4"
                          value={lpMonth}
                          onChange={(e) => setLpMonth(Number(e.target.value) || "")}
                          className={inputClasses}
                        />
                        <Label htmlFor="lp_day" className="block mb-2 font-semibold text-text-main">
                          Day (1-31):
                        </Label>
                        <Input
                          type="number"
                          id="lp_day"
                          min="1"
                          max="31"
                          placeholder="e.g., 15"
                          value={lpDay}
                          onChange={(e) => setLpDay(Number(e.target.value) || "")}
                          className={inputClasses}
                        />
                        <Label htmlFor="lp_year" className="block mb-2 font-semibold text-text-main">
                          Year (YYYY):
                        </Label>
                        <Input
                          type="number"
                          id="lp_year"
                          placeholder="e.g., 1988"
                          value={lpYear}
                          onChange={(e) => setLpYear(Number(e.target.value) || "")}
                          className={inputClasses}
                        />
                        <Button onClick={calculateLifePath} className={buttonClasses}>
                          Calculate Life Path
                        </Button>
                        <div className={resultClasses}>{lifePathResult}</div>
                      </div>

                      <div className={calculatorBoxClasses}>
                        <h4 className={cn("text-2xl", subHeadingClasses, "mt-0")}>Destiny Number Calculator</h4>
                        <p>
                          Your Destiny Number reveals your talents and potential. Enter your full birth name as it
                          appears on your birth certificate.
                        </p>
                        <Table className={tableClasses}>
                          <TableHeader>
                            <TableRow>
                              <TableHead className={thClasses}>1</TableHead>
                              <TableHead className={thClasses}>2</TableHead>
                              <TableHead className={thClasses}>3</TableHead>
                              <TableHead className={thClasses}>4</TableHead>
                              <TableHead className={thClasses}>5</TableHead>
                              <TableHead className={thClasses}>6</TableHead>
                              <TableHead className={thClasses}>7</TableHead>
                              <TableHead className={thClasses}>8</TableHead>
                              <TableHead className={thClasses}>9</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className={tdClasses}>A</TableCell>
                              <TableCell className={tdClasses}>B</TableCell>
                              <TableCell className={tdClasses}>C</TableCell>
                              <TableCell className={tdClasses}>D</TableCell>
                              <TableCell className={tdClasses}>E</TableCell>
                              <TableCell className={tdClasses}>F</TableCell>
                              <TableCell className={tdClasses}>G</TableCell>
                              <TableCell className={tdClasses}>H</TableCell>
                              <TableCell className={tdClasses}>I</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={tdClasses}>J</TableCell>
                              <TableCell className={tdClasses}>K</TableCell>
                              <TableCell className={tdClasses}>L</TableCell>
                              <TableCell className={tdClasses}>M</TableCell>
                              <TableCell className={tdClasses}>N</TableCell>
                              <TableCell className={tdClasses}>O</TableCell>
                              <TableCell className={tdClasses}>P</TableCell>
                              <TableCell className={tdClasses}>Q</TableCell>
                              <TableCell className={tdClasses}>R</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={tdClasses}>S</TableCell>
                              <TableCell className={tdClasses}>T</TableCell>
                              <TableCell className={tdClasses}>U</TableCell>
                              <TableCell className={tdClasses}>V</TableCell>
                              <TableCell className={tdClasses}>W</TableCell>
                              <TableCell className={tdClasses}>X</TableCell>
                              <TableCell className={tdClasses}>Y</TableCell>
                              <TableCell className={tdClasses}>Z</TableCell>
                              <TableCell className={tdClasses}></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <Label htmlFor="destiny_name" className="block mb-2 font-semibold text-text-main">
                          Full Birth Name:
                        </Label>
                        <Input
                          type="text"
                          id="destiny_name"
                          placeholder="Enter Full Name"
                          value={destinyName}
                          onChange={(e) => setDestinyName(e.target.value)}
                          className={inputClasses}
                        />
                        <Button onClick={calculateDestiny} className={buttonClasses}>
                          Calculate Destiny Number
                        </Button>
                        <div className={resultClasses}>{destinyResult}</div>
                      </div>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>
                        How to Integrate Personal Numbers in a Reading
                      </h4>
                      <p>
                        Knowing a querent&apos;s core numbers transforms a reading from a general forecast to a personal
                        dialogue. It reveals two key dynamics: <strong className={strongClasses}>Resonance</strong> and{" "}
                        <strong className={strongClasses}>Tension</strong>.
                      </p>

                      <h5 className={cn(subSubHeadingClasses)}>Resonance: When the Cards Align with Your Path</h5>
                      <p>
                        When a querent draws a card whose number matches their Life Path or Destiny Number, the message
                        is amplified. It signifies that the card&apos;s theme is a central, powerful force in their life
                        at that moment, directly related to their core purpose.
                      </p>
                      <blockquote className={blockquoteClasses}>
                        <strong className={strongClasses}>Example of Resonance:</strong> Alex, with a Life Path 9, draws
                        the <strong className={strongClasses}>9 Stone (Witness and Completion)</strong>. This is a
                        powerful confirmation. The reading isn&apos;t just about general completion; it&apos;s about a
                        completion that is fundamental to Alex&apos;s soul journey of humanitarianism, wisdom, and
                        letting go. The message is: &quot;Pay close attention. This event is a core part of who you are
                        and what you came here to learn.&quot;
                      </blockquote>

                      <h5 className={cn(subSubHeadingClasses)}>Tension: When the Cards Challenge Your Path</h5>
                      <p>
                        When a querent draws a card whose number represents a conflicting energy to their core numbers,
                        it highlights a key area of challenge, growth, and learning. It shows where the universe is
                        pushing them outside their comfort zone to create greater balance.
                      </p>
                      <blockquote className={blockquoteClasses}>
                        <strong className={strongClasses}>Example of Tension:</strong> Our same Alex with a Life Path 9
                        (completion, wisdom) draws the{" "}
                        <strong className={strongClasses}>1 Cauldron (Manifestation)</strong>. The 1&apos;s energy of
                        new beginnings, ego, and individuality is in direct tension with the 9&apos;s energy of endings
                        and collective service. The reading becomes about a specific challenge: &quot;How can you start
                        something new (1) while honoring the wisdom of what you need to complete (9)? You are being
                        asked to balance individual ambition with your higher purpose of service.&quot;
                      </blockquote>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch5" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 5: Advanced Reading Techniques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        Beyond layering personal numbers and elements, advanced readings involve recognizing patterns
                        across multiple cards and using specialized spreads. This chapter introduces concepts to deepen
                        your interpretive skills.
                      </p>
                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Interpreting Patterns</h4>
                      <p>
                        Patterns reveal repeating themes and deeper lessons. Repeating numbers (e.g., multiple 5s)
                        indicate a major period of change. Repeating elements (e.g., several Fire cards) suggest a time
                        of intense action and ambition. Notice clashes as well: multiple Fire and Water cards together
                        can indicate a deep internal conflict between passion and emotion.
                      </p>
                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Thematic Readings</h4>
                      <p>
                        Focus on overarching life themes by adapting card interpretations. In a love reading, Cauldron
                        cards carry more weight. In a career reading, Spear and Stone suits are more significant. Always
                        ask how the card&apos;s energy applies specifically to the context of the question.
                      </p>
                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Incorporating Compound Numbers</h4>
                      <p>
                        One of the most powerful advanced techniques is to look at the Compound Number a querent&apos;s
                        name or birth date creates before it is reduced. This number reveals a hidden karmic lesson or
                        life path influence, as detailed in the next chapter.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch6" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 6: Interpreting Compound Numbers
                      </CardTitle>
                      <CardDescription className={cn("text-sm", bodyTextClasses)}>
                        While single-digit numbers provide the foundation, Compound Numbers (10 and above) reveal the
                        hidden influences, karmic lessons, and deeper spiritual paths affecting the querent&apos;s life.
                        They add a layer of complexity and depth that should not be overlooked by simply reducing them
                        to their root number.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <Accordion type="single" collapsible className="w-full space-y-6">
                        {/* Compound Number 10 */}
                        <AccordionItem
                          value="comp-10"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              10: The Wheel of Fortune
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> Represents constant change, cycles
                              of rise and fall, and the turning of destiny. It is a sign that one&apos;s plans are
                              likely to be carried out, but there&apos;s an inherent unpredictability to outcomes, as
                              external forces are at play. The karmic lesson is to embrace change and adapt, trusting
                              the larger cycles of life.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 11 */}
                        <AccordionItem
                          value="comp-11"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              11: Clenched Hand, Lion Muzzled
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This is a powerful Master Number
                              but also a number of trial and testing. It serves as a warning of hidden dangers,
                              deception, or betrayal from unexpected sources. The karmic lesson is to develop profound
                              intuition and spiritual awareness to see beyond surface appearances and trust one&apos;s
                              inner voice above all else.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 12 */}
                        <AccordionItem
                          value="comp-12"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>12: The Sacrifice</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This number symbolizes the pain of
                              being a victim of others&apos; plans or societal pressures. It is associated with
                              self-sacrifice and the anxiety of surrendering one&apos;s will to a higher cause or to the
                              demands of others. The karmic lesson is to learn to set boundaries and find strength in
                              surrendering to a higher spiritual purpose, rather than to the whims of others.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 13 */}
                        <AccordionItem
                          value="comp-13"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              13: Skeleton (Upheaval)
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> Often misunderstood as
                              &quot;unlucky,&quot; 13 is a number of profound transformation through destruction. It
                              represents upheaval and the tearing down of old structures to make way for the new. This
                              change is inevitable and powerful. The karmic lesson is to learn adaptability and to
                              embrace destruction as a necessary part of rebirth and regeneration.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 14 */}
                        <AccordionItem
                          value="comp-14"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              14: Combination of People and Things
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This number indicates risk and
                              change driven by external forces, both human and natural. It warns of potential
                              disruptions from speculation, business dealings, or even environmental events. The karmic
                              lesson is about learning moderation, adaptability, and emotional control in the face of
                              unpredictable circumstances.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 15 */}
                        <AccordionItem
                          value="comp-15"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>15: The Magician</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> A number of deep occult
                              significance, tied to mystery, magic, and charisma. It bestows a powerful ability to
                              manifest desires and influence others, often leading to material success. However, its
                              karmic lesson is to beware the temptation to use this power for selfish or negative ends,
                              as it can bind the user to dark forces.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 16 */}
                        <AccordionItem
                          value="comp-16"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              16: The Tower Struck by Lightning
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> One of the most challenging
                              numbers, it warns of sudden danger, accidents, or the complete defeat of one&apos;s plans.
                              It represents a fall from grace, often due to ego, hubris, or faulty planning. The karmic
                              lesson is profound: one must learn humility and rebuild on a more spiritual and authentic
                              foundation after the inevitable collapse.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 17 */}
                        <AccordionItem
                          value="comp-17"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>17: Star of Venus</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> A highly spiritual and fortunate
                              number, representing peace, hope, and spiritual attainment. It signifies that one can rise
                              above trials and find success through spiritual perseverance. Its karmic lesson is to
                              maintain faith and trust in the flow of the universe, as one&apos;s spirit is being guided
                              toward its immortal purpose.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 18 */}
                        <AccordionItem
                          value="comp-18"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>18: Gray Moon</h4>
                          </AccordionTrigger>
                        </AccordionItem>
                        {/* Compound Number 19 */}
                        <AccordionItem
                          value="comp-19"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              19: The Sun (The Prince of Heaven)
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> An exceptionally fortunate number,
                              bringing happiness, success, honor, and the realization of one&apos;s potential. It is the
                              number of victory. The karmic lesson is that this success is earned through past
                              struggles, and one must use their success to bring light and joy to others, avoiding pride
                              and selfishness.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 20 */}
                        <AccordionItem
                          value="comp-20"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              20: Awakening (Judgment)
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> Represents a call to action from a
                              higher plane. It signals a period of awakening where one must face their judgments and
                              rise to their full potential. While it can bring delays as one integrates new awareness,
                              the karmic lesson is to answer the call, embrace new purpose, and let go of the past.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 21 */}
                        <AccordionItem
                          value="comp-21"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>21: The Universe</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> The number of ultimate victory
                              after a long test. It symbolizes success, completion, and the successful integration of a
                              significant life lesson. The karmic lesson is one of attainment and earned reward; the
                              querent has mastered a cycle and is ready to ascend to a new level of being.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 22 */}
                        <AccordionItem
                          value="comp-22"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>22: Good Man Blinded</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This Master Number holds immense
                              potential but carries a warning of illusion and false judgment. It represents the danger
                              of living in a fool&apos;s paradise, ignoring reality until it is too late. The karmic
                              lesson is to develop practical wisdom, face the truth even when it&apos;s unpleasant, and
                              avoid being misled by bad advice or wishful thinking.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 23 */}
                        <AccordionItem
                          value="comp-23"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              23: Royal Star of the Lion
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This is a highly favorable number
                              promising success and help from those in high positions. It grants protection, favor from
                              superiors, and ensures a positive outcome for endeavors. It suggests that leadership and
                              ambition will be rewarded.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 24 */}
                        <AccordionItem
                          value="comp-24"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              24: Gain through Love and Rank
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This number signals gain and
                              advantage through relationships, partnerships, and romance. It indicates that forming
                              strong alliances and cultivating love will lead to material and social advancement. It is
                              favorable for all matters of the heart and collaborations.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 25 */}
                        <AccordionItem
                          value="comp-25"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              25: Strength through Experience
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This number indicates that success
                              comes only after significant trials and tests. The challenges faced are not punishments
                              but lessons designed to build resilience, character, and wisdom. The karmic lesson is to
                              persevere, knowing that early difficulties are the foundation for later, well-earned
                              success.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 26 */}
                        <AccordionItem
                          value="comp-26"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              26: Disasters Caused by Others
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> A warning number, 26 signifies
                              ruin and disaster brought about by bad advice, poor partnerships, or the negative
                              influence of others. It specifically cautions against risky financial ventures and
                              collaborations built on a weak foundation. The karmic lesson is to develop strong
                              discernment in choosing one&apos;s associates.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 27 */}
                        <AccordionItem
                          value="comp-27"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>27: The Scepter</h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This is a number of command,
                              authority, and intellectual power. It indicates that success will be achieved through
                              creative intelligence, thoughtful planning, and leadership. It promises that one&apos;s
                              efforts and ideas will be rewarded with respect and influence.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 28 */}
                        <AccordionItem
                          value="comp-28"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              28: The Great Potential with Risk
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> This number holds the promise of
                              great potential and success but carries a significant risk of loss if one is not careful.
                              It symbolizes a contradiction: while capable of great things, the person may lose it all
                              through carelessness, overconfidence, or poor judgment. The lesson is to balance ambition
                              with pragmatism and caution.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        {/* Compound Number 29 */}
                        <AccordionItem
                          value="comp-29"
                          className="border border-border-color rounded-lg bg-container-bg transition-all duration-300 open:bg-[#333] open:border-accent-gold"
                        >
                          <AccordionTrigger className={cn("p-5 no-underline hover:no-underline", summaryClasses)}>
                            <h4 className={cn("text-heading", subHeadingClasses, "mt-0 mb-0")}>
                              29: Uncertainties and Deception
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className={cn("pt-0", detailsContentClasses)}>
                            <p className="mt-4">
                              <strong className={strongClasses}>Description:</strong> A number of significant trials,
                              uncertainties, and grief. It warns of deception from others, unreliable friends, and
                              potential danger from emotional entanglements, particularly with the opposite sex. The
                              karmic lesson is to trust one&apos;s intuition and be extremely cautious in personal
                              relationships.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ch7" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>
                        Chapter 7: The Ethical Responsibilities of a Reader
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        As a NUMOracle reader, you are not just interpreting cards; you are guiding individuals through
                        their life&apos;s journey. This role comes with significant ethical responsibilities.
                      </p>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Key Ethical Guidelines</h4>
                      <ol className="list-decimal list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>Do No Harm:</strong> Your primary goal should always be to
                          provide guidance that empowers and uplifts. Avoid language that instills fear, anxiety, or
                          dependence.
                        </li>
                        <li>
                          <strong className={strongClasses}>Maintain Confidentiality:</strong> Treat all readings and
                          personal information with the utmost privacy. Never share details of a reading without
                          explicit consent.
                        </li>
                        <li>
                          <strong className={strongClasses}>Be Honest and Transparent:</strong> Clearly state your
                          qualifications and approach. Avoid making unrealistic promises or guarantees. Be upfront about
                          the limitations of the reading.
                        </li>
                        <li>
                          <strong className={strongClasses}>Respect Free Will:</strong> Emphasize that the future is not
                          fixed. Readings offer potential outcomes and guidance, but the querent always has the power to
                          make their own choices.
                        </li>
                        <li>
                          <strong className={strongClasses}>
                            Avoid Giving Advice on Topics Outside Your Expertise:
                          </strong>{" "}
                          Do not offer medical, legal, or financial advice unless you are qualified to do so. Refer
                          querents to appropriate professionals when necessary.
                        </li>
                        <li>
                          <strong className={strongClasses}>Set Clear Boundaries:</strong> Establish clear expectations
                          regarding the length, cost, and scope of your readings. Be firm about your availability and
                          communication policies.
                        </li>
                        <li>
                          <strong className={strongClasses}>Practice Self-Care:</strong> Conducting readings can be
                          emotionally taxing. Ensure you have adequate support and boundaries to protect your own
                          well-being.
                        </li>
                      </ol>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Handling Sensitive Topics</h4>
                      <p>
                        Some readings may touch on sensitive topics such as relationships, health, or finances. Approach
                        these situations with extra care and empathy.
                      </p>
                      <ul className="list-disc list-inside pl-4 space-y-3">
                        <li>
                          <strong className={strongClasses}>Relationships:</strong> Focus on empowering the querent to
                          make healthy choices. Avoid fueling drama or encouraging them to stay in harmful situations.
                        </li>
                        <li>
                          <strong className={strongClasses}>Health:</strong> Never diagnose or prescribe treatments.
                          Encourage the querent to seek professional medical advice.
                        </li>
                        <li>
                          <strong className={strongClasses}>Finances:</strong> Avoid making specific investment
                          recommendations. Focus on helping the querent develop a responsible and mindful approach to
                          their finances.
                        </li>
                      </ul>

                      <h4 className={cn("text-2xl mt-8", subHeadingClasses)}>Empowering Your Clients</h4>
                      <p>
                        The most ethical approach is to empower your clients to take ownership of their lives and make
                        informed decisions. Encourage them to:
                      </p>
                      <ul className="list-disc list-inside pl-4 space-y-3">
                        <li>Trust their own intuition</li>
                        <li>Seek multiple perspectives</li>
                        <li>Take responsibility for their choices</li>
                        <li>Focus on personal growth and self-awareness</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="download" className="mt-0">
                  <Card className={sectionCardClasses}>
                    <CardHeader>
                      <CardTitle className={cn("text-3xl", titleClasses)}>Download Options</CardTitle>
                    </CardHeader>
                    <CardContent className={cn("p-6 space-y-4", bodyTextClasses)}>
                      <p>
                        Thank you for exploring the NUMO Oracle Guidebook. As a member, you have access to download the
                        guidebook in various formats for your convenience.
                      </p>
                      <Button className={buttonClasses}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {/* End of new guidebook content */}
          </MembershipVerification>
        </div>
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-container-bg p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
            <p className="text-gray-300 mb-4">Please log in to access the full guidebook.</p>
            <Link href="/login">
              <Button className="bg-accent-gold text-bg-dark px-5 py-3 border-none rounded-md cursor-pointer text-base font-semibold uppercase hover:bg-[#ffdf6c]">
                Login
              </Button>
            </Link>
            <Button onClick={() => setShowLoginPrompt(false)} variant="secondary">
              Close
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}
