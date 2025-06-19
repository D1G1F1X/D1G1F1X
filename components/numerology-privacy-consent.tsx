"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Lock } from "lucide-react"
import Link from "next/link"

interface NumerologyPrivacyConsentProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function NumerologyPrivacyConsent({ isOpen, onAccept, onDecline }: NumerologyPrivacyConsentProps) {
  const [dialogOpen, setDialogOpen] = useState(isOpen)

  console.log("NumerologyPrivacyConsent rendered with isOpen:", isOpen) // Debug log

  useEffect(() => {
    console.log("Dialog open state changed to:", isOpen) // Debug log
    setDialogOpen(isOpen)
  }, [isOpen])

  const handleAccept = () => {
    onAccept()
    setDialogOpen(false)
  }

  const handleDecline = () => {
    onDecline()
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg shadow-lg">
        <Card className="border-none shadow-none bg-gradient-to-br from-purple-900 to-indigo-950 text-white">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white">
              <Lock className="h-6 w-6 text-purple-300" />
              Enhance Your Experience
            </DialogTitle>
            <DialogDescription className="text-purple-200 mt-2">
              To enhance your numerology experience, we can remember your name, birth date, and calculated reports.
            </DialogDescription>
          </DialogHeader>
          <CardContent className="p-6 text-purple-100">
            <div className="mb-4">
              <h3 className="font-semibold text-purple-50 mb-2">What we store:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Your name and birth information (for calculations)</li>
                <li>Calculated numerology reports (if you choose to save them)</li>
                <li>Settings and customizations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-50 mb-2">Privacy commitment:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Data stored locally in your browser only</li>
                <li>Never shared with third parties</li>
                <li>You can delete anytime</li>
                <li>No tracking or analytics on personal data</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 pt-0">
            <div className="flex justify-center gap-4 w-full">
              <Button
                onClick={handleAccept}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                <Check className="mr-2 h-4 w-4" /> Accept & Continue
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 border-purple-400 text-purple-100 hover:bg-purple-800 hover:text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                <X className="mr-2 h-4 w-4" /> No Thanks
              </Button>
            </div>
            <div className="text-center text-sm text-purple-300">
              <Link href="/privacy-policy" className="underline hover:text-purple-50" prefetch={false}>
                Full Privacy Policy
              </Link>
              {" | "}
              <Link href="/terms-of-service" className="underline hover:text-purple-50" prefetch={false}>
                Terms of Service
              </Link>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
