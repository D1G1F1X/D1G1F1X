"use client"

import type React from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { forwardRef } from "react"

export interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  placeholder?: string
  showClearButton?: boolean
  showTodayButton?: boolean
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      setDate,
      className,
      disabled = false,
      placeholder = "Pick a date",
      showClearButton = true,
      showTodayButton = true,
    },
    ref,
  ) => {
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setDate(undefined)
    }

    const handleToday = () => {
      setDate(new Date())
    }

    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{placeholder}</span>}
              {date && showClearButton && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-auto rounded-full opacity-70 hover:opacity-100"
                  onClick={handleClear}
                  disabled={disabled}
                >
                  <span className="sr-only">Clear date</span>
                  <span aria-hidden>×</span>
                </Button>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {showTodayButton && (
              <div className="flex justify-end p-2 border-b">
                <Button type="button" variant="ghost" size="sm" onClick={handleToday} disabled={disabled}>
                  Today
                </Button>
              </div>
            )}
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={disabled} />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)

DatePicker.displayName = "DatePicker"
