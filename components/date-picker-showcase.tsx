"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedDatePicker } from "@/components/ui/enhanced-date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"

export function DatePickerShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <Card className="border-purple-300 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            Modern Date Picker Components
          </CardTitle>
          <CardDescription>
            Intuitive and visually appealing date selection components for the Numoracle platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="single">Single Date Picker</TabsTrigger>
              <TabsTrigger value="range">Date Range Picker</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Standard Date Picker</label>
                <EnhancedDatePicker
                  date={singleDate}
                  setDate={setSingleDate}
                  placeholder="Select a date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Date Picker with Quick Selections</label>
                <EnhancedDatePicker
                  date={singleDate}
                  setDate={setSingleDate}
                  placeholder="Select a date"
                  showQuickDates={true}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Custom Quick Date Options</label>
                <EnhancedDatePicker
                  date={singleDate}
                  setDate={setSingleDate}
                  placeholder="Select a date"
                  showQuickDates={true}
                  quickDateRanges={[
                    { label: "Birth Date", date: new Date(1990, 0, 1) },
                    { label: "New Moon", date: new Date(2023, 10, 13) },
                    { label: "Full Moon", date: new Date(2023, 10, 27) },
                    { label: "Solstice", date: new Date(2023, 11, 21) },
                  ]}
                  className="w-full"
                />
              </div>
            </TabsContent>

            <TabsContent value="range" className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Standard Date Range Picker</label>
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} className="w-full" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Custom Preset Ranges</label>
                <DateRangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  className="w-full"
                  preset={[
                    {
                      label: "Current Moon Cycle",
                      range: {
                        from: new Date(2023, 10, 13),
                        to: new Date(2023, 11, 12),
                      },
                    },
                    {
                      label: "Mercury Retrograde",
                      range: {
                        from: new Date(2023, 11, 13),
                        to: new Date(2024, 0, 1),
                      },
                    },
                    {
                      label: "Current Solar Year",
                      range: {
                        from: new Date(2023, 0, 1),
                        to: new Date(2023, 11, 31),
                      },
                    },
                    {
                      label: "Astrological Month",
                      range: {
                        from: new Date(2023, 10, 22),
                        to: new Date(2023, 11, 21),
                      },
                    },
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
