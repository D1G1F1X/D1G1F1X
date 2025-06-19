"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, ExternalLink, X, Check, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface InlinePrivacyNoticeProps {
  context?: "numerology-calculator" | "card-simulator" | "general"
  onConsentChange?: (hasConsent: boolean) => void
}

export function InlinePrivacyNotice({ context = "general", onConsentChange }: InlinePrivacyNoticeProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("numerologyPrivacyAccepted")
    const consentValue = consent === "true" ? true : consent === "false" ? false : null
    setHasConsent(consentValue)
    onConsentChange?.(consentValue === true)
  }, [onConsentChange])

  const handleAcceptConsent = () => {
    localStorage.setItem("numerologyPrivacyAccepted", "true")
    setHasConsent(true)
    onConsentChange?.(true)

    // Show welcome message for new users
    setTimeout(() => {
      if (typeof window !== "undefined" && !localStorage.getItem("numo_user_profile")) {
        console.log("Privacy consent accepted - data will now be saved locally")
      }
    }, 100)
  }

  const handleDeclineConsent = () => {
    localStorage.setItem("numerologyPrivacyAccepted", "false")
    setHasConsent(false)
    onConsentChange?.(false)
  }

  const handleClearData = () => {
    localStorage.removeItem("numerologyPrivacyAccepted")
    // Clear other related data
    const keysToRemove = Object.keys(localStorage).filter(
      (key) => key.startsWith("numerology") || key.startsWith("numo"),
    )
    keysToRemove.forEach((key) => localStorage.removeItem(key))

    // Clear cookies as well
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      if (name.startsWith("numo_")) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    })

    setHasConsent(null)
    onConsentChange?.(false)

    // Show confirmation
    if (typeof window !== "undefined" && window.alert) {
      window.alert("All your data has been cleared successfully.")
    }
  }

  const getContextMessage = () => {
    switch (context) {
      case "numerology-calculator":
        return "To make future calculations easier and provide personalized insights, we can remember your name, birth date, and calculation preferences."
      case "card-simulator":
        return "To enhance your card reading experience, we can remember your reading preferences, question history, and provide more personalized card interpretations."
      default:
        return "To provide you with a personalized experience, we can remember your preferences and information."
    }
  }

  const getContextTitle = () => {
    switch (context) {
      case "numerology-calculator":
        return "Enhance Your Numerology Experience"
      case "card-simulator":
        return "Enhance Your Card Reading Experience"
      default:
        return "Enhance Your Experience"
    }
  }

  // If consent has been given, show a compact confirmation
  if (hasConsent === true) {
    return (
      <Card className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Privacy Protected</h3>
                <p className="text-xs text-green-700 dark:text-green-400 mb-2">
                  Your information is securely stored locally and never shared with third parties.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <Link
                    href="/privacy-policy"
                    className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 underline inline-flex items-center"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Privacy Policy
                  </Link>
                  <button
                    onClick={handleClearData}
                    className="text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 underline"
                  >
                    Clear My Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If consent has been declined, show a minimal notice
  if (hasConsent === false) {
    return (
      <Card className="bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Basic Mode Active</h3>
                <p className="text-xs text-gray-700 dark:text-gray-400 mb-2">
                  Enhanced features are disabled. Your data won't be stored locally.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <button
                    onClick={() => setHasConsent(null)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline"
                  >
                    Change Preference
                  </button>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 underline inline-flex items-center"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If no consent decision has been made, show the full privacy notice
  return (
    <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800/30 mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">{getContextTitle()}</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">{getContextMessage()}</p>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 mb-3"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Privacy Details
                </>
              )}
            </button>

            {isExpanded && (
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">What we store:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      {context === "card-simulator" ? (
                        <>
                          <li>• Your name and reading preferences</li>
                          <li>• Question history and card draws</li>
                          <li>• Reading interpretations and insights</li>
                          <li>• Saved readings (if you choose to save them)</li>
                        </>
                      ) : (
                        <>
                          <li>• Your name and birth information (for calculations)</li>
                          <li>• Calculation preferences and history</li>
                          <li>• Settings and customizations</li>
                          <li>• Saved reports (if you choose to save them)</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Privacy commitment:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Data stored locally in your browser only</li>
                      <li>• Never shared with third parties</li>
                      <li>• You can delete anytime</li>
                      <li>• No tracking or analytics on personal data</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-4">
              <Link
                href="/privacy-policy"
                className="text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 underline text-sm inline-flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Full Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 underline text-sm inline-flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Terms of Service
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAcceptConsent} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Check className="h-4 w-4 mr-2" />
                Accept & Continue
              </Button>
              <Button
                onClick={handleDeclineConsent}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/30"
              >
                <X className="h-4 w-4 mr-2" />
                No Thanks
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
