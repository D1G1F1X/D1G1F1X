"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client" // Ensure this is the client singleton

export function SupabaseCheck() {
  const [status, setStatus] = useState<{
    url: boolean
    anonKey: boolean
    serviceKey: boolean
  }>({
    url: false,
    anonKey: false,
    serviceKey: false,
  })

  useEffect(() => {
    // Only check on client side
    const supabaseClient = createClient() // Get the client-side singleton
    setStatus({
      url: !!supabaseClient?.supabaseUrl, // Access properties from the client instance
      anonKey: !!supabaseClient?.supabaseKey,
      serviceKey: false, // We can't check server-side env vars from client
    })
  }, [])

  if (status.url && status.anonKey) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Supabase Configuration Issue</AlertTitle>
      <AlertDescription>
        <p>The following Supabase environment variables are missing:</p>
        <ul className="list-disc pl-5 mt-2">
          {!status.url && <li>NEXT_PUBLIC_SUPABASE_URL</li>}
          {!status.anonKey && <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>}
        </ul>
        <p className="mt-2">Some features may not work correctly. Please check your environment configuration.</p>
      </AlertDescription>
    </Alert>
  )
}
