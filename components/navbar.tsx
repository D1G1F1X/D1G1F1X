"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Lexend } from "next/font/google"
import DayNightToggle from "@/components/day-night-toggle"
import SearchDialog from "@/components/search-dialog" // Declare the SearchDialog variable here

// Initialize Lexend font
const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(12)
  const [textColorClass, setTextColorClass] = useState("")
  const [textColorStyle, setTextColorStyle] = useState({})
  const [buttonColorClass, setButtonColorClass] = useState("")
  const [buttonColorStyle, setButtonColorStyle] = useState({})
  const [logoSrc, setLogoSrc] = useState("/images/logo-bulb.png")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Update time of day based on animation cycle
    const updateTimeOfDay = () => {
      const cycleDuration = 240000 // 4 minutes for a full day cycle
      const elapsed = Date.now() % cycleDuration
      const currentTimeOfDay = (elapsed / cycleDuration) * 24
      setTimeOfDay(currentTimeOfDay)
      updateTextStyles(currentTimeOfDay)
    }

    const updateTextStyles = (time: number) => {
      // If scrolled, use default styles
      if (isScrolled) {
        setTextColorClass("text-white")
        setTextColorStyle({})
        setButtonColorClass("bg-primary-500 hover:bg-primary-600")
        setButtonColorStyle({})
        return
      }

      // Calculate the color transition based on time of day
      // Night (0-5 and 20-24): White text
      // Day (7-17): Black text
      // Dawn (5-7) and Dusk (17-20): Smooth transition between white and black

      let textColor, textShadow, buttonBg, buttonShadow

      // Night (0-5 and 20-24): White text
      if (time < 5 || time >= 20) {
        textColor = "rgba(255, 255, 255, 0.95)"
        textShadow = "0 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.3)"
        buttonBg = "rgba(59, 130, 246, 0.9)"
        buttonShadow = "0 4px 15px rgba(0, 0, 0, 0.3)"
      }
      // Dawn transition (5-7): White to Black
      else if (time >= 5 && time < 7) {
        const progress = (time - 5) / 2 // 0 to 1 over 2 hours
        const smoothProgress = progress * progress * (3 - 2 * progress) // Smooth step function

        // RGB values transition from white (255,255,255) to black (0,0,0)
        const r = Math.round(255 - smoothProgress * 255)
        const g = Math.round(255 - smoothProgress * 255)
        const b = Math.round(255 - smoothProgress * 255)

        textColor = `rgba(${r}, ${g}, ${b}, 0.95)`

        // Shadow transitions from dark to light
        const shadowOpacity = 0.8 - smoothProgress * 0.5
        textShadow = `0 1px 3px rgba(${smoothProgress > 0.5 ? 255 : 0}, ${smoothProgress > 0.5 ? 255 : 0}, ${
          smoothProgress > 0.5 ? 255 : 0
        }, ${shadowOpacity})`

        // Button color transitions
        buttonBg = `rgba(${59 + smoothProgress * 20}, ${130 - smoothProgress * 40}, ${246 - smoothProgress * 40}, 0.9)`
        buttonShadow = `0 4px 15px rgba(0, 0, 0, ${0.3 - smoothProgress * 0.1})`
      }
      // Day (7-17): Black text
      else if (time >= 7 && time < 17) {
        textColor = "rgba(0, 0, 0, 0.95)"
        textShadow = "0 1px 3px rgba(255, 255, 255, 0.7)"
        buttonBg = "rgba(79, 110, 206, 0.9)"
        buttonShadow = "0 4px 15px rgba(0, 0, 0, 0.2)"
      }
      // Dusk transition (17-20): Black to White
      else if (time >= 17 && time < 20) {
        const progress = (time - 17) / 3 // 0 to 1 over 3 hours
        const smoothProgress = progress * progress * (3 - 2 * progress) // Smooth step function

        // RGB values transition from black (0,0,0) to white (255,255,255)
        const r = Math.round(smoothProgress * 255)
        const g = Math.round(smoothProgress * 255)
        const b = Math.round(smoothProgress * 255)

        textColor = `rgba(${r}, ${g}, ${b}, 0.95)`

        // Shadow transitions from light to dark
        const shadowOpacity = 0.3 + smoothProgress * 0.5
        textShadow = `0 1px 3px rgba(${smoothProgress < 0.5 ? 255 : 0}, ${smoothProgress < 0.5 ? 255 : 0}, ${
          smoothProgress < 0.5 ? 255 : 0
        }, ${shadowOpacity})`

        // Button color transitions
        buttonBg = `rgba(${79 - smoothProgress * 20}, ${110 + smoothProgress * 20}, ${206 + smoothProgress * 40}, 0.9)`
        buttonShadow = `0 4px 15px rgba(0, 0, 0, ${0.2 + smoothProgress * 0.1})`
      }

      setTextColorClass("")
      setTextColorStyle({
        color: textColor,
        textShadow: textShadow,
        transition: "all 0.5s ease",
      })
      setButtonColorClass("")
      setButtonColorStyle({
        backgroundColor: buttonBg,
        boxShadow: buttonShadow,
        transition: "all 0.5s ease",
      })
    }

    const timeInterval = setInterval(updateTimeOfDay, 100) // More frequent updates for smoother transitions
    updateTimeOfDay() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timeInterval)
    }
  }, [isScrolled])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogoError = () => {
    console.warn("Logo image failed to load, using placeholder")
    // Create a simple SVG placeholder
    const svgLogo = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill="#3B82F6" />
        <text x="20" y="25" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">LH</text>
      </svg>
    `
    const svgBlob = new Blob([svgLogo], { type: "image/svg+xml" })
    setLogoSrc(URL.createObjectURL(svgBlob))
  }

  // Update the navLinks array to use direct page links instead of hash links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "R&D", href: "/research-development" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img
                src={logoSrc || "/placeholder.svg"}
                alt="Lumen Helix Bulb Logo"
                className="h-10 md:h-12 mr-3"
                onError={handleLogoError}
              />
              <div className={lexend.className}>
                <span
                  className={cn(
                    "font-bold tracking-wide text-xl md:text-2xl",
                    isScrolled ? "text-white" : textColorClass,
                  )}
                  style={isScrolled ? {} : textColorStyle}
                >
                  <span className="uppercase">LUMEN</span>
                  <span className="lowercase">helix</span>
                  <span className="ml-1 text-sm md:text-base font-normal opacity-90">solutions</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "hover:text-primary-300 transition-all font-medium",
                  isScrolled ? "text-white" : textColorClass,
                )}
                style={isScrolled ? {} : textColorStyle}
              >
                {link.name}
              </Link>
            ))}
            <DayNightToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn("md:hidden focus:outline-none", isScrolled ? "text-white" : textColorClass)}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-gray-900 z-40 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex items-center mb-8">
            <img
              src={logoSrc || "/placeholder.svg"}
              alt="Lumen Helix Bulb Logo"
              className="h-10 mr-3"
              onError={handleLogoError}
            />
            <div className={lexend.className}>
              <span className="font-bold tracking-wide text-xl text-white">
                <span className="uppercase">LUMEN</span>
                <span className="lowercase">helix</span>
                <span className="ml-1 text-sm font-normal opacity-90">solutions</span>
              </span>
            </div>
          </div>
          <nav className="flex flex-col space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white text-2xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-white w-full mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </nav>
          <div className="mt-auto pb-8">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Lumen Helix Solutions</p>
          </div>
        </div>
      </div>
    </header>
  )
}
