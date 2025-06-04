"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNav, adminNavItems } from "@/components/admin/sidebar-nav"
import { MobileNav } from "@/components/admin/mobile-nav"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
// Removed: import { ModeToggle } from "@/components/mode-toggle"
import { useAdminAuth } from "@/contexts/admin-auth-context"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const { isAuthenticated } = useAdminAuth()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
          <div className="flex items-center h-16 px-4 border-b border-gray-800">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-white">NUMO Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4 px-3">
            <SidebarNav items={adminNavItems} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 border-b bg-gray-900 border-gray-800">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center md:hidden">
              <MobileNav />
              <h1 className="ml-2 text-xl font-bold text-white">Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {/* Removed: <ModeToggle /> */}
                {isAuthenticated && <AdminLogoutButton />}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
