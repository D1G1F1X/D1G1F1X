"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AlertTriangle, ShoppingCart, Phone, Dice5, Gift, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Announcement {
  id: string
  text: string
  link?: string
  linkLabel?: string
  icon: React.ReactNode
  ctaColor?: string
}

const announcements: Announcement[] = [
  {
    id: "database-debug-warning",
    text: "Heads Up: Card DATABASE error handling being debugged. WARNING some card data and descriptions may be erroneous. Should be fixed in 24hrs. ~ the admin",
    icon: <AlertTriangle size={18} className="mr-2 flex-shrink-0 text-yellow-300" />, // Added text-yellow-300 for emphasis
  },
  {
    id: "cart-unavailable",
    text: "Shopping cart is temporarily unavailable.",
    icon: <ShoppingCart size={18} className="mr-2 flex-shrink-0" />,
  },
  {
    id: "under-construction",
    text: "Site is actively under construction - check back soon for updates!",
    icon: <AlertTriangle size={18} className="mr-2 flex-shrink-0" />,
  },
  {
    id: "contact-to-order",
    text: "You can still contact us directly to order cards!",
    link: "/contact",
    linkLabel: "Contact Us",
    icon: <Phone size={18} className="mr-2 flex-shrink-0" />,
    ctaColor: "text-sky-300 hover:text-sky-200",
  },
  {
    id: "elemental-dice",
    text: "Discover the new Elemental Dice Roller!",
    link: "/tools/elemental-dice",
    linkLabel: "Try Now",
    icon: <Dice5 size={18} className="mr-2 flex-shrink-0" />,
    ctaColor: "text-green-300 hover:text-green-200",
  },
  {
    id: "free-report",
    text: "Get your FREE Numerology Report!",
    link: "/tools/numerology-calculator",
    linkLabel: "Get Report",
    icon: <Gift size={18} className="mr-2 flex-shrink-0" />,
    ctaColor: "text-pink-300 hover:text-pink-200",
  },
]

const SiteNewsBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const handleNextAnnouncement = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
      setIsExiting(false)
      setIsVisible(true) // Ensure it becomes visible for the new announcement
    }, 500) // Duration of exit animation
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextAnnouncement()
    }, 7000) // Change announcement every 7 seconds

    return () => clearInterval(interval)
  }, [handleNextAnnouncement])

  const currentAnnouncement = announcements[currentIndex]

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-2.5 px-4 shadow-md transition-all duration-500 ease-in-out",
        "flex items-center justify-center text-center text-sm h-auto min-h-[48px]",
        isExiting ? "opacity-0" : "opacity-100 translate-y-0",
        !isVisible && !isExiting ? "opacity-0" : "", // Keep invisible if not ready
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-center">
        {currentAnnouncement.icon}
        <span className="mx-1">{currentAnnouncement.text}</span>
        {currentAnnouncement.link && currentAnnouncement.linkLabel && (
          <Link
            href={currentAnnouncement.link}
            className={cn(
              "ml-2 font-semibold underline hover:opacity-80 transition-opacity flex items-center",
              currentAnnouncement.ctaColor || "text-purple-300 hover:text-purple-200",
            )}
          >
            {currentAnnouncement.linkLabel}
            <ChevronRight size={16} className="ml-0.5" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default SiteNewsBanner
