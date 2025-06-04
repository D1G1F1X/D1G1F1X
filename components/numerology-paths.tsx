"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calculator } from "lucide-react"
import NumerologyImage from "@/components/numerology-image"

const lifePathData = [
  {
    number: 1,
    title: "The Leader",
    traits: ["Independent", "Pioneering", "Ambitious", "Original"],
    element: "Fire",
    description:
      "Life Path 1 individuals are natural leaders and pioneers. They're independent, ambitious, and driven to achieve their goals. They possess strong willpower and determination, often blazing new trails where others haven't gone before.",
    guidance:
      "Embrace your natural leadership abilities while being mindful not to become too domineering. Balance your independence with healthy relationships and collaborations.",
  },
  {
    number: 2,
    title: "The Mediator",
    traits: ["Diplomatic", "Cooperative", "Sensitive", "Harmonious"],
    element: "Water",
    description:
      "Life Path 2 individuals are natural peacemakers and diplomats. They're sensitive, intuitive, and deeply value harmony in relationships. They excel at cooperation and have a natural ability to see multiple perspectives.",
    guidance:
      "Honor your sensitivity as a strength while establishing healthy boundaries. Your ability to create harmony is a gift, but remember that some conflict is necessary for growth.",
  },
  {
    number: 3,
    title: "The Creator",
    traits: ["Expressive", "Creative", "Joyful", "Communicative"],
    element: "Air",
    description:
      "Life Path 3 individuals are natural creators and communicators. They're expressive, optimistic, and bring joy to others through their creative talents. They have a natural charm and enthusiasm that draws people to them.",
    guidance:
      "Channel your creative energy into meaningful projects rather than scattering your focus. Develop discipline to bring your creative visions to completion.",
  },
  {
    number: 4,
    title: "The Builder",
    traits: ["Practical", "Reliable", "Organized", "Hardworking"],
    element: "Earth",
    description:
      "Life Path 4 individuals are natural builders and organizers. They're practical, reliable, and create solid foundations in all areas of life. They value stability and approach challenges with methodical determination.",
    guidance:
      "While structure is important, allow room for flexibility and spontaneity. Your practicality is valuable, but remember to nurture your inner dreamer as well.",
  },
  {
    number: 5,
    title: "The Freedom Seeker",
    traits: ["Adaptable", "Versatile", "Adventurous", "Progressive"],
    element: "Air",
    description:
      "Life Path 5 individuals are natural adventurers and freedom seekers. They're versatile, progressive, and thrive on change and new experiences. They have a natural curiosity and ability to adapt to diverse situations.",
    guidance:
      "Channel your love of freedom and change into meaningful growth rather than restless movement. Find the balance between adventure and establishing roots.",
  },
  {
    number: 6,
    title: "The Nurturer",
    traits: ["Responsible", "Loving", "Compassionate", "Harmonious"],
    element: "Earth",
    description:
      "Life Path 6 individuals are natural nurturers and caretakers. They're responsible, compassionate, and create harmony in their homes and communities. They have a deep sense of duty and service to others.",
    guidance:
      "While caring for others, remember to nurture yourself as well. Set healthy boundaries to prevent burnout from taking on too many responsibilities.",
  },
  {
    number: 7,
    title: "The Seeker",
    traits: ["Analytical", "Introspective", "Spiritual", "Wise"],
    element: "Water",
    description:
      "Life Path 7 individuals are natural seekers and analysts. They're introspective, spiritual, and pursue deep understanding of life's mysteries. They have a natural wisdom and ability to see beneath the surface.",
    guidance:
      "Balance your inner seeking with practical engagement with the world. Your analytical mind is powerful, but remember to connect with your heart and others.",
  },
  {
    number: 8,
    title: "The Achiever",
    traits: ["Ambitious", "Powerful", "Abundant", "Executive"],
    element: "Fire",
    description:
      "Life Path 8 individuals are natural achievers and executives. They're ambitious, powerful, and have a natural ability to create material abundance. They understand systems of power and how to navigate them effectively.",
    guidance:
      "Remember that true success includes spiritual and emotional fulfillment, not just material achievement. Use your power to benefit others as well as yourself.",
  },
  {
    number: 9,
    title: "The Humanitarian",
    traits: ["Compassionate", "Idealistic", "Artistic", "Global"],
    element: "Spirit",
    description:
      "Life Path 9 individuals are natural humanitarians and visionaries. They're compassionate, idealistic, and see the interconnectedness of all people. They have a global perspective and desire to make a positive impact.",
    guidance:
      "While serving humanity's greater good, remember to address your personal needs and healing. Your compassion is most effective when it begins with self-compassion.",
  },
]

export default function NumerologyPaths() {
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [year, setYear] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculateLifePath = () => {
    if (!month || !day || !year) return

    // Simple calculation for demo purposes
    const monthSum = month.split("").reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    const daySum = day.split("").reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    const yearSum = year.split("").reduce((sum, digit) => sum + Number.parseInt(digit), 0)

    let total = monthSum + daySum + yearSum

    // Reduce to a single digit (1-9)
    while (total > 9) {
      total = total
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    }

    setResult(total)
  }

  const handleTabClick = (tabId: string) => {
    // Find the tab trigger element and click it
    const tabTrigger = document.querySelector(`[data-value="${tabId}"]`) as HTMLElement
    if (tabTrigger) {
      tabTrigger.click()
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Life Path Number</h2>
          <p className="text-gray-300 mb-6">
            Your Life Path Number is one of the most important numbers in your numerology chart. It reveals your life's
            purpose and the path you're meant to follow.
          </p>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Enter your birth date:</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Month</label>
                <Input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  className="bg-gray-900 border-gray-600"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Day</label>
                <Input
                  type="number"
                  min="1"
                  max="31"
                  placeholder="DD"
                  className="bg-gray-900 border-gray-600"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Year</label>
                <Input
                  type="number"
                  placeholder="YYYY"
                  className="bg-gray-900 border-gray-600"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={calculateLifePath}>
            <Calculator className="mr-2 h-4 w-4" /> Calculate My Life Path Number
          </Button>

          {result !== null && (
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Your Life Path Number is {result}</h3>
              <p className="text-gray-300 mb-4">
                {lifePathData.find((path) => path.number === result)?.title}:{" "}
                {lifePathData.find((path) => path.number === result)?.description.substring(0, 100)}...
              </p>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleTabClick(result.toString())}
              >
                Read Full Description
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg" />
          <div className="relative h-full bg-gray-800/80 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Is Numerology?</h2>
            <p className="text-gray-300 mb-4">
              Numerology is the mystical study of numbers and their influence on human life. It's based on the belief
              that numbers carry specific vibrations and energies that can reveal insights about your personality,
              talents, challenges, and life purpose.
            </p>
            <p className="text-gray-300 mb-4">
              In numerology, each number from 1-9 has unique qualities and characteristics. By calculating various
              numbers based on your birth date and name, you can uncover profound insights about yourself and your life
              journey.
            </p>
            <p className="text-gray-300">
              The NUMO ORACLE integrates numerological wisdom with oracle card guidance, creating a powerful system for
              self-discovery and spiritual growth.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">The Nine Life Path Numbers</h2>

      <Tabs defaultValue="1" className="w-full mb-12">
        <div className="overflow-x-auto mb-8">
          <TabsList className="bg-gray-800 inline-flex w-auto">
            {lifePathData.map((path) => (
              <TabsTrigger
                key={path.number}
                value={path.number.toString()}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {path.number}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {lifePathData.map((path) => (
          <TabsContent key={path.number} value={path.number.toString()} className="mt-0">
            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-6 md:p-8 col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {path.number}
                    </div>
                    <h3 className="text-2xl font-bold text-purple-400">{path.title}</h3>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Traits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.traits.map((trait, idx) => (
                        <span key={idx} className="bg-gray-700 text-purple-300 px-2 py-1 rounded-full text-xs">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Element:</h4>
                    <span className="bg-gray-700 text-purple-300 px-2 py-1 rounded-full text-xs">{path.element}</span>
                  </div>

                  <p className="text-gray-300 mb-4">{path.description}</p>
                  <p className="text-gray-300">{path.guidance}</p>
                </div>

                <div className="relative h-64 md:h-auto">
                  <NumerologyImage number={path.number} title={path.title} />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">Numerology and Oracle Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              The NUMO ORACLE system uniquely combines numerology with oracle card wisdom, creating a powerful synergy
              between these two ancient divination methods.
            </p>
            <p className="text-gray-300 mb-4">
              Each card in the NUMO deck carries specific numerological vibrations that resonate with your personal
              numbers, providing deeper and more personalized insights during readings.
            </p>
            <p className="text-gray-300">
              By understanding both your numerological profile and the numerical vibrations of the cards, you can access
              multi-layered guidance that addresses both your core essence and your current life circumstances.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleTabClick("numerology-calculator")}
              variant="outline"
              className="w-full border-purple-500 text-purple-400 hover:bg-purple-900/20"
            >
              Try the Numerology Calculator <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">Beyond Your Life Path Number</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              While your Life Path Number is foundational, a complete numerology profile includes several other
              important numbers that reveal different aspects of your personality and life journey:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>
                <span className="font-medium text-purple-300">Expression Number:</span> Reveals your natural talents and
                abilities
              </li>
              <li>
                <span className="font-medium text-purple-300">Soul Urge Number:</span> Indicates your inner desires and
                motivations
              </li>
              <li>
                <span className="font-medium text-purple-300">Personality Number:</span> Shows how others perceive you
              </li>
              <li>
                <span className="font-medium text-purple-300">Birthday Number:</span> Highlights special gifts you
                possess
              </li>
            </ul>
            <p className="text-gray-300">
              Together, these numbers create a comprehensive numerological blueprint of who you are and your life's
              potential.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleTabClick("numerology-calculator")}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Try Our Full Numerology Calculator
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Numerology in Daily Life</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium text-purple-400 mb-3">Personal Days</h3>
            <p className="text-gray-300">
              Each day carries a specific numerical vibration that interacts with your personal numbers. By calculating
              your Personal Day Number, you can align your activities with the day's energy for optimal results and
              flow.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-purple-400 mb-3">Name Numerology</h3>
            <p className="text-gray-300">
              The letters in your name convert to numbers that reveal insights about your personality and life path.
              Understanding your name's numerology can help you make empowered choices about personal branding, business
              names, or even considering name changes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-purple-400 mb-3">Address & Phone Numbers</h3>
            <p className="text-gray-300">
              The numbers in your address and phone number create a vibrational environment that influences your daily
              life. By understanding these numbers, you can make informed choices about where to live or which phone
              number to select for harmonious energy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
