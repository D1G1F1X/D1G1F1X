"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TriangleIcon as ExclamationTriangleIcon, ShoppingCart, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [purchaseCode, setPurchaseCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await signUp(email, password, {
        full_name: fullName,
        purchaseCode: purchaseCode,
      })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Sign up error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Membership is exclusive to customers who purchase premium features or card decks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertDescription>Success! Please check your email to confirm your account.</AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
              <AlertDescription className="flex flex-col gap-2">
                <p>
                  <strong>Direct signup is disabled.</strong> To create an account, you need to purchase a premium
                  feature or card deck.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button asChild variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                    <Link href="/buy">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Shop Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                    <Link href="#newsletter-signup">
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe to Newsletter
                    </Link>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseCode">Purchase Code</Label>
                <Input
                  id="purchaseCode"
                  type="text"
                  value={purchaseCode}
                  onChange={(e) => setPurchaseCode(e.target.value)}
                  required
                  placeholder="Enter your purchase code"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can find your purchase code in your order confirmation email
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
