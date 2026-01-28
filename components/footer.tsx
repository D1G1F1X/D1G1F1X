"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react"
import { Lexend } from "next/font/google"

// Initialize Lexend font
const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export default function Footer() {
  const [logoSrc, setLogoSrc] = useState("/images/logo-bulb.png")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Futuristic tech grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="url(#footerGradient)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <circle cx="20" cy="20" r="1" fill="url(#footerGradient)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
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
            </Link>
            <p className="text-gray-400 mb-6">Enlightened growth, intelligent evolution, and clarity in complexity.</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/lumenhelix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Lumen Helix on Facebook (opens in new window)"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com/lumenhelix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Lumen Helix on Twitter (opens in new window)"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/company/lumen-helix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Lumen Helix on LinkedIn (opens in new window)"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/lumenhelix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Lumen Helix on Instagram (opens in new window)"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/ai-strategy-fusion"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  AI Strategy & Fusion
                </Link>
              </li>
              <li>
                <Link
                  href="/services/project-management"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Project Management
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-development"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/graphic-design"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/marketing-strategy"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Marketing Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tech-consulting"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Tech Consulting & Hosting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-400 mr-2">Email:</span>
                <a href="mailto:info@lumenhelix.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@lumenhelix.com
                </a>
              </li>
              <li>
                <p className="text-gray-300 text-sm font-semibold mb-2">Cincinnati Office</p>
                <div className="flex items-start text-gray-400">
                  <span className="text-primary-400 mr-2 flex-shrink-0">Address:</span>
                  <span>Cincinnati, Ohio</span>
                </div>
                <div className="flex items-start text-gray-400 mt-1">
                  <span className="text-primary-400 mr-2 flex-shrink-0">Phone:</span>
                  <a href="tel:+12164401313" className="hover:text-primary-400 transition-colors">
                    (216) 440-1313
                  </a>
                </div>
              </li>
              <li>
                <p className="text-gray-300 text-sm font-semibold mb-2">New York Office</p>
                <div className="flex items-start text-gray-400">
                  <span className="text-primary-400 mr-2 flex-shrink-0">Phone:</span>
                  <a href="tel:+18126555857" className="hover:text-primary-400 transition-colors">
                    (812) 655-5857
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Lumen Helix Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
