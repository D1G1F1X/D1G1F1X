"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  title: string
  description: string
  url: string
  type: "project" | "blog" | "page"
}

const SEARCH_DATA: SearchResult[] = [
  // Projects
  {
    title: "AI Content Generator",
    description: "Intelligent content creation platform",
    url: "/portfolio/ai-content-generator",
    type: "project",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack online retail solution",
    url: "/portfolio/e-commerce-platform",
    type: "project",
  },
  { title: "MELT", description: "Modern educational learning technology", url: "/portfolio/melt", type: "project" },
  {
    title: "NumObject",
    description: "Numerology and object-mapping framework",
    url: "/portfolio/numobject",
    type: "project",
  },
  {
    title: "Hodge Documentary",
    description: "Community storytelling platform",
    url: "/portfolio/hodge-documentary",
    type: "project",
  },

  // Blog posts
  {
    title: "Web Development Trends 2025",
    description: "Latest web development practices",
    url: "/blog/web-development-trends-2025",
    type: "blog",
  },
  {
    title: "AI Ethics in Development",
    description: "Responsible AI development",
    url: "/blog/ai-ethics-responsible-development",
    type: "blog",
  },
  {
    title: "Designing for Accessibility",
    description: "Creating inclusive digital experiences",
    url: "/blog/designing-for-accessibility",
    type: "blog",
  },

  // Pages
  { title: "Services", description: "Our consulting services", url: "/services", type: "page" },
  { title: "Portfolio", description: "Our latest projects", url: "/portfolio", type: "page" },
  { title: "About Us", description: "Learn about Lumen Helix", url: "/about", type: "page" },
  { title: "Contact", description: "Get in touch with us", url: "/contact", type: "page" },
]

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase()
    setQuery(q)

    if (!q) {
      setResults([])
      return
    }

    const filtered = SEARCH_DATA.filter(
      (item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
    )
    setResults(filtered)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 border border-gray-700 rounded-lg transition-colors"
        aria-label="Search (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-auto text-xs text-gray-500">⌘K</kbd>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

      {/* Search Dialog */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search projects, blog posts, and pages..."
              value={query}
              onChange={handleSearch}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-300"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.url}
                  href={result.url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
                >
                  <div className="mt-0.5">
                    <span className="text-xs font-medium text-primary-400 uppercase">{result.type}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{result.title}</p>
                    <p className="text-sm text-gray-400">{result.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="px-4 py-8 text-center text-gray-400">No results found for "{query}"</div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">Start typing to search...</div>
          )}
        </div>
      </div>
    </>
  )
}
