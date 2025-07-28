import type React from "react"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { DashboardNav } from "@/components/admin/dashboard-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ProtectedRoute>
        <div className="flex min-h-screen w-full flex-col bg-gray-950 text-gray-50">
          <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900 px-4 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-gray-900 text-gray-50 sm:max-w-xs">
                <nav className="grid gap-2 text-lg font-medium">
                  <DashboardNav isMobile={true} />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <AdminLogoutButton />
            </div>
          </header>
          <div className="flex flex-1">
            <aside className="hidden w-[220px] flex-col border-r border-gray-800 bg-gray-900 p-4 md:flex lg:w-[280px]">
              <nav className="flex-1 space-y-2">
                <DashboardNav />
              </nav>
            </aside>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </AdminAuthProvider>
  )
}
