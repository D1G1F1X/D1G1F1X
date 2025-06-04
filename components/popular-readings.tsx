"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface PopularReading {
  id: string
  title: string
  spreadType: string
  viewCount: number
}

export function PopularReadings() {
  const [popularReadings, setPopularReadings] = useState<PopularReading[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularReadings() {
      try {
        const response = await fetch("/api/readings/popular")
        if (response.ok) {
          const data = await response.json()
          setPopularReadings(data)
        }
      } catch (error) {
        console.error("Error fetching popular readings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularReadings()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Readings</CardTitle>
          <CardDescription>Loading popular readings...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (popularReadings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Readings</CardTitle>
          <CardDescription>No popular readings found</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Readings</CardTitle>
        <CardDescription>Most viewed readings this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {popularReadings.map((reading) => (
            <li key={reading.id} className="flex justify-between items-center">
              <Link href={`/readings/${reading.id}`} className="text-primary hover:underline">
                {reading.title}
              </Link>
              <span className="text-sm text-muted-foreground">{reading.viewCount} views</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
