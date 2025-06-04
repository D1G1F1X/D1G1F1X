import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialShare } from "@/components/social-share"

interface NumerologyReportProps {
  results: {
    name: string
    lifePathNumber: number
    destinyNumber: number
    personalityNumber: number
    soulUrgeNumber: number
  }
}

export function NumerologyReport({ results }: NumerologyReportProps) {
  const getLifePathMeaning = (number: number) => {
    const meanings: Record<number, string> = {
      1: "You are a natural leader with strong independence and originality. Your path involves developing confidence, innovation, and pioneering new ideas.",
      2: "You are a peacemaker with diplomatic skills and sensitivity. Your path involves cooperation, partnerships, and finding balance in relationships.",
      3: "You are naturally creative and expressive. Your path involves communication, joy, and using your artistic talents to inspire others.",
      4: "You are practical, organized, and hardworking. Your path involves building solid foundations, developing discipline, and creating order from chaos.",
      5: "You are adaptable and value freedom. Your path involves embracing change, adventure, and versatile experiences that expand your horizons.",
      6: "You are nurturing and responsible. Your path involves service to others, creating harmony, and taking care of family and community.",
      7: "You are analytical and spiritually oriented. Your path involves seeking wisdom, developing intuition, and finding deeper meaning through introspection.",
      8: "You are ambitious with strong leadership abilities. Your path involves mastering material success, authority, and using power responsibly.",
      9: "You are compassionate and idealistic. Your path involves humanitarian service, completion, and working for the greater good of humanity.",
      11: "As a master number, you have heightened intuition and spiritual insight. Your path involves inspiring others through your visionary ideas and sensitivity.",
      22: "As a master number, you are a master builder. Your path involves transforming dreams into reality and creating structures that benefit many people.",
      33: "As a master number, you are a spiritual teacher. Your path involves selfless service and uplifting humanity through compassionate guidance.",
    }
    return meanings[number] || "Your life path represents your core purpose and the lessons you're here to learn."
  }

  const getDestinyMeaning = (number: number) => {
    const meanings: Record<number, string> = {
      1: "Your destiny is to develop leadership and independence. You're meant to pioneer new approaches and stand out from the crowd.",
      2: "Your destiny is to create cooperation and balance. You're meant to be a mediator and build meaningful partnerships.",
      3: "Your destiny is to express creativity and joy. You're meant to communicate ideas and inspire others through your self-expression.",
      4: "Your destiny is to build stable foundations. You're meant to create order, systems, and reliable structures.",
      5: "Your destiny is to embrace freedom and change. You're meant to experience variety and adapt to diverse situations.",
      6: "Your destiny is to nurture and create harmony. You're meant to take responsibility for others and create beautiful environments.",
      7: "Your destiny is to seek wisdom and truth. You're meant to analyze, research, and develop spiritual understanding.",
      8: "Your destiny is to achieve material success and authority. You're meant to master the material world and use power wisely.",
      9: "Your destiny is to serve humanity. You're meant to complete cycles and work toward humanitarian ideals.",
      11: "Your destiny is to inspire through spiritual insight. You're meant to be a visionary who elevates consciousness.",
      22: "Your destiny is to build structures that benefit many. You're meant to manifest ambitious dreams into practical reality.",
      33: "Your destiny is to teach and heal through compassion. You're meant to uplift others through selfless service.",
    }
    return (
      meanings[number] || "Your destiny number reveals your life goals and the talents you possess to achieve them."
    )
  }

  const getPersonalityMeaning = (number: number) => {
    const meanings: Record<number, string> = {
      1: "You appear confident, independent, and original to others. You make a strong first impression with your leadership qualities.",
      2: "You appear diplomatic, cooperative, and sensitive to others. People see you as someone who values harmony and relationships.",
      3: "You appear creative, expressive, and sociable to others. People are drawn to your optimistic and communicative nature.",
      4: "You appear reliable, practical, and organized to others. People see you as someone they can depend on.",
      5: "You appear adaptable, freedom-loving, and versatile to others. People see you as someone who embraces change and adventure.",
      6: "You appear responsible, nurturing, and harmonious to others. People see you as someone who cares deeply about others.",
      7: "You appear thoughtful, analytical, and mysterious to others. People see you as someone with depth and wisdom.",
      8: "You appear confident, ambitious, and authoritative to others. People see you as someone who can achieve material success.",
      9: "You appear compassionate, sophisticated, and idealistic to others. People see you as someone with humanitarian values.",
    }
    return meanings[number] || "Your personality number reveals how others perceive you upon first meeting."
  }

  const getSoulUrgeMeaning = (number: number) => {
    const meanings: Record<number, string> = {
      1: "Your heart desires independence, leadership, and achievement. You're motivated by opportunities to pioneer and stand out.",
      2: "Your heart desires harmony, cooperation, and meaningful relationships. You're motivated by creating peace and balance.",
      3: "Your heart desires self-expression, creativity, and joy. You're motivated by opportunities to communicate and create.",
      4: "Your heart desires stability, order, and security. You're motivated by building solid foundations and reliable systems.",
      5: "Your heart desires freedom, change, and adventure. You're motivated by variety and new experiences.",
      6: "Your heart desires harmony, beauty, and nurturing connections. You're motivated by opportunities to care for others.",
      7: "Your heart desires wisdom, spiritual understanding, and privacy. You're motivated by the search for deeper meaning.",
      8: "Your heart desires achievement, recognition, and material success. You're motivated by opportunities to build wealth and influence.",
      9: "Your heart desires to make a difference and serve humanity. You're motivated by humanitarian ideals and completion.",
    }
    return (
      meanings[number] ||
      "Your soul urge number reveals your inner desires, what you value most, and what motivates you."
    )
  }

  return (
    <Card className="border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
        <CardTitle className="text-xl text-center">Detailed Numerology Report</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">
            Life Path Number: {results.lifePathNumber}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{getLifePathMeaning(results.lifePathNumber)}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
            Destiny Number: {results.destinyNumber}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{getDestinyMeaning(results.destinyNumber)}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
            Personality Number: {results.personalityNumber}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{getPersonalityMeaning(results.personalityNumber)}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-violet-700 dark:text-violet-300">
            Soul Urge Number: {results.soulUrgeNumber}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{getSoulUrgeMeaning(results.soulUrgeNumber)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 space-y-4">
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Personal Recommendations</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Based on your numerology profile, focus on developing your{" "}
            {results.lifePathNumber === results.destinyNumber
              ? "natural alignment between your life purpose and goals"
              : "balance between your life path and destiny"}
            . Your personality number of {results.personalityNumber} suggests that others see you as{" "}
            {results.personalityNumber === 1
              ? "a leader"
              : results.personalityNumber === 2
                ? "cooperative and diplomatic"
                : results.personalityNumber === 3
                  ? "creative and expressive"
                  : results.personalityNumber === 4
                    ? "reliable and practical"
                    : results.personalityNumber === 5
                      ? "adaptable and freedom-loving"
                      : results.personalityNumber === 6
                        ? "responsible and nurturing"
                        : results.personalityNumber === 7
                          ? "thoughtful and analytical"
                          : results.personalityNumber === 8
                            ? "ambitious and authoritative"
                            : "compassionate and idealistic"}
            , which can help you navigate your path.
          </p>
        </div>

        <div className="w-full flex justify-end">
          <SocialShare
            content={{
              title: `My Numerology Report: Life Path ${results.lifePathNumber}`,
              description: `I discovered my numerology profile with NUMO Oracle! Life Path: ${results.lifePathNumber}, Destiny: ${results.destinyNumber}, Soul Urge: ${results.soulUrgeNumber}, Personality: ${results.personalityNumber}`,
              url: typeof window !== "undefined" ? window.location.href : "",
              hashtags: ["numoracle", "numerology", `lifepath${results.lifePathNumber}`, "spirituality"],
            }}
            variant="inline"
          />
        </div>
      </CardFooter>
    </Card>
  )
}
