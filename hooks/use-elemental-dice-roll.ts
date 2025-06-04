"use client"

import { useState, useCallback } from "react"
import type { ElementType, DiceResult } from "@/types/dice-types"

export function useElementalDiceRoll() {
  // Initialize dice results with null values
  const [diceResults, setDiceResults] = useState<DiceResult[]>([
    { element: "fire", value: null },
    { element: "water", value: null },
    { element: "earth", value: null },
    { element: "air", value: null },
    { element: "spirit", value: null },
  ])

  // Track rolling state
  const [isRolling, setIsRolling] = useState(false)

  // Roll the dice
  const rollDice = useCallback(() => {
    setIsRolling(true)

    // Set a timeout to simulate the rolling animation
    setTimeout(() => {
      // Generate random values for each die (0-9)
      const newResults = diceResults.map((die) => ({
        ...die,
        value: Math.floor(Math.random() * 10),
      }))

      setDiceResults(newResults)
      setIsRolling(false)
    }, 1500) // 1.5 seconds for the rolling animation
  }, [diceResults])

  // Calculate the total value of all dice
  const totalValue = diceResults.reduce((sum, die) => sum + (die.value || 0), 0)

  // Calculate the elemental balance
  const elementalBalance = diceResults.reduce(
    (balance, die) => {
      if (die.value !== null) {
        balance[die.element] += die.value
      }
      return balance
    },
    {
      fire: 0,
      water: 0,
      earth: 0,
      air: 0,
      spirit: 0,
    } as Record<ElementType, number>,
  )

  return {
    diceResults,
    isRolling,
    rollDice,
    totalValue,
    elementalBalance,
  }
}
