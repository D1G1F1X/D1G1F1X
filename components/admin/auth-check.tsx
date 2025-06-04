"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const checkAuth = () => {
      const isLoggedIn = document.cookie.includes("admin_session=logged_in")
      console.log("Auth check - Cookie status:", isLoggedIn, document.cookie)

      if (!isLoggedIn) {
        console.log("Not authenticated, redirecting to login")
        router.push("/admin/login")
      } else {
        console.log("User is authenticated")
        setIsAuthenticated(true)
      }

      setIsChecking(false)
    }

    // Check immediately
    checkAuth()

    // Also set up an interval to periodically check (every 30 seconds)
    const interval = setInterval(checkAuth, 30000)

    return () => clearInterval(interval)
  }, [router])

  // Show loading indicator while checking authentication
  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null
}
