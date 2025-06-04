"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/contexts/admin-auth-context"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAdminAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true)

      // First check the context state
      if (isAuthenticated) {
        setIsAuthorized(true)
        setIsChecking(false)
        return
      }

      // If not authenticated in context, perform a full check
      const authStatus = await checkAuth()

      if (authStatus) {
        setIsAuthorized(true)
      } else {
        router.push("/admin/login")
      }

      setIsChecking(false)
    }

    verifyAuth()
  }, [isAuthenticated, checkAuth, router])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Don't render anything while redirecting
  }

  return <>{children}</>
}
