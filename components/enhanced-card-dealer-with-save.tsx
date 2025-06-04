"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useReadings } from "@/lib/services/reading-service"
import { useAuth } from "@/lib/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

// Import your existing card dealer components
import { CardDealer } from "@/components/card-dealer"
import { ReadingDisplay } from "@/components/reading-display"

type CardDealerProps = {
  // Add your existing props here
  spreadType: string
  question?: string
}

export function EnhancedCardDealerWithSave({ spreadType, question }: CardDealerProps) {
  const [cards, setCards] = useState<any[]>([])
  const [reading, setReading] = useState<string>("")
  const [advancedReading, setAdvancedReading] = useState<string>("")
  const [isDealing, setIsDealing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingReading, setIsGeneratingReading] = useState(false)
  const [readingTitle, setReadingTitle] = useState("")

  const { user } = useAuth()
  const { createReading } = useReadings()
  const { toast } = useToast()

  // Handle card dealing
  const handleDealCards = async () => {
    setIsDealing(true)
    // Your existing card dealing logic
    // ...
    setIsDealing(false)

    // Generate a default title based on the spread type and date
    const date = new Date().toLocaleDateString()
    setReadingTitle(`${spreadType} Reading - ${date}`)

    // Generate reading
    await generateReading()
  }

  // Generate reading based on cards
  const generateReading = async () => {
    setIsGeneratingReading(true)

    try {
      // Your existing reading generation logic
      // This would typically call an API endpoint that uses AI to generate a reading
      // For now, we'll just set a placeholder
      setReading("This is a basic reading based on the cards drawn.")
      setAdvancedReading("This is a more detailed interpretation of your reading.")
    } catch (error) {
      console.error("Error generating reading:", error)
      toast({
        title: "Error",
        description: "Failed to generate reading. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReading(false)
    }
  }

  // Save reading to Supabase
  const saveReading = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save your reading.",
        variant: "destructive",
      })
      return
    }

    if (!cards.length || !reading) {
      toast({
        title: "No Reading to Save",
        description: "Please generate a reading first.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const result = await createReading({
        title: readingTitle,
        question: question || null,
        spread_type: spreadType,
        cards: cards,
        basic_reading: reading,
        advanced_reading: advancedReading || null,
        notes: null,
        is_public: false,
        user_id: user.id,
      })

      if (result) {
        toast({
          title: "Reading Saved",
          description: "Your reading has been saved successfully.",
        })
      } else {
        throw new Error("Failed to save reading")
      }
    } catch (error) {
      console.error("Error saving reading:", error)
      toast({
        title: "Error",
        description: "Failed to save reading. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <Button onClick={handleDealCards} disabled={isDealing || isGeneratingReading} className="w-full">
              {isDealing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Dealing Cards...
                </>
              ) : (
                "Deal Cards"
              )}
            </Button>

            {/* Card dealer component */}
            <CardDealer cards={cards} />

            {/* Reading display */}
            {reading && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={readingTitle}
                    onChange={(e) => setReadingTitle(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Reading Title"
                  />
                  <Button onClick={saveReading} disabled={isSaving || !user} className="whitespace-nowrap">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Reading"
                    )}
                  </Button>
                </div>

                <ReadingDisplay reading={reading} advancedReading={advancedReading} isLoading={isGeneratingReading} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!user && reading && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md text-yellow-800 dark:text-yellow-200">
          <p className="text-sm">Login to save your reading and access it later.</p>
        </div>
      )}
    </div>
  )
}
