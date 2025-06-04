"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface MembershipContextType {
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        setIsLoggedIn(true)
        if (typeof window !== "undefined") {
          localStorage.setItem("isAuthenticated", "true")
        }
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated")
    }
  }

  return <MembershipContext.Provider value={{ isLoggedIn, login, logout }}>{children}</MembershipContext.Provider>
}

export function useMembership() {
  const context = useContext(MembershipContext)
  if (context === undefined) {
    // Return a safe default instead of throwing error
    return {
      isLoggedIn: false,
      login: async () => false,
      logout: () => {},
    }
  }
  return context
}
