"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function SupabaseCheck() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if required environment variables are present
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setIsConfigured(hasUrl && hasKey)
  }, [])

  if (isConfigured === null) {
    return null // Still checking
  }

  if (isConfigured) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Supabase Connected</AlertTitle>
        <AlertDescription className="text-green-700">Supabase integration is properly configured.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Supabase Configuration Issue</AlertTitle>
      <AlertDescription>
        Missing required Supabase environment variables. Please check your configuration.
      </AlertDescription>
    </Alert>
  )
}
