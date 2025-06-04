"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function NumerologySystemOverview() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading numerology system overview...</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-4">
          The NUMO Oracle System
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          A revolutionary approach to numerology that pairs numbers based on their visual forms, symbolic meanings, and
          energetic properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-xl font-bold text-purple-300 mb-4">A New Understanding of Numerology</h3>
          <p className="text-gray-300 mb-4">
            The NUMO Oracle system introduces a revolutionary understanding of numerology by pairing numbers based on
            their visual forms, symbolic meanings, and energetic properties. This system emphasizes how numbers are not
            isolated entities but interrelated forces that create balance, harmony, and transformation.
          </p>
          <p className="text-gray-300 mb-4">
            Created by{" "}
            <a
              href="https://www.kraftwerked.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-purple-300"
            >
              Kraftwerk Numerology
            </a>
            , this system draws upon sacred geometry, elemental forces, and numerological principles to provide guidance
            and clarity for life's journey.
          </p>
          <p className="text-gray-300">
            The NUMO Oracle deck consists of 25 cards divided into five suits, each representing one of the five sacred
            tools. Each suit pairs two numbers together and represents different aspects of life that are essential for
            our growth and well-being.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden">
            <Image
              src="/numerology-oracle-spread.png"
              alt="NUMO Oracle Cards"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">The NUMO Oracle Deck</h3>
              <p className="text-sm text-gray-200">
                A 25-card deck divided into five suits, each representing one of the five sacred tools
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-purple-300 mb-4">The Five Elements</h3>
          <p className="text-gray-300 mb-6">
            The NUMO Oracle system incorporates the five elements as essential aspects of each number's energy. Each
            card in the deck can be read through the lens of these elemental influences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-black/30 rounded-lg p-4 border border-red-900/30">
              <h4 className="font-medium text-red-400 mb-2">Fire</h4>
              <p className="text-sm text-gray-300">
                Representing passion, transformation, and action. Fire brings energy, courage, and the power to
                transform and create.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-blue-900/30">
              <h4 className="font-medium text-blue-400 mb-2">Water</h4>
              <p className="text-sm text-gray-300">
                Representing emotion, intuition, and flow. Water brings healing, adaptability, and the ability to
                connect with our deeper feelings.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-sky-900/30">
              <h4 className="font-medium text-sky-400 mb-2">Air</h4>
              <p className="text-sm text-gray-300">
                Representing intellect, communication, and freedom. Air brings clarity, new ideas, and the power to
                express ourselves.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-green-900/30">
              <h4 className="font-medium text-green-400 mb-2">Earth</h4>
              <p className="text-sm text-gray-300">
                Representing stability, growth, and manifestation. Earth brings grounding, practicality, and the ability
                to build solid foundations.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-purple-900/30">
              <h4 className="font-medium text-purple-400 mb-2">Spirit</h4>
              <p className="text-sm text-gray-300">
                Representing connection, transcendence, and divine guidance. Spirit brings wisdom, inspiration, and the
                ability to connect with higher consciousness.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image
              src="/elemental-glyphs.png"
              alt="Sacred Geometry"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Sacred Geometry</h3>
              <p className="text-sm text-gray-200">
                The visual forms of numbers reveal their energetic properties and symbolic meanings
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h3 className="text-xl font-bold text-purple-300 mb-4">The Power of Visual Relationships</h3>
          <p className="text-gray-300 mb-4">
            In the NUMO Oracle system, the visual relationships between numbers are deeply symbolic and reveal hidden
            synchronicities in their shapes and forms. Each pair of numbers reflects not only an energetic balance but
            also a visual connection that reveals their underlying harmony.
          </p>
          <p className="text-gray-300">
            By understanding these visual relationships, we can gain deeper insights into the nature of numbers and
            their influence on our lives. The NUMO Oracle system invites us to see numbers not just as mathematical
            symbols, but as living energies that can guide us on our spiritual journey.
          </p>
        </div>
      </div>
    </div>
  )
}
