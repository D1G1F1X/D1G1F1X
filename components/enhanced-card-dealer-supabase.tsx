"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { saveReading } from "@/lib/services/reading-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { OracleCard } from "@/types/cards"

// SpreadType interface remains the same as your original component
// UserFormData interface remains the same as your original component
// basicSpreadTypes and advancedSpreadTypes remain the same as your original component

export default function EnhancedCardDealerSupabase() {
  // Include all your original state variables
  const [selectedSpread, setSelectedSpread] = useState<string>("three")
  const [drawnCards, setDrawnCards] = useState<{ card: OracleCard; endUp: "first" | "second" }[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showBackside, setShowBackside] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showReading, setShowReading] = useState(false)
  // Include all other state variables and refs from your original component

  // Add new state variables for Supabase integration
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [readingTitle, setReadingTitle] = useState("")
  const [readingNotes, setReadingNotes] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Mocked variables to resolve errors. Replace with actual logic later.
  const currentSpread = { name: "Three Card Spread" }
  const formData = { question: "What does the future hold?" }
  const aiGeneratedReading = "This is a generated reading."

  const { user } = useAuth()
  const router = useRouter()

  // Keep all your original functions

  // Add functions for saving readings to Supabase
  const handleSaveReading = async () => {
    if (!user) {
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      // Prepare the reading data
      const readingData = {
        user_id: user.id,
        title: readingTitle || `${currentSpread.name} Reading`,
        question: formData.question,
        spread_type: selectedSpread,
        cards: drawnCards.map((item) => ({
          cardId: item.card.id,
          endUp: item.endUp,
          cardData: item.card,
        })),
        basic_reading: "Basic interpretation of the cards",
        advanced_reading: aiGeneratedReading || undefined,
        notes: readingNotes || undefined,
        is_public: isPublic,
      }

      const { success, id, error } = await saveReading(readingData)

      if (success && id) {
        setSaveSuccess(true)
        setTimeout(() => {
          setSaveDialogOpen(false)
          router.push(`/user/readings/${id}`)
        }, 1500)
      } else {
        setSaveError(error?.message || "Failed to save reading")
      }
    } catch (error) {
      console.error("Error saving reading:", error)
      setSaveError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Modify your component's return to include the save dialog
  // Include all your original JSX, and add the save button when showReading is true:

  // Add something like this to your reading options section:
  const renderSaveButton = () => {
    if (!showReading || !user) return null

    return (
      <Button onClick={() => setSaveDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
        Save Reading
      </Button>
    )
  }

  // Add this to your component to render the save dialog:
  const renderSaveDialog = () => {
    return (
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Your Reading</DialogTitle>
            <DialogDescription>Save this reading to your personal collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {saveSuccess && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <AlertDescription>Reading saved successfully! Redirecting...</AlertDescription>
              </Alert>
            )}
            {saveError && (
              <Alert variant="destructive">
                <AlertDescription>{saveError}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={readingTitle}
                onChange={(e) => setReadingTitle(e.target.value)}
                className="col-span-3"
                placeholder={`${currentSpread.name} Reading`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={readingNotes}
                onChange={(e) => setReadingNotes(e.target.value)}
                className="col-span-3"
                placeholder="Add any personal notes about this reading"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="public" className="text-right">
                Public
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="public" className="text-sm font-normal">
                  Make this reading public (others can view it)
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveReading} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Reading"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Include the renderSaveDialog() in your component's return
  // Return your original JSX structure and include these new elements
}
