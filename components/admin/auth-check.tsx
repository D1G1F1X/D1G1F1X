"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAdminAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const verify = async () => {
        const authStatus = await checkAuth()
        if (!authStatus) {
          router.push("/admin/login")
        }
      }
      if (!isLoading && !isAuthenticated) {
        verify()
      }
    }
  }, [isAuthenticated, isLoading, router, mounted, checkAuth])

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
