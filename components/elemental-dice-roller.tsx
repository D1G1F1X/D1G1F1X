"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ElementalDie } from "./elemental-die"
import { useElementalDiceRoll } from "@/hooks/use-elemental-dice-roll"
import { Info } from "lucide-react"
import type { ElementType, DiceResult } from "@/types/dice-types"
import { ToolResultShare } from "./tool-result-share"

export function ElementalDiceRoller() {
  const { diceResults, isRolling, rollDice, totalValue, elementalBalance } = useElementalDiceRoll()
  const [showInterpretation, setShowInterpretation] = useState(false)
  const [activeTab, setActiveTab] = useState("numerology")

  // Handle dice rolling
  const handleRollDice = () => {
    rollDice()
  }

  useEffect(() => {
    if (!isRolling && diceResults.some((die) => die.value !== null)) {
      const timer = setTimeout(() => {
        setShowInterpretation(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setShowInterpretation(false)
    }
  }, [isRolling, diceResults])

  // Calculate the reduced value (single digit)
  const reducedValue = getReducedNumber(totalValue)

  // Get the reduction steps for display
  const reductionSteps = getReductionSteps(totalValue)

  // Get pattern analysis
  const patternAnalysis = analyzePatterns(diceResults)

  // Get life path connection
  const lifePathConnection = getLifePathConnection(reducedValue)

  // Get destiny number connection
  const destinyConnection = getDestinyConnection(reducedValue)

  // Get the air die
  const airDie = diceResults.find((die) => die.element === "air")

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-between items-center">
            <div className="w-10">
              <span className="sr-only">Spacer</span>
            </div>
            <CardTitle className="text-3xl font-bold">Elemental Dice Oracle</CardTitle>
            <div className="w-10"></div>
          </div>
          <CardDescription>Roll the five elemental dice to receive numerological guidance</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {diceResults.map((die, index) => (
              <ElementalDie key={index} element={die.element} value={die.value} isRolling={isRolling} />
            ))}
          </div>

          {showInterpretation && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <Tabs defaultValue="numerology" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="numerology">Numerology</TabsTrigger>
                  <TabsTrigger value="elemental">Elemental</TabsTrigger>
                  <TabsTrigger value="guidance">Guidance</TabsTrigger>
                </TabsList>

                <TabsContent value="numerology" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Numerological Sum Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-md border border-purple-100">
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-sm text-gray-500 mb-1">Sum of All Dice</div>
                          <div className="text-4xl font-bold text-purple-700 mb-2">{totalValue}</div>

                          {reductionSteps.length > 0 && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>Reduces to:</span>
                              {reductionSteps.map((step, index) => (
                                <span key={index} className="font-medium">
                                  {index > 0 && " → "}
                                  {step}
                                </span>
                              ))}
                              <span className="font-bold text-purple-700">= {reducedValue}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg mb-2">Root Number {reducedValue}</h3>
                        <p className="text-sm">{getDetailedNumberMeaning(reducedValue)}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg mb-2">Current Life Influence</h3>
                        <p className="text-sm">{getCurrentLifeInfluence(reducedValue)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Pattern Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{patternAnalysis}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Numerological Connections</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="life-path">
                            <AccordionTrigger className="text-sm font-medium">Life Path Connection</AccordionTrigger>
                            <AccordionContent className="text-sm">{lifePathConnection}</AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="destiny">
                            <AccordionTrigger className="text-sm font-medium">
                              Destiny Number Connection
                            </AccordionTrigger>
                            <AccordionContent className="text-sm">{destinyConnection}</AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="challenges">
                            <AccordionTrigger className="text-sm font-medium">Potential Challenges</AccordionTrigger>
                            <AccordionContent className="text-sm">
                              {getPotentialChallenges(reducedValue)}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="opportunities">
                            <AccordionTrigger className="text-sm font-medium">Future Opportunities</AccordionTrigger>
                            <AccordionContent className="text-sm">
                              {getFutureOpportunities(reducedValue)}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Individual Die Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {diceResults.map((die, index) => (
                          <div
                            key={index}
                            className="text-sm border-l-4 pl-3 py-1 rounded-sm"
                            style={{
                              borderColor:
                                die.element === "fire"
                                  ? "#ef4444"
                                  : die.element === "water"
                                    ? "#3b82f6"
                                    : die.element === "earth"
                                      ? "#22c55e"
                                      : die.element === "air"
                                        ? "#eab308"
                                        : "#a855f7",
                            }}
                          >
                            <span
                              className={cn(
                                "font-medium",
                                die.element === "fire" && "text-red-600",
                                die.element === "water" && "text-blue-600",
                                die.element === "earth" && "text-green-600",
                                die.element === "air" && "text-yellow-600",
                                die.element === "spirit" && "text-purple-600",
                              )}
                            >
                              {die.element.charAt(0).toUpperCase() + die.element.slice(1)} ({die.value}):
                            </span>{" "}
                            {getIndividualDieAnalysis(die)}
                          </div>
                        ))}
                      </div>

                      {airDie && airDie.value !== null && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                          <h4 className="font-medium text-yellow-700 mb-2">Special Focus: Air Element (Yellow)</h4>
                          <p className="text-sm text-gray-700">{getAirElementSignificance(airDie.value)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="elemental" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Elemental Balance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(elementalBalance).map(([element, value]) => (
                            <Badge
                              key={element}
                              variant="outline"
                              className={cn(
                                "text-sm py-1",
                                element === "fire" && "bg-red-100 border-red-500 text-red-700",
                                element === "water" && "bg-blue-100 border-blue-500 text-blue-700",
                                element === "earth" && "bg-green-100 border-green-500 text-green-700",
                                element === "air" && "bg-yellow-100 border-yellow-500 text-yellow-700",
                                element === "spirit" && "bg-purple-100 border-purple-500 text-purple-700",
                              )}
                            >
                              {element.charAt(0).toUpperCase() + element.slice(1)}: {value}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dominant Element</CardTitle>
                      </CardHeader>
                      <CardContent>{getDominantElementAnalysis(elementalBalance)}</CardContent>
                    </Card>
                  </div>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Elemental Reading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{generateElementalReading(diceResults, elementalBalance)}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="guidance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Guidance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        {generatePersonalGuidance(diceResults, elementalBalance, reducedValue)}
                      </p>

                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Affirmation</h4>
                        <p className="italic text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-purple-100">
                          {generateAffirmation(diceResults, elementalBalance, reducedValue)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Action Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        {generateActionSteps(diceResults, elementalBalance, reducedValue).map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium">About Numerological Analysis</h3>
                </div>
                <p className="text-xs text-gray-600">
                  Numerology is the study of numbers and their energetic influence on our lives. In this reading, we
                  analyze the sum of your dice roll ({totalValue}), reduce it to a single digit ({reducedValue}), and
                  interpret its meaning. Each number carries unique vibrations and insights into your current situation,
                  challenges, and opportunities. The elemental associations add another dimension to this reading, with
                  the yellow Air die representing intellectual clarity, communication, and new ideas.
                </p>
              </div>
            </div>
          )}
          {showInterpretation && (
            <div className="mt-8 animate-fade-in">
              <ToolResultShare
                toolName="Elemental Dice Oracle"
                resultTitle={`Numerological Sum: ${totalValue} (${reducedValue})`}
                resultDescription={`Your elemental dice roll reveals a numerological sum of ${totalValue}, which reduces to ${reducedValue}. ${getDetailedNumberMeaning(reducedValue).split(".")[0]}. The dominant element in your reading is ${Object.entries(elementalBalance).sort((a, b) => b[1] - a[1])[0][0]}.`}
                resultData={{
                  "Life Path Connection": reducedValue,
                  "Dominant Element": Object.entries(elementalBalance).sort((a, b) => b[1] - a[1])[0][0],
                  Pattern: patternAnalysis.substring(0, 50) + "...",
                }}
                tags={[
                  "numerology",
                  "oracle",
                  "dice",
                  `number${reducedValue}`,
                  Object.entries(elementalBalance).sort((a, b) => b[1] - a[1])[0][0],
                ]}
                className="mt-6 border-t pt-6"
              />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={handleRollDice} disabled={isRolling} className="relative overflow-hidden group">
            <span className="relative z-10">{isRolling ? "Rolling..." : "Roll the Elemental Dice"}</span>
            <span className="absolute inset-0 flex">
              <span className="w-1/5 h-full bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300"></span>
              <span className="w-1/5 h-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300"></span>
              <span className="w-1/5 h-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors duration-300"></span>
              <span className="w-1/5 h-full bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors duration-300"></span>
              <span className="w-1/5 h-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300"></span>
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Get reduction steps for display
function getReductionSteps(num: number): number[] {
  if (num <= 9) return []

  const steps: number[] = []
  let currentNum = num

  while (currentNum > 9) {
    const digits = Array.from(String(currentNum), Number)
    steps.push(...digits)
    currentNum = digits.reduce((a, b) => a + b, 0)
  }

  return steps
}

// Get reduced number (single digit)
function getReducedNumber(num: number): number {
  if (num <= 9) return num

  let reducedNum = num
  while (reducedNum > 9) {
    reducedNum = Array.from(String(reducedNum), Number).reduce((a, b) => a + b, 0)
  }

  return reducedNum
}

// Get detailed number meaning
function getDetailedNumberMeaning(num: number): string {
  const meanings = {
    0: "The Void (0) represents infinite potential and the cosmic egg from which all creation emerges. It symbolizes completeness, wholeness, and the beginning of all things. In numerology, zero amplifies the energies of numbers it appears with and represents the eternal cycle of existence. It suggests a time of preparation before a new beginning, connecting you to the unlimited possibilities of the universe.",

    1: "The Pioneer (1) represents new beginnings, independence, and leadership. As the first single digit, it embodies creation, originality, and self-reliance. In numerology, one is the number of the individual, the innovator who forges new paths. It signifies a time to take initiative, start fresh projects, and embrace your individuality. One encourages you to be confident, assertive, and to trust your ability to create your own reality.",

    2: "The Diplomat (2) represents balance, partnership, and duality. It embodies cooperation, sensitivity, and harmony. In numerology, two is the number of relationships and receptivity, bringing a gentle energy of patience and consideration. It signifies a time to find middle ground, work with others, and trust your intuition. Two encourages you to be diplomatic, nurturing, and to recognize the power of collaboration.",

    3: "The Creator (3) represents self-expression, creativity, and communication. It embodies joy, optimism, and artistic talent. In numerology, three is the number of creation through expression, bringing an energy of enthusiasm and imagination. It signifies a time to express yourself freely, socialize, and find pleasure in life. Three encourages you to be expressive, joyful, and to embrace your creative potential.",

    4: "The Builder (4) represents stability, order, and foundation. It embodies discipline, hard work, and practical wisdom. In numerology, four is the number of structure and organization, bringing an energy of reliability and determination. It signifies a time to create solid structures, be methodical, and establish security. Four encourages you to be diligent, systematic, and to build lasting foundations for future growth.",

    5: "The Freedom Seeker (5) represents change, adventure, and versatility. It embodies freedom, curiosity, and sensory experience. In numerology, five is the number of dynamic movement and progressive thought, bringing an energy of adaptability and resourcefulness. It signifies a time to embrace change, seek new experiences, and adapt to circumstances. Five encourages you to be flexible, adventurous, and to welcome the unexpected.",

    6: "The Nurturer (6) represents harmony, responsibility, and love. It embodies service, care, and balance. In numerology, six is the number of domestic bliss and community responsibility, bringing an energy of compassion and protection. It signifies a time to nurture relationships, create beauty, and find equilibrium in responsibilities. Six encourages you to be loving, supportive, and to create harmony in your environment.",

    7: "The Mystic (7) represents wisdom, introspection, and spirituality. It embodies analysis, research, and inner knowing. In numerology, seven is the number of spiritual awakening and intellectual pursuit, bringing an energy of contemplation and discovery. It signifies a time to seek deeper truths, study, and connect with your spiritual side. Seven encourages you to be thoughtful, introspective, and to trust your inner wisdom.",

    8: "The Achiever (8) represents abundance, power, and material success. It embodies manifestation, authority, and worldly accomplishment. In numerology, eight is the number of material mastery and karmic balance, bringing an energy of ambition and efficiency. It signifies a time to take charge, build wealth, and recognize your personal power. Eight encourages you to be confident, strategic, and to embrace your capacity for achievement.",

    9: "The Humanitarian (9) represents completion, compassion, and universal love. It embodies culmination, wisdom, and selfless service. In numerology, nine is the number of completion and spiritual wisdom, bringing an energy of altruism and higher perspective. It signifies a time for letting go, serving others, and embracing a broader perspective. Nine encourages you to be compassionate, wise, and to recognize your connection to all humanity.",
  }

  return meanings[num as keyof typeof meanings]
}

// Get current life influence
function getCurrentLifeInfluence(num: number): string {
  const influences = {
    1: "You are in a cycle of new beginnings and self-discovery. This is a time to initiate projects, assert your independence, and develop leadership skills. The number 1 brings the energy of creation and originality, encouraging you to forge your own path rather than following others. Your individuality is your strength now, and you're being called to trust your instincts and take bold action. This is an excellent time for entrepreneurship, starting new ventures, and establishing your unique identity in the world.",

    2: "You are in a cycle of partnership and cooperation. This is a time to develop relationships, practice diplomacy, and find balance between opposing forces in your life. The number 2 brings the energy of patience and consideration, encouraging you to listen deeply and consider multiple perspectives. Your sensitivity and intuition are heightened now, making this an excellent time for collaborative projects, mediation, and deepening personal connections. Pay attention to subtle feelings and synchronicities that guide your path.",

    3: "You are in a cycle of creative expression and social connection. This is a time to communicate your ideas, engage in artistic pursuits, and enjoy the company of others. The number 3 brings the energy of optimism and imagination, encouraging you to express yourself without self-censorship. Your natural charm and creativity are enhanced now, making this an excellent time for writing, speaking, performing, or any form of self-expression. Embrace joy and playfulness in your approach to life.",

    4: "You are in a cycle of building and establishing order. This is a time to create solid foundations, develop systems, and focus on practical matters. The number 4 brings the energy of discipline and determination, encouraging you to be methodical and persistent. Your ability to organize and manage resources is enhanced now, making this an excellent time for planning, structuring your environment, and addressing financial matters. Hard work now will create lasting security and stability.",

    5: "You are in a cycle of change and freedom. This is a time to embrace new experiences, adapt to changing circumstances, and break free from limitations. The number 5 brings the energy of adventure and versatility, encouraging you to be flexible and resourceful. Your adaptability and quick thinking are assets now, making this an excellent time for travel, learning new skills, and exploring different perspectives. Embrace change rather than resisting it, as it brings valuable growth opportunities.",

    6: "You are in a cycle of responsibility and nurturing. This is a time to care for others, create harmony in your environment, and find balance in your obligations. The number 6 brings the energy of compassion and service, encouraging you to create beauty and comfort around you. Your natural ability to support others is highlighted now, making this an excellent time for family matters, home improvements, and community service. Remember to balance caring for others with self-care.",

    7: "You are in a cycle of analysis and spiritual development. This is a time to seek deeper understanding, engage in research, and connect with your inner wisdom. The number 7 brings the energy of contemplation and discovery, encouraging you to look beneath the surface of things. Your intellectual and intuitive faculties are heightened now, making this an excellent time for study, meditation, and solving complex problems. Solitude and quiet reflection will bring valuable insights.",

    8: "You are in a cycle of empowerment and abundance. This is a time to take charge of your circumstances, recognize your authority, and focus on material mastery. The number 8 brings the energy of ambition and efficiency, encouraging you to be confident in your abilities. Your capacity to manifest resources and influence outcomes is enhanced now, making this an excellent time for business ventures, financial planning, and taking leadership roles. Balance material pursuits with ethical considerations.",

    9: "You are in a cycle of completion and universal perspective. This is a time to let go of what no longer serves you, serve humanity, and embrace a global perspective. The number 9 brings the energy of compassion and wisdom, encouraging you to see beyond personal concerns. Your connection to universal truths and humanitarian values is highlighted now, making this an excellent time for philanthropic work, teaching, and artistic expression that inspires others. Prepare for endings that make way for new beginnings.",
  }

  return influences[num as keyof typeof influences]
}

// Get potential challenges
function getPotentialChallenges(num: number): string {
  const challenges = {
    1: "The main challenge with number 1 energy is avoiding excessive self-focus or egotism. You may need to balance independence with consideration for others' needs and perspectives. Watch for tendencies toward impatience, domineering behavior, or an unwillingness to compromise. Learning to collaborate without losing your sense of self is key. Also be mindful of perfectionism or fear of failure that might prevent you from taking necessary action.",

    2: "The main challenge with number 2 energy is avoiding indecision or excessive dependence on others. You may struggle with setting boundaries, being overly sensitive to criticism, or avoiding necessary confrontation. Watch for tendencies toward people-pleasing at the expense of your own needs. Learning to trust your intuition while maintaining healthy relationships is key. Also be mindful of procrastination when faced with difficult choices.",

    3: "The main challenge with number 3 energy is avoiding superficiality or scattered focus. You may struggle with following through on projects, being overly concerned with appearances, or using humor to avoid deeper issues. Watch for tendencies toward exaggeration or speaking without thinking. Learning to channel your creative energy productively is key. Also be mindful of emotional sensitivity that you might hide behind a cheerful facade.",

    4: "The main challenge with number 4 energy is avoiding rigidity or excessive caution. You may struggle with adapting to change, taking risks, or seeing beyond established methods. Watch for tendencies toward workaholism, perfectionism, or judging others by strict standards. Learning to balance structure with flexibility is key. Also be mindful of limiting beliefs about what is possible or practical.",

    5: "The main challenge with number 5 energy is avoiding restlessness or inconsistency. You may struggle with commitment, focusing on one thing at a time, or establishing healthy routines. Watch for tendencies toward overindulgence, impulsivity, or changing direction too frequently. Learning to channel your desire for freedom constructively is key. Also be mindful of resistance to necessary responsibilities or structure.",

    6: "The main challenge with number 6 energy is avoiding excessive responsibility or perfectionism. You may struggle with setting boundaries, taking on others' problems, or maintaining unrealistic standards. Watch for tendencies toward martyrdom, controlling behavior, or neglecting your own needs while caring for others. Learning to balance service with self-care is key. Also be mindful of worry or anxiety about those you care for.",

    7: "The main challenge with number 7 energy is avoiding isolation or excessive skepticism. You may struggle with trusting others, expressing emotions, or translating insights into practical action. Watch for tendencies toward overthinking, critical judgment, or detachment from everyday concerns. Learning to balance analysis with intuition and connection is key. Also be mindful of perfectionism that prevents you from sharing your wisdom.",

    8: "The main challenge with number 8 energy is avoiding materialism or authoritarianism. You may struggle with balancing ambition with ethics, delegating control, or recognizing non-material forms of success. Watch for tendencies toward workaholic behavior, status consciousness, or using power to control others. Learning to balance material mastery with spiritual values is key. Also be mindful of fear of loss or scarcity thinking.",

    9: "The main challenge with number 9 energy is avoiding detachment or impracticality. You may struggle with setting boundaries in service work, finishing projects before starting new ones, or addressing personal needs while focused on larger causes. Watch for tendencies toward martyrdom, emotional distance, or judging those with different values. Learning to balance universal love with practical action is key. Also be mindful of difficulty letting go of the past.",
  }

  return challenges[num as keyof typeof challenges]
}

// Get future opportunities
function getFutureOpportunities(num: number): string {
  const opportunities = {
    1: "The number 1 opens opportunities for leadership, innovation, and pioneering new territory. You're positioned to initiate projects that express your unique vision and abilities. Look for chances to take the lead, start fresh endeavors, or reinvent yourself. Opportunities may arise that require courage, independence, and decisive action. Your ability to forge new paths can open doors in entrepreneurship, creative fields, or positions where original thinking is valued. Trust your instincts when unique opportunities present themselves.",

    2: "The number 2 opens opportunities for partnership, diplomacy, and intuitive work. You're positioned to build meaningful collaborations and mediate between different perspectives. Look for chances to work in teams, develop close relationships, or use your sensitivity to help others. Opportunities may arise in counseling, negotiation, or supportive roles. Your ability to create harmony and understand subtle dynamics can open doors in relationship-oriented fields, intuitive practices, or situations requiring patience and attention to detail.",

    3: "The number 3 opens opportunities for creative expression, communication, and social connection. You're positioned to share your ideas and talents with a wider audience. Look for chances to write, speak, perform, or create art that expresses your unique perspective. Opportunities may arise in creative fields, teaching, or entertainment. Your natural charm and expressiveness can open doors in media, education, or any field where communication skills and creativity are valued. Social gatherings may bring unexpected opportunities.",

    4: "The number 4 opens opportunities for building solid foundations, creating systems, and demonstrating reliability. You're positioned to establish structures that will support long-term success. Look for chances to organize, manage resources, or create practical solutions to problems. Opportunities may arise in business, finance, or fields requiring technical expertise. Your methodical approach and attention to detail can open doors in management, planning roles, or situations where dependability and thoroughness are essential.",

    5: "The number 5 opens opportunities for positive change, adventure, and versatile application of your skills. You're positioned to adapt to new circumstances and embrace diverse experiences. Look for chances to travel, learn new skills, or bring fresh energy to stagnant situations. Opportunities may arise that require flexibility, quick thinking, and resourcefulness. Your adaptability and progressive thinking can open doors in marketing, sales, travel industries, or any field where versatility and embracing change are valued.",

    6: "The number 6 opens opportunities for nurturing leadership, creating harmony, and service to others. You're positioned to make a difference through compassionate action and creating beauty. Look for chances to care for others, improve environments, or bring balance to chaotic situations. Opportunities may arise in healing professions, design fields, or community service. Your natural ability to create comfort and harmony can open doors in counseling, healthcare, education, or any field where nurturing and aesthetic sensibility are valued.",

    7: "The number 7 opens opportunities for specialized knowledge, spiritual insight, and analytical problem-solving. You're positioned to delve deeply into subjects that interest you and share your wisdom. Look for chances to research, analyze, or explore metaphysical topics. Opportunities may arise in academic fields, spiritual counseling, or technical analysis. Your perceptive mind and intuitive understanding can open doors in research, consulting, spiritual teaching, or any field where depth of knowledge and insight are valued.",

    8: "The number 8 opens opportunities for leadership, financial growth, and influential positions. You're positioned to manifest abundance and exercise authority effectively. Look for chances to take charge, build wealth, or create large-scale impact. Opportunities may arise in business, executive leadership, or financial sectors. Your organizational abilities and understanding of power dynamics can open doors in management, entrepreneurship, or any field where ambition and practical manifestation skills are valued.",

    9: "The number 9 opens opportunities for humanitarian work, artistic expression with universal themes, and bringing projects to completion. You're positioned to make a difference on a broad scale. Look for chances to serve humanity, express compassion, or share wisdom gained through experience. Opportunities may arise in non-profit work, international relations, or artistic fields. Your broad perspective and compassionate nature can open doors in philanthropy, counseling, teaching, or any field where a global perspective and humanitarian values are essential.",
  }

  return opportunities[num as keyof typeof opportunities]
}

// Analyze patterns in the dice
function analyzePatterns(diceResults: DiceResult[]): string {
  const values = diceResults.map((die) => die.value).filter((value) => value !== null) as number[]

  // Check for repeating numbers
  const valueCounts: Record<number, number> = {}
  values.forEach((value) => {
    valueCounts[value] = (valueCounts[value] || 0) + 1
  })

  const pairs = Object.entries(valueCounts).filter(([_, count]) => count === 2)
  const triplets = Object.entries(valueCounts).filter(([_, count]) => count === 3)
  const quadruplets = Object.entries(valueCounts).filter(([_, count]) => count === 4)
  const quintuplets = Object.entries(valueCounts).filter(([_, count]) => count === 5)

  // Check for sequences
  const sortedValues = [...values].sort((a, b) => a - b)
  let longestSequence = 1
  let currentSequence = 1

  for (let i = 1; i < sortedValues.length; i++) {
    if (sortedValues[i] === sortedValues[i - 1] + 1) {
      currentSequence++
      longestSequence = Math.max(longestSequence, currentSequence)
    } else if (sortedValues[i] !== sortedValues[i - 1]) {
      currentSequence = 1
    }
  }

  // Generate analysis
  let analysis = ""

  if (quintuplets.length > 0) {
    const num = quintuplets[0][0]
    analysis += `All five dice show the number ${num}! This extremely rare occurrence signifies a powerful alignment and intense focus on the energy of the number ${num}. In numerology, this represents a concentrated lesson or theme that demands your full attention. ${getDetailedNumberMeaning(Number.parseInt(num)).split(".")[0]}. This unified message suggests a significant life phase centered entirely on this energy.`
  } else if (quadruplets.length > 0) {
    const num = quadruplets[0][0]
    analysis += `Four dice show the number ${num}, indicating a strong emphasis on its qualities. In numerology, this pattern suggests that the energy of ${num} is dominating your current experience. ${getDetailedNumberMeaning(Number.parseInt(num)).split(".")[0]}. The fifth die represents a secondary influence or a key to balancing this dominant energy.`
  } else if (triplets.length > 0) {
    const num = triplets[0][0]
    analysis += `Three dice show the number ${num}, creating a triangle of energy focused on its qualities. In numerology, this pattern suggests a strong theme that's actively manifesting in your life. ${getDetailedNumberMeaning(Number.parseInt(num)).split(".")[0]}.`

    if (pairs.length > 0) {
      const pairNum = pairs[0][0]
      analysis += ` Additionally, a pair of ${pairNum}s suggests supporting energy of ${getDetailedNumberMeaning(Number.parseInt(pairNum)).split(".")[0].toLowerCase()}. This combination indicates how these two energies are working together in your current situation.`
    }
  } else if (pairs.length > 1) {
    const firstPair = pairs[0][0]
    const secondPair = pairs[1][0]
    analysis += `You have two pairs: ${firstPair}s and ${secondPair}s. In numerology, this pattern indicates a dual focus or two significant themes operating simultaneously in your life. You're balancing the energies of ${getDetailedNumberMeaning(Number.parseInt(firstPair)).split(".")[0].toLowerCase()} with ${getDetailedNumberMeaning(Number.parseInt(secondPair)).split(".")[0].toLowerCase()}. This suggests a time of integration and finding harmony between these different aspects.`
  } else if (pairs.length === 1) {
    const num = pairs[0][0]
    analysis += `A pair of ${num}s suggests an area of focus or emphasis in your life. In numerology, repeated numbers amplify the energy they represent. ${getDetailedNumberMeaning(Number.parseInt(num)).split(".")[0]}. The other three dice indicate supporting energies or different aspects of your experience that interact with this main theme.`
  } else if (longestSequence >= 3) {
    analysis += `Your dice show a sequence of ${longestSequence} consecutive numbers, indicating a progression or journey. In numerology, sequences suggest an evolution or natural development of energies. You're moving through connected stages of growth, with each number building upon the previous one. This pattern suggests a time of orderly development and natural progression in your life path.`
  } else {
    analysis += `Your dice show a diverse spread of numbers with no repeating patterns. In numerology, this suggests a time of varied influences and multiple opportunities. You're experiencing a rich tapestry of different energies, each bringing its own lessons and gifts. This diversity indicates a complex period with many factors at play, calling for integration and balance of these different aspects.`
  }

  return analysis
}

// Get Life Path connection
function getLifePathConnection(reducedValue: number): string {
  const connections = {
    1: "Your roll connects with Life Path 1 energy, suggesting a time of new beginnings, independence, and leadership. In numerology, Life Path 1 represents the pioneer and innovator. This connection indicates that you're currently experiencing or developing qualities associated with this path: self-reliance, originality, ambition, and determination. You may be called to initiate projects, assert yourself, and forge your own path. This is an excellent time to develop leadership skills, start new ventures, and express your individuality. The challenges may include balancing independence with cooperation and managing tendencies toward impatience or dominance.",

    2: "Your roll resonates with Life Path 2 energy, emphasizing partnership, diplomacy, and sensitivity. In numerology, Life Path 2 represents the mediator and peacemaker. This connection indicates that you're currently experiencing or developing qualities associated with this path: cooperation, intuition, patience, and consideration for others. You may be called to build relationships, find balance in partnerships, and trust your intuitive insights. This is an excellent time to develop diplomatic skills, deepen personal connections, and create harmony in your environment. The challenges may include avoiding indecision or excessive dependence on others' approval.",

    3: "Your roll aligns with Life Path 3 energy, highlighting creativity, self-expression, and joy. In numerology, Life Path 3 represents the creator and communicator. This connection indicates that you're currently experiencing or developing qualities associated with this path: creative expression, sociability, optimism, and verbal ability. You may be called to share your ideas, engage in artistic pursuits, and bring joy to situations. This is an excellent time to develop communication skills, explore creative talents, and expand your social connections. The challenges may include focusing your energy and following through on projects.",

    4: "Your roll connects with Life Path 4 energy, focusing on stability, order, and practical matters. In numerology, Life Path 4 represents the builder and organizer. This connection indicates that you're currently experiencing or developing qualities associated with this path: reliability, methodical thinking, discipline, and practical wisdom. You may be called to create solid foundations, establish order, and focus on material security. This is an excellent time to develop organizational skills, establish routines, and build structures that will support future growth. The challenges may include avoiding rigidity or excessive caution.",

    5: "Your roll resonates with Life Path 5 energy, suggesting change, freedom, and adventure. In numerology, Life Path 5 represents the freedom seeker and agent of change. This connection indicates that you're currently experiencing or developing qualities associated with this path: adaptability, versatility, progressiveness, and resourcefulness. You may be called to embrace change, seek new experiences, and break free from limitations. This is an excellent time to develop flexibility, explore diverse interests, and welcome unexpected opportunities. The challenges may include managing restlessness or avoiding commitment.",

    6: "Your roll aligns with Life Path 6 energy, emphasizing responsibility, harmony, and nurturing. In numerology, Life Path 6 represents the nurturer and harmonizer. This connection indicates that you're currently experiencing or developing qualities associated with this path: compassion, service, balance, and aesthetic appreciation. You may be called to care for others, create beauty in your environment, and find equilibrium in your responsibilities. This is an excellent time to develop nurturing skills, create harmonious spaces, and balance giving with receiving. The challenges may include taking on too much responsibility or perfectionism.",

    7: "Your roll connects with Life Path 7 energy, focusing on analysis, spirituality, and inner wisdom. In numerology, Life Path 7 represents the seeker and mystic. This connection indicates that you're currently experiencing or developing qualities associated with this path: analytical thinking, intuitive insight, contemplation, and specialized knowledge. You may be called to seek deeper truths, engage in research, and connect with your spiritual side. This is an excellent time to develop intellectual skills, explore metaphysical subjects, and trust your inner guidance. The challenges may include isolation or excessive skepticism.",

    8: "Your roll resonates with Life Path 8 energy, highlighting abundance, power, and achievement. In numerology, Life Path 8 represents the achiever and executive. This connection indicates that you're currently experiencing or developing qualities associated with this path: ambition, organization, authority, and material mastery. You may be called to take charge, build wealth, and recognize your personal power. This is an excellent time to develop leadership skills, focus on financial goals, and create large-scale impact. The challenges may include balancing material pursuits with spiritual values.",

    9: "Your roll aligns with Life Path 9 energy, suggesting completion, universal love, and humanitarian concerns. In numerology, Life Path 9 represents the humanitarian and old soul. This connection indicates that you're currently experiencing or developing qualities associated with this path: compassion, wisdom, selflessness, and broad perspective. You may be called to let go of what no longer serves you, serve humanity, and embrace a global perspective. This is an excellent time to develop compassion, share wisdom gained through experience, and prepare for new cycles. The challenges may include detachment or difficulty with practical matters.",
  }

  return connections[reducedValue as keyof typeof connections]
}

// Get Destiny Number connection
function getDestinyConnection(reducedValue: number): string {
  const connections = {
    1: "This number connects with Destiny Number 1, suggesting your current path involves leadership and pioneering new territory. In numerology, Destiny Number 1 represents your potential to create original pathways and express your unique identity. This connection indicates that your current circumstances are guiding you toward developing independence, initiative, and courage. You're being called to lead rather than follow, to innovate rather than conform, and to trust your ability to forge new paths. This energy supports entrepreneurship, self-directed projects, and situations where you can express your individuality.",

    2: "This number aligns with Destiny Number 2, indicating your current path involves cooperation and diplomacy. In numerology, Destiny Number 2 represents your potential to create harmony and build meaningful relationships. This connection indicates that your current circumstances are guiding you toward developing sensitivity, patience, and intuitive understanding. You're being called to collaborate rather than compete, to mediate rather than confront, and to trust your intuitive perceptions. This energy supports partnerships, supportive roles, and situations where you can create balance between opposing forces.",

    3: "This number resonates with Destiny Number 3, suggesting your current path involves creative expression and communication. In numerology, Destiny Number 3 represents your potential to inspire others through your words, ideas, and artistic expression. This connection indicates that your current circumstances are guiding you toward developing creativity, optimism, and social connection. You're being called to express rather than suppress, to create rather than consume, and to share your unique perspective. This energy supports artistic pursuits, teaching, and situations where you can bring joy and inspiration to others.",

    4: "This number connects with Destiny Number 4, indicating your current path involves building solid foundations and creating order. In numerology, Destiny Number 4 represents your potential to create stability and practical solutions. This connection indicates that your current circumstances are guiding you toward developing discipline, organization, and methodical thinking. You're being called to build rather than dream, to organize rather than improvise, and to create systems that support long-term success. This energy supports management roles, technical work, and situations where reliability and attention to detail are essential.",

    5: "This number aligns with Destiny Number 5, suggesting your current path involves change and freedom. In numerology, Destiny Number 5 represents your potential to adapt to change and experience life fully. This connection indicates that your current circumstances are guiding you toward developing versatility, resourcefulness, and progressive thinking. You're being called to explore rather than settle, to adapt rather than resist, and to embrace the unexpected as opportunity. This energy supports travel, varied experiences, and situations where flexibility and quick thinking are valued.",

    6: "This number resonates with Destiny Number 6, indicating your current path involves responsibility and nurturing. In numerology, Destiny Number 6 represents your potential to create harmony and support others. This connection indicates that your current circumstances are guiding you toward developing compassion, balance, and aesthetic appreciation. You're being called to nurture rather than control, to harmonize rather than criticize, and to find beauty in everyday life. This energy supports healing professions, creative design, and situations where you can make others feel cared for and comfortable.",

    7: "This number connects with Destiny Number 7, suggesting your current path involves analysis and spiritual insight. In numerology, Destiny Number 7 represents your potential to discover deeper truths and develop specialized knowledge. This connection indicates that your current circumstances are guiding you toward developing analytical thinking, intuition, and contemplative practices. You're being called to question rather than accept, to analyze rather than assume, and to trust your inner wisdom. This energy supports research, spiritual exploration, and situations where depth of understanding is more important than quick results.",

    8: "This number aligns with Destiny Number 8, indicating your current path involves power and abundance. In numerology, Destiny Number 8 represents your potential to achieve material success and exercise authority. This connection indicates that your current circumstances are guiding you toward developing executive ability, financial acumen, and effective use of power. You're being called to lead rather than follow, to manifest rather than wish, and to recognize your capacity for achievement. This energy supports business ventures, leadership roles, and situations where you can create large-scale impact.",

    9: "This number resonates with Destiny Number 9, suggesting your current path involves completion and universal service. In numerology, Destiny Number 9 represents your potential to serve humanity and embody wisdom. This connection indicates that your current circumstances are guiding you toward developing compassion, selflessness, and a global perspective. You're being called to complete rather than begin, to give rather than take, and to see beyond personal concerns to universal principles. This energy supports humanitarian work, teaching, and situations where you can make a difference on a broad scale.",
  }

  return connections[reducedValue as keyof typeof connections]
}

// Get individual die analysis
function getIndividualDieAnalysis(die: DiceResult): string {
  if (die.value === null) return ""

  const elementalNumberMeanings = {
    fire: [
      "Potential for transformation waiting to be ignited. In numerology, Fire-0 represents the spark before flame, suggesting latent creative energy and passion that's preparing to manifest.",
      "A spark of new passion or initiative emerging. In numerology, Fire-1 represents the initial flame of creation, suggesting the beginning of a transformative process or creative project.",
      "Creative energy seeking balanced expression. In numerology, Fire-2 represents controlled flame, suggesting passion that's being channeled into cooperative ventures or balanced relationships.",
      "Dynamic creative expression and enthusiasm. In numerology, Fire-3 represents the dancing flame, suggesting joyful creative energy and passionate communication.",
      "Stable, controlled energy that provides warmth and structure. In numerology, Fire-4 represents the hearth fire, suggesting passion directed toward building lasting foundations.",
      "Transformative change and expansion of energy. In numerology, Fire-5 represents the spreading flame, suggesting rapid transformation and liberation from restrictions.",
      "Harmonious and balanced passion directed toward service. In numerology, Fire-6 represents the nurturing flame, suggesting creative energy channeled into caring for others.",
      "Spiritual insight through transformative experiences. In numerology, Fire-7 represents the illuminating flame, suggesting deep understanding gained through passionate pursuit of truth.",
      "Powerful manifestation of will and desire. In numerology, Fire-8 represents the forge fire, suggesting passion directed toward achievement and material transformation.",
      "Completion of a transformative cycle and preparation for renewal. In numerology, Fire-9 represents the phoenix flame, suggesting wisdom gained through passionate experience.",
    ],
    water: [
      "Deep emotional potential waiting to surface. In numerology, Water-0 represents the still pool, suggesting emotional depth that hasn't yet found expression.",
      "Beginning of emotional awareness or intuitive insight. In numerology, Water-1 represents the first drop, suggesting the initial awareness of feelings or intuitive impressions.",
      "Flowing emotional connection and relationship harmony. In numerology, Water-2 represents the gentle stream, suggesting emotional intelligence in partnerships and intuitive understanding.",
      "Expressive emotional creativity and social flow. In numerology, Water-3 represents the bubbling brook, suggesting emotional expression through art, communication, and social connection.",
      "Emotional stability and depth of feeling providing security. In numerology, Water-4 represents the deep well, suggesting reliable emotional resources and structured intuitive practices.",
      "Adaptability and emotional transformation through experience. In numerology, Water-5 represents the changing tides, suggesting emotional flexibility and intuitive adaptation to change.",
      "Harmonious emotional connections and healing relationships. In numerology, Water-6 represents the nurturing rain, suggesting emotional care for others and intuitive healing abilities.",
      "Deep intuitive wisdom and emotional understanding. In numerology, Water-7 represents the sacred spring, suggesting profound emotional insight and intuitive connection to universal truths.",
      "Powerful emotional currents and psychic ability. In numerology, Water-8 represents the mighty river, suggesting emotional power directed toward manifestation and intuitive mastery.",
      "Emotional completion and universal compassion. In numerology, Water-9 represents the ocean, suggesting emotional wisdom that embraces all of humanity and transcends personal concerns.",
    ],
    earth: [
      "Grounded potential and material beginnings. In numerology, Earth-0 represents fertile soil, suggesting material potential waiting to be cultivated.",
      "New practical opportunities and solid foundations. In numerology, Earth-1 represents the first seed, suggesting the beginning of material manifestation and practical initiatives.",
      "Balance and partnership in material matters. In numerology, Earth-2 represents paired resources, suggesting practical cooperation and material harmony.",
      "Creative expression through practical means. In numerology, Earth-3 represents fertile growth, suggesting material creativity and practical communication.",
      "Solid foundations and material stability. In numerology, Earth-4 represents the square foundation, suggesting practical organization and material security.",
      "Change and growth in material circumstances. In numerology, Earth-5 represents branching paths, suggesting practical adaptation and material expansion.",
      "Balance and harmony in practical matters and resources. In numerology, Earth-6 represents the abundant harvest, suggesting material nurturing and practical beauty.",
      "Deep analysis of material concerns and practical wisdom. In numerology, Earth-7 represents the hidden gem, suggesting material insight and practical specialization.",
      "Abundance and material manifestation. In numerology, Earth-8 represents the mountain, suggesting material achievement and practical power.",
      "Completion and fulfillment in worldly affairs. In numerology, Earth-9 represents the ancient stone, suggesting material wisdom and practical completion.",
    ],
    air: [
      "Mental potential and conceptual beginnings waiting to take form. In numerology, Air-0 represents the clear sky, suggesting intellectual potential and clarity before thought takes shape. The yellow color of this die enhances its association with mental illumination and the dawn of new ideas.",
      "New ideas and intellectual initiatives taking flight. In numerology, Air-1 represents the first breath, suggesting original thinking and mental independence. The yellow color of this die symbolizes the illumination of consciousness and the clarity of purpose in your thoughts.",
      "Balanced communication and harmonious exchange of ideas. In numerology, Air-2 represents the gentle breeze, suggesting intellectual cooperation and mental diplomacy. The yellow color of this die enhances its qualities of mental clarity and balanced perspective in relationships.",
      "Creative communication and expressive ideas flowing freely. In numerology, Air-3 represents the singing wind, suggesting intellectual creativity and joyful expression. The yellow color of this die symbolizes the sunshine of optimism in your communications and creative thinking.",
      "Structured thinking and mental organization creating clarity. In numerology, Air-4 represents the four winds, suggesting intellectual stability and mental structure. The yellow color of this die enhances its qualities of mental illumination applied to creating order and systems.",
      "Intellectual freedom and versatile thinking embracing change. In numerology, Air-5 represents the changing winds, suggesting mental adaptability and intellectual adventure. The yellow color of this die symbolizes the brilliance of quick thinking and versatile mental approaches.",
      "Balanced communication and harmonious ideas serving others. In numerology, Air-6 represents the nurturing breeze, suggesting intellectual harmony and mental nurturing. The yellow color of this die enhances its qualities of clear communication in service to others.",
      "Deep intellectual analysis and mental clarity revealing truth. In numerology, Air-7 represents the high altitude, suggesting intellectual depth and mental perception. The yellow color of this die symbolizes the illumination of wisdom and the clarity of spiritual insight.",
      "Powerful thoughts and mental manifestation creating reality. In numerology, Air-8 represents the mighty wind, suggesting intellectual power and mental authority. The yellow color of this die enhances its qualities of brilliant strategy and clear vision in leadership.",
      "Completion of mental processes and wisdom shared with others. In numerology, Air-9 represents the global atmosphere, suggesting intellectual completion and mental universality. The yellow color of this die symbolizes the golden wisdom of completed understanding ready to be shared.",
    ],
    spirit: [
      "Spiritual potential and connection to source before manifestation. In numerology, Spirit-0 represents the void of infinite possibility, suggesting spiritual potential and divine connection.",
      "Awakening of spiritual awareness and connection to higher purpose. In numerology, Spirit-1 represents the divine spark, suggesting spiritual initiation and connection to higher purpose.",
      "Spiritual partnership and intuitive connection to guides. In numerology, Spirit-2 represents divine duality, suggesting spiritual cooperation and intuitive relationship with higher guidance.",
      "Creative spiritual expression and joyful connection to divine. In numerology, Spirit-3 represents divine expression, suggesting spiritual creativity and joyful connection to higher consciousness.",
      "Stable spiritual foundation and disciplined practice. In numerology, Spirit-4 represents the sacred structure, suggesting spiritual discipline and foundational practices.",
      "Spiritual transformation and evolution of consciousness. In numerology, Spirit-5 represents divine change, suggesting spiritual freedom and evolution of awareness.",
      "Harmonious spiritual connections and service to divine purpose. In numerology, Spirit-6 represents divine harmony, suggesting spiritual service and alignment with higher purpose.",
      "Deep spiritual wisdom and mystical insight. In numerology, Spirit-7 represents divine wisdom, suggesting spiritual insight and mystical understanding.",
      "Powerful spiritual manifestation and mastery of energy. In numerology, Spirit-8 represents divine power, suggesting spiritual authority and manifestation of higher purpose.",
      "Spiritual completion and transcendence of individual self. In numerology, Spirit-9 represents divine completion, suggesting spiritual fulfillment and transcendent awareness.",
    ],
  }

  return elementalNumberMeanings[die.element][die.value]
}

// Get air element significance
function getAirElementSignificance(value: number): string {
  const airSignificance = [
    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 0, you're experiencing a state of mental potential and clarity before thoughts take form. The yellow color enhances this energy, representing the dawn of consciousness and illumination. In numerology, this combination suggests you're in a preparatory phase where your mind is clearing itself for new concepts and ideas. This is an excellent time for meditation, mindfulness, and creating mental space before beginning new intellectual pursuits.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 1, you're experiencing new ideas and mental initiatives taking flight. The yellow color enhances this energy, representing mental clarity, illumination, and the spark of genius. In numerology, this combination suggests you're beginning a new cycle of thinking, learning, or communicating. This is an excellent time for starting new studies, writing projects, or conversations that require original thinking and clear expression.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 2, you're experiencing balanced communication and harmonious exchange of ideas. The yellow color enhances this energy, representing mental clarity in partnerships and diplomatic exchanges. In numerology, this combination suggests you're in a phase where cooperation, negotiation, and sensitive communication are highlighted. This is an excellent time for important conversations, mediating disputes, or collaborative intellectual work.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 3, you're experiencing creative communication and expressive ideas flowing freely. The yellow color enhances this energy, representing the sunshine of optimism and creative brilliance in your thinking. In numerology, this combination suggests you're in a phase of mental creativity, social connection, and joyful expression. This is an excellent time for creative writing, public speaking, teaching, or any form of artistic communication.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 4, you're experiencing structured thinking and mental organization creating clarity. The yellow color enhances this energy, representing illuminated order and systematic brilliance. In numerology, this combination suggests you're in a phase where organizing your thoughts, creating mental systems, and establishing intellectual foundations are highlighted. This is an excellent time for planning, studying technical subjects, or creating frameworks for your ideas.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 5, you're experiencing intellectual freedom and versatile thinking embracing change. The yellow color enhances this energy, representing the brilliance of adaptability and quick mental reflexes. In numerology, this combination suggests you're in a phase of mental adventure, intellectual exploration, and progressive thinking. This is an excellent time for learning multiple subjects, engaging with diverse perspectives, or communicating ideas that challenge the status quo.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 6, you're experiencing balanced communication and harmonious ideas serving others. The yellow color enhances this energy, representing the warm light of understanding and nurturing communication. In numerology, this combination suggests you're in a phase where using your intellectual gifts to help others, create harmony, and bring beauty through words is highlighted. This is an excellent time for counseling, teaching, or creating content that supports and uplifts others.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 7, you're experiencing deep intellectual analysis and mental clarity revealing truth. The yellow color enhances this energy, representing the illumination of wisdom and penetrating insight. In numerology, this combination suggests you're in a phase of mental depth, intellectual research, and spiritual understanding. This is an excellent time for deep study, metaphysical exploration, or solving complex problems that require both analysis and intuition.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 8, you're experiencing powerful thoughts and mental manifestation creating reality. The yellow color enhances this energy, representing the golden light of authority and mental mastery. In numerology, this combination suggests you're in a phase where your thoughts have exceptional power to manifest, your words carry authority, and your mental focus can achieve significant results. This is an excellent time for important presentations, strategic planning, or intellectual leadership.",

    "The Air element represented by the yellow die symbolizes the realm of thought, communication, and intellect. With Air showing 9, you're experiencing completion of mental processes and wisdom ready to be shared. The yellow color enhances this energy, representing the golden light of completed understanding and universal wisdom. In numerology, this combination suggests you're in a phase of intellectual culmination, where insights gained through experience are ready to be shared with others. This is an excellent time for teaching, writing about completed research, or communicating wisdom that can benefit humanity.",
  ]

  return airSignificance[value]
}

// Get dominant element analysis
function getDominantElementAnalysis(elementalBalance: Record<ElementType, number>): JSX.Element {
  const sortedElements = Object.entries(elementalBalance).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0] as ElementType
  const dominantValue = sortedElements[0][1]

  const elementDescriptions = {
    fire: (
      <div className="space-y-2">
        <p className="font-medium text-red-600">Fire is your dominant element ({dominantValue})</p>
        <p className="text-sm">
          Fire represents transformation, passion, and action. With Fire as your dominant element, you're in a period of
          energy, motivation, and creative drive. This is an excellent time for:
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Taking bold action on your goals</li>
          <li>Transforming aspects of your life that need change</li>
          <li>Expressing your passions and creative inspirations</li>
          <li>Leading projects and initiatives</li>
        </ul>
      </div>
    ),
    water: (
      <div className="space-y-2">
        <p className="font-medium text-blue-600">Water is your dominant element ({dominantValue})</p>
        <p className="text-sm">
          Water represents emotion, intuition, and flow. With Water as your dominant element, you're in a period of
          emotional awareness, intuitive insights, and connection. This is an excellent time for:
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Exploring your feelings and emotional patterns</li>
          <li>Trusting your intuition and inner guidance</li>
          <li>Healing emotional wounds</li>
          <li>Deepening relationships and empathic connections</li>
        </ul>
      </div>
    ),
    earth: (
      <div className="space-y-2">
        <p className="font-medium text-green-600">Earth is your dominant element ({dominantValue})</p>
        <p className="text-sm">
          Earth represents stability, practicality, and groundedness. With Earth as your dominant element, you're in a
          period of practical focus, material concerns, and building foundations. This is an excellent time for:
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Creating stable structures in your life</li>
          <li>Focusing on financial and material security</li>
          <li>Taking practical steps toward your goals</li>
          <li>Connecting with nature and physical well-being</li>
        </ul>
      </div>
    ),
    air: (
      <div className="space-y-2">
        <p className="font-medium text-yellow-600">Air is your dominant element ({dominantValue})</p>
        <p className="text-sm">
          Air represents intellect, communication, and clarity. With Air as your dominant element, you're in a period of
          mental activity, communication, and new ideas. The yellow color of this element symbolizes mental
          illumination, clarity of thought, and the brilliance of intellect. This is an excellent time for:
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Learning new concepts and expanding your knowledge</li>
          <li>Communicating your ideas effectively</li>
          <li>Making decisions based on clear thinking</li>
          <li>Networking and connecting with others intellectually</li>
        </ul>
      </div>
    ),
    spirit: (
      <div className="space-y-2">
        <p className="font-medium text-purple-600">Spirit is your dominant element ({dominantValue})</p>
        <p className="text-sm">
          Spirit represents purpose, connection, and transcendence. With Spirit as your dominant element, you're in a
          period of spiritual awareness, higher purpose, and connection to something greater. This is an excellent time
          for:
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Exploring your spiritual beliefs and practices</li>
          <li>Connecting with your higher purpose</li>
          <li>Integrating spiritual insights into daily life</li>
          <li>Experiencing unity and transcendent awareness</li>
        </ul>
      </div>
    ),
  }

  return elementDescriptions[dominant]
}

// Generate elemental reading
function generateElementalReading(diceResults: DiceResult[], balance: Record<ElementType, number>): string {
  // Find dominant and weakest elements
  const sortedElements = Object.entries(balance).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0]
  const weakest = sortedElements[sortedElements.length - 1][0]

  // Get highest and lowest dice values
  const highestDie = [...diceResults].sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0]
  const lowestDie = [...diceResults].sort((a, b) => (a.value ?? 0) - (b.value ?? 0))[0]

  // Generate reading based on the results
  let reading = `The ${dominant} element is dominant in your reading, suggesting that ${getElementalQuality(dominant as ElementType)} is particularly important for you right now. `

  reading += `With the ${highestDie.element} die showing ${highestDie.value}, you are encouraged to embrace ${getElementalAdvice(highestDie.element)}. `

  if (balance[dominant as ElementType] - balance[weakest as ElementType] > 5) {
    reading += `There's a significant imbalance between your ${dominant} and ${weakest} energies. Consider how you might bring more ${getElementalQuality(weakest as ElementType)} into your life. `
  } else {
    reading += `Your elemental energies are relatively balanced, which suggests a time of harmony and integration. `
  }

  return reading
}

// Generate personal guidance
function generatePersonalGuidance(
  diceResults: DiceResult[],
  balance: Record<ElementType, number>,
  reducedValue: number,
): string {
  // Find dominant element
  const sortedElements = Object.entries(balance).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0] as ElementType

  // Get highest die
  const highestDie = [...diceResults].sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0]

  // Generate guidance based on dominant element and reduced value
  let guidance = ""

  // Element-specific guidance
  switch (dominant) {
    case "fire":
      guidance +=
        "The dominance of Fire in your reading suggests this is a time of transformation and action. Your inner fire is strong, providing the energy and motivation to pursue your passions and make significant changes. "
      break
    case "water":
      guidance +=
        "The dominance of Water in your reading suggests this is a time of emotional depth and intuitive flow. Your emotional intelligence is heightened, allowing you to navigate relationships with sensitivity and trust your inner knowing. "
      break
    case "earth":
      guidance +=
        "The dominance of Earth in your reading suggests this is a time of practical focus and material concerns. Your connection to the physical world is strong, providing stability and grounding as you build solid foundations. "
      break
    case "air":
      guidance +=
        "The dominance of Air in your reading suggests this is a time of intellectual clarity and communication. The yellow color of this element enhances your mental faculties, allowing you to express ideas clearly and make decisions based on logical thinking. "
      break
    case "spirit":
      guidance +=
        "The dominance of Spirit in your reading suggests this is a time of higher purpose and connection. Your spiritual awareness is heightened, allowing you to access deeper wisdom and recognize the interconnectedness of all things. "
      break
  }

  // Number-specific guidance
  switch (reducedValue) {
    case 1:
      guidance +=
        "The number 1 appearing in your reading points to new beginnings and independence. This is a time to initiate projects, assert your individuality, and take the lead in your life journey. Trust your ability to forge new paths and express your unique identity. "
      break
    case 2:
      guidance +=
        "The number 2 appearing in your reading points to partnership and diplomacy. This is a time to seek balance in relationships, cooperate with others, and trust your intuition. Your sensitivity to others' needs will help you create harmony in all areas of life. "
      break
    case 3:
      guidance +=
        "The number 3 appearing in your reading points to creativity and self-expression. This is a time to communicate your ideas, engage in artistic pursuits, and find joy in social connections. Your natural creativity is heightened and seeking expression. "
      break
    case 4:
      guidance +=
        "The number 4 appearing in your reading points to stability and organization. This is a time to build solid foundations, be methodical in your approach, and create order in your life. Your practical abilities will help you establish security and structure. "
      break
    case 5:
      guidance +=
        "The number 5 appearing in your reading points to change and freedom. This is a time to embrace new experiences, adapt to changing circumstances, and express your versatility. Your adventurous spirit is calling you to explore beyond your comfort zone. "
      break
    case 6:
      guidance +=
        "The number 6 appearing in your reading points to responsibility and nurturing. This is a time to care for others, create beauty and harmony, and find balance in your obligations. Your compassionate nature is highlighted and seeking expression. "
      break
    case 7:
      guidance +=
        "The number 7 appearing in your reading points to analysis and spiritual insight. This is a time for study, reflection, and connecting with deeper truths. Your intellectual and spiritual faculties are heightened, guiding you toward wisdom. "
      break
    case 8:
      guidance +=
        "The number 8 appearing in your reading points to abundance and personal power. This is a time to take charge, manifest resources, and recognize your authority. Your ability to create material success and influence outcomes is highlighted. "
      break
    case 9:
      guidance +=
        "The number 9 appearing in your reading points to completion and universal service. This is a time for letting go, serving others, and embracing a broader perspective. Your compassion and wisdom are guiding you toward humanitarian concerns. "
      break
    case 0:
      guidance +=
        "The number 0 appearing in your reading points to potential and spiritual connection. This is a time of preparation before a new cycle begins. Your connection to infinite possibilities and the divine source is highlighted. "
      break
  }

  // Integration of highest die
  guidance += `The ${highestDie.element} die showing ${highestDie.value} suggests that ${getIndividualDieAnalysis(highestDie)} is a key theme in your current experience. Pay special attention to how this energy manifests in your daily life.`

  return guidance
}

// Generate affirmation
function generateAffirmation(
  diceResults: DiceResult[],
  balance: Record<ElementType, number>,
  reducedValue: number,
): string {
  // Find dominant element
  const sortedElements = Object.entries(balance).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0] as ElementType

  // Element-based affirmations
  const elementAffirmations = {
    fire: [
      "I embrace my inner fire and transform my life with passion and purpose.",
      "My creative energy flows freely, igniting positive change in all areas of my life.",
      "I am a powerful creator, transforming challenges into opportunities with courage and strength.",
    ],
    water: [
      "I flow with life's currents, trusting my emotions and intuition to guide me.",
      "My emotional wisdom deepens my connections and brings healing to myself and others.",
      "I trust the ebb and flow of life, knowing that my intuition guides me perfectly.",
    ],
    earth: [
      "I am grounded and stable, building my life on solid foundations.",
      "I manifest abundance through practical action and connection to the physical world.",
      "My connection to Earth provides me with stability, resources, and endless support.",
    ],
    air: [
      "My mind is clear and focused, bringing brilliant solutions to any challenge.",
      "I communicate my truth with clarity and listen with an open heart and mind.",
      "New ideas flow to me effortlessly, expanding my perspective and understanding.",
    ],
    spirit: [
      "I am connected to my higher purpose and guided by divine wisdom.",
      "My spiritual awareness grows each day, revealing the unity of all life.",
      "I am a channel for spiritual energy, bringing light and healing wherever I go.",
    ],
  }

  // Number-based affirmations
  const numberAffirmations = {
    1: "I confidently create new beginnings and lead the way forward.",
    2: "I create harmony and balance in all my relationships.",
    3: "I express my creativity joyfully and communicate with ease.",
    4: "I build solid foundations for lasting success and security.",
    5: "I embrace change and adventure with flexibility and courage.",
    6: "I nurture myself and others with compassion and responsibility.",
    7: "I trust my inner wisdom and seek deeper understanding.",
    8: "I claim my power and manifest abundance in all areas of life.",
    9: "I release what no longer serves me and embrace universal love.",
  }

  // Select random element affirmation and combine with number affirmation
  const elementAffirmation =
    elementAffirmations[dominant][Math.floor(Math.random() * elementAffirmations[dominant].length)]
  const numberAffirmation = numberAffirmations[reducedValue as keyof typeof numberAffirmations]

  return `${elementAffirmation} ${numberAffirmation}`
}

// Generate action steps
function generateActionSteps(
  diceResults: DiceResult[],
  balance: Record<ElementType, number>,
  reducedValue: number,
): string[] {
  // Find dominant element
  const sortedElements = Object.entries(balance).sort((a, b) => b[1] - a[1])
  const dominant = sortedElements[0][0] as ElementType
  const weakest = sortedElements[sortedElements.length - 1][0] as ElementType

  // Element-based action steps
  const elementActions = {
    fire: [
      "Set aside time each day to work on a passion project that energizes you.",
      "Take decisive action on something you've been postponing.",
      "Express your creativity through a medium that allows for spontaneity and energy.",
    ],
    water: [
      "Create a daily practice of checking in with your emotions through journaling or meditation.",
      "Trust your intuitive nudges and act on them, even if they seem illogical.",
      "Deepen a relationship by sharing your authentic feelings and listening empathically.",
    ],
    earth: [
      "Organize your physical space to support your goals and well-being.",
      "Create a practical plan with concrete steps for an important goal.",
      "Connect with nature through gardening, hiking, or simply spending time outdoors.",
    ],
    air: [
      "Learn something new that expands your mental horizons and perspective.",
      "Have an important conversation you've been avoiding, focusing on clear communication.",
      "Write down your thoughts to gain clarity on a complex situation or decision.",
    ],
    spirit: [
      "Establish or deepen a spiritual practice that connects you to your higher purpose.",
      "Meditate on how your daily actions align with your core values and spiritual beliefs.",
      "Look for the deeper meaning or lesson in a challenging situation you're facing.",
    ],
  }

  // Number-based action steps
  const numberActions = {
    1: "Take initiative on a project or idea that represents a new beginning for you.",
    2: "Find ways to create more balance between different areas of your life.",
    3: "Express yourself creatively through art, writing, or another form of communication.",
    4: "Build structure into your daily routine to support your long-term goals.",
    5: "Step outside your comfort zone and try something new and different.",
    6: "Nurture an important relationship or create beauty in your environment.",
    7: "Set aside quiet time for reflection, research, or spiritual practice.",
    8: "Take charge of a situation where your leadership is needed.",
    9: "Release something that no longer serves you to make space for completion.",
  }

  // Balance action
  const balanceAction = `Incorporate more ${weakest} energy into your life by ${getElementalBalancingAction(weakest)}.`

  // Combine actions
  return [
    elementActions[dominant][0],
    numberActions[reducedValue as keyof typeof numberActions],
    balanceAction,
    "Reflect on the meaning of your dice roll daily and notice how these energies manifest in your life.",
  ]
}

function getElementalQuality(element: ElementType): string {
  switch (element) {
    case "fire":
      return "passion, transformation, and action"
    case "water":
      return "emotion, intuition, and flow"
    case "earth":
      return "stability, practicality, and groundedness"
    case "air":
      return "intellect, communication, and clarity"
    case "spirit":
      return "purpose, connection, and transcendence"
  }
}

function getElementalAdvice(element: ElementType): string {
  switch (element) {
    case "fire":
      return "taking bold action and following your passions"
    case "water":
      return "trusting your intuition and processing your emotions"
    case "earth":
      return "building solid foundations and being practical"
    case "air":
      return "seeking clarity through communication and new perspectives"
    case "spirit":
      return "connecting with your higher purpose and inner wisdom"
  }
}

function getElementalBalancingAction(element: ElementType): string {
  switch (element) {
    case "fire":
      return "engaging in physical activity, pursuing a passion, or taking decisive action"
    case "water":
      return "spending time near water, exploring your emotions, or developing your intuition"
    case "earth":
      return "connecting with nature, organizing your space, or focusing on practical matters"
    case "air":
      return "stimulating your mind with new ideas, having meaningful conversations, or practicing mindfulness"
    case "spirit":
      return "meditation, prayer, or contemplating your higher purpose"
  }
}
