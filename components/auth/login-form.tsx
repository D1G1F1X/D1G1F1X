"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // For demo purposes, accept admin credentials on user login too
      if ((email === "admin@numoracle.com" || email === "admin") && password === "numoracle") {
        // Set a secure cookie with proper attributes
        document.cookie = `user_session=logged_in; path=/; max-age=${60 * 60 * 24}` // 1 day

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        // Force a router refresh to update authentication state
        router.refresh()

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard")
        }, 100)

        return
      }

      // Demo user login
      if (email === "user@example.com" && password === "password") {
        document.cookie = `user_session=logged_in; path=/; max-age=${60 * 60 * 24}` // 1 day

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        router.refresh()
        setTimeout(() => {
          router.push("/dashboard")
        }, 100)

        return
      }

      setError("Invalid login credentials")
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="admin@numoracle.com or user@example.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>

      {/* Debug info for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 rounded-md bg-gray-100 p-4 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <p className="font-bold">Demo Credentials:</p>
          <p>Admin: admin@numoracle.com / numoracle</p>
          <p>User: user@example.com / password</p>
        </div>
      )}
    </div>
  )
}
