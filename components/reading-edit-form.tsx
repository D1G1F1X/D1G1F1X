"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, X } from "lucide-react"
import type { SavedReading } from "@/types/saved-readings"
import Image from "next/image"

interface ReadingEditFormProps {
  readingId: string
}

export function ReadingEditForm({ readingId }: ReadingEditFormProps) {
  const [reading, setReading] = useState<SavedReading | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    content: "",
    notes: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
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
          setFormData({
            title: foundReading.title,
            question: foundReading.question,
            content: foundReading.content,
            notes: foundReading.notes || "",
            tags: foundReading.tags || [],
          })
          return
        }
      }

      // If not found in localStorage, generate a mock reading
      const mockReading = generateMockReading(readingId)
      setReading(mockReading)
      setFormData({
        title: mockReading.title,
        question: mockReading.question,
        content: mockReading.content,
        notes: mockReading.notes || "",
        tags: mockReading.tags || [],
      })
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
      content: `This reading for "${questions[titleIndex]}" suggests that you should focus on your inner growth and development. The cards indicate a period of transformation and opportunity ahead.`,
      notes:
        titleIndex % 3 === 0 ? "I found this reading particularly insightful. Need to revisit in a few weeks." : "",
      isFavorite: titleIndex % 4 === 0,
      tags: titleIndex % 2 === 0 ? ["important", "insightful"] : ["follow-up"],
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reading) return

    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedReading = {
        ...reading,
        title: formData.title,
        question: formData.question,
        content: formData.content,
        notes: formData.notes,
        tags: formData.tags,
        date: new Date().toISOString(), // Update the date to reflect the edit
      }

      // Update in localStorage
      const savedReadings = localStorage.getItem("numoReadings")
      if (savedReadings) {
        const parsedReadings = JSON.parse(savedReadings) as SavedReading[]
        const updatedReadings = parsedReadings.map((r) => (r.id === readingId ? updatedReading : r))
        localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
      }

      toast({
        title: "Reading Updated",
        description: "Your reading has been updated successfully.",
      })

      // Navigate back to the reading detail page
      router.push(`/readings/${readingId}`)
    } catch (error) {
      console.error("Error saving reading:", error)
      toast({
        title: "Error",
        description: "Failed to save your changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
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
          <Button variant="outline" onClick={() => router.push(`/readings/${readingId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel Editing
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Reading Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a title for your reading"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="question">Your Question</Label>
                  <Input
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="What question did you ask for this reading?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Reading Interpretation</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter the interpretation of your reading"
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Your Personal Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add your personal notes about this reading (optional)"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-gray-700 p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-semibold mb-4">Cards in This Reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                <p className="text-sm text-gray-400 mt-4">
                  Note: Card selection cannot be modified. To create a new reading with different cards, please use the
                  card simulator.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
            <Button variant="outline" onClick={() => router.push(`/readings/${readingId}`)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
