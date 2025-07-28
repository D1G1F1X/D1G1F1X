"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { DashboardShell } from "@/components/admin/dashboard-shell"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  return <AdminAuthProvider>{isLoginPage ? children : <DashboardShell>{children}</DashboardShell>}</AdminAuthProvider>
}
