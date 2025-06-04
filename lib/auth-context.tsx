"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextProps {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("numoracleUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        return false
      }

      // Still store user info in localStorage for UI purposes
      // but the actual authentication is now cookie-based
      const safeUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      }

      setUser(safeUser)
      localStorage.setItem("numoracleUser", JSON.stringify(safeUser))
      return true
    } catch (err) {
      console.error("Login error:", err)
      return false
    }
  }

  const logout = () => {
    // Call the server logout endpoint
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .catch((err) => {
        console.error("Logout error:", err)
      })
      .finally(() => {
        // Still clear local state regardless of server response
        setUser(null)
        localStorage.removeItem("numoracleUser")
      })
  }

  const value = { user, login, logout, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
