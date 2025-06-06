"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, ExternalLink, X, Check } from "lucide-react"
import Link from "next/link"
import { userDataService } from "@/lib/services/user-data-service"

interface PrivacyNoticeProps {
  context?: "card-simulator" | "numerology-calculator" | "general"
  onConsentChange?: (hasConsent: boolean) => void
}

export function PrivacyNotice({ context = "general", onConsentChange }: PrivacyNoticeProps) {
  const [hasConsent, setHasConsent] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = userDataService.hasConsent()
    setHasConsent(consent)
    setShowBanner(!consent)
    onConsentChange?.(consent)
  }, [onConsentChange])

  const handleAcceptConsent = () => {
    userDataService.setConsent(true)
    setHasConsent(true)
    setShowBanner(false)
    onConsentChange?.(true)
  }

  const handleDeclineConsent = () => {
    userDataService.setConsent(false)
    setHasConsent(false)
    setShowBanner(false)
    onConsentChange?.(false)
  }

  const getContextMessage = () => {
    switch (context) {
      case "card-simulator":
        return "To enhance your card reading experience, we can remember your name, question preferences, and reading history."
      case "numerology-calculator":
        return "To make future calculations easier, we can remember your name, birth date, and calculation preferences."
      default:
        return "To provide you with a personalized experience, we can remember your preferences and information."
    }
  }

  if (hasConsent) {
    return (
      <Card className="bg-green-900/20 border-green-500/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-green-300 mb-1">Privacy Protected</h3>
              <p className="text-xs text-green-200 mb-2">
                Your information is securely stored locally and never shared with third parties.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  href="/privacy-policy"
                  className="text-green-300 hover:text-green-200 underline inline-flex items-center"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Privacy Policy
                </Link>
                <button
                  onClick={() => {
                    userDataService.clearAllData()
                    setHasConsent(false)
                    setShowBanner(true)
                    onConsentChange?.(false)
                  }}
                  className="text-green-300 hover:text-green-200 underline"
                >
                  Clear My Data
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!showBanner) return null

  return (
    <Card className="bg-blue-900/20 border-blue-500/30 mb-6">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Lock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-300 mb-2">Enhance Your Experience</h3>
            <p className="text-xs text-blue-200 mb-3">{getContextMessage()}</p>

            <div className="bg-blue-950/50 rounded-lg p-3 mb-3">
              <h4 className="text-xs font-medium text-blue-300 mb-2">What we store:</h4>
              <ul className="text-xs text-blue-200 space-y-1">
                <li>• Your name and birth information (for calculations)</li>
                <li>• Reading preferences and history</li>
                <li>• Settings and customizations</li>
              </ul>

              <h4 className="text-xs font-medium text-blue-300 mt-3 mb-2">Privacy commitment:</h4>
              <ul className="text-xs text-blue-200 space-y-1">
                <li>• Data stored locally in your browser only</li>
                <li>• Never shared with third parties</li>
                <li>• You can delete anytime</li>
                <li>• No tracking or analytics on personal data</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Link
                href="/privacy-policy"
                className="text-blue-300 hover:text-blue-200 underline text-xs inline-flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Full Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-blue-300 hover:text-blue-200 underline text-xs inline-flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Terms of Service
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAcceptConsent} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Check className="h-3 w-3 mr-1" />
                Accept & Continue
              </Button>
              <Button
                onClick={handleDeclineConsent}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30"
              >
                <X className="h-3 w-3 mr-1" />
                No Thanks
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
