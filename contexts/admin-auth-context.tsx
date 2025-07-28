"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AdminAuthContextType {
  isAdminAuthenticated: boolean
  adminLogin: (token: string) => void
  adminLogout: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin_auth_token")
    if (token) {
      // In a real app, you'd verify this token with your backend
      setIsAdminAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const adminLogin = (token: string) => {
    localStorage.setItem("admin_auth_token", token)
    setIsAdminAuthenticated(true)
    router.push("/admin/dashboard")
  }

  const adminLogout = () => {
    localStorage.removeItem("admin_auth_token")
    setIsAdminAuthenticated(false)
    router.push("/admin/login")
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
