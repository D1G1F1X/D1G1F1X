"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Twitter, Facebook, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import type { OracleCard } from "@/types/cards"
import { generateShareableLink } from "@/lib/services/share-service" // Assuming this service exists

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
      const link = generateShareableLink({ readingText, question, spreadType, cards })
      setShareLink(link)
      setCopied(false)
    }
  }, [open, readingText, question, spreadType, cards])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
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
      `I just got an Oracle Card Reading for "${question}" (${spreadType}). Here's the insight: "${readingText}"\n\nView it here: ${shareLink}`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-purple-200">Share Your Reading</DialogTitle>
          <DialogDescription className="text-purple-300">
            Share this unique reading with friends or save it for later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="share-link" className="text-purple-200">
              Shareable Link
            </Label>
            <div className="flex space-x-2">
              <Input
                id="share-link"
                value={shareLink}
                readOnly
                className="flex-1 bg-purple-800 border-purple-700 text-white"
              />
              <Button onClick={handleCopy} size="icon" className="bg-purple-700 hover:bg-purple-600 text-white">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reading-summary" className="text-purple-200">
              Reading Summary
            </Label>
            <Textarea
              id="reading-summary"
              value={readingText}
              readOnly
              rows={4}
              className="bg-purple-800 border-purple-700 text-white resize-none"
            />
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
      </DialogContent>
    </Dialog>
  )
}
