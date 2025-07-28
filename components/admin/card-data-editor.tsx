"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Save, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { JsonEditor } from "@/components/admin/json-editor"
import { CardEditor } from "@/components/admin/card-editor"
import { useToast } from "@/components/ui/use-toast"

export function CardDataEditor() {
  const [jsonData, setJsonData] = useState("[]") // Default to empty array string
  const [parsedData, setParsedData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null) // For displaying persistent load errors
  const { toast } = useToast()

  useEffect(() => {
    loadCardData()
  }, [])

  const loadCardData = async () => {
    setIsLoading(true)
    setLoadError(null)
    try {
      const response = await fetch("/api/admin/card-data")
      const responseData = await response.json()

      if (!response.ok) {
        // API returned an error (e.g., 500 for parse error, 400 for validation)
        const errorMsg = responseData.error || "Failed to load card data"
        const errorDetails = responseData.details || "No additional details."
        setLoadError(`${errorMsg} - Details: ${errorDetails}`)
        toast({
          title: "Error Loading Data",
          description: `${errorMsg}. Check console for details.`,
          variant: "destructive",
        })
        setJsonData("[]") // Reset to empty array on error
        setParsedData([])
      } else {
        // Successfully loaded data
        setJsonData(JSON.stringify(responseData, null, 2))
        setParsedData(responseData)
        setHasChanges(false)
      }
    } catch (error) {
      // Catch network errors or if response.json() itself fails (e.g. not valid JSON from server)
      console.error("Critical error loading card data:", error)
      const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred."
      setLoadError(`Network or parsing error: ${errorMsg}`)
      toast({
        title: "Critical Error",
        description: "Could not fetch or parse card data. Check network and console.",
        variant: "destructive",
      })
      setJsonData("[]")
      setParsedData([])
    } finally {
      setIsLoading(false)
    }
  }

  const saveCardData = async () => {
    setIsSaving(true)
    let currentParsedData
    try {
      currentParsedData = JSON.parse(jsonData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Cannot save.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    try {
      const response = await fetch("/api/admin/card-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentParsedData), // Send the parsed data
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save card data")
      }

      toast({
        title: "Success",
        description: responseData.message || "Card data saved successfully",
      })
      setHasChanges(false)
      setLoadError(null) // Clear load errors on successful save
      // Optionally re-fetch or update state from response if needed
      setParsedData(currentParsedData) // Ensure parsedData is in sync
    } catch (error: any) {
      console.error("Error saving card data:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save card data",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleJsonChange = (newValue: string) => {
    setJsonData(newValue)
    setHasChanges(true)
    // Attempt to parse for visual editor, but don't block typing
    try {
      const parsed = JSON.parse(newValue)
      if (Array.isArray(parsed)) {
        setParsedData(parsed)
      } else {
        // Potentially set an inline validation message for the editor if desired
        // For now, CardEditor will just get an empty array or old data if JSON is not an array
        setParsedData([])
      }
    } catch (error) {
      // JSON is invalid while typing, visual editor might show old data or be disabled
      setParsedData([]) // Or keep old valid parsedData
    }
  }

  const handleVisualEditorChange = (newData: any[]) => {
    setParsedData(newData)
    setJsonData(JSON.stringify(newData, null, 2))
    setHasChanges(true)
  }

  if (isLoading) {
    return <div>Loading card data editor...</div>
  }

  return (
    <div className="space-y-4">
      {loadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to Load Card Data</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button onClick={saveCardData} disabled={isSaving || !!loadError /* Don't save if initial load failed */}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
          <Button variant="outline" onClick={loadCardData} disabled={isSaving}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Data
          </Button>
        </div>
        {hasChanges && <span className="text-yellow-500 text-sm">You have unsaved changes</span>}
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="json" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="json">JSON Editor</TabsTrigger>
              <TabsTrigger
                value="visual"
                disabled={!!loadError || !Array.isArray(parsedData) || parsedData.length === 0}
              >
                Visual Editor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="json">
              <JsonEditor value={jsonData} onChange={handleJsonChange} />
            </TabsContent>
            <TabsContent value="visual">
              {!loadError && Array.isArray(parsedData) && parsedData.length > 0 ? (
                <CardEditor cards={parsedData} onChange={handleVisualEditorChange} />
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Visual Editor Unavailable</AlertTitle>
                  <AlertDescription>
                    The visual editor requires valid card data to be loaded and the JSON to be an array of cards. Please
                    check the JSON editor or reload the data.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
