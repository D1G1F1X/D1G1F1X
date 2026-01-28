"use client"

import { AlertCircle, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <h1 className="text-6xl font-bold text-primary-500 mb-2">404</h1>
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. Let me help you find your way back.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Pages</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/portfolio" className="text-primary-400 hover:text-primary-300 transition-colors">
                → View Our Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-primary-400 hover:text-primary-300 transition-colors">
                → Read Our Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-primary-400 hover:text-primary-300 transition-colors">
                → Learn About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                → Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
