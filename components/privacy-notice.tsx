"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Info } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface PrivacyNoticeProps {
  title: string
  description: string
  features: string[]
  storageKey: string
  onConsentChange: (consent: boolean) => void
}

export function PrivacyNotice({ title, description, features, storageKey, onConsentChange }: PrivacyNoticeProps) {
  const [consent, setConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      try {
        const savedConsent = localStorage.getItem(storageKey) === "true"
        setConsent(savedConsent)
        onConsentChange(savedConsent)
      } catch (error) {
        console.error("Error reading consent from localStorage:", error)
      }
    }
  }, [storageKey, onConsentChange])

  const handleConsentChange = (newConsent: boolean) => {
    setConsent(newConsent)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, newConsent.toString())
      } catch (error) {
        console.error("Error saving consent to localStorage:", error)
      }
    }
    onConsentChange(newConsent)
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="privacy-consent" checked={consent} onCheckedChange={handleConsentChange} />
            <Label htmlFor="privacy-consent" className="text-sm font-medium">
              Enable personalization features
            </Label>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="text-xs">
            <Info className="h-3 w-3 mr-1" />
            Details
          </Button>
        </div>

        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleContent className="space-y-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <p className="font-medium mb-2">What we store locally:</p>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs">
                All data is stored locally in your browser and never sent to external servers. You can clear this data
                at any time by disabling the toggle above.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
