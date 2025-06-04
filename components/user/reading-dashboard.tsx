"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star, Trash2 } from "lucide-react"

interface SavedReading {
  id: string
  question: string
  cards: any[]
  reading: string
  spreadType: string
  date: string
  isFavorite: boolean
}

export function ReadingDashboard() {
  const [readings, setReadings] = useState<SavedReading[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReadings()
  }, [])

  const loadReadings = () => {
    try {
      if (typeof window !== "undefined") {
        const savedReadings = localStorage.getItem("numoReadings")
        if (savedReadings) {
          const parsedReadings = JSON.parse(savedReadings)
          setReadings(parsedReadings.slice(0, 10)) // Show last 10 readings
        }
      }
    } catch (error) {
      console.error("Error loading readings:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (id: string) => {
    try {
      if (typeof window !== "undefined") {
        const savedReadings = localStorage.getItem("numoReadings")
        if (savedReadings) {
          const parsedReadings = JSON.parse(savedReadings)
          const updatedReadings = parsedReadings.map((reading: SavedReading) =>
            reading.id === id ? { ...reading, isFavorite: !reading.isFavorite } : reading,
          )
          localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
          setReadings(updatedReadings.slice(0, 10))
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  const deleteReading = (id: string) => {
    try {
      if (typeof window !== "undefined") {
        const savedReadings = localStorage.getItem("numoReadings")
        if (savedReadings) {
          const parsedReadings = JSON.parse(savedReadings)
          const updatedReadings = parsedReadings.filter((reading: SavedReading) => reading.id !== id)
          localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
          setReadings(updatedReadings.slice(0, 10))
        }
      }
    } catch (error) {
      console.error("Error deleting reading:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Readings
        </CardTitle>
        <CardDescription>Your latest oracle card readings</CardDescription>
      </CardHeader>
      <CardContent>
        {readings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No readings saved yet</p>
            <Button onClick={() => (window.location.href = "/tools/card-simulator")}>Create Your First Reading</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {readings.map((reading) => (
              <div key={reading.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{reading.spreadType}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {new Date(reading.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="font-medium mb-1 line-clamp-1">{reading.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{reading.reading}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{reading.cards.length} cards drawn</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(reading.id)}
                      className={reading.isFavorite ? "text-yellow-500" : "text-gray-400"}
                    >
                      <Star className="h-4 w-4" fill={reading.isFavorite ? "currentColor" : "none"} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReading(reading.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
