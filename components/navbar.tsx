"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
  Settings,
  ShieldCheck,
  ShoppingCart,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "@/components/login-modal"
import SoundToggle from "./sound-toggle"
import ManualCartIcon from "@/components/manual-cart-icon"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Oracle Tools",
    subLinks: [
      { href: "/tools/card-simulator", label: "Card Simulator" },
      { href: "/tools/numerology-calculator", label: "Numerology Calculator" },
      { href: "/tools/card-directory", label: "Card Directory" },
      { href: "/tools/elemental-dice", label: "Elemental Dice" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
]

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <Settings className="mr-2 h-4 w-4" /> },
  { href: "/admin/users", label: "Users", icon: <UserCircle className="mr-2 h-4 w-4" /> },
  { href: "/admin/products", label: "Products", icon: <ShoppingCart className="mr-2 h-4 w-4" /> },
  { href: "/admin/orders", label: "Orders", icon: <BookOpen className="mr-2 h-4 w-4" /> },
  { href: "/admin/posts", label: "Blog Posts", icon: <Sparkles className="mr-2 h-4 w-4" /> },
  { href: "/admin/manage-oracle-cards", label: "Manage Cards", icon: <Sparkles className="mr-2 h-4 w-4" /> },
  { href: "/admin/prompts", label: "AI Prompts", icon: <Sparkles className="mr-2 h-4 w-4" /> },
  { href: "/admin/settings", label: "Site Settings", icon: <Settings className="mr-2 h-4 w-4" /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { user, isAdmin, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setOpenDropdown(null)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && openDropdown === "user") {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const closeAllModals = () => {
    setIsOpen(false)
    setOpenDropdown(null)
    setIsLoginModalOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    closeAllModals()
  }

  const renderNavLink = (link: any, isMobile = false) => {
    const isActive = pathname === link.href

    if (link.subLinks) {
      return (
        <div className="relative group" key={link.label}>
          <button
            onClick={() => isMobile && toggleDropdown(link.label)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
              isMobile ? "w-full text-left" : ""
            } ${
              openDropdown === link.label ||
              (
                !isMobile &&
                  pathname?.startsWith(link.subLinks[0].href.substring(0, link.subLinks[0].href.lastIndexOf("/")))
              )
                ? "text-purple-400 dark:text-purple-300"
                : "text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {link.label}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                openDropdown === link.label ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {(!isMobile || openDropdown === link.label) && (
            <div
              className={`${
                isMobile
                  ? "pl-4 mt-1 space-y-1"
                  : "absolute z-20 left-0 mt-2 w-56 origin-top-left bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              }`}
            >
              <div className={isMobile ? "" : "py-1"}>
                {link.subLinks.map((subLink: any) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={closeAllModals}
                    className={`block px-4 py-2 text-sm transition-colors duration-150 ease-in-out ${
                      pathname === subLink.href
                        ? "text-purple-400 bg-slate-700 dark:text-purple-300 dark:bg-slate-800"
                        : "text-slate-300 hover:text-white hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                    } ${isMobile ? "rounded-md" : ""}`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeAllModals}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
          isActive
            ? "text-purple-400 dark:text-purple-300"
            : "text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
        } ${isMobile ? "block" : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled || isOpen
            ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-slate-800"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0" onClick={closeAllModals}>
                <Image
                  src="/numo-logo-with-emblem.png"
                  alt="NUMO Oracle Logo"
                  width={150}
                  height={37}
                  priority
                  className="h-10 w-auto"
                  suppressHydrationWarning
                  onError={(e) => {
                    console.error("Logo failed to load, using fallback")
                    e.currentTarget.src = "/placeholder.svg?height=37&width=150"
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => renderNavLink(link))}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/tools/card-simulator">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-200 font-semibold"
                  >
                    <Zap className="mr-1 h-4 w-4" />
                    FREE DEMO
                  </Button>
                </Link>
                <Link href="/buy">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Buy NOW
                  </Button>
                </Link>
              </div>

              <SoundToggle />
              <ManualCartIcon />
            </div>

            {/* User Menu / Login */}
            <div className="hidden md:flex items-center ml-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDropdown("user")}
                    className="flex items-center text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
                  >
                    <UserCircle className="h-5 w-5 mr-1" />
                    {user.email}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === "user" ? "rotate-180" : ""}`}
                    />
                  </Button>
                  {openDropdown === "user" && (
                    <div className="absolute z-20 right-0 mt-2 w-48 origin-top-right bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-700 rounded-md shadow-lg py-1">
                      <Link
                        href="/user/dashboard"
                        onClick={closeAllModals}
                        className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                      >
                        <UserCircle className="mr-2 h-4 w-4 inline-block" /> My Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={closeAllModals}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                        >
                          <ShieldCheck className="mr-2 h-4 w-4 inline-block" /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                      >
                        <LogOut className="mr-2 h-4 w-4 inline-block" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsOpen(false)
                  }}
                  className="text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <SoundToggle />
              <ManualCartIcon />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-2 rounded-md text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => renderNavLink(link, true))}

              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-2">
                <Link href="/tools/card-simulator" onClick={closeAllModals}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-200 font-semibold"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    FREE DEMO
                  </Button>
                </Link>
                <Link href="/buy" onClick={closeAllModals}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy NOW
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile User Menu */}
            <div className="pt-4 pb-3 border-t border-slate-700">
              {user ? (
                <div className="px-5">
                  <div className="flex items-center">
                    <UserCircle className="h-8 w-8 text-slate-400" />
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/user/dashboard"
                      onClick={closeAllModals}
                      className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                      My Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={closeAllModals}
                        className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-5">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:text-white"
                    onClick={() => {
                      setIsLoginModalOpen(true)
                      setIsOpen(false)
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
