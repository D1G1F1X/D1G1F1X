"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { validateCardNumbers } from "@/lib/card-validation"

export default function ValidateCardNumbersPage() {
  const [validationResult, setValidationResult] = useState<{ valid: boolean; issues: string[] } | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const runValidation = async () => {
    setIsValidating(true)
    try {
      const result = validateCardNumbers()
      setValidationResult(result)
    } catch (error) {
      console.error("Validation error:", error)
      setValidationResult({
        valid: false,
        issues: ["Error running validation: " + (error instanceof Error ? error.message : String(error))],
      })
    } finally {
      setIsValidating(false)
    }
  }

  useEffect(() => {
    runValidation()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Card Number Validation</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Validation Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isValidating ? (
            <p>Validating card numbers...</p>
          ) : validationResult ? (
            <div>
              {validationResult.valid ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">All card numbers are valid</AlertTitle>
                  <AlertDescription className="text-green-700">
                    All card numbers match their expected values based on card IDs.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Card number issues detected</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Found {validationResult.issues.length} issues with card numbers.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <p>No validation results available</p>
          )}

          <Button onClick={runValidation} disabled={isValidating} className="mt-4">
            {isValidating ? "Validating..." : "Run Validation Again"}
          </Button>
        </CardContent>
      </Card>

      {validationResult && validationResult.issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Issues Found</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {validationResult.issues.map((issue, index) => (
                <li key={index} className="text-red-600">
                  {issue}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
