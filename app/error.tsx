"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong!</h1>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </p>

        {error.message && (
          <details className="mb-6 text-left bg-gray-800 p-4 rounded border border-gray-700">
            <summary className="cursor-pointer text-gray-300 font-medium mb-2">Error details</summary>
            <pre className="text-xs text-red-400 overflow-auto max-h-40 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {error.digest && <p className="mt-6 text-xs text-gray-500">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
