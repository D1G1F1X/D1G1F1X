"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateLifePath } from "@/lib/numerology"
import { getCardData } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import EnhancedCardDealer from "@/components/enhanced-card-dealer" // Import the EnhancedCardDealer

interface UserFormData {
  fullName: string
  birthDate: Date | undefined
  birthPlace: string
  question: string
}

const spreadTypes = [
  {
    id: "singleCard",
    name: "Single Card",
    description: "A simple draw for daily guidance or a specific question.",
    cardCount: 1,
  },
  {
    id: "threeCardPPF",
    name: "Past-Present-Future",
    description: "Reveals past influences, present situation, and future potential.",
    cardCount: 3,
  },
  {
    id: "fiveElements",
    name: "Five Elements Spread",
    description: "Reveals how the five elements influence your situation.",
    cardCount: 5,
  },
  {
    id: "celticCross",
    name: "Celtic Cross",
    description: "A comprehensive spread that examines multiple aspects of your question.",
    cardCount: 10,
  },
  {
    id: "relationship",
    name: "Relationship Reading",
    description: "Explores the dynamics and potential of a relationship.",
    cardCount: 8,
  },
  {
    id: "careerPath",
    name: "Career Path",
    description: "Guidance for your professional life and career decisions.",
    cardCount: 7,
  },
  {
    id: "yearAhead",
    name: "Year Ahead",
    description: "A forecast for the coming year, divided by seasons or quarters.",
    cardCount: 9,
  },
  {
    id: "decisionMaking",
    name: "Decision Making",
    description: "Helps clarify options and factors in an important decision.",
    cardCount: 8,
  },
]

export default function CardSimulatorPageClient() {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    birthDate: undefined,
    birthPlace: "",
    question: "",
  })
  const [formErrors, setFormErrors] = useState<Partial<UserFormData>>({})
  const [lifePath, setLifePath] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState<"form" | "cards" | "reading">("form")
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>("threeCardPPF")
  const [allCards, setAllCards] = useState<OracleCard[]>([])

  useEffect(() => {
    setAllCards(getCardData())
  }, [])

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

  const validateForm = () => {
    const errors: Partial<UserFormData> = {}
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
    }
    if (!formData.question.trim()) {
      errors.question = "Question is required"
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      if (formData.birthDate) {
        const lifePathNumber = calculateLifePath(formData.birthDate)
        setLifePath(lifePathNumber)
      }
      setCurrentStep("cards")
    }
  }

  const handleBackToForm = () => {
    setCurrentStep("form")
  }

  const handleReadingGenerated = () => {
    setCurrentStep("reading")
  }

  const currentSpread = spreadTypes.find((s) => s.id === selectedSpreadId)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8">NUMO Oracle Card Simulator</h1>

      {currentStep === "form" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your Reading Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date (Optional)</Label>
                  <DatePicker date={formData.birthDate} setDate={(date) => handleInputChange("birthDate", date)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Birth Place (Optional)</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                  placeholder="e.g., New York, USA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => handleInputChange("question", e.target.value)}
                  placeholder="What guidance do you seek from the oracle?"
                  className="min-h-[100px]"
                />
                {formErrors.question && <p className="text-red-500 text-sm">{formErrors.question}</p>}
              </div>
              <div className="space-y-2">
                <Label>Select Your Spread</Label>
                <RadioGroup
                  value={selectedSpreadId}
                  onValueChange={setSelectedSpreadId}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {spreadTypes.map((spread) => (
                    <Label
                      key={spread.id}
                      htmlFor={spread.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem id={spread.id} value={spread.id} className="sr-only" />
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-xl font-semibold">{spread.name}</span>
                        <span className="text-sm text-muted-foreground text-center">
                          {spread.description} ({spread.cardCount} cards)
                        </span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">
                Proceed to Cards
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {currentStep === "cards" && (
        <div className="flex flex-col items-center gap-6">
          <Button onClick={handleBackToForm} variant="outline" className="mb-4 bg-transparent">
            &larr; Back to Details
          </Button>
          <EnhancedCardDealer
            cards={allCards} // Pass allCards to the dealer
            onReadingGenerated={handleReadingGenerated}
            allowFreeReading={true} // Or false, depending on your logic
            defaultSpread={selectedSpreadId as "single" | "three"} // Cast to appropriate type
          />
        </div>
      )}

      {currentStep === "reading" && (
        <div className="flex flex-col items-center gap-6">
          <Button onClick={() => setCurrentStep("cards")} variant="outline" className="mb-4">
            &larr; Back to Cards
          </Button>
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Your Complete Reading</CardTitle>
            </CardHeader>
            <CardContent>
              {/* The EnhancedCardDealer already renders the reading content,
                  so you might just display a message here or re-render the reading component */}
              <p className="text-center text-lg">Your detailed oracle reading is ready!</p>
              {/* You might want to pass the generated reading data here to a dedicated display component */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
