"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: "admin" | "member" | "any"
}

export function ProtectedRoute({ children, requiredRole = "any" }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, isAdmin, isMember } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated at all
      if (!isAuthenticated) {
        router.push("/login")
        return
      }

      // Role-based access control
      if (requiredRole === "admin" && !isAdmin) {
        router.push("/dashboard") // Redirect members to member dashboard
        return
      }

      if (requiredRole === "member" && !isMember && !isAdmin) {
        // Admins can access member pages, but not vice versa
        router.push("/login")
        return
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, isMember, requiredRole, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Show unauthorized message if not authenticated or wrong role
  if (
    !isAuthenticated ||
    (requiredRole === "admin" && !isAdmin) ||
    (requiredRole === "member" && !isMember && !isAdmin)
  ) {
    return null // Return null as the useEffect will handle redirection
  }

  // Render children if authenticated and authorized
  return <>{children}</>
}
