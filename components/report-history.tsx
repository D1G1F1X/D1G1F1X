"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Trash2, Clock, ArrowUpDown, ChevronRight } from "lucide-react"
import type { NumerologyProfile } from "./numerology-report-generator"

interface ReportHistoryProps {
  reports: NumerologyProfile[]
  onLoadReport: (reportId: string) => void
  onDeleteReport: (reportId: string) => void
}

export function ReportHistory({ reports, onLoadReport, onDeleteReport }: ReportHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "name">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Filter and sort reports
  const filteredReports = reports
    .filter((report) => report.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
    })

  // Toggle sort order
  const toggleSort = (field: "date" | "name") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Saved Reports</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Saved Reports</h3>
          <p className="text-gray-500 max-w-md mx-auto">Generate and save a numerology report to see it here.</p>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Report History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-800 p-3 text-sm font-medium">
                <div className="col-span-6 flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                  <span>Name</span>
                  {sortBy === "name" && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  )}
                </div>
                <div className="col-span-3 flex items-center cursor-pointer" onClick={() => toggleSort("date")}>
                  <span>Date</span>
                  {sortBy === "date" && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  )}
                </div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              <div className="divide-y">
                {filteredReports.map((report) => (
                  <div key={report.id} className="grid grid-cols-12 p-3 text-sm items-center">
                    <div className="col-span-6 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                    <div className="col-span-3 flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                    <div className="col-span-3 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onLoadReport(report.id)}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-1">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteReport(report.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-1">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredReports.length === 0 && (
                  <div className="p-6 text-center text-gray-500">No reports match your search.</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
