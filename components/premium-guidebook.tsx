"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, BookOpen, Download } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function PremiumGuidebook() {
  const { isAuthenticated, isMember } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleAccessClick = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-white">NUMO Oracle Guidebook</h2>
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image src="/open-book-knowledge.png" alt="NUMO Oracle Guidebook" fill className="object-cover" />
            {!isMember && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Lock className="h-16 w-16 text-purple-400 opacity-70" />
              </div>
            )}
          </div>
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-purple-400">Complete Guidebook</h3>
              <Badge className="bg-purple-600">Premium</Badge>
            </div>
            <p className="text-gray-300 mb-6">
              The comprehensive NUMO Oracle Guidebook contains detailed explanations of all cards, spreads, and
              numerological concepts. Unlock the full potential of your NUMO Oracle Deck with this essential resource.
            </p>

            {isMember ? (
              <div className="space-y-4">
                <p className="text-green-400 text-sm">✓ Premium access unlocked</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <BookOpen className="mr-2 h-4 w-4" /> Read Guidebook
                </Button>
                <Button variant="outline" className="w-full border-purple-500 text-purple-300">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm mb-4">
                  This premium resource is available exclusively to members. Join today to access the complete
                  guidebook.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAccessClick}>
                  {isAuthenticated ? "Upgrade to Premium" : "Sign In to Access"}
                </Button>

                {showLoginPrompt && !isAuthenticated && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-md">
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
          </div>
        </div>
      </Card>
    </div>
  )
}
