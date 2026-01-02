"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LicensingPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already accepted in this session
    const hasAccepted = sessionStorage.getItem("licensing-popup-accepted")
    if (!hasAccepted) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    sessionStorage.setItem("licensing-popup-accepted", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-primary-500/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-primary-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-bold text-white">Research Terms & Licensing</h2>
          </div>
          <button
            onClick={handleAccept}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Licensing Notice */}
          <div className="bg-primary-950/30 border border-primary-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary-300 mb-1">Creative Commons Attribution 4.0</p>
              <p className="text-sm text-gray-300">
                Our research is published under CC-BY-4.0 licensing. Attribution and proper citation are required for
                any use.
              </p>
            </div>
          </div>

          {/* Key Terms */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Key Licensing Terms</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-primary-300 mb-2">Permitted Uses</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>✓ Academic research and education</li>
                  <li>✓ Non-commercial applications</li>
                  <li>✓ Referenced citations and discussion</li>
                  <li>✓ Derivative works with proper attribution</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-primary-300 mb-2">Attribution Requirements</h4>
                <ul className="text-sm text-gray-300 space-y-1 ml-4">
                  <li>• Clearly credit Lumen Helix Solutions</li>
                  <li>• Include publication date and authors</li>
                  <li>• Link to original research where applicable</li>
                  <li>• Indicate if modifications were made</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-primary-300 mb-2">Intellectual Property Protection</h4>
                <p className="text-sm text-gray-300 mb-2">
                  While our research is openly shared, proprietary implementations, trade secrets, and commercial
                  applications remain protected. Detailed equations, algorithmic specifics, and system architectures are
                  summarized for general understanding, not operational reproduction.
                </p>
              </div>
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Restrictions</h3>
            <ul className="text-sm text-gray-300 space-y-2 ml-4">
              <li>✗ Commercial exploitation without partnership or licensing</li>
              <li>✗ Claiming authorship or misrepresenting sources</li>
              <li>✗ Reverse engineering proprietary systems without permission</li>
              <li>✗ Redistributing complete research documents without attribution</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-300 mb-2">
              <span className="font-semibold text-white">Questions about licensing?</span> Contact our research team for
              partnership opportunities or clarification on usage rights.
            </p>
            <a
              href="/contact"
              className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
            >
              Get in Touch →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-primary-500/20 px-6 py-4 flex gap-3 justify-end">
          <Button
            onClick={handleAccept}
            className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30"
          >
            I Understand & Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
