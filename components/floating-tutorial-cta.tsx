"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function FloatingTutorialCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the CTA after a short delay to not be too intrusive immediately
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000) // Show after 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-1/2 right-6 z-50 transform -translate-y-1/2">
      <div className="relative rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-1 shadow-2xl animate-fadeIn w-24 h-24 flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 z-10 transform translate-x-1/4 -translate-y-1/4"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss tutorial call to action"
        >
          <X className="h-4 w-4" />
        </Button>
        <Link
          href="/tutorial"
          className="rounded-full bg-slate-900 hover:bg-slate-800 w-full h-full flex flex-col items-center justify-center text-center p-2 transition-colors"
        >
          <div className="flex flex-col items-center justify-center">
            <GraduationCap className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-xs font-semibold text-white mt-1">Tutorial</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
