"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type AdminAuthContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on initial load and when the component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true)
      try {
        // First check localStorage
        const authStatus = localStorage.getItem("adminAuth")
        if (authStatus === "true") {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // If not in localStorage, try to verify with the server
        const response = await fetch("/api/admin/verify", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.authenticated) {
            localStorage.setItem("adminAuth", "true")
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem("adminAuth")
            setIsAuthenticated(false)
          }
        } else {
          localStorage.removeItem("adminAuth")
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("adminAuth")
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const checkAuth = async (): Promise<boolean> => {
    try {
      // First check localStorage for performance
      const authStatus = localStorage.getItem("adminAuth")
      if (authStatus === "true") {
        return true
      }

      // If not in localStorage, verify with the server
      const response = await fetch("/api/admin/verify", {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          localStorage.setItem("adminAuth", "true")
          setIsAuthenticated(true)
          return true
        }
      }

      // If we get here, authentication failed
      localStorage.removeItem("adminAuth")
      setIsAuthenticated(false)
      return false
    } catch (error) {
      console.error("Auth check error:", error)
      localStorage.removeItem("adminAuth")
      setIsAuthenticated(false)
      return false
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: username, password }),
        credentials: "include",
      })

      if (response.ok) {
        localStorage.setItem("adminAuth", "true")
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("adminAuth")
      setIsAuthenticated(false)
      router.push("/admin/login")
    }
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {!isLoading && children}
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
