"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user types and roles
export type UserRole = "admin" | "member"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
}

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@numoracle.com",
    password: "numoracle",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    name: "Member User",
    email: "member@numoracle.com",
    password: "numoracle",
    role: "member" as UserRole,
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check localStorage on initial load (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("numoracleUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("numoracleUser")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Find user by email
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      // Create a safe user object without the password
      const { password: _, ...safeUser } = foundUser

      // Store in state and localStorage (client-side only)
      setUser(safeUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("numoracleUser", JSON.stringify(safeUser))
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("numoracleUser")
    }
  }

  // Computed properties for role checks
  const isAuthenticated = user !== null
  const isAdmin = user?.role === "admin"
  const isMember = user?.role === "member"

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
