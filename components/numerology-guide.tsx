"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

export default function NumerologyGuide() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black text-white p-6 rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-purple-500">NUMO</span> Numerology Guide
        </h2>
        <p className="text-gray-300">Learn about numerology and discover the meanings behind your core numbers.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-gray-900/50 border-purple-500/30">
          <CardContent className="p-6">
            <h3 className="flex items-center text-lg font-medium mb-4">
              <Info className="mr-2 h-5 w-5 text-purple-400" />
              Understanding Numerology
            </h3>
            <p className="text-gray-300 mb-4">
              Numerology is an ancient practice that explores the significance of numbers and their influence on our
              lives. By analyzing the numbers associated with your name and birthdate, you can gain insights into your
              personality, life path, and potential challenges.
            </p>

            <h4 className="font-medium text-purple-300 mb-2">Core Numerology Numbers</h4>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <span className="font-semibold text-purple-200">Life Path Number:</span> Calculated from your birthdate,
                this number reveals your overall purpose and direction in life.
              </li>
              <li>
                <span className="font-semibold text-purple-200">Destiny Number:</span> Derived from your full name, this
                number reflects your potential and the qualities you are meant to develop.
              </li>
              <li>
                <span className="font-semibold text-purple-200">Soul Number:</span> Based on the vowels in your name,
                this number represents your inner desires and true self.
              </li>
              <li>
                <span className="font-semibold text-purple-200">Personality Number:</span> Calculated from the
                consonants in your name, this number reflects how you present yourself to the world.
              </li>
            </ul>

            <h4 className="font-medium text-purple-300 mt-4 mb-2">Number Meanings</h4>
            <p className="text-gray-300">
              Each number in numerology carries a unique vibration and set of characteristics. Here are some general
              meanings:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <span className="font-semibold text-purple-200">1:</span> Independence, leadership, and new beginnings.
              </li>
              <li>
                <span className="font-semibold text-purple-200">2:</span> Harmony, cooperation, and relationships.
              </li>
              <li>
                <span className="font-semibold text-purple-200">3:</span> Creativity, self-expression, and joy.
              </li>
              <li>
                <span className="font-semibold text-purple-200">4:</span> Stability, practicality, and hard work.
              </li>
              <li>
                <span className="font-semibold text-purple-200">5:</span> Freedom, adventure, and change.
              </li>
              <li>
                <span className="font-semibold text-purple-200">6:</span> Responsibility, nurturing, and service.
              </li>
              <li>
                <span className="font-semibold text-purple-200">7:</span> Introspection, wisdom, and spirituality.
              </li>
              <li>
                <span className="font-semibold text-purple-200">8:</span> Abundance, power, and success.
              </li>
              <li>
                <span className="font-semibold text-purple-200">9:</span> Compassion, humanitarianism, and completion.
              </li>
              <li>
                <span className="font-semibold text-purple-200">11 & 22:</span> Master numbers representing heightened
                potential and spiritual insight.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
