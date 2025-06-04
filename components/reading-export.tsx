"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileText, Settings } from "lucide-react"
import type { SavedReading } from "@/types/saved-readings"

interface ReadingExportProps {
  readings: SavedReading[]
  selectedReadings?: string[]
  onSelectReadings?: (ids: string[]) => void
}

export function ReadingExport({ readings, selectedReadings = [], onSelectReadings }: ReadingExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    includeNotes: true,
    includeCardImages: true,
    includeTimestamp: true,
    formatType: "detailed" as "detailed" | "summary",
  })
  const { toast } = useToast()

  const handleExport = async () => {
    if (selectedReadings.length === 0) {
      toast({
        title: "No Readings Selected",
        description: "Please select at least one reading to export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      // In a real app, this would generate a PDF
      // For demo purposes, we'll just show a success message after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Export Complete",
        description: `Successfully exported ${selectedReadings.length} reading(s) to PDF.`,
      })
    } catch (error) {
      console.error("Error exporting readings:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your readings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const toggleSelectAll = (checked: boolean) => {
    if (onSelectReadings) {
      if (checked) {
        onSelectReadings(readings.map((r) => r.id))
      } else {
        onSelectReadings([])
      }
    }
  }

  const toggleReading = (readingId: string, checked: boolean) => {
    if (onSelectReadings) {
      if (checked) {
        onSelectReadings([...selectedReadings, readingId])
      } else {
        onSelectReadings(selectedReadings.filter((id) => id !== readingId))
      }
    }
  }

  return (
    <Card className="bg-black/30 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Export Readings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedReadings.length === readings.length}
                onCheckedChange={(checked) => toggleSelectAll(!!checked)}
              />
              <Label htmlFor="select-all" className="font-medium">
                Select All ({readings.length} readings)
              </Label>
            </div>

            <div className="border border-gray-800 rounded-lg divide-y divide-gray-800 max-h-[300px] overflow-y-auto">
              {readings.length > 0 ? (
                readings.map((reading) => (
                  <div key={reading.id} className="p-3 flex items-center space-x-3">
                    <Checkbox
                      id={`reading-${reading.id}`}
                      checked={selectedReadings.includes(reading.id)}
                      onCheckedChange={(checked) => toggleReading(reading.id, !!checked)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={`reading-${reading.id}`} className="font-medium cursor-pointer">
                        {reading.title}
                      </Label>
                      <p className="text-sm text-gray-400 truncate">
                        {new Date(reading.date).toLocaleDateString()} • {reading.spreadType}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">No readings available to export</div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Export Options
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-notes"
                    checked={exportOptions.includeNotes}
                    onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeNotes: !!checked }))}
                  />
                  <Label htmlFor="include-notes">Include Personal Notes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-card-images"
                    checked={exportOptions.includeCardImages}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeCardImages: !!checked }))
                    }
                  />
                  <Label htmlFor="include-card-images">Include Card Images</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-timestamp"
                    checked={exportOptions.includeTimestamp}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeTimestamp: !!checked }))
                    }
                  />
                  <Label htmlFor="include-timestamp">Include Timestamp</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    className="bg-black/30 border border-gray-700 rounded-md px-3 py-2 text-sm w-full"
                    value={exportOptions.formatType}
                    onChange={(e) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        formatType: e.target.value as "detailed" | "summary",
                      }))
                    }
                  >
                    <option value="detailed">Detailed Format</option>
                    <option value="summary">Summary Format</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <div className="flex justify-between items-center w-full">
          <p className="text-sm text-gray-400">{selectedReadings.length} reading(s) selected</p>
          <Button onClick={handleExport} disabled={isExporting || selectedReadings.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export to PDF"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
