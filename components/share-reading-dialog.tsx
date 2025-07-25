"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import type { OracleCard } from "@/types/cards"

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
      // In a real application, you would generate a unique shareable link here
      // For now, we'll create a placeholder link with some data
      const cardTitles = cards.map((card) => card.fullTitle).join(", ")
      const link = `${window.location.origin}/readings/share?question=${encodeURIComponent(question)}&spread=${encodeURIComponent(spreadType)}&cards=${encodeURIComponent(cardTitles)}&summary=${encodeURIComponent(readingText)}`
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
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Reading</DialogTitle>
          <DialogDescription>Share this unique reading with friends or save it for later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reading-summary" className="text-right">
              Summary
            </Label>
            <Textarea id="reading-summary" value={readingText} readOnly className="col-span-3 h-24 resize-none" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="share-link" className="text-right">
              Link
            </Label>
            <Input id="share-link" value={shareLink} readOnly className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCopyLink}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
