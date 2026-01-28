"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import ContactTabsContainer from "@/app/contact/_components/ContactTabsContainer"

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-sm max-w-[100px] group-hover:max-w-[150px] transition-all whitespace-nowrap overflow-hidden">
          Contact Us!
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-800 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
              <div>
                <h2 className="text-xl font-bold text-white">Contact Lumen Helix Solutions</h2>
                <p className="text-sm text-gray-400">Multiple ways to reach us</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Tabs Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <ContactTabsContainer />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
