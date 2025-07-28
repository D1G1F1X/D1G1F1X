"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/contexts/admin-auth-context"

export function AdminLogoutButton() {
  const { logout } = useAdminAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
