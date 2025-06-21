"use client"

import { createContext, useContext, type ReactNode, useEffect, useState, useCallback } from "react"
import type { Session, User as SupabaseUser, SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@supabase/supabase-js"

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
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  // Initialize Supabase client once on mount
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables")
      setIsLoading(false)
      return
    }

    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "numoracle-auth-session",
        flowType: "pkce",
      },
    })

    setSupabase(client)
  }, [])

  // Map Supabase user → local User type
  const mapUser = useCallback((u: SupabaseUser | null): User | null => {
    return u
      ? {
          id: u.id,
          email: u.email ?? "",
          role: (u.user_metadata?.role as UserRole) || "member",
          fullName: u.user_metadata?.fullName,
          isPremium: u.user_metadata?.isPremium ?? false,
        }
      : null
  }, [])

  // Fetch initial session
  const fetchSession = useCallback(async () => {
    if (!supabase) return

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Error fetching session:", error.message)
        setSession(null)
        setUser(null)
      } else {
        setSession(session)
        setUser(mapUser(session?.user ?? null))
      }
    } catch (error) {
      console.error("Error in fetchSession:", error)
      setSession(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [supabase, mapUser])

  // Set up auth state listener
  useEffect(() => {
    if (!supabase) return

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, sess) => {
      setSession(sess)
      setUser(mapUser(sess?.user ?? null))
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, fetchSession, mapUser])

  /* ----------  Auth helpers ---------- */

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: "Authentication service not available" }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUp = async (
    email: string,
    password: string,
    metadata?: { fullName?: string; role?: UserRole; isPremium?: boolean },
  ) => {
    if (!supabase) return { error: "Authentication service not available" }

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
    if (!supabase) return
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
