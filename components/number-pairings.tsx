import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const pairings = [
  {
    id: "cauldron",
    title: "The Cauldron (0 & 1)",
    subtitle: "From Emptiness to Manifestation",
    description:
      "The pairing of 0 and 1 represents the balance between emptiness and manifestation. 0 is a circle, symbolizing infinity, potential, and nothingness, while 1 is a straight vertical line, symbolizing the first step into existence.",
    first: {
      number: "0",
      meaning: "Infinite potential and the unmanifested",
      planet: "Pluto",
      sign: "Scorpio",
      element: "Spirit",
    },
    second: {
      number: "1",
      meaning: "New beginnings, individuality, and creation",
      planet: "The Sun",
      sign: "Leo",
      element: "Fire",
    },
    pairElement: "Fire",
    pairDescription:
      "Together, they form the Cauldron, whose elemental power is Fire. Spirit (0) provides the infinite source of possibility, while Fire (1) ignites this potential, creating the first step into manifestation.",
  },
  {
    id: "sword",
    title: "The Sword (2 & 5)",
    subtitle: "Balance and Change",
    description:
      "2 and 5 share a unique visual relationship as 5 is essentially a mirrored reflection of 2. 2 curves gracefully, representing balance and partnership, while 5's upper curve mirrors 2's, but the lower part straightens into a line, symbolizing freedom and change.",
    first: {
      number: "2",
      meaning: "Cooperation, balance, and relationships",
      planet: "The Moon",
      sign: "Cancer",
      element: "Air",
    },
    second: {
      number: "5",
      meaning: "Freedom, versatility, and change",
      planet: "Mercury",
      sign: "Gemini",
      element: "Fire",
    },
    pairElement: "Air",
    pairDescription:
      "Together, they form the Sword, whose elemental power is Air. This represents the mind's ability to cut through indecision and confusion, allowing us to make clear choices and embrace transformation.",
  },
  {
    id: "cord",
    title: "The Cord (3 & 8)",
    subtitle: "Half and Whole",
    description:
      "The pairing of 3 and 8 is visually striking, as 3 resembles an 8 cut in half. 3 is formed by two open curves stacked together, symbolizing creativity and growth, while 8 is a closed, symmetrical figure, representing infinity and balance.",
    first: {
      number: "3",
      meaning: "Creativity, communication, and expression",
      planet: "Jupiter",
      sign: "Sagittarius",
      element: "Fire",
    },
    second: {
      number: "8",
      meaning: "Power, authority, and infinite cycles",
      planet: "Saturn",
      sign: "Capricorn",
      element: "Earth",
    },
    pairElement: "Fire",
    pairDescription:
      "Together, they form the Cord, whose elemental power is Fire. This represents the eternal cycle of creation, expansion, and manifestation, showing how creativity and power work together to shape our destiny.",
  },
  {
    id: "spear",
    title: "The Spear (4 & 7)",
    subtitle: "Groundedness and Ascent",
    description:
      "The visual pairing of 4 and 7 represents the balance between groundedness and spiritual ascent. 4 is composed of straight lines and right angles, reflecting stability and order, while 7 has a sharp diagonal line that points upward, symbolizing spiritual insight.",
    first: {
      number: "4",
      meaning: "Discipline, structure, and reliability",
      planet: "Uranus",
      sign: "Aquarius",
      element: "Earth",
    },
    second: {
      number: "7",
      meaning: "Wisdom, spirituality, and introspection",
      planet: "Neptune",
      sign: "Pisces",
      element: "Water",
    },
    pairElement: "Earth",
    pairDescription:
      "Together, they form the Spear, whose elemental power is Earth. This represents the grounding necessary to support spiritual exploration and the importance of building a solid foundation for personal development.",
  },
  {
    id: "stone",
    title: "The Stone (6 & 9)",
    subtitle: "Nurturing and Completion",
    description:
      "The pairing of 6 and 9 is a perfect inversion, where 6 curves downward and 9 curves upward. 6 forms a nurturing, protective spiral, symbolizing care and responsibility, while 9 mirrors 6 but curves upward, representing completion and fulfillment.",
    first: {
      number: "6",
      meaning: "Responsibility, nurturing, and harmony",
      planet: "Venus",
      sign: "Taurus",
      element: "Earth",
    },
    second: {
      number: "9",
      meaning: "Completion, humanitarianism, and wisdom",
      planet: "Mars",
      sign: "Aries",
      element: "Fire",
    },
    pairElement: "Earth",
    pairDescription:
      "Together, they form the Stone, whose elemental power is Earth. This represents the stable, grounding force that supports both nurturing and fulfillment, ensuring that life's cycles continue in harmony.",
  },
]

export default function NumberPairings() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">The Number Pairings</h2>

      <Tabs defaultValue="cauldron" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-black/20 border border-purple-900/30">
          {pairings.map((pair) => (
            <TabsTrigger
              key={pair.id}
              value={pair.id}
              className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
            >
              {pair.title.split(" ")[1]}
            </TabsTrigger>
          ))}
        </TabsList>

        {pairings.map((pair) => (
          <TabsContent key={pair.id} value={pair.id} className="mt-6">
            <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-purple-300 mb-2">{pair.title}</h3>
                <p className="text-lg text-purple-200 italic mb-4">{pair.subtitle}</p>

                <p className="text-gray-300 mb-6">{pair.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-3">Number {pair.first.number}</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <span className="font-semibold text-purple-200">Meaning:</span> {pair.first.meaning}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Planetary Ruler:</span> {pair.first.planet}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Astrological Sign:</span> {pair.first.sign}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Element:</span> {pair.first.element}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 p-4 rounded-lg border border-purple-900/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-3">Number {pair.second.number}</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <span className="font-semibold text-purple-200">Meaning:</span> {pair.second.meaning}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Planetary Ruler:</span> {pair.second.planet}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Astrological Sign:</span> {pair.second.sign}
                      </li>
                      <li>
                        <span className="font-semibold text-purple-200">Element:</span> {pair.second.element}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-lg font-bold text-purple-300 mb-2">Combined as {pair.title.split(" ")[1]}</h4>
                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-200">Element: {pair.pairElement}</span> —{" "}
                    {pair.pairDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
