"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdminAuth } from "@/contexts/admin-auth-context"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, isAuthenticated, checkAuth } = useAdminAuth()

  // Check if already authenticated
  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated || (await checkAuth())) {
        router.push("/admin/dashboard")
      }
    }

    verifyAuth()
  }, [isAuthenticated, checkAuth, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log("=== LOGIN FORM SUBMISSION ===")
    console.log("Username/Email:", username)
    console.log("Password length:", password.length)

    try {
      const success = await login(username, password)

      if (success) {
        console.log("Login successful, redirecting...")
        router.push("/admin/dashboard")
      } else {
        console.log("Login failed")
        setError("Invalid credentials. Please verify:\n• Username: admin or admin@numoracle.com\n• Password: numoracle")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the admin area</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              placeholder="admin or admin@numoracle.com"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="numoracle"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500">
          <p className="font-semibold mb-2">Test Credentials:</p>
          <div className="bg-gray-50 p-3 rounded border">
            <p>
              <strong>Username:</strong> admin
            </p>
            <p>
              <strong>Email:</strong> admin@numoracle.com
            </p>
            <p>
              <strong>Password:</strong> numoracle
            </p>
          </div>
          <p className="mt-2 text-xs">Use either username or email with the password above</p>
        </div>
      </div>
    </div>
  )
}
