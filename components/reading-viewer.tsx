"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PdfService } from "@/lib/services/pdf-service"
import { format } from "date-fns"
import { Download, ArrowLeft, Save, Edit } from "lucide-react"
import type { SavedReading } from "@/types/saved-readings"
import { Textarea } from "@/components/ui/textarea"
import { ReadingHistoryService } from "@/lib/services/reading-history-service"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { CacheService } from "@/lib/services/cache-service"

interface ReadingViewerProps {
  reading: SavedReading
  onBack: () => void
  onRefresh?: () => void
}

export function ReadingViewer({ reading, onBack, onRefresh }: ReadingViewerProps) {
  const [notes, setNotes] = useState(reading.notes || "")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("cards")

  useEffect(() => {
    // Track view when component mounts
    if (reading?.id) {
      CacheService.incrementViewCount("reading", reading.id).catch((error) =>
        console.error("Error tracking view:", error),
      )
    }
  }, [reading?.id])

  const handleDownloadPdf = async () => {
    try {
      const pdfBlob = await PdfService.generateReadingPdf(reading)

      // Create a download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `NUMO-Reading-${format(new Date(reading.date), "yyyy-MM-dd")}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  const handleSaveNotes = () => {
    try {
      const updatedReading = {
        ...reading,
        notes,
      }

      ReadingHistoryService.saveReading(updatedReading)
      setIsEditingNotes(false)
      onRefresh?.()
    } catch (error) {
      console.error("Error saving notes:", error)
      alert("Failed to save notes. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-purple-300">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Button>
        <Button onClick={handleDownloadPdf} className="bg-purple-600 hover:bg-purple-700">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-purple-300">{reading.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>{format(new Date(reading.date), "PPP")}</span>
            <span>{reading.spreadType}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reading.question && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-1">Question</h3>
              <p className="text-white bg-gray-800/50 p-3 rounded-md border border-gray-700">{reading.question}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reading.cards.map((item, index) => {
                  const { card, endUp, position } = item
                  const cardEnd = endUp === "first" ? card.firstEnd : card.secondEnd
                  const cardImage = endUp === "first" ? card.firstEndImage : card.secondEndImage

                  return (
                    <Card key={index} className="bg-gray-800/50 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md text-purple-300">{position}</CardTitle>
                        <CardDescription>
                          {card.name} ({endUp === "first" ? "First End" : "Second End"})
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative w-full h-48 overflow-hidden rounded border border-gray-700">
                          <Image
                            src={cardImage || "/placeholder.svg?height=280&width=180&query=mystical card"}
                            alt={card.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-400">Element:</span>
                            <span className="text-sm text-gray-300 ml-2">{card.element}</span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Number:</span>
                            <span className="text-sm text-gray-300 ml-2">{cardEnd.number}</span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Keywords:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cardEnd.keywords.map((keyword, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-purple-900/20 text-purple-300 text-xs rounded-full"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="reading">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">Reading Interpretation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{reading.advancedReading || reading.basicReading}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-purple-300">Personal Notes</CardTitle>
                  {!isEditingNotes ? (
                    <Button variant="ghost" onClick={() => setIsEditingNotes(true)} className="text-purple-300">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Notes
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={handleSaveNotes} className="text-green-300">
                      <Save className="h-4 w-4 mr-2" />
                      Save Notes
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditingNotes ? (
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add your personal notes about this reading here..."
                      className="min-h-[200px] bg-gray-900/50 border-gray-700"
                    />
                  ) : (
                    <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700 min-h-[200px]">
                      {notes ? (
                        <p className="whitespace-pre-wrap">{notes}</p>
                      ) : (
                        <p className="text-gray-500 italic">
                          No notes added yet. Click 'Edit Notes' to add your thoughts.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
