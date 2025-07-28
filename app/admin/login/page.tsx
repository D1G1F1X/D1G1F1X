"use client"

import type React from "react"
import Image from "next/image"
import { SimpleLogin } from "@/components/admin/simple-login"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

    try {
      const success = await login(username, password)

      if (success) {
        router.push("/admin/dashboard")
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
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background image */}
      <Image
        src="/abstract-login-background.png"
        alt="Login Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />

      {/* Overlay to dim background */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-md">
        <SimpleLogin />
      </div>
    </div>
  )
}
