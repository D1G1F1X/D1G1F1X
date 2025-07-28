"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle, AlertTriangle, FileWarning } from "lucide-react"
import { checkDataIntegrity, getCardData } from "@/lib/card-data-access"
import { useToast } from "@/components/ui/use-toast"

export default function DataIntegrityPage() {
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
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Integrity Check</h1>
          <p className="text-muted-foreground">Monitor the consistency and validity of your Oracle Card data.</p>
        </div>
        <Button onClick={runIntegrityCheck} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileWarning className="mr-2 h-4 w-4" />}
          {isLoading ? "Running Check..." : "Run Check Now"}
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Check Results</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Quick statistics about your loaded card data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">Total Cards Loaded</p>
              <p className="text-2xl font-bold">{getCardData().length}</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">Unique Suits</p>
              <p className="text-2xl font-bold">{new Set(getCardData().map((c) => c.suit)).size}</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">Unique Base Elements</p>
              <p className="text-2xl font-bold">{new Set(getCardData().map((c) => c.baseElement)).size}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
