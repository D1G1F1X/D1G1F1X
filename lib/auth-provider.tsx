"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getClientSide } from "./supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any | null; data: any | null }>
  adminCreateUser: (email: string, password: string, metadata?: any) => Promise<{ error: any | null; data: any | null }>
  signOut: () => Promise<void>
  error: Error | null
  isPremiumMember: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isPremiumMember, setIsPremiumMember] = useState(false)

  useEffect(() => {
    try {
      const supabase = getClientSide()

      // Check active session
      const checkSession = async () => {
        setIsLoading(true)
        try {
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()

          if (error) {
            console.warn("Auth session check error:", error.message)
            // Don't throw, just set session to null
            setSession(null)
            setUser(null)
          } else {
            setSession(session)
            setUser(session?.user ?? null)

            // Check if user has premium membership
            if (session?.user) {
              const { data: profile } = await supabase
                .from("profiles")
                .select("is_premium_member")
                .eq("id", session.user.id)
                .single()

              setIsPremiumMember(profile?.is_premium_member || false)
            }
          }
        } catch (e) {
          console.error("Error checking auth session:", e)
          setError(e instanceof Error ? e : new Error(String(e)))
          // Set session to null on error
          setSession(null)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }

      checkSession()

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        // Check premium status when auth state changes
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_premium_member")
            .eq("id", session.user.id)
            .single()

          setIsPremiumMember(profile?.is_premium_member || false)
        } else {
          setIsPremiumMember(false)
        }

        setIsLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (e) {
      console.error("Error setting up auth provider:", e)
      setError(e instanceof Error ? e : new Error(String(e)))
      setIsLoading(false)
      // Return empty cleanup function
      return () => {}
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getClientSide()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (e) {
      console.error("Error signing in:", e)
      return { error: e instanceof Error ? e : new Error(String(e)) }
    }
  }

  // Regular signUp is now disabled for public use
  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      // Check if user has a purchase code or premium access token
      const hasPurchaseCode = metadata?.purchaseCode || metadata?.premiumAccessToken

      if (!hasPurchaseCode) {
        return {
          data: null,
          error: new Error(
            "Direct signup is disabled. Please purchase a premium feature or card deck to create an account.",
          ),
        }
      }

      const supabase = getClientSide()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            is_premium_member: true, // Set as premium member since they have a purchase code
          },
        },
      })

      return { data, error }
    } catch (e) {
      console.error("Error signing up:", e)
      return { data: null, error: e instanceof Error ? e : new Error(String(e)) }
    }
  }

  // Admin-only user creation
  const adminCreateUser = async (email: string, password: string, metadata?: any) => {
    try {
      const supabase = getClientSide()

      // First check if current user is an admin
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return {
          data: null,
          error: new Error("Authentication required"),
        }
      }

      // Check if user is admin by querying profiles table
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      if (profile?.role !== "admin") {
        return {
          data: null,
          error: new Error("Admin privileges required to create users"),
        }
      }

      // Admin can create users
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: metadata,
        email_confirm: true,
      })

      // If user created successfully, create profile entry
      if (data?.user && !error) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          is_premium_member: metadata?.isPremium || false,
          role: metadata?.role || "user",
          created_at: new Date().toISOString(),
        })
      }

      return { data, error }
    } catch (e) {
      console.error("Error creating user:", e)
      return { data: null, error: e instanceof Error ? e : new Error(String(e)) }
    }
  }

  const signOut = async () => {
    try {
      const supabase = getClientSide()
      await supabase.auth.signOut()
      setIsPremiumMember(false)
    } catch (e) {
      console.error("Error signing out:", e)
      setError(e instanceof Error ? e : new Error(String(e)))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        adminCreateUser,
        signOut,
        error,
        isPremiumMember,
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
