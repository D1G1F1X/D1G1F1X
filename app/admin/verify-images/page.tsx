"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { validateCardImageFilename, validateCardImage } from "@/lib/card-image-utils" // Assuming these utilities exist

export default function VerifyImagesPage() {
  const [imagePath, setImagePath] = useState("/cards/01-cauldron-fire.jpg")
  const [validationResult, setValidationResult] = useState<{
    filenameValid: boolean
    filenameErrors: string[]
    filenameSuggestions?: string
    imageExists: boolean | null
    imageExistsError: string | null
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleVerifyImage = async () => {
    setLoading(true)
    setValidationResult(null)
    const filename = imagePath.split("/").pop() || ""
    const filenameValidation = validateCardImageFilename(filename)

    let imageExists: boolean | null = null
    let imageExistsError: string | null = null

    try {
      imageExists = await validateCardImage(imagePath)
    } catch (error: any) {
      imageExistsError = error.message || "Failed to check image existence."
    }

    setValidationResult({
      filenameValid: filenameValidation.isValid,
      filenameErrors: filenameValidation.errors,
      filenameSuggestions: filenameValidation.suggestions,
      imageExists,
      imageExistsError,
    })
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Image Verification Tool</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Verify Image Path & Existence</CardTitle>
          <CardDescription>
            Enter an image path to check its naming convention and if the image file actually exists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imagePath">Image Path</Label>
              <Input
                id="imagePath"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
                placeholder="e.g., /cards/01-cauldron-fire.jpg"
              />
            </div>
            <Button onClick={handleVerifyImage} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify Image"
              )}
            </Button>
          </div>

          {validationResult && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Verification Results:</h3>

              {/* Filename Validation */}
              <div
                className={`rounded-md border p-4 ${
                  validationResult.filenameValid
                    ? "border-green-500/50 bg-green-900/10"
                    : "border-red-500/50 bg-red-900/10"
                }`}
              >
                <div className="flex items-center">
                  {validationResult.filenameValid ? (
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="mr-2 h-5 w-5 text-red-500" />
                  )}
                  <h4 className="font-medium">
                    Filename Format: {validationResult.filenameValid ? "Valid" : "Invalid"}
                  </h4>
                </div>
                {validationResult.filenameErrors.length > 0 && (
                  <ul className="mt-2 list-disc pl-6 text-sm text-gray-300">
                    {validationResult.filenameErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
                {validationResult.filenameSuggestions && (
                  <p className="mt-2 text-sm text-gray-400">
                    Suggestion: <code>{validationResult.filenameSuggestions}</code>
                  </p>
                )}
              </div>

              {/* Image Existence */}
              <div
                className={`rounded-md border p-4 ${
                  validationResult.imageExists === true
                    ? "border-green-500/50 bg-green-900/10"
                    : validationResult.imageExists === false
                      ? "border-red-500/50 bg-red-900/10"
                      : "border-gray-500/50 bg-gray-900/10"
                }`}
              >
                <div className="flex items-center">
                  {validationResult.imageExists === true ? (
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  ) : validationResult.imageExists === false ? (
                    <XCircle className="mr-2 h-5 w-5 text-red-500" />
                  ) : (
                    <RefreshCw className="mr-2 h-5 w-5 text-gray-500" />
                  )}
                  <h4 className="font-medium">
                    Image Existence:{" "}
                    {validationResult.imageExists === true
                      ? "Found"
                      : validationResult.imageExists === false
                        ? "Not Found"
                        : "Not Checked"}
                  </h4>
                </div>
                {validationResult.imageExistsError && (
                  <p className="mt-2 text-sm text-red-400">Error: {validationResult.imageExistsError}</p>
                )}
                {validationResult.imageExists === true && (
                  <div className="mt-4 relative h-48 w-32 overflow-hidden rounded-lg border border-gray-700">
                    <Image src={imagePath || "/placeholder.svg"} alt="Verified Image" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
