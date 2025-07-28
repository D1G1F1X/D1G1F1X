"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Save, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { OracleCard } from "@/types/cards"

export function CardDataEditor() {
  const [jsonData, setJsonData] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Fetch data from the API route, which reads the JSON file
        const res = await fetch("/api/admin/card-data")
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || "Failed to fetch card data")
        }
        const data = await res.json()
        setJsonData(JSON.stringify(data, null, 2))
      } catch (err: any) {
        setError(err.message)
        toast({
          title: "Error Loading Data",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    try {
      // Validate JSON before sending
      let parsedData: OracleCard[]
      try {
        parsedData = JSON.parse(jsonData)
        if (!Array.isArray(parsedData)) {
          throw new Error("JSON data must be an array of card objects.")
        }
        // Basic check for required fields in each card
        const hasInvalidCard = parsedData.some((card) => !card.id || !card.number || !card.suit || !card.fullTitle)
        if (hasInvalidCard) {
          throw new Error("Each card object must have 'id', 'number', 'suit', and 'fullTitle' fields.")
        }
      } catch (parseError: any) {
        throw new Error(`Invalid JSON format: ${parseError.message}`)
      }

      const res = await fetch("/api/admin/card-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData), // Send parsed data
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to save card data")
      }

      toast({
        title: "Success",
        description: "Card data updated successfully!",
        variant: "default",
      })
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error Saving Data",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Master Card Data</CardTitle>
        <CardDescription>
          Directly edit the `master-card-data.json` file. Be careful, invalid JSON can break the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Loading data...</p>
          </div>
        ) : (
          <>
            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="font-mono text-sm min-h-[500px]"
              placeholder="Paste your JSON data here..."
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <XCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
