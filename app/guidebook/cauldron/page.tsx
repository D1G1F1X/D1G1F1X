import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function CauldronPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">The Cauldron</h1>
        <Link href="/guidebook" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guidebook
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Symbolism of the Cauldron</CardTitle>
            <CardDescription className="text-gray-300">
              Explore the deep meanings associated with the Cauldron suit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image src="/cauldron-of-dagda.png" alt="Cauldron of Dagda" fill className="object-cover" priority />
            </div>
            <p className="text-lg leading-relaxed">
              The Cauldron, a central symbol in Celtic mythology, represents transformation, rebirth, and the wellspring
              of inspiration. In the NUMO Oracle, it signifies the inner world, emotional depth, and the alchemical
              process of turning raw experience into wisdom.
            </p>
            <p className="text-lg leading-relaxed">
              It is a vessel of creation, holding the potential for new beginnings and the dissolution of old forms.
              When the Cauldron appears in a reading, it often points to periods of profound inner work, emotional
              healing, and the emergence of new insights from the depths of your being.
            </p>
            <h3 className="mt-6 text-xl font-semibold">Key Meanings:</h3>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              <li>Transformation and Rebirth</li>
              <li>Emotional Depth and Intuition</li>
              <li>Creativity and Inspiration</li>
              <li>Healing and Inner Work</li>
              <li>The Subconscious Mind</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Cauldron & Elements</CardTitle>
            <CardDescription className="text-gray-300">
              How the Cauldron interacts with the five elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image src="/fiery-brew.png" alt="Fiery Brew" fill className="object-cover" priority />
            </div>
            <p className="text-lg leading-relaxed">
              Each Cauldron card is influenced by one of the five elements: Fire, Water, Air, Earth, and Spirit. This
              combination adds a unique layer of meaning, indicating how the transformative energy of the Cauldron
              manifests in different aspects of life.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              <li>
                <strong>Cauldron of Fire:</strong> Passionate transformation, intense emotional release, creative
                ignition.
              </li>
              <li>
                <strong>Cauldron of Water:</strong> Deep emotional healing, intuitive flow, subconscious cleansing.
              </li>
              <li>
                <strong>Cauldron of Air:</strong> Mental clarity through emotional processing, new ideas from inner
                reflection.
              </li>
              <li>
                <strong>Cauldron of Earth:</strong> Grounded transformation, manifesting emotional stability, practical
                healing.
              </li>
              <li>
                <strong>Cauldron of Spirit:</strong> Spiritual awakening, transcendent emotional experiences, universal
                connection.
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/guidebook/using-the-deck">
                <BookOpen className="mr-2 h-4 w-4" /> Learn More About Elements
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
