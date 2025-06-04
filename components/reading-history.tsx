"use client"
import type { SavedReading } from "@/types/saved-readings"

interface ReadingHistoryProps {
  isOpen: boolean
  onClose: () => void
  onSelectReading: (reading: SavedReading) => void
}

export function ReadingHistory({ isOpen, onClose, onSelectReading }: ReadingHistoryProps) {
  // For demo purposes, we'll create some mock saved readings
  const mockReadings: SavedReading[] = [
    {
      id: "1",
      title: "Career Path Reading",
      date: new Date("2023-10-15").toISOString(),
      question: "What should I focus on in my career?",
      spreadType: "career",
      cards: [],
      reading: "This is a sample reading about career paths and opportunities...",
    },
    {
      id: "2",
      title: "Relationship Guidance",
      date: new Date("2023-11-02").toISOString(),
      question: "How can I improve my relationship?",
      spreadType: "relationship",
      cards: [],
      reading: "This is a sample reading about relationship dynamics and growth...",
    },
    {
      id: "3",
      title: "Personal Growth",
      date: new Date("2023-12-01").toISOString(),
      question: "What areas should I focus on for personal development?",
      spreadType: "five",
      cards: [],
      reading: "This is a sample reading about personal growth and self-improvement...",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Reading History</h2>

          {mockReadings.length > 0 ? (
            <div className="space-y-4">
              {mockReadings.map((reading) => (
                <div
                  key={reading.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors duration-200"
                  onClick={() => {
                    onSelectReading(reading)
                    onClose()
                  }}
                >
                  <h3 className="text-lg font-semibold text-white">{reading.title}</h3>
                  <p className="text-gray-400 text-sm">{new Date(reading.date).toLocaleDateString()}</p>
                  <p className="text-gray-300 mt-2">"{reading.question}"</p>
                  <p className="text-purple-300 text-sm mt-2">
                    {reading.spreadType.charAt(0).toUpperCase() + reading.spreadType.slice(1)} Spread
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">You don't have any saved readings yet.</p>
          )}

          <div className="mt-6 flex justify-end">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
