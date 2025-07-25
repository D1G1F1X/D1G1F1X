"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Twitter, Facebook, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import type { OracleCard } from "@/types/cards"
import { generateShareableLinkForSimulator } from "@/lib/services/share-service" // Corrected import
import Image from "next/image"
import { getSpreadTypeName } from "@/lib/ai-prompt-manager"

interface ShareReadingDialogProps {
  open: boolean
  onClose: () => void
  readingText: string
  question: string
  spreadType: string
  cards: OracleCard[]
}

export function ShareReadingDialog({
  open,
  onClose,
  readingText,
  question,
  spreadType,
  cards,
}: ShareReadingDialogProps) {
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (open) {
      const link = generateShareableLinkForSimulator({ readingText, question, spreadType, cards }) // Corrected usage
      setShareLink(link)
      setCopied(false)
    }
  }, [open, readingText, question, spreadType, cards])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    toast({
      title: "Link Copied!",
      description: "The shareable link has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Check out my Oracle Card Reading: "${question}" - ${readingText.substring(0, 100)}...`,
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareLink)}`, "_blank")
  }

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, "_blank")
  }

  const handleShareEmail = () => {
    const subject = encodeURIComponent("My Oracle Card Reading")
    const body = encodeURIComponent(
      `I just got an Oracle Card Reading for "${question}" (${getSpreadTypeName(spreadType)}). Here's the insight: "${readingText}"\n\nView it here: ${shareLink}`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-purple-200">Share Your Oracle Reading</DialogTitle>
          <DialogDescription className="text-purple-300">
            You can share this reading with others via a link or by copying the text.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="share-url" className="text-purple-200">
              Shareable Link
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="share-url"
                value={shareLink}
                readOnly
                className="flex-1 bg-purple-800 border-purple-700 text-white"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopyLink}
                className="bg-purple-700 hover:bg-purple-600 text-white"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reading-summary" className="text-purple-200">
              Reading Summary
            </Label>
            <Textarea
              id="reading-summary"
              value={`Question: ${question}
Spread Type: ${getSpreadTypeName(spreadType)}

Cards Drawn:
${cards.map((card) => `- ${card.fullTitle} (${getCardOrientationDescription(card)})`).join("\n")}

Reading:
${readingText}`}
              readOnly
              rows={10}
              className="resize-none bg-purple-800 border-purple-700 text-white"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-purple-200">Drawn Cards</Label>
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
                  <p className="mt-1 text-xs font-medium text-purple-100">{card.fullTitle}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareTwitter}
              className="bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareFacebook}
              className="bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareEmail}
              className="bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Share via Email</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-500 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
