"use client"

import React, { type ReactNode } from "react"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page or return home.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left bg-gray-800 p-4 rounded border border-gray-700">
                <summary className="cursor-pointer text-gray-300 font-medium mb-2">Error details</summary>
                <pre className="text-xs text-red-400 overflow-auto max-h-40">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Page
              </button>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
