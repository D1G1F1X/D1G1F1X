"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, Star, Share2, Printer, ArrowLeft, Edit, Download } from "lucide-react"
import type { SavedReading } from "@/types/saved-readings"
import Image from "next/image"
import { ReadingShare } from "@/components/reading-share"

interface ReadingDetailViewProps {
  readingId: string
}

export function ReadingDetailView({ readingId }: ReadingDetailViewProps) {
  const [reading, setReading] = useState<SavedReading | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showSharePanel, setShowSharePanel] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchReading()
  }, [readingId])

  const fetchReading = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Try to get from localStorage first
      const savedReadings = localStorage.getItem("numoReadings")
      if (savedReadings) {
        const parsedReadings = JSON.parse(savedReadings) as SavedReading[]
        const foundReading = parsedReadings.find((r) => r.id === readingId)

        if (foundReading) {
          setReading(foundReading)
          setNotes(foundReading.notes || "")
          return
        }
      }

      // If not found in localStorage, generate a mock reading
      const mockReading = generateMockReading(readingId)
      setReading(mockReading)
      setNotes(mockReading.notes || "")
    } catch (error) {
      console.error("Error fetching reading:", error)
      toast({
        title: "Error",
        description: "Failed to load the reading. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateMockReading = (id: string): SavedReading => {
    const spreadTypes = ["Single Card", "Three Card", "Five Elements", "Celtic Cross", "Relationship"]
    const titles = [
      "Career Guidance",
      "Relationship Insight",
      "Personal Growth",
      "Spiritual Direction",
      "Financial Outlook",
    ]
    const questions = [
      "What should I focus on in my career right now?",
      "How can I improve my relationship with my partner?",
      "What area of personal growth should I prioritize?",
      "How can I deepen my spiritual practice?",
      "What should I know about my financial situation?",
    ]

    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    const titleIndex = Number.parseInt(id.replace("reading-", "")) % titles.length

    return {
      id,
      title: titles[titleIndex],
      date: date.toISOString(),
      spreadType: spreadTypes[Math.floor(Math.random() * spreadTypes.length)],
      question: questions[titleIndex],
      cards: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
        id: `card-${j}`,
        name: `Card ${j + 1}`,
        position: `Position ${j + 1}`,
        element: ["Fire", "Water", "Air", "Earth", "Spirit"][Math.floor(Math.random() * 5)],
        imagePath: `/cards/${Math.floor(Math.random() * 10)}${["cauldron", "sword", "spear", "stone", "cord"][Math.floor(Math.random() * 5)]}-${["fire", "water", "air", "earth", "spirit"][Math.floor(Math.random() * 5)]}.jpg`,
      })),
      content: `This reading for "${questions[titleIndex]}" suggests that you should focus on your inner growth and development. The cards indicate a period of transformation and opportunity ahead. Pay attention to the signs around you and trust your intuition during this time.\n\nThe first card represents your current situation and suggests that you may be feeling uncertain about your path. The second card indicates hidden influences that are affecting your situation - there may be more support available than you realize. The third card points to potential outcomes if you embrace the changes coming your way.`,
      notes:
        titleIndex % 3 === 0 ? "I found this reading particularly insightful. Need to revisit in a few weeks." : "",
      isFavorite: titleIndex % 4 === 0,
      tags: titleIndex % 2 === 0 ? ["important", "insightful"] : ["follow-up"],
    }
  }

  const toggleFavorite = () => {
    if (!reading) return

    const updatedReading = { ...reading, isFavorite: !reading.isFavorite }
    setReading(updatedReading)

    // Update in localStorage
    const savedReadings = localStorage.getItem("numoReadings")
    if (savedReadings) {
      const parsedReadings = JSON.parse(savedReadings) as SavedReading[]
      const updatedReadings = parsedReadings.map((r) => (r.id === readingId ? updatedReading : r))
      localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
    }

    toast({
      title: updatedReading.isFavorite ? "Added to Favorites" : "Removed from Favorites",
      description: updatedReading.isFavorite
        ? "This reading has been added to your favorites."
        : "This reading has been removed from your favorites.",
    })
  }

  const saveNotes = async () => {
    if (!reading) return

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const updatedReading = { ...reading, notes }
      setReading(updatedReading)

      // Update in localStorage
      const savedReadings = localStorage.getItem("numoReadings")
      if (savedReadings) {
        const parsedReadings = JSON.parse(savedReadings) as SavedReading[]
        const updatedReadings = parsedReadings.map((r) => (r.id === readingId ? updatedReading : r))
        localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
      }

      setIsEditing(false)
      toast({
        title: "Notes Saved",
        description: "Your notes have been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        title: "Error",
        description: "Failed to save your notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const shareReading = () => {
    setShowSharePanel(!showSharePanel)
  }

  const printReading = () => {
    window.print()
  }

  const downloadPDF = async () => {
    toast({
      title: "Download Started",
      description: "Your reading is being prepared for download.",
    })

    // In a real app, this would generate a PDF
    // For demo purposes, we'll just show a success message after a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Download Complete",
      description: "Your reading has been downloaded as a PDF.",
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

  if (!reading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
          <h3 className="text-xl font-bold mb-2">Reading Not Found</h3>
          <p className="text-gray-400 mb-4">The requested reading could not be found.</p>
          <Button onClick={() => router.push("/user/readings")}>Back to Readings</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/user/readings")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Readings
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleFavorite}>
              <Star className={`h-4 w-4 mr-2 ${reading.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
              {reading.isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
            <Button variant="outline" onClick={shareReading}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" onClick={printReading}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden flex gap-2 justify-end">
          <Button variant="outline" onClick={printReading}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={downloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {showSharePanel && <ReadingShare reading={reading} className="mb-4" />}

        <Card className="bg-black/30 border-gray-800 print:bg-white print:text-black">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-3xl">{reading.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(reading.date).toLocaleDateString()}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <Badge variant="outline">{reading.spreadType}</Badge>
                  {reading.tags &&
                    reading.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="ml-1">
                        {tag}
                      </Badge>
                    ))}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push(`/readings/edit/${reading.id}`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Reading
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Your Question</h3>
              <p className="text-gray-300 italic">"{reading.question}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1">
                <h3 className="text-xl font-semibold mb-4">Cards in Your Reading</h3>
                <div className="grid grid-cols-1 gap-4">
                  {reading.cards.map((card, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-gray-800"
                    >
                      <div className="relative w-[60px] h-[90px] rounded-md overflow-hidden border border-gray-700 flex-shrink-0">
                        <Image
                          src={card.imagePath || "/placeholder.svg?height=90&width=60&query=oracle card"}
                          alt={card.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=90&width=60&query=oracle card"
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{card.name}</h4>
                        <p className="text-sm text-gray-400">{card.position}</p>
                        <Badge className="mt-1" variant="outline">
                          {card.element}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Reading Interpretation</h3>
                <div className="p-4 bg-black/20 rounded-lg border border-gray-800 prose prose-invert max-w-none">
                  {reading.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Your Notes</h3>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {reading.notes ? "Edit Notes" : "Add Notes"}
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your personal notes about this reading..."
                    className="min-h-[150px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNotes(reading.notes || "")
                        setIsEditing(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={saveNotes} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Notes"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-black/20 rounded-lg border border-gray-800 min-h-[100px]">
                  {reading.notes ? (
                    <p className="text-gray-300">{reading.notes}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      No notes added yet. Click "Add Notes" to add your thoughts about this reading.
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
            <div className="text-sm text-gray-400">
              <Clock className="h-4 w-4 inline mr-1" />
              Last updated: {new Date(reading.date).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={shareReading}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
