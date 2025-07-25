"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function HeavyComponent() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a heavy computation or data fetching
    const timer = setTimeout(() => {
      setData("This is content from a lazily loaded heavy component!")
      setLoading(false)
    }, 2000) // Simulate 2 seconds of loading

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading Heavy Component...
      </div>
    )
  }

  return (
    <Card className="bg-blue-100 border-blue-300">
      <CardHeader>
        <CardTitle className="text-blue-800">Heavy Component Loaded!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700">{data}</p>
      </CardContent>
    </Card>
  )
}
