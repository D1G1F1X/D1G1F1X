"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, isAdmin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await login(email, password)

      if (success) {
        // Check role and redirect accordingly
        const user = JSON.parse(localStorage.getItem("numoracleUser") || "{}")
        if (user.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-purple-950 p-4">
      <div className="mx-auto w-full max-w-sm space-y-6 bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-purple-500/20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Login to NUMOracle</h1>
          <p className="text-gray-400">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
          <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-400">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300">
              Register
            </Link>
          </p>
          <div className="mt-4 p-3 bg-black/30 rounded-md">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <p>Admin: admin@numoracle.com</p>
            <p>Member: member@numoracle.com</p>
            <p>Password: numoracle</p>
          </div>
        </div>
      </div>
    </div>
  )
}
