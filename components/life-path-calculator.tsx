"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LifePathCalculator() {
  const [month, setMonth] = useState<number | "">("")
  const [day, setDay] = useState<number | "">("")
  const [year, setYear] = useState<number | "">("")
  const [result, setResult] = useState<string | null>(null)

  const reduceNumber = (num: number): number => {
    let currentNum = num
    while (currentNum > 9 && currentNum !== 11 && currentNum !== 22 && currentNum !== 33) {
      currentNum = String(currentNum)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0)
    }
    return currentNum
  }

  const calculateLifePath = () => {
    if (month === "" || day === "" || year === "") {
      setResult("Please enter a complete date.")
      return
    }

    const monthVal = Number(month)
    const dayVal = Number(day)
    const yearVal = Number(year)

    if (monthVal < 1 || monthVal > 12 || dayVal < 1 || dayVal > 31 || yearVal < 1000) {
      setResult("Please enter a valid date.")
      return
    }

    const reducedMonth = reduceNumber(monthVal)
    const reducedDay = reduceNumber(dayVal)

    let yearSum = yearVal
    while (yearSum > 9 && yearSum !== 11 && yearSum !== 22 && yearSum !== 33) {
      yearSum = String(yearSum)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0)
    }
    const reducedYear = yearSum

    const total = reducedMonth + reducedDay + reducedYear
    const lifePath = reduceNumber(total)

    setResult(`Your Life Path Number is: ${lifePath}`)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6 rounded-lg shadow-lg font-body">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-accent-gold mb-4">Life Path Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-text-main mb-4">
          Your Life Path Number represents the primary journey and lessons of your life. Enter your birth date below.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="lp_month" className="block text-text-main font-semibold mb-2">
              Month (1-12):
            </label>
            <Input
              type="number"
              id="lp_month"
              min="1"
              max="12"
              placeholder="e.g., 4"
              value={month}
              onChange={(e) => setMonth(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-2 rounded-md border border-border-color bg-gray-700 text-text-main focus:border-accent-gold focus:ring-accent-gold"
            />
          </div>
          <div>
            <label htmlFor="lp_day" className="block text-text-main font-semibold mb-2">
              Day (1-31):
            </label>
            <Input
              type="number"
              id="lp_day"
              min="1"
              max="31"
              placeholder="e.g., 15"
              value={day}
              onChange={(e) => setDay(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-2 rounded-md border border-border-color bg-gray-700 text-text-main focus:border-accent-gold focus:ring-accent-gold"
            />
          </div>
          <div>
            <label htmlFor="lp_year" className="block text-text-main font-semibold mb-2">
              Year (YYYY):
            </label>
            <Input
              type="number"
              id="lp_year"
              placeholder="e.g., 1988"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full p-2 rounded-md border border-border-color bg-gray-700 text-text-main focus:border-accent-gold focus:ring-accent-gold"
            />
          </div>
          <Button
            onClick={calculateLifePath}
            className="w-full bg-accent-gold text-bg-dark py-3 rounded-md font-semibold uppercase hover:bg-yellow-400 transition-colors"
          >
            Calculate Life Path
          </Button>
          {result && <div className="mt-4 text-xl font-bold text-accent-gold text-center">{result}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
