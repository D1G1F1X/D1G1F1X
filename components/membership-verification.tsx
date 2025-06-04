"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import Link from "next/link"

interface MembershipVerificationProps {
  children: React.ReactNode
  premiumContent?: boolean
  teaser?: React.ReactNode
}

export function MembershipVerification({ children, premiumContent = true, teaser }: MembershipVerificationProps) {
  const { isAuthenticated, isMember, isAdmin } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // If not premium content, or user is admin or member, show the content
  if (!premiumContent || isAdmin || isMember) {
    return <>{children}</>
  }

  // Otherwise show restricted access message
  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-purple-400">Premium Content</CardTitle>
          <Lock className="h-5 w-5 text-purple-400" />
        </div>
        <CardDescription className="text-gray-400">This content is available exclusively to members</CardDescription>
      </CardHeader>
      <CardContent>
        {teaser ? (
          <div className="mb-6">{teaser}</div>
        ) : (
          <p className="text-gray-300 mb-6">
            Unlock premium content including the complete NUMO Oracle Guidebook, advanced spreads, and exclusive
            interpretations by becoming a member.
          </p>
        )}

        {isAuthenticated ? (
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Upgrade to Premium</Button>
        ) : (
          <div className="space-y-4">
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setShowLoginPrompt(true)}>
              Sign In to Access
            </Button>

            {showLoginPrompt && (
              <div className="p-3 bg-gray-700/50 rounded-md">
                <p className="text-sm text-gray-300">
                  Please{" "}
                  <Link href="/login" className="text-purple-400 hover:underline">
                    sign in
                  </Link>{" "}
                  or
                  <Link href="/register" className="text-purple-400 hover:underline">
                    {" "}
                    create an account
                  </Link>{" "}
                  to access premium content.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
