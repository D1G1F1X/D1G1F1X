"use client"

import { useState } from "react"

interface DiceRollResult {
  element: string
  value: number
}

const ElementalDiceRoller = () => {
  const [rollResults, setRollResults] = useState<DiceRollResult[]>([])
  const [affirmation, setAffirmation] = useState<string>("")

  const elements = ["Fire", "Water", "Earth", "Air"]

  const rollDice = () => {
    const newRollResults: DiceRollResult[] = elements.map((element) => ({
      element,
      value: Math.floor(Math.random() * 6) + 1,
    }))
    setRollResults(newRollResults)

    // Generate a simple affirmation based on the roll results
    const total = newRollResults.reduce((sum, result) => sum + result.value, 0)
    if (total > 15) {
      setAffirmation("The elements are strongly aligned in your favor!")
    } else if (total > 10) {
      setAffirmation("The elements are in balance. Proceed with caution and awareness.")
    } else {
      setAffirmation("The elements are turbulent. Ground yourself and seek stability.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Elemental Dice Roller</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={rollDice}>
        Roll the Dice
      </button>

      {rollResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Roll Results:</h2>
          <ul>
            {rollResults.map((result, index) => (
              <li key={index}>
                {result.element}: {result.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {affirmation && <p className="italic text-gray-900 dark:text-gray-100">{affirmation}</p>}
    </div>
  )
}

export default ElementalDiceRoller
