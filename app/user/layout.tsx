"use client"

import type React from "react"

import { AuthProvider } from "@/lib/auth-provider"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
