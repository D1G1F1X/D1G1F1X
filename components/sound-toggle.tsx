"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedMuteState = localStorage.getItem("isMuted")
    setIsMuted(storedMuteState === null ? true : storedMuteState === "true")
  }, [])

  const toggleMute = () => {
    const newMuteState = !isMuted
    setIsMuted(newMuteState)
    localStorage.setItem("isMuted", String(newMuteState))

    // Here you would also implement actual audio muting logic
    // For example:
    // const audioElements = document.querySelectorAll('audio')
    // audioElements.forEach(audio => { audio.muted = newMuteState })
  }

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMute}
      className="text-white hover:text-purple-400 focus:outline-none"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </Button>
  )
}
