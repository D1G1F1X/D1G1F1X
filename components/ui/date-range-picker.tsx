"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
  className?: string
  align?: "center" | "start" | "end"
  preset?: {
    label: string
    range: DateRange
  }[]
}

export function DateRangePicker({ dateRange, setDateRange, className, align = "start", preset }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Default presets if none provided
  const defaultPresets = [
    {
      label: "Today",
      range: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      label: "Last 7 days",
      range: {
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date(),
      },
    },
    {
      label: "Last 30 days",
      range: {
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
      },
    },
    {
      label: "Last 90 days",
      range: {
        from: new Date(new Date().setDate(new Date().getDate() - 90)),
        to: new Date(),
      },
    },
    {
      label: "This year",
      range: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
  ]

  const presets = preset || defaultPresets

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
              "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
              "hover:bg-purple-50 dark:hover:bg-purple-900/30",
              "focus-visible:border-purple-500 dark:focus-visible:border-purple-400",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
          align={align}
        >
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium">Select Date Range</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose a preset or select a custom range
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Presets</div>
              <div className="flex flex-col gap-2">
                {presets.map((preset, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 justify-start"
                    onClick={() => {
                      setDateRange(preset.range)
                      setIsOpen(false)
                    }}
                  >
                    {preset.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                classNames={{
                  day_today: "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300",
                  day_selected:
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
                  day_range_middle: "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-300",
                  day_range_end:
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
                  day_range_start:
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
                }}
              />
            </div>
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDateRange(undefined)
                setIsOpen(false)
              }}
              className="text-xs"
            >
              Clear
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)} className="text-xs bg-purple-600 hover:bg-purple-700">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
