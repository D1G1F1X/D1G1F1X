"use client"

import { useState, useEffect } from "react"
import { ReadingExport } from "@/components/reading-export"
import type { SavedReading } from "@/types/saved-readings"

export default function ExportReadingsPage() {
  const [readings, setReadings] = useState<SavedReading[]>([])
  const [selectedReadings, setSelectedReadings] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReadings()
  }, [])

  const fetchReadings = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // For demo purposes, we'll load from localStorage or generate mock data

      const savedReadings = localStorage.getItem("numoReadings")
      if (savedReadings) {
        const parsedReadings = JSON.parse(savedReadings) as SavedReading[]
        setReadings(parsedReadings)
      } else {
        // Generate mock data
        const mockReadings = generateMockReadings(10)
        setReadings(mockReadings)
        localStorage.setItem("numoReadings", JSON.stringify(mockReadings))
      }
    } catch (error) {
      console.error("Error fetching readings:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockReadings = (count: number): SavedReading[] => {
    const spreadTypes = ["Single Card", "Three Card", "Five Elements", "Celtic Cross", "Relationship"]
    const titles = [
      "Career Guidance",
      "Relationship Insight",
      "Personal Growth",
      "Spiritual Direction",
      "Financial Outlook",
      "Health and Wellness",
      "Family Matters",
      "Creative Inspiration",
      "Decision Making",
      "Life Purpose",
    ]

    return Array.from({ length: count }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))

      return {
        id: `reading-${i + 1}`,
        title: titles[i % titles.length],
        date: date.toISOString(),
        spreadType: spreadTypes[Math.floor(Math.random() * spreadTypes.length)],
        question: "What should I focus on right now?",
        cards: [],
        content: "This reading suggests that you should focus on your inner growth and development.",
        notes: i % 3 === 0 ? "I found this reading particularly insightful." : "",
        isFavorite: i % 4 === 0,
        tags: i % 2 === 0 ? ["important", "insightful"] : ["follow-up"],
      }
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Export Readings</h1>
          <p className="text-gray-400">Select readings to export as PDF for your records or to share with others.</p>
        </div>

        <ReadingExport readings={readings} selectedReadings={selectedReadings} onSelectReadings={setSelectedReadings} />
      </div>
    </div>
  )
}
