"use client"

import { createContext, useContext, type ReactNode, useEffect, useState, useCallback } from "react"
import type { Session, User as SupabaseUser } from "@supabase/supabase-js"
import { getClientSide } from "@/lib/supabase"

/* ----------  Types ---------- */

export type UserRole = "admin" | "member" | "viewer"

export interface User {
  id: string
  email: string
  role: UserRole
  fullName?: string
  isPremium?: boolean
}

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
    metadata?: { fullName?: string; role?: UserRole; isPremium?: boolean },
  ) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

/* ----------  Context ---------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/* ----------  Provider ---------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getClientSide() // singleton client
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Map Supabase user → local User type
  const mapUser = (u: SupabaseUser | null): User | null =>
    u
      ? {
          id: u.id,
          email: u.email ?? "",
          role: (u.user_metadata?.role as UserRole) || "member",
          fullName: u.user_metadata?.fullName,
          isPremium: u.user_metadata?.isPremium ?? false,
        }
      : null

  const fetchSession = useCallback(async () => {
    setIsLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Supabase getSession error:", error.message)
      setSession(null)
      setUser(null)
    } else {
      setSession(session)
      setUser(mapUser(session?.user ?? null))
    }
    setIsLoading(false)
  }, [supabase])

  // Initial load + auth-change listener
  useEffect(() => {
    fetchSession()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess)
      setUser(mapUser(sess?.user ?? null))
    })
    return () => subscription.unsubscribe()
  }, [fetchSession, supabase])

  /* ----------  Auth helpers ---------- */

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUp = async (
    email: string,
    password: string,
    metadata?: { fullName?: string; role?: UserRole; isPremium?: boolean },
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: metadata?.fullName,
          role: metadata?.role ?? "member",
          isPremium: metadata?.isPremium ?? false,
        },
      },
    })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* ----------  Hook ---------- */

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
