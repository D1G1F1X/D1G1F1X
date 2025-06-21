"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DestinyNumberCalculator() {
  const [name, setName] = useState<string>("")
  const [result, setResult] = useState<string | null>(null)

  const valueMap: { [key: string]: number } = {
    A: 1,
    J: 1,
    S: 1,
    B: 2,
    K: 2,
    T: 2,
    C: 3,
    L: 3,
    U: 3,
    D: 4,
    M: 4,
    V: 4,
    E: 5,
    N: 5,
    W: 5,
    F: 6,
    O: 6,
    X: 6,
    G: 7,
    P: 7,
    Y: 7,
    H: 8,
    Q: 8,
    Z: 8,
    I: 9,
    R: 9,
  }

  const reduceNumber = (num: number): number => {
    let currentNum = num
    while (currentNum > 9 && currentNum !== 11 && currentNum !== 22 && currentNum !== 33) {
      currentNum = String(currentNum)
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0)
    }
    return currentNum
  }

  const calculateDestiny = () => {
    if (!name) {
      setResult("Please enter a name.")
      return
    }

    let totalSum = 0
    for (const char of name.toUpperCase()) {
      if (valueMap[char]) {
        totalSum += valueMap[char]
      }
    }

    const compoundNum = totalSum
    const destinyNumber = reduceNumber(totalSum)

    let resultText = `Your Destiny Number is: ${destinyNumber}`
    if ([11, 13, 14, 16, 19, 22, 33].includes(compoundNum)) {
      resultText += ` (from significant Compound Number ${compoundNum})`
    }
    setResult(resultText)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6 rounded-lg shadow-lg font-body">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-accent-gold mb-4">Destiny Number Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-text-main mb-4">
          Your Destiny Number reveals your talents and potential. Enter your full birth name as it appears on your birth
          certificate.
        </p>
        <Table className="w-full border border-border-color mb-6">
          <TableHeader className="bg-gray-700">
            <TableRow>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <TableHead
                  key={num}
                  className="text-accent-gold font-heading text-center p-2 border-r border-border-color last:border-r-0"
                >
                  {num}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-800">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((char) => (
                <TableCell
                  key={char}
                  className="text-text-main text-center p-2 border-r border-border-color last:border-r-0"
                >
                  {char}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-gray-800">
              {["J", "K", "L", "M", "N", "O", "P", "Q", "R"].map((char) => (
                <TableCell
                  key={char}
                  className="text-text-main text-center p-2 border-r border-border-color last:border-r-0"
                >
                  {char}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-gray-800">
              {["S", "T", "U", "V", "W", "X", "Y", "Z", ""].map((char) => (
                <TableCell
                  key={char}
                  className="text-text-main text-center p-2 border-r border-border-color last:border-r-0"
                >
                  {char}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
        <div className="space-y-4">
          <div>
            <label htmlFor="destiny_name" className="block text-text-main font-semibold mb-2">
              Full Birth Name:
            </label>
            <Input
              type="text"
              id="destiny_name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-border-color bg-gray-700 text-text-main focus:border-accent-gold focus:ring-accent-gold"
            />
          </div>
          <Button
            onClick={calculateDestiny}
            className="w-full bg-accent-gold text-bg-dark py-3 rounded-md font-semibold uppercase hover:bg-yellow-400 transition-colors"
          >
            Calculate Destiny Number
          </Button>
          {result && <div className="mt-4 text-xl font-bold text-accent-gold text-center">{result}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
