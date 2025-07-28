"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CheckCircle, RefreshCw } from "lucide-react"
import { checkDataIntegrity } from "@/lib/card-data-access" // Assuming this function exists and is client-side safe

export default function DataIntegrityPage() {
  const [issues, setIssues] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<string | null>(null)

  const runIntegrityCheck = () => {
    setLoading(true)
    setIssues([])
    try {
      const foundIssues = checkDataIntegrity()
      setIssues(foundIssues)
      setLastChecked(new Date().toLocaleString())
      if (foundIssues.length === 0) {
        console.log("Data integrity check passed: No issues found.")
      } else {
        console.warn("Data integrity check found issues:", foundIssues)
      }
    } catch (error) {
      console.error("Error during data integrity check:", error)
      setIssues(["An unexpected error occurred during the integrity check. Check console for details."])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runIntegrityCheck() // Run on component mount
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Data Integrity Check</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Run Data Validation</CardTitle>
          <CardDescription>Checks the consistency and correctness of the oracle card data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runIntegrityCheck} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Checking...
              </>
            ) : (
              "Run Integrity Check"
            )}
          </Button>
          {lastChecked && <p className="mt-2 text-sm text-gray-400">Last checked: {lastChecked}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrity Report</CardTitle>
          <CardDescription>
            {issues.length === 0
              ? "No issues found. Your data is consistent."
              : `Found ${issues.length} issue(s) that need attention.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : issues.length === 0 ? (
            <Alert className="border-green-500/50 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>All Good!</AlertTitle>
              <AlertDescription>No data integrity issues were detected.</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Issues Found!</AlertTitle>
              <AlertDescription>
                <p className="mb-2">The following data integrity issues were detected:</p>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <ul className="list-disc pl-5">
                    {issues.map((issue, index) => (
                      <li key={index} className="mb-1 text-sm">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <p className="mt-4 text-sm">Please review these issues and update your card data accordingly.</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
