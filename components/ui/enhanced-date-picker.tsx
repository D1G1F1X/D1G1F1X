"use client"

import * as React from "react"
import { format, isValid, parse } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  placeholder?: string
  showClearButton?: boolean
  showTodayButton?: boolean
  showQuickDates?: boolean
  quickDateRanges?: { label: string; date: Date }[]
  calendarClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

export function EnhancedDatePicker({
  date,
  setDate,
  className,
  disabled = false,
  placeholder = "Select date",
  showClearButton = true,
  showTodayButton = true,
  showQuickDates = true,
  quickDateRanges,
  calendarClassName,
  triggerClassName,
  contentClassName,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState<string>(date ? format(date, "MM/dd/yyyy") : "")
  const [error, setError] = React.useState<string | null>(null)

  // Default quick date options if not provided
  const defaultQuickDates = [
    { label: "Today", date: new Date() },
    { label: "Yesterday", date: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { label: "Last Week", date: new Date(new Date().setDate(new Date().getDate() - 7)) },
    { label: "Last Month", date: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
  ]

  const dateOptions = quickDateRanges || defaultQuickDates

  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "MM/dd/yyyy"))
    } else {
      setInputValue("")
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setError(null)

    if (value === "") {
      setDate(undefined)
      return
    }

    // Try to parse the date
    try {
      const parsedDate = parse(value, "MM/dd/yyyy", new Date())
      if (isValid(parsedDate)) {
        setDate(parsedDate)
      } else {
        setError("Invalid date format")
      }
    } catch (err) {
      setError("Please use MM/DD/YYYY format")
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDate(undefined)
    setInputValue("")
    setError(null)
  }

  const handleToday = () => {
    const today = new Date()
    setDate(today)
    setOpen(false)
  }

  const handleQuickDateSelect = (selectedDate: Date) => {
    setDate(selectedDate)
    setOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "pr-10 transition-colors duration-200",
                error ? "border-red-500 focus-visible:ring-red-500" : "",
                "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
                "focus-visible:border-purple-500 dark:focus-visible:border-purple-400",
                triggerClassName,
              )}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {inputValue && showClearButton ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={handleClear}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear date</span>
                </Button>
              ) : (
                <CalendarIcon
                  className="h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => !disabled && setOpen(true)}
                />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-auto p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            contentClassName,
          )}
          align="start"
        >
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-sm font-medium">Select Date</h3>
            {showTodayButton && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-transparent border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                onClick={handleToday}
              >
                Today
              </Button>
            )}
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            disabled={disabled}
            initialFocus
            className={cn("p-3", calendarClassName)}
            classNames={{
              day_today: "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300",
              day_selected: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
              day_range_middle: "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-300",
              day_range_end: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
              day_range_start:
                "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
            }}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
              Caption: ({ displayMonth, displayYear }) => (
                <div className="flex justify-center py-1 relative items-center">
                  <span className="text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded">
                    {format(new Date(displayYear, displayMonth), "MMMM yyyy")}
                  </span>
                </div>
              ),
            }}
          />
          {showQuickDates && dateOptions.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Select</div>
              <div className="flex flex-wrap gap-2">
                {dateOptions.map((option, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400"
                    onClick={() => handleQuickDateSelect(option.date)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {error && (
            <div className="px-3 py-2 text-xs text-red-500 border-t border-gray-200 dark:border-gray-700">{error}</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
