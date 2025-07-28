"use client"

import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  const { logout } = useAdminAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
  }

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
