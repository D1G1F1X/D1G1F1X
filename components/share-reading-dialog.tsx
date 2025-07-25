"use client"

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import type { OracleCard } from "@/types/cards"
import Image from "next/image"
import { getSpreadTypeName } from "@/lib/ai-prompt-manager"

interface ShareReadingDialogProps {
  open: boolean
  readingText: string
  question: string
  spreadType: string
  cards: OracleCard[]
  onClose: () => void
}

export function ShareReadingDialog({
  open,
  readingText,
  question,
  spreadType,
  cards,
  onClose,
}: ShareReadingDialogProps) {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (open) {
      // Generate a shareable URL. In a real app, this would involve
      // saving the reading to a public database and getting a unique ID.
      // For now, we'll create a placeholder URL.
      const baseUrl = window.location.origin
      const cardIds = cards.map((card) => card.id).join(",")
      const generatedUrl = `${baseUrl}/readings/share?q=${encodeURIComponent(question)}&s=${encodeURIComponent(spreadType)}&c=${encodeURIComponent(cardIds)}&r=${encodeURIComponent(readingText.substring(0, 100))}` // Truncate reading for URL
      setShareUrl(generatedUrl)
      setCopied(false)
    }
  }, [open, readingText, question, spreadType, cards])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCardOrientationDescription = (card: OracleCard) => {
    if (!card.orientation) return "Upright" // Default if no orientation is set

    switch (card.suit) {
      case "Cauldron":
        return card.orientation === "Cooking" ? "Cooking" : "Pouring"
      case "Sword":
        return card.orientation === "Edge First" ? "Edge First" : "Point First"
      case "Cord":
        return card.orientation === "Knot Before You" ? "Knot Before You" : "Knot Away"
      case "Spear":
        return card.orientation === "Shaft First" ? "Shaft First" : "Tip First"
      case "Stone":
        return card.orientation === "Rough Side" ? "Rough Side" : "Smooth Side"
      default:
        return card.orientation // Fallback to raw orientation if suit not matched
    }
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Share Your Oracle Reading</DialogTitle>
        <DialogDescription>You can share this reading with others via a link or by copying the text.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="share-url">Shareable Link</Label>
          <div className="flex items-center space-x-2">
            <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
            <Button type="button" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reading-summary">Reading Summary</Label>
          <Textarea
            id="reading-summary"
            value={`Question: ${question}\nSpread Type: ${getSpreadTypeName(spreadType)}\n\nCards Drawn:\n${cards
              .map((card) => `- ${card.fullTitle} (${getCardOrientationDescription(card)})`)
              .join("\n")}\n\nReading:\n${readingText}`}
            readOnly
            rows={10}
            className="resize-none"
          />
        </div>
        <div className="grid gap-2">
          <Label>Drawn Cards</Label>
          <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card) => (
              <div key={card.id} className="flex flex-col items-center text-center">
                <div className="relative h-24 w-16">
                  <Image
                    src={card.imagePath || "/placeholder.svg"}
                    alt={card.fullTitle}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-md"
                  />
                </div>
                <p className="mt-1 text-xs font-medium">{card.fullTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </DialogContent>
  )
}
