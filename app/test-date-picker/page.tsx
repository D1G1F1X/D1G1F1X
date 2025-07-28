"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { EnhancedDatePicker } from "@/components/ui/enhanced-date-picker"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"

export default function TestDatePickerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [enhancedDate, setEnhancedDate] = useState<Date | undefined>(undefined)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Date Picker Test Page</h1>
          <p className="text-muted-foreground">Test and showcase various date picker components.</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> Basic DatePicker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
            <p className="mt-4 text-sm text-muted-foreground">
              Selected: {selectedDate ? selectedDate.toDateString() : "None"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> DateRangePicker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DateRangePicker date={dateRange} setDate={setDateRange} />
            <p className="mt-4 text-sm text-muted-foreground">
              From: {dateRange.from ? dateRange.from.toDateString() : "None"}
            </p>
            <p className="text-sm text-muted-foreground">To: {dateRange.to ? dateRange.to.toDateString() : "None"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> Enhanced DatePicker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedDatePicker date={enhancedDate} setDate={setEnhancedDate} />
            <p className="mt-4 text-sm text-muted-foreground">
              Selected: {enhancedDate ? enhancedDate.toDateString() : "None"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
