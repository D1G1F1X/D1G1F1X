"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ElementalReading } from "@/lib/systems/elemental-oracle/reading-generator"
import type { ReadingRequest } from "@/lib/systems/elemental-oracle/reading-system"

export default function ElementalReadingInterface() {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    question: "",
  })

  const [readingOptions, setReadingOptions] = useState({
    numberOfCards: 3,
    method: "random" as "random" | "guided" | "specific",
    detailLevel: "comprehensive" as "basic" | "comprehensive" | "master",
    focusArea: "general" as "general" | "love" | "career" | "spiritual" | "health",
  })

  const [reading, setReading] = useState<ElementalReading | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const request: ReadingRequest = {
        querentInfo: {
          fullName: formData.fullName,
          birthDate: new Date(formData.birthDate),
          birthTime: formData.birthTime || undefined,
          birthPlace: formData.birthPlace || undefined,
          question: formData.question,
        },
        cardSelection: {
          method: readingOptions.method,
          numberOfCards: readingOptions.numberOfCards,
        },
        readingOptions: {
          includeReversals: false,
          focusArea: readingOptions.focusArea,
          detailLevel: readingOptions.detailLevel,
        },
      }

      const response = await fetch("/api/elemental-oracle/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      })

      const result = await response.json()

      if (result.success) {
        setReading(result.reading)
      } else {
        setError(result.error || "Failed to generate reading")
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Reading generation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getElementColor = (element: string) => {
    const colors = {
      fire: "bg-red-100 text-red-800 border-red-300",
      water: "bg-blue-100 text-blue-800 border-blue-300",
      air: "bg-yellow-100 text-yellow-800 border-yellow-300",
      earth: "bg-green-100 text-green-800 border-green-300",
      spirit: "bg-purple-100 text-purple-800 border-purple-300",
    }
    return colors[element as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-300"
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Elemental Oracle Reading System</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="birthDate">Birth Date *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="birthTime">Birth Time (optional)</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="birthPlace">Birth Place (optional)</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="question">Your Question *</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="What would you like guidance on?"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="numberOfCards">Number of Cards</Label>
                <Select
                  value={readingOptions.numberOfCards.toString()}
                  onValueChange={(value) =>
                    setReadingOptions({ ...readingOptions, numberOfCards: Number.parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="method">Selection Method</Label>
                <Select
                  value={readingOptions.method}
                  onValueChange={(value: any) => setReadingOptions({ ...readingOptions, method: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="guided">Guided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="focusArea">Focus Area</Label>
                <Select
                  value={readingOptions.focusArea}
                  onValueChange={(value: any) => setReadingOptions({ ...readingOptions, focusArea: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="love">Love & Relationships</SelectItem>
                    <SelectItem value="career">Career & Finance</SelectItem>
                    <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="detailLevel">Detail Level</Label>
                <Select
                  value={readingOptions.detailLevel}
                  onValueChange={(value: any) => setReadingOptions({ ...readingOptions, detailLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="master">Master Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating Reading..." : "Generate Reading"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {reading && (
        <Card>
          <CardHeader>
            <CardTitle>Your Elemental Oracle Reading</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">Confidence: {Math.round(reading.metadata.confidenceLevel * 100)}%</Badge>
              <Badge variant="outline">Significance: {reading.metadata.significanceRating}/5</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="guidance">Guidance</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">✨ Summary Insight</h3>
                  <p className="text-gray-700">{reading.interpretation.summaryInsight}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">🔢 Numerology Interpretation</h3>
                  <p className="text-gray-700">{reading.interpretation.numerologyInterpretation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">♈ Astrology Influence</h3>
                  <p className="text-gray-700">{reading.interpretation.astrologyInfluence}</p>
                </div>
              </TabsContent>

              <TabsContent value="cards" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reading.cards.map((card, index) => (
                    <Card key={card.id} className="border-2">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm">
                            {card.suit} {card.suitIndex}
                          </CardTitle>
                          <Badge className={getElementColor(card.element)}>{card.element}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{card.firstEndNumber}</Badge>
                          <Badge variant="outline">{card.secondEndNumber}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 mb-2">{card.meaning}</p>
                        <div className="text-xs text-gray-500">
                          <p>
                            <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                          </p>
                          <p>
                            <strong>Planet:</strong> {card.planetaryInfluence}
                          </p>
                          <p>
                            <strong>Sign:</strong> {card.astrologicalSign}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Elemental Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {Object.entries(reading.patterns.elementalPatterns.elementalBalance).map(([element, count]) => (
                        <div key={element} className="flex justify-between items-center mb-1">
                          <span className="capitalize">{element}</span>
                          <Badge className={getElementColor(element)}>{count}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Numerical Patterns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">
                        <strong>Average:</strong> {Math.round(reading.patterns.numericalPatterns.averageValue)}
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Sum:</strong> {reading.patterns.numericalPatterns.numericalSum}
                      </p>
                      {reading.patterns.numericalPatterns.masterNumbers.length > 0 && (
                        <p className="text-sm">
                          <strong>Master Numbers:</strong> {reading.patterns.numericalPatterns.masterNumbers.join(", ")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {reading.patterns.synchronicities.birthdateSynchronicities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Synchronicities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        {reading.patterns.synchronicities.birthdateSynchronicities.map((sync, index) => (
                          <li key={index}>• {sync}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="guidance" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">🌱 Elemental Guidance</h3>
                  <p className="text-gray-700 mb-4">{reading.interpretation.elementalGuidance}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">📋 Personalized Recommendations</h3>
                  <ul className="space-y-2">
                    {reading.interpretation.personalizedRecommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">⏰ Timing Considerations</h3>
                  <p className="text-gray-700">{reading.interpretation.timingConsiderations}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">❓ Follow-up Questions</h3>
                  <ul className="space-y-2">
                    {reading.interpretation.followUpQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className="text-gray-700">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: reading.interpretation.cardSpreadAnalysis.replace(/\n/g, "<br>"),
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
