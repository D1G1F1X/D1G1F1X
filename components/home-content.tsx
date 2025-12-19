"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Calculator,
  Library,
  Compass,
  Dice1Icon as Dice,
  PauseIcon,
  PlayIcon,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Info,
} from "lucide-react"
import Image from "next/image"
import NumoEmblemLogo from "@/components/numo-emblem-logo"
import { useEffect, useRef, useState } from "react"
import ElementalParticles from "@/components/elemental-particles"
import { cn } from "@/lib/utils"
import YouTubeVideo from "@/components/youtube-video"
import FloatingTutorialCTA from "@/components/floating-tutorial-cta"

// Define the tool interface
interface OracleTool {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  link: string
  action: string
  isNew?: boolean
  imageSrc: string
  imageAlt: string
}

// Define the blog post interface
interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  imageSrc: string
  category: string
}

export default function HomeContent() {
  const [pageData, setPageData] = useState<any>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [randomizedCards, setRandomizedCards] = useState<any[]>([])
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  const [activeToolIndex, setActiveToolIndex] = useState(0)
  const [activeBlogIndex, setActiveBlogIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const blogCarouselRef = useRef<HTMLDivElement>(null)
  const [isToolCarouselPaused, setIsToolCarouselPaused] = useState(false)
  const [isBlogCarouselPaused, setIsBlogCarouselPaused] = useState(false)

  // Define the oracle tools
  const oracleTools: OracleTool[] = [
    {
      id: "card-dealer",
      name: "NUMO Card Dealer & Oracle",
      icon: <Compass className="h-7 w-7 text-purple-300" />,
      description: "Draw cards and receive personalized oracle readings based on your questions and energy.",
      link: "/tools/card-simulator",
      action: "Try Now",
      imageSrc: "/images/tools/generated/numo-card-dealer-feature.png",
      imageAlt: "NUMO Card Dealer & Oracle",
    },
    {
      id: "numerology",
      name: "FREE Numerology Report",
      icon: <Calculator className="h-7 w-7 text-purple-300" />,
      description: "Discover your life path, destiny number, and personal numerology profile.",
      link: "/tools/numerology-calculator",
      action: "Try Now",
      imageSrc: "/images/tools/generated/free-numerology-report-feature-v2.png",
      imageAlt: "Free Numerology Report tool feature image",
    },
    {
      id: "card-directory",
      name: "Card Directory",
      icon: <Library className="h-7 w-7 text-purple-300" />,
      description: "Explore the complete collection of NUMO Oracle cards, their meanings, and symbolism.",
      link: "/tools/card-directory",
      action: "Explore",
      imageSrc: "/images/tools/generated/card-directory-feature-updated.png",
      imageAlt: "Screenshot of the NUMO Oracle Card Directory page",
    },
    {
      id: "elemental-dice",
      name: "Elemental Dice Oracle",
      icon: <Dice className="h-7 w-7 text-purple-300" />,
      description: "Roll the five elemental dice to receive numerological guidance through the elements.",
      link: "/tools/elemental-dice",
      action: "Try Now",
      isNew: true,
      imageSrc: "/images/tools/generated/elemental-dice-screenshot.png",
      imageAlt: "Screenshot of the Elemental Dice Oracle tool page",
    },
  ]
  const toolsPerPage = 2
  const totalPages = Math.ceil(oracleTools.length / toolsPerPage)

  // Define sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Understanding the Five Elements in Numerology",
      excerpt:
        "Discover how fire, water, earth, air, and spirit influence your numerological profile and daily readings.",
      date: "May 12, 2025",
      author: "Sophia Winters",
      slug: "understanding-five-elements-numerology",
      imageSrc: "/images/blog/generated/understanding-five-elements-numerology.png",
      category: "Numerology",
    },
    {
      id: "2",
      title: "The Sacred Geometry Behind NUMO Oracle Cards",
      excerpt: "Explore the mathematical principles and sacred geometry patterns embedded in the NUMO Oracle deck.",
      date: "May 5, 2025",
      author: "Marcus Thompson",
      slug: "sacred-geometry-numo-oracle-cards",
      imageSrc: "/images/blog/generated/sacred-geometry-numo-oracle-cards.png",
      category: "Card Meanings",
    },
    {
      id: "3",
      title: "Combining Tarot and Numerology for Deeper Insights",
      excerpt:
        "Learn how to enhance your readings by integrating traditional tarot techniques with numerological wisdom.",
      date: "April 28, 2025",
      author: "Elena Rodriguez",
      slug: "combining-tarot-numerology-deeper-insights",
      imageSrc: "/images/blog/generated/combining-tarot-numerology-deeper-insights.png",
      category: "Techniques",
    },
    {
      id: "4",
      title: "Numerology and Your Life Path Number",
      excerpt: "Understand how your birth date reveals your life purpose and spiritual journey through numerology.",
      date: "April 21, 2025",
      author: "David Chen",
      slug: "numerology-life-path-number",
      imageSrc: "/images/blog/generated/numerology-life-path-number.png",
      category: "Numerology",
    },
    {
      id: "5",
      title: "The Spiritual Significance of the Cauldron Symbol",
      excerpt: "Dive deep into the ancient symbolism of the cauldron and its representation in the NUMO Oracle.",
      date: "April 14, 2025",
      author: "Amara Johnson",
      slug: "spiritual-significance-cauldron-symbol",
      imageSrc: "/images/blog/generated/spiritual-significance-cauldron-symbol.png",
      category: "Card Meanings",
    },
  ]

  useEffect(() => {
    async function fetchPageData() {
      try {
        const mockPageData = {
          title: "The NUMO Oracle Card Deck",
          subtitle: (
            <>
              BY{" "}
              <a
                href="https://www.kraftwerked.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-purple-400"
              >
                KRAFTWERK NUMEROLOGY
              </a>
            </>
          ),
          description: "Discover the ancient wisdom of numerology combined with oracle card readings",
          sections: [
            { id: "hero", isActive: true },
            { id: "features", title: "Oracle Tools", isActive: true },
            { id: "blog", title: "Latest from Our Blog", isActive: true },
            { id: "testimonials", title: "What Our Users Say", isActive: true },
            { id: "about-summary", title: "About NUMO Oracle", isActive: true },
          ],
        }
        setPageData(mockPageData)
      } catch (error) {
        console.error("Error fetching page data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPageData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (cardsContainerRef.current) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getParallaxStyle = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`,
  })

  const getRandomRotation = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

  const allCards = [
    {
      id: 1,
      src: "/cards/01cauldron-spirit.jpg",
      alt: "Cauldron Spirit Card",
      element: "spirit",
      glowColor: "rgba(128, 0, 255, 0.4)",
    },
    {
      id: 2,
      src: "/cards/25sword-water.jpg",
      alt: "Sword Water Card",
      element: "water",
      glowColor: "rgba(0, 128, 255, 0.4)",
    },
    {
      id: 3,
      src: "/cards/38cord-fire.jpg",
      alt: "Cord Fire Card",
      element: "fire",
      glowColor: "rgba(255, 64, 0, 0.4)",
    },
    {
      id: 4,
      src: "/cards/69stone-earth.jpg",
      alt: "Stone Earth Card",
      element: "earth",
      glowColor: "rgba(0, 192, 64, 0.4)",
    },
    {
      id: 5,
      src: "/cards/83cord-air.jpg",
      alt: "Cord Air Card",
      element: "air",
      glowColor: "rgba(255, 255, 128, 0.4)",
    },
    {
      id: 6,
      src: "/cards/10cauldron-fire.jpg",
      alt: "Cauldron Fire Card",
      element: "fire",
      glowColor: "rgba(255, 64, 0, 0.4)",
    },
    {
      id: 7,
      src: "/cards/10cauldron-water.jpg",
      alt: "Cauldron Water Card",
      element: "water",
      glowColor: "rgba(0, 128, 255, 0.4)",
    },
    {
      id: 8,
      src: "/cards/47spear-spirit.jpg",
      alt: "Spear Spirit Card",
      element: "spirit",
      glowColor: "rgba(128, 0, 255, 0.4)",
    },
    {
      id: 9,
      src: "/cards/52sword-earth.jpg",
      alt: "Sword Earth Card",
      element: "earth",
      glowColor: "rgba(0, 192, 64, 0.4)",
    },
    {
      id: 10,
      src: "/cards/74spear-air.jpg",
      alt: "Spear Air Card",
      element: "air",
      glowColor: "rgba(255, 255, 128, 0.4)",
    },
    {
      id: 11,
      src: "/cards/96stone-fire.jpg",
      alt: "Stone Fire Card",
      element: "fire",
      glowColor: "rgba(255, 64, 0, 0.4)",
    },
    {
      id: 12,
      src: "/cards/25sword-spirit.jpg",
      alt: "Sword Spirit Card",
      element: "spirit",
      glowColor: "rgba(128, 0, 255, 0.4)",
    },
  ]

  const cardPositions = [
    {
      initialRotate: -12,
      hoverRotate: 0,
      translateX: -50,
      translateY: -50,
      zIndex: 5,
      parallaxSpeed: -0.05,
      hoverTranslateY: -10,
      hoverScale: 1.1,
      delay: 0,
      particlePositionX: 120,
      particlePositionY: 180,
    },
    {
      initialRotate: -28,
      hoverRotate: -15,
      translateX: -110,
      translateY: -45,
      zIndex: 4,
      parallaxSpeed: 0.03,
      hoverTranslateY: -15,
      hoverScale: 1.08,
      delay: 0.1,
      particlePositionX: 60,
      particlePositionY: 180,
    },
    {
      initialRotate: 12,
      hoverRotate: 22,
      translateX: 10,
      translateY: -52,
      zIndex: 3,
      parallaxSpeed: 0.07,
      hoverTranslateY: -20,
      hoverScale: 1.05,
      delay: 0.2,
      particlePositionX: 180,
      particlePositionY: 180,
    },
    {
      initialRotate: 25,
      hoverRotate: 35,
      translateX: 40,
      translateY: -40,
      zIndex: 2,
      parallaxSpeed: 0.04,
      hoverTranslateY: -25,
      hoverScale: 1.03,
      delay: 0.3,
      particlePositionX: 200,
      particlePositionY: 160,
    },
    {
      initialRotate: -22,
      hoverRotate: -32,
      translateX: -140,
      translateY: -42,
      zIndex: 1,
      parallaxSpeed: 0.02,
      hoverTranslateY: -18,
      hoverScale: 1.02,
      delay: 0.4,
      particlePositionX: 40,
      particlePositionY: 165,
    },
  ]

  const restartCardAnimation = () => {
    setIsHovering(false)
    const shuffledCards = [...allCards].sort(() => Math.random() - 0.5)
    const selectedCards = shuffledCards.slice(0, 5).map((card, index) => ({
      ...card,
      ...cardPositions[index],
      imageRotation: getRandomRotation(-3, 3),
      offsetX: getRandomRotation(-5, 5),
      offsetY: getRandomRotation(-5, 5),
    }))
    setRandomizedCards(selectedCards)
    setAnimationKey((prev) => prev + 1)
    setTimeout(() => {
      setIsHovering(true)
      setTimeout(() => setIsHovering(false), 2000)
    }, 300)
  }

  useEffect(() => {
    const shuffledCards = [...allCards].sort(() => Math.random() - 0.5)
    const selectedCards = shuffledCards.slice(0, 5).map((card, index) => ({
      ...card,
      ...cardPositions[index],
      imageRotation: getRandomRotation(-3, 3),
      offsetX: getRandomRotation(-5, 5),
      offsetY: getRandomRotation(-5, 5),
    }))
    setRandomizedCards(selectedCards)
  }, [])

  const nextTool = () => setActiveToolIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  const prevTool = () => setActiveToolIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))

  const blogPostsPerPage = 3
  const totalBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)
  const nextBlog = () => setActiveBlogIndex((prev) => (prev === totalBlogPages - 1 ? 0 : prev + 1))
  const prevBlog = () => setActiveBlogIndex((prev) => (prev === 0 ? totalBlogPages - 1 : prev - 1))

  useEffect(() => {
    let toolsIntervalId: NodeJS.Timeout | undefined
    let blogIntervalId: NodeJS.Timeout | undefined

    if (!isToolCarouselPaused && totalPages > 0) {
      // Added totalPages > 0 check
      toolsIntervalId = setInterval(() => setActiveToolIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1)), 7000)
    }
    if (!isBlogCarouselPaused && totalBlogPages > 0) {
      // Added totalBlogPages > 0 check
      blogIntervalId = setInterval(
        () => setActiveBlogIndex((prev) => (prev === totalBlogPages - 1 ? 0 : prev + 1)),
        8000,
      )
    }

    return () => {
      if (toolsIntervalId) clearInterval(toolsIntervalId)
      if (blogIntervalId) clearInterval(blogIntervalId)
    }
  }, [isToolCarouselPaused, isBlogCarouselPaused, totalPages, totalBlogPages])

  useEffect(() => {
    if (carouselRef.current && totalPages > 0) {
      // Added totalPages > 0 check
      carouselRef.current.scrollTo({ left: activeToolIndex * carouselRef.current.offsetWidth, behavior: "smooth" })
    }
    if (blogCarouselRef.current && totalBlogPages > 0) {
      // Added totalBlogPages > 0 check
      blogCarouselRef.current.scrollTo({
        left: activeBlogIndex * blogCarouselRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }, [activeToolIndex, activeBlogIndex, totalPages, totalBlogPages])

  if (isLoading) {
    return <div className="p-12 text-center">Loading content...</div>
  }

  const featuresSection = pageData?.sections?.find((s: any) => s.id === "features" && s.isActive)
  const blogSection = pageData?.sections?.find((s: any) => s.id === "blog" && s.isActive)
  const testimonialsSection = pageData?.sections?.find((s: any) => s.id === "testimonials" && s.isActive)
  const aboutSummarySection = pageData?.sections?.find((s: any) => s.id === "about-summary" && s.isActive)

  return (
    <>
      <FloatingTutorialCTA />
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="mb-8">
                <div className="text-sm uppercase tracking-wider text-purple-400 mb-2">{pageData?.subtitle}</div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">{pageData?.title}</h1>
                <button
                  onClick={restartCardAnimation}
                  className="transition-opacity hover:opacity-80 focus:outline-none"
                  aria-label="Restart card animation"
                >
                  <Image 
                    src="/numoracle-full-logo.png" 
                    alt="NUMO ORACLE" 
                    width={300} 
                    height={50} 
                    className="mb-2 w-auto h-auto"
                  />
                </button>
                <p className="text-lg text-gray-300 mb-6">{pageData?.description}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/buy">Get Your Deck</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950"
                  asChild
                >
                  <Link href="/tools/card-simulator">Try NUMO Card Dealer & Oracle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-950/50 hover:border-yellow-400"
                  asChild
                >
                  <Link href="/tutorial" className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learn with the Tutorial
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute top-[-30px] right-[-20px] md:top-[-50px] md:right-[-30px] opacity-80">
                <button
                  onClick={restartCardAnimation}
                  className="transition-opacity hover:opacity-80 focus:outline-none"
                  aria-label="Restart card animation"
                >
                  <Image
                    src="/numero-logo-500x500.png"
                    alt="NUMO Oracle Logo"
                    width={120}
                    height={120}
                    className="animate-pulse"
                    style={{ animationDuration: "4s" }}
                  />
                </button>
              </div>
              <div
                ref={cardsContainerRef}
                className="relative h-[500px] w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                key={animationKey}
              >
                {randomizedCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="absolute top-1/2 left-1/2 transition-all duration-700"
                    style={{
                      zIndex: card.zIndex,
                      transform: `translate(calc(${card.translateX}% + ${card.offsetX}px), calc(${card.translateY}% + ${card.offsetY}px)) rotate(${card.initialRotate}deg) ${getParallaxStyle(card.parallaxSpeed).transform}`,
                      ...(isHovering && {
                        transform: `translate(calc(${card.translateX}% + ${card.offsetX}px), calc(${card.translateY - card.hoverTranslateY}% + ${card.offsetY}px)) rotate(${card.hoverRotate}deg) scale(${card.hoverScale})`,
                        transitionDelay: `${card.delay}s`,
                      }),
                    }}
                  >
                    <div
                      className="w-[240px] h-[360px] rounded-lg overflow-hidden transition-all duration-700"
                      style={{
                        boxShadow: `0 0 30px ${card.glowColor}`,
                        ...(isHovering && { boxShadow: `0 0 40px ${card.glowColor}` }),
                      }}
                    >
                      <div
                        className="w-full h-full transition-all duration-700"
                        style={{
                          transform: `rotate(${card.imageRotation}deg)`,
                          ...(isHovering && { transform: `rotate(${card.imageRotation * 0.5}deg)` }),
                        }}
                      >
                        <Image
                          src={card.src || "/placeholder.svg"}
                          alt={card.alt}
                          width={240}
                          height={360}
                          className="w-full h-full object-cover"
                          priority={index === 0 || card.src === "/cards/83cord-air.jpg"}
                        />
                      </div>
                    </div>
                    <ElementalParticles
                      element={card.element as "fire" | "water" | "earth" | "air" | "spirit"}
                      isActive={isHovering}
                      x={card.particlePositionX}
                      y={card.particlePositionY}
                    />
                  </div>
                ))}
                <div className="absolute inset-0 pointer-events-none">
                  {isHovering && (
                    <>
                      <div
                        className="absolute top-[15%] left-[20%] text-purple-300 opacity-0 animate-fadeIn"
                        style={{ animationDelay: "0.3s" }}
                      >
                        ✧
                      </div>
                      <div
                        className="absolute top-[30%] right-[25%] text-blue-300 opacity-0 animate-fadeIn"
                        style={{ animationDelay: "0.5s" }}
                      >
                        ○
                      </div>
                      <div
                        className="absolute bottom-[25%] left-[30%] text-amber-300 opacity-0 animate-fadeIn"
                        style={{ animationDelay: "0.7s" }}
                      >
                        ⚹
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"
            style={getParallaxStyle(0.02)}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"
            style={getParallaxStyle(-0.01)}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
        </div>
      </section>

      {featuresSection && (
        <section className="py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">{featuresSection.title}</h2>
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTool}
                className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                aria-label="Previous tool"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                {totalPages > 0 &&
                  Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        activeToolIndex === index
                          ? "bg-purple-500 scale-125"
                          : "bg-purple-500/30 hover:bg-purple-500/50",
                      )}
                      onClick={() => setActiveToolIndex(index)}
                      aria-label={`Go to tool slide ${index + 1}`}
                    />
                  ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsToolCarouselPaused(!isToolCarouselPaused)}
                  className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30 w-7 h-7"
                  aria-label={isToolCarouselPaused ? "Play tools carousel" : "Pause tools carousel"}
                >
                  {isToolCarouselPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTool}
                className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                aria-label="Next tool"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative overflow-hidden hidden md:block">
              {totalPages > 0 && (
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${totalPages * 100}%`,
                    transform: `translateX(-${activeToolIndex * (100 / totalPages)}%)`,
                  }}
                >
                  {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="w-full flex-shrink-0 px-4 flex gap-6"
                      style={{ width: `${100 / totalPages}%` }}
                    >
                      {oracleTools
                        .slice(pageIndex * toolsPerPage, pageIndex * toolsPerPage + toolsPerPage)
                        .map((tool) => (
                          <div key={tool.id} className="w-1/2">
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 h-full overflow-hidden">
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={tool.imageSrc || "/placeholder.svg"}
                                  alt={tool.imageAlt}
                                  width={400}
                                  height={200}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                {tool.isNew && (
                                  <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <CardContent className="p-6 flex flex-col">
                                <div className="flex items-center mb-4">
                                  <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                                    {tool.icon}
                                  </div>
                                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                                </div>
                                <p className="text-gray-300 mb-6 flex-grow">{tool.description}</p>
                                <Button
                                  variant="outline"
                                  className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 mt-auto"
                                  asChild
                                >
                                  <Link href={tool.link}>{tool.action}</Link>
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:hidden mt-8 space-y-6">
              {oracleTools.map((tool) => (
                <Card key={tool.id} className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tool.imageSrc || "/placeholder.svg"}
                      alt={tool.imageAlt}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    {tool.isNew && (
                      <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{tool.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{tool.description}</p>
                    <Button
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 mt-2"
                      asChild
                    >
                      <Link href={tool.link}>{tool.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {aboutSummarySection && (
        <section className="py-20 bg-gradient-to-b from-black/20 to-black/40 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{aboutSummarySection.title}</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                NUMO Oracle, by{" "}
                <a
                  href="https://www.kraftwerked.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:underline"
                >
                  Kraftwerk Numerology
                </a>
                , is a unique divination system blending ancient numerology, mythic wisdom, and elemental energies.
                It&apos;s designed to guide you on a transformative journey of self-discovery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-purple-300">Core Principles</h3>
                  <p className="text-gray-300">
                    Our system is built upon the Five Sacred Treasures, the wisdom of Goddess Danu, and the profound
                    insights of numerological patterns and elemental balance. Each aspect works in harmony to provide
                    deep, personalized guidance.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-purple-300">Discover the System</h3>
                  <p className="text-gray-300 mb-6">
                    Watch our introductory video to get a glimpse into the world of NUMO Oracle and its foundational
                    concepts. For a comprehensive understanding, explore our detailed About page.
                  </p>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-300 hover:bg-purple-900/30"
                    asChild
                  >
                    <Link href="/about" className="flex items-center">
                      <Info className="mr-2 h-5 w-5" />
                      Learn More About NUMO
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border border-purple-500/30">
                <YouTubeVideo
                  videoId="ljJ18kG7zqg"
                  title="NUMO Pair Numerology Pattern - NEW Discovery!"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div
              className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full filter blur-3xl animate-pulse"
              style={{ animationDuration: "10s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"
              style={{ animationDuration: "15s" }}
            ></div>
          </div>
        </section>
      )}

      {blogSection && (
        <section className="py-20 bg-gradient-to-b from-black/40 to-black/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">{blogSection.title}</h2>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30" asChild>
                <Link href="/blog" className="flex items-center">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevBlog}
                className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                aria-label="Previous blog post"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                {totalBlogPages > 0 &&
                  Array.from({ length: totalBlogPages }).map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        activeBlogIndex === index
                          ? "bg-purple-500 scale-125"
                          : "bg-purple-500/30 hover:bg-purple-500/50",
                      )}
                      onClick={() => setActiveBlogIndex(index)}
                      aria-label={`Go to blog slide ${index + 1}`}
                    />
                  ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsBlogCarouselPaused(!isBlogCarouselPaused)}
                  className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30 w-7 h-7"
                  aria-label={isBlogCarouselPaused ? "Play blog carousel" : "Pause blog carousel"}
                >
                  {isBlogCarouselPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextBlog}
                className="rounded-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                aria-label="Next blog post"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative overflow-hidden hidden md:block">
              {totalBlogPages > 0 && (
                <div
                  ref={blogCarouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${totalBlogPages * 100}%`,
                    transform: `translateX(-${activeBlogIndex * (100 / totalBlogPages)}%)`,
                  }}
                >
                  {Array.from({ length: totalBlogPages }).map((_, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="w-full flex-shrink-0 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                      style={{ width: `${100 / totalBlogPages}%` }}
                    >
                      {blogPosts
                        .slice(pageIndex * blogPostsPerPage, pageIndex * blogPostsPerPage + blogPostsPerPage)
                        .map((post) => (
                          <Card
                            key={post.id}
                            className="bg-gradient-to-br from-purple-900/10 to-black border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300 group"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={post.imageSrc || "/placeholder.svg"}
                                alt={post.title}
                                width={400}
                                height={200}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2 bg-purple-800/80 text-white text-xs px-2 py-1 rounded">
                                {post.category}
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="text-sm text-gray-400 mb-2">
                                {post.date} • By {post.author}
                              </div>
                              <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                              <Button variant="link" className="text-purple-400 p-0 h-auto" asChild>
                                <Link href={`/blog/${post.slug}`}>Read More</Link>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:hidden mt-8 relative overflow-hidden">
              {blogPosts.length > 0 && (
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${blogPosts.length * 100}%`,
                    transform: `translateX(-${activeBlogIndex * (100 / blogPosts.length)}%)`,
                  }}
                >
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="w-full flex-shrink-0 px-4"
                      style={{ width: `${100 / blogPosts.length}%` }}
                    >
                      <Card className="bg-gradient-to-br from-purple-900/10 to-black border-purple-500/20 overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.imageSrc || "/placeholder.svg"}
                            alt={post.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-purple-800/80 text-white text-xs px-2 py-1 rounded">
                            {post.category}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="text-sm text-gray-400 mb-2">
                            {post.date} • By {post.author}
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                          <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                          <Button variant="link" className="text-purple-400 p-0 h-auto" asChild>
                            <Link href={`/blog/${post.slug}`}>Read More</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
              {blogPosts.length > 0 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {blogPosts.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        activeBlogIndex === index ? "bg-purple-500" : "bg-purple-500/30",
                      )}
                      onClick={() => setActiveBlogIndex(index)}
                      aria-label={`Go to blog post ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {testimonialsSection && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{testimonialsSection.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The three card spread gave me incredible insights that helped me make an important life decision. The detailed explanations were spot on!",
                  author: "Sarah M.",
                  element: "air",
                  avatar: "/images/testimonials/user-avatar-1.png",
                },
                {
                  quote:
                    "I've been using the numerology calculator for months now. The accuracy of the readings and the depth of information is truly impressive.",
                  author: "Michael T.",
                  element: "spirit",
                  avatar: "/images/testimonials/user-avatar-2.png",
                },
                {
                  quote:
                    "The card library is a fantastic resource. I love how each card has detailed meanings and connections to numerology. It's helped me deepen my practice.",
                  author: "Jessica L.",
                  element: "water",
                  avatar: "/images/testimonials/user-avatar-3.png",
                },
              ].map((testimonial, index) => (
                <Card key={index} className={`card card-${testimonial.element} bg-black/50 border-purple-500/30`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="text-purple-300 text-4xl mb-4">&quot;</div>
                      <p className="text-gray-300 flex-grow">{testimonial.quote}</p>
                      <div className="mt-6 flex items-center">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full mr-3 border-2 border-purple-500/50"
                        />
                        <span className="font-medium">{testimonial.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-br from-purple-900/30 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <NumoEmblemLogo variant="with-text" size="lg" asLink={false} />
          </div>
          <h2 className="text-3xl font-bold mb-8">Begin Your Journey Today</h2>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            asChild
          >
            <Link href="/tools/card-simulator">
              <Sparkles className="mr-2 h-5 w-5" />
              Try NUMO Card Dealer & Oracle
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
