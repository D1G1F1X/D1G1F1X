"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import NewsletterSignup from "@/components/newsletter-signup"
import { ShoppingCart } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [purchaseCode, setPurchaseCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!purchaseCode) {
      setError("Purchase code is required to create an account")
      setIsLoading(false)
      return
    }

    // In a real app, you would call an API to register the user
    // For this demo, we'll just simulate a successful registration
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to login page
      router.push("/login?registered=true")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-purple-950 p-4">
      <div className="mx-auto w-full max-w-md space-y-6 bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="text-gray-400">
            Membership is exclusive to customers who purchase premium features or card decks
          </p>
        </div>

        <Alert className="bg-amber-900/50 border-amber-500/50 text-amber-200">
          <AlertDescription className="flex flex-col gap-2">
            <p>
              <strong>Direct signup is disabled.</strong> To create an account, you need to purchase a premium feature
              or card deck.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-2 border-amber-500/50 text-amber-200 hover:bg-amber-800/30 w-full sm:w-auto"
            >
              <Link href="/buy">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop Now
              </Link>
            </Button>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              placeholder="your@email.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseCode" className="text-white">
              Purchase Code
            </Label>
            <Input
              id="purchaseCode"
              placeholder="Enter your purchase code"
              required
              value={purchaseCode}
              onChange={(e) => setPurchaseCode(e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border-purple-500/50"
            />
            <p className="text-xs text-gray-400">You can find your purchase code in your order confirmation email</p>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-400">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-12 w-full max-w-md">
        <NewsletterSignup />
      </div>
    </div>
  )
}
