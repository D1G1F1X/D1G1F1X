"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const isIgnorableErrorEvent = (ev: ErrorEvent) => {
      const message = ev?.message || ev?.error?.message || ""
      // Common Chromium benign errors that shouldn't crash the app UI
      if (/ResizeObserver loop (limit exceeded|completed with undelivered notifications)/i.test(message)) {
        return true
      }
      return false
    }

    const errorHandler = (ev: ErrorEvent) => {
      if (isIgnorableErrorEvent(ev)) {
        // Prevent noisy, non-fatal errors from tripping the UI fallback
        ev.preventDefault?.()
        return
      }
      console.error("Caught in error boundary:", ev)
      const nextError = ev.error instanceof Error ? ev.error : new Error(ev.message || "Unknown error")
      setError(nextError)
      setHasError(true)
    }

    const rejectionHandler = (ev: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", ev.reason)
      const nextError = ev.reason instanceof Error ? ev.reason : new Error(String(ev.reason))
      setError(nextError)
      setHasError(true)
    }

    // Add global error handler
    window.addEventListener("error", errorHandler, { capture: true })
    window.addEventListener("unhandledrejection", rejectionHandler)

    // Clean up
    return () => {
      window.removeEventListener("error", errorHandler, { capture: true } as any)
      window.removeEventListener("unhandledrejection", rejectionHandler)
    }
  }, [])

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[200px]">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error?.message || "An unexpected error occurred"}</AlertDescription>
        </Alert>
        <Button
          onClick={() => {
            setHasError(false)
            setError(null)
          }}
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
