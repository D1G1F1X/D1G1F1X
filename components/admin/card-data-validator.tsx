"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { checkDataIntegrity } from "@/lib/card-data-access"
import { useToast } from "@/components/ui/use-toast"

export function CardDataValidator() {
  const [integrityIssues, setIntegrityIssues] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const { toast } = useToast()

  const runIntegrityCheck = () => {
    setIsLoading(true)
    setIntegrityIssues([])
    setLastChecked(null) // Reset last checked time immediately

    try {
      const issues = checkDataIntegrity()
      setIntegrityIssues(issues)
      setLastChecked(new Date())
      toast({
        title: "Integrity Check Complete",
        description: issues.length > 0 ? `${issues.length} issues found.` : "No issues found! Data is healthy.",
        variant: issues.length > 0 ? "destructive" : "default",
      })
    } catch (error: any) {
      console.error("Error during data integrity check:", error)
      setIntegrityIssues([`Error running check: ${error.message || "Unknown error"}`])
      setLastChecked(new Date())
      toast({
        title: "Integrity Check Failed",
        description: "An error occurred while running the data integrity check.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Run an initial check when the component mounts
    runIntegrityCheck()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Integrity Check</CardTitle>
        <CardDescription>
          {lastChecked ? (
            <span>Last checked: {lastChecked.toLocaleString()}</span>
          ) : (
            <span>Running initial check...</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Analyzing data...</p>
          </div>
        ) : integrityIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-green-500">
            <CheckCircle className="h-16 w-16 mb-4" />
            <p className="text-xl font-semibold">All data is healthy!</p>
            <p className="text-muted-foreground">No issues found in your Oracle Card data.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center text-red-500">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <p className="text-lg font-semibold">{integrityIssues.length} issue(s) found!</p>
            </div>
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <ul className="list-disc pl-5 space-y-2">
                {integrityIssues.map((issue, index) => (
                  <li key={index} className="text-sm text-red-400">
                    {issue}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
