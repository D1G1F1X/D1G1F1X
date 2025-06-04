"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertTriangle, X, Bug, Upload, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    description: "",
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    email: "",
    type: "bug", // 'bug' or 'typo'
  })

  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setScreenshot(file)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleRemoveScreenshot = () => {
    setScreenshot(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // Create FormData to handle file upload
      const formDataToSend = new FormData()
      formDataToSend.append("description", formData.description)
      formDataToSend.append("pageUrl", formData.pageUrl)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("type", formData.type)

      if (screenshot) {
        formDataToSend.append("screenshot", screenshot)
      }

      // await fetch('/api/bug-reports', {
      //   method: 'POST',
      //   body: formDataToSend
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Report submitted",
        description: "Thank you for helping us improve NUMO Oracle!",
        variant: "default",
      })

      setIsOpen(false)
      setFormData({
        description: "",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        email: "",
        type: "bug",
      })
      handleRemoveScreenshot()
    } catch (error) {
      toast({
        title: "Error submitting report",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Bug report button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-amber-600 hover:bg-amber-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 ease-in-out"
        aria-label="Report a bug or typo"
      >
        <AlertTriangle className="h-6 w-6" />
      </button>

      {/* Bug report modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gray-900 border-amber-500 max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-amber-900 rounded-t-lg sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Report an Issue
                </CardTitle>
                <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-md text-yellow-200 flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Browser Compatibility Notice:</p>
                  <p>
                    We are aware of some dark mode legibility issues when using Microsoft Edge. This is often due to
                    Edge's "force dark mode" feature clashing with our site's styles. For the best experience, we
                    recommend using Chrome, Opera, or Firefox.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Issue Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="bug"
                          checked={formData.type === "bug"}
                          onChange={handleChange}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-200">Bug</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="typo"
                          checked={formData.type === "typo"}
                          onChange={handleChange}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-200">Typo/Content Error</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please describe the issue in detail..."
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={4}
                    />
                  </div>

                  {/* Screenshot upload section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Screenshot (optional)</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {!previewUrl ? (
                      <div
                        onClick={triggerFileInput}
                        className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 transition-colors"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-300">Click to upload a screenshot</span>
                          <span className="text-xs text-gray-400">(Max 5MB, PNG, JPG, GIF)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative mt-2 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Screenshot preview"
                          className="max-h-48 max-w-full mx-auto object-contain rounded border border-gray-700"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                          aria-label="Remove screenshot"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-200 mb-1">
                      Page URL
                    </label>
                    <Input
                      id="pageUrl"
                      name="pageUrl"
                      value={formData.pageUrl}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">This is filled automatically with your current page</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                      Email (optional)
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      If you'd like us to follow up with you about this issue
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2 border-t border-gray-700 pt-4 sticky bottom-0 bg-gray-900 z-10">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.description}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
