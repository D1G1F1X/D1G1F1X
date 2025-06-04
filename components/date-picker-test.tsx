"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatePickerTest() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Date Picker Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2">Selected date: {date ? date.toLocaleDateString() : "None"}</p>
          <DatePicker date={date} setDate={setDate} placeholder="Test date picker" />
        </div>
        <Button onClick={() => setDate(new Date())}>Set to Today</Button>
        <Button variant="outline" onClick={() => setDate(undefined)}>
          Clear Date
        </Button>
      </CardContent>
    </Card>
  )
}
