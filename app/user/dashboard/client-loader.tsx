"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"

const DashboardClient = dynamic(() => import("@/components/user/dashboard-client"), {
  ssr: false,
  loading: () => null,
})

export default function ClientLoader() {
  useEffect(() => {
    // This runs only on the client
    const dashboardRoot = document.getElementById("dashboard-root")
    if (dashboardRoot) {
      // Create a new div for the client component
      const clientDiv = document.createElement("div")
      dashboardRoot.appendChild(clientDiv)

      // Render the client component
      const root = document.getElementById("dashboard-root")
      if (root) {
        root.style.display = "block"
      }
    }
  }, [])

  return <DashboardClient />
}
