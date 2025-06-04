"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function MobileMenu() {
  const { isAuthenticated, isAdmin, logout } = useAuth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="/cards" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Cards
          </Link>
          <Link href="/numerology" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Numerology
          </Link>
          <Link href="/tools" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Tools
          </Link>
          <Link href="/library" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Library
          </Link>
          <Link href="/buy" className="text-lg font-medium hover:text-purple-400 transition-colors">
            Shop
          </Link>

          <div className="h-px bg-border my-2" />

          {isAuthenticated ? (
            <>
              <Link
                href={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="text-lg font-medium hover:text-purple-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link href="/profile" className="text-lg font-medium hover:text-purple-400 transition-colors">
                Profile
              </Link>
              {isAdmin && (
                <Link href="/admin/dashboard" className="text-lg font-medium hover:text-purple-400 transition-colors">
                  Admin Panel
                </Link>
              )}
              <Button
                variant="ghost"
                className="justify-start p-0 font-medium text-lg hover:text-purple-400 hover:bg-transparent"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg font-medium hover:text-purple-400 transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-lg font-medium hover:text-purple-400 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
