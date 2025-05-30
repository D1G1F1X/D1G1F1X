"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Zap, MessageSquare, ExternalLink, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

interface CtaItem {
  id: string
  icon?: React.ElementType
  title: string
  description: string
  specialOffer?: {
    // Updated to an object
    price: string
    details: string
  }
  linkLabel: string
  link: string
  target?: string
  themeColor?: string
}

const ctaItems: CtaItem[] = [
  {
    id: "3d-service",
    icon: Zap,
    title: "Interactive 3D Websites",
    description: "Elevate your online presence with stunning, modern single-page sites.",
    specialOffer: {
      // Updated special offer
      price: "$199",
      details: "incl. 1 Year Hosting!",
    },
    linkLabel: "Explore 3D Service",
    link: "/services/web-development",
    themeColor: "accent",
  },
  {
    id: "3d-demo",
    icon: ExternalLink,
    title: "Live 3D Demo",
    description: "Experience the future of web with our live 3D demo!",
    linkLabel: "View Interactive Demo",
    link: "/services/web-development/3d-single-page-demo",
    target: "_blank",
    themeColor: "accent",
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "Start Your Project",
    description: "Have an idea? Let's discuss how we can bring it to life.",
    linkLabel: "Get In Touch",
    link: "/contact",
    themeColor: "secondary",
  },
  {
    id: "all-services",
    icon: Info,
    title: "Our Solutions",
    description: "Discover our full range of integrated digital services.",
    linkLabel: "Explore All Services",
    link: "/services",
    themeColor: "primary",
  },
]

const AUTOPLAY_INTERVAL = 8000

export default function FloatingCta() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isInteracting, setIsInteracting] = useState(false)

  const currentItem = ctaItems[currentIndex]
  const IconComponent = currentItem.icon || Sparkles

  const themeClasses: Record<
    string,
    {
      bg: string
      text: string
      border: string
      accentText: string
      buttonBg: string
      buttonHoverBg: string
      specialOfferPriceText: string // For the large price
      specialOfferDetailsText: string // For the details text
    }
  > = {
    primary: {
      bg: "bg-primary-500/10 dark:bg-primary-500/20",
      text: "text-primary-700 dark:text-primary-300",
      border: "border-primary-500/30",
      accentText: "text-primary-500 dark:text-primary-400",
      buttonBg: "bg-primary-500",
      buttonHoverBg: "hover:bg-primary-600",
      specialOfferPriceText: "text-primary-600 dark:text-primary-300",
      specialOfferDetailsText: "text-primary-500 dark:text-primary-400",
    },
    secondary: {
      bg: "bg-secondary-500/10 dark:bg-secondary-500/20",
      text: "text-secondary-700 dark:text-secondary-300",
      border: "border-secondary-500/30",
      accentText: "text-secondary-500 dark:text-secondary-400",
      buttonBg: "bg-secondary-500",
      buttonHoverBg: "hover:bg-secondary-600",
      specialOfferPriceText: "text-secondary-600 dark:text-secondary-300",
      specialOfferDetailsText: "text-secondary-500 dark:text-secondary-400",
    },
    accent: {
      // This will be used for the $499 offer
      bg: "bg-accent-500/10 dark:bg-accent-500/20",
      text: "text-accent-700 dark:text-accent-300",
      border: "border-accent-500/30",
      accentText: "text-accent-500 dark:text-accent-400",
      buttonBg: "bg-accent-500",
      buttonHoverBg: "hover:bg-accent-600",
      specialOfferPriceText: "text-accent-500 dark:text-accent-200", // Brighter for price
      specialOfferDetailsText: "text-accent-600 dark:text-accent-400",
    },
    default: {
      bg: "bg-gray-500/10 dark:bg-gray-500/20",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-500/30",
      accentText: "text-gray-500 dark:text-gray-400",
      buttonBg: "bg-gray-600",
      buttonHoverBg: "hover:bg-gray-700",
      specialOfferPriceText: "text-gray-700 dark:text-gray-200",
      specialOfferDetailsText: "text-gray-600 dark:text-gray-400",
    },
  }
  const currentTheme = themeClasses[currentItem.themeColor || "default"]

  const cycleItem = useCallback((direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % ctaItems.length
      } else {
        return (prevIndex - 1 + ctaItems.length) % ctaItems.length
      }
    })
  }, [])

  useEffect(() => {
    if (!isVisible || isInteracting) return
    const timer = setInterval(() => {
      cycleItem("next")
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [currentIndex, isVisible, isInteracting, cycleItem])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[60] w-full md:w-auto md:max-w-md transition-all duration-500 ease-in-out",
        "backdrop-blur-xl shadow-2xl rounded-t-xl md:rounded-xl overflow-hidden",
        currentTheme.bg,
        currentTheme.border,
        "border-t md:border",
      )}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      role="alertdialog"
      aria-labelledby={`floating-cta-title-${currentItem.id}`}
      aria-describedby={`floating-cta-description-${currentItem.id}`}
    >
      <div className="relative p-5 md:p-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-9 w-9 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
          onClick={() => setIsVisible(false)}
          aria-label="Close CTA"
        >
          <X size={22} />
        </Button>

        <div className="flex items-center mb-3">
          <div className={cn("p-2 rounded-full mr-3", currentTheme.bg)}>
            <Sparkles className={cn("h-8 w-8 animate-pulse", currentTheme.accentText)} />
          </div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={`${currentItem.id}-title`}
              id={`floating-cta-title-${currentItem.id}`}
              className={cn("text-lg font-semibold", currentTheme.accentText)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentItem.title}
            </motion.h3>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentItem.id}-content`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="min-h-[80px] mb-3" // Increased min-h for description + special offer
          >
            <p id={`floating-cta-description-${currentItem.id}`} className={cn("text-sm mb-2", currentTheme.text)}>
              {currentItem.description}
            </p>
            {currentItem.specialOffer && (
              <div className="mt-2 text-left">
                <span
                  className={cn(
                    "block text-4xl font-extrabold leading-tight tracking-tight", // Significantly larger font
                    currentTheme.specialOfferPriceText,
                  )}
                >
                  {currentItem.specialOffer.price}
                </span>
                <span
                  className={cn(
                    "block text-xs font-medium uppercase tracking-wider", // Smaller details text
                    currentTheme.specialOfferDetailsText,
                  )}
                >
                  {currentItem.specialOffer.details}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Button className={cn("w-full", currentTheme.buttonBg, currentTheme.buttonHoverBg)} asChild>
          <Link href={currentItem.link} target={currentItem.target}>
            {currentItem.linkLabel}
          </Link>
        </Button>
      </div>
    </div>
  )
}
