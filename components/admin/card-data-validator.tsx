"use client"

import { useState, useEffect } from "react"
import { validateCardData } from "@/lib/card-validation"
import { getAllCards } from "@/lib/card-data-access"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle } from "lucide-react"

export function CardDataValidator() {
  const [validationReport, setValidationReport] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const runValidation = () => {
    setIsValidating(true)
    try {
      const cards = getAllCards()
      const report = validateCardData(cards)
      setValidationReport(report)
      setIsValid(report.startsWith("✅"))
    } catch (error) {
      setValidationReport(`Error during validation: ${error instanceof Error ? error.message : String(error)}`)
      setIsValid(false)
    } finally {
      setIsValidating(false)
    }
  }

  useEffect(() => {
    runValidation()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card Data Validation</CardTitle>
        <CardDescription>
          Validates the master card data to ensure all cards have complete and consistent information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={runValidation} disabled={isValidating}>
            {isValidating ? "Validating..." : "Run Validation"}
          </Button>
        </div>

        {isValid === true && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Validation Passed</AlertTitle>
            <AlertDescription className="text-green-700">All cards have complete and valid data.</AlertDescription>
          </Alert>
        )}

        {isValid === false && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Validation Issues Found</AlertTitle>
            <AlertDescription className="text-amber-700">Please review and fix the issues below.</AlertDescription>
          </Alert>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <pre className="whitespace-pre-wrap text-sm">{validationReport}</pre>
        </div>
      </CardContent>
    </Card>
  )
}
