"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDebugPage() {
  const [cookies, setCookies] = useState<string[]>([])
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    // Get all cookies
    const allCookies = document.cookie.split(";").map((c) => c.trim())
    setCookies(allCookies)

    // Check admin session
    const adminLoggedIn = document.cookie.includes("admin_session=logged_in")
    setIsAdminLoggedIn(adminLoggedIn)
  }, [])

  const refreshInfo = () => {
    const allCookies = document.cookie.split(";").map((c) => c.trim())
    setCookies(allCookies)
    const adminLoggedIn = document.cookie.includes("admin_session=logged_in")
    setIsAdminLoggedIn(adminLoggedIn)
  }

  const setAdminCookie = () => {
    document.cookie = "admin_session=logged_in; path=/; max-age=86400; SameSite=Lax"
    setTimeout(refreshInfo, 100)
  }

  const clearAdminCookie = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setTimeout(refreshInfo, 100)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Authentication Debug</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Current admin authentication state</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              Admin logged in:{" "}
              <span className={isAdminLoggedIn ? "text-green-500" : "text-red-500"}>
                {isAdminLoggedIn ? "Yes" : "No"}
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <Button onClick={refreshInfo}>Refresh Info</Button>
              <Button onClick={setAdminCookie} variant="outline">
                Set Admin Cookie
              </Button>
              <Button onClick={clearAdminCookie} variant="outline">
                Clear Admin Cookie
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
            <CardDescription>All cookies currently set in the browser</CardDescription>
          </CardHeader>
          <CardContent>
            {cookies.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {cookies.map((cookie, index) => (
                  <li key={index}>{cookie}</li>
                ))}
              </ul>
            ) : (
              <p>No cookies found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navigation Tests</CardTitle>
            <CardDescription>Test different navigation methods</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button onClick={() => (window.location.href = "/admin/dashboard")}>window.location to Dashboard</Button>
            <Button onClick={() => (window.location.href = "/admin/login")}>window.location to Login</Button>
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
