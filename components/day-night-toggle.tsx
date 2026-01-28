"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function DayNightToggle() {
  const [timeOfDay, setTimeOfDay] = useState(12)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTimeOfDay = () => {
      const cycleDuration = 240000 // 4 minutes for a full day cycle
      const elapsed = (Date.now() - ((window as any).animationStartTime || Date.now())) % cycleDuration
      const currentTimeOfDay = (elapsed / cycleDuration) * 24
      setTimeOfDay(currentTimeOfDay)
      setIsDark(currentTimeOfDay < 7 || currentTimeOfDay > 17)
    }

    const interval = setInterval(updateTimeOfDay, 100)
    updateTimeOfDay() // Initial call

    return () => clearInterval(interval)
  }, [])

  const toggleDayNight = () => {
    // This will effectively jump to a different time in the day/night cycle
    const newStartTime = Date.now() - (isDark ? 60000 : 180000) // Jump to day or night
    ;(window as any).animationStartTime = newStartTime
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDayNight}
      className="fixed top-24 right-4 z-50 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 w-10 h-10 rounded-full"
      style={{
        color: isDark ? "white" : "black",
        textShadow: isDark ? "0 1px 2px rgba(0,0,0,0.5)" : "0 1px 2px rgba(255,255,255,0.5)",
      }}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
