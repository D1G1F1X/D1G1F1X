"use client"

import { useState, useEffect } from "react"
import { ImageDebug } from "@/components/image-debug"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export default function DebugCardImagesPage() {
  const [cardIds, setCardIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [testCardId, setTestCardId] = useState("01cauldron-fire")

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("/api/card-directory")
        if (response.ok) {
          const data = await response.json()
          setCardIds(Object.keys(data))
        }
      } catch (error) {
        console.error("Error fetching card data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Debug Card Images</h1>
      <ImageDebug />
    </div>
  )
}
