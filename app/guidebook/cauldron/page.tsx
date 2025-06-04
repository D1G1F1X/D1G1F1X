import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | The Cauldron",
  description: "The deeper meaning of the Cauldron (0/1) in the NUMO Oracle system",
}

export default function CauldronPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">The </span>
          <span className="text-purple-400">Cauldron (0/1)</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          The deeper meaning of creation and manifestation in the NUMO Oracle system
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/number-pairings">Number Pairings</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/sword">The Sword (2/5)</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <p className="lead text-xl">
              In the NUMO system, 0 and 1 form the foundational pairing known as the Cauldron, representing the dynamic
              process of creation, wherein infinite potential (0) transforms into manifestation (1).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="relative h-64 w-full">
                <Image src="/fiery-brew.png" alt="The Cauldron" fill className="object-contain" />
              </div>
              <div>
                <h3>The Cauldron Symbolism</h3>
                <p>
                  The Cauldron represents the alchemical process of creation, where raw potential is transformed into
                  tangible reality. It is the vessel where the elements combine, where ideas take form, and where
                  transformation occurs. The Cauldron is both the void of infinite possibility and the spark of
                  manifestation.
                </p>
              </div>
            </div>

            <h2>The Deeper Meaning of 0 – The Infinite Potential</h2>
            <p>
              0 is one of the most mysterious and powerful numbers in numerology and the NUMO system. It represents both
              everything and nothing—the void from which all creation emerges and to which all things return. 0 embodies
              the idea of limitless potential before anything takes form, symbolizing the spiritual plane where all
              possibilities exist.
            </p>

            <h3>Numerology Meaning of 0</h3>
            <p>
              In numerology, 0 is the number of infinite potential and the unmanifested, representing the beginning of
              the creative cycle. It is the ultimate symbol of the unknown, the void, and the space that holds all
              possibilities. 0 carries the energy of wholeness, divine consciousness, and oneness with the universe. It
              is not confined by material limitations and can amplify the power of any number it is paired with, serving
              as a magnifier of other energies.
            </p>

            <h3>Planetary Ruler of 0 – Pluto</h3>
            <p>
              In the NUMO system, 0 is associated with Pluto, the planet of deep transformation, regeneration, and
              rebirth. Pluto represents the unseen forces that govern creation and destruction, much like 0, which
              embodies the invisible, infinite potential from which all things emerge. Pluto's energy of death and
              rebirth mirrors 0's role in the cycle of existence, as everything comes from the void and eventually
              returns to it.
            </p>

            <h3>Astrological Sign Ruled by Pluto – Scorpio</h3>
            <p>
              Pluto rules Scorpio, the astrological sign associated with intensity, depth, and transformation. Scorpio's
              energy reflects 0's potential for profound change and rebirth, as well as the mysteries of life and death.
              Like 0, Scorpio deals with the unseen and the powerful forces of regeneration, making it a perfect
              astrological match for this number.
            </p>

            <h3>Elemental Power of 0 – Spirit</h3>
            <p>
              In the NUMO system, 0 is connected to the element of Spirit, the most ethereal and powerful of all
              elements. Spirit represents the essence of life, the divine consciousness that flows through all things.
              As the element of Spirit, 0 symbolizes the unmanifest, the force that connects all living beings to the
              divine source of creation. Spirit transcends the material world, existing in a realm beyond time and
              space, just as 0 exists beyond the confines of form and structure.
            </p>

            <h2>The Deeper Meaning of 1 – The First Manifestation</h2>
            <p>
              While 0 symbolizes infinite potential and the unmanifest, 1 is the first act of creation, the initial
              spark that brings things into form. 1 is the number of action, leadership, and independence. It represents
              the beginning of everything and the singular force that drives manifestation.
            </p>

            <h3>Numerology Meaning of 1</h3>
            <p>
              In numerology, 1 is the number of new beginnings, individuality, and creation. It symbolizes
              self-reliance, assertiveness, and the ability to take initiative. Those influenced by the energy of 1 are
              pioneers, leaders, and creators. 1 is a number of ambition and drive, representing the first step in the
              journey of manifestation. It is the origin of all other numbers, standing alone as the purest expression
              of action and will.
            </p>

            <h3>Planetary Ruler of 1 – The Sun</h3>
            <p>
              1 is governed by the Sun, the center of our solar system and the life-giving force. The Sun represents
              vitality, self-expression, and personal power, aligning perfectly with the energy of 1, which is about
              leadership and the power to create. The Sun's energy is radiant and life-affirming, much like 1's drive to
              bring things into being.
            </p>

            <h3>Astrological Sign Ruled by the Sun – Leo</h3>
            <p>
              The Sun rules Leo, the sign of self-confidence, creativity, and leadership. Leo embodies the qualities of
              1, such as boldness, strength, and the desire to lead and express oneself fully. Like 1, Leo's energy
              shines brightly, inspiring others and taking charge of its destiny.
            </p>

            <h3>Elemental Power of 1 – Fire</h3>
            <p>
              In the NUMO system, 1 is aligned with the element of Fire, representing the spark of creation, passion,
              and action. Fire is the force that transforms potential into reality, much like 1's energy, which ignites
              the creative process. Fire's energy is dynamic, assertive, and powerful, just like the number 1, which
              symbolizes the beginning of all things and the driving force behind new ventures.
            </p>

            <h2>The Cauldron: The Interplay Between 0 and 1</h2>
            <p>
              Together, 0 and 1 form the Cauldron, a powerful symbol of the dynamic process of creation. 0 holds
              infinite potential, representing the space where all things begin, and 1 brings that potential into
              manifestation, igniting the first spark of creation. This interplay between Spirit (0) and Fire (1) is the
              essence of the Cauldron, where the formless becomes form through the alchemical process of creation.
            </p>

            <h3>Elemental Power of the Pair – Fire</h3>
            <p>
              While 0 is governed by Spirit and 1 by Fire, together, they combine to create the Cauldron, whose
              elemental power is Fire. In this context, Fire represents the energy of transformation and creation. It is
              the force that heats the Cauldron, where the raw potential of Spirit is transformed into tangible reality.
            </p>
            <ul>
              <li>
                0's Spirit energy provides the infinite source of possibility, the space from which creation can arise.
                Spirit is the divine connection, the wellspring of intuition and inspiration that fuels the creative
                process.
              </li>
              <li>
                1's Fire energy ignites this potential, taking the limitless possibilities of 0 and setting them into
                motion, creating the first step into manifestation.
              </li>
            </ul>
            <p>
              Together, the Cauldron's Fire is the elemental force of creation, where Spirit (0) is given form and
              direction by Fire (1). In the NUMO system, the Cauldron teaches that creation is a balance of formless
              inspiration and focused action. Fire transforms Spirit's potential into something real, providing the heat
              and energy needed to move from idea to reality.
            </p>

            <h2>The Cauldron Cards in Readings</h2>

            <h3>0 – The Cauldron of Creation</h3>
            <p>
              The 0 represents the Cauldron in the cooking position, where creation and transformation are actively
              underway. It is the beginning of the alchemical process, the sacred stage where raw potential is being
              shaped and molded. In the upright (cooking) position, the cauldron is bubbling with life, signifying the
              moment where energy is turning into form and manifestation.
            </p>
            <p>
              This card reflects the infinite potential that is now moving toward realization, the cosmic forces at work
              in the background bringing something new into existence.
            </p>

            <h3>1 – The Cauldron of Manifestation</h3>
            <p>
              The 1 Cauldron represents the pouring position, where the creation that has been brewing in the 0 phase is
              now being actively manifested into the material world. It is the next step in the alchemical process,
              where raw potential is shaped into tangible form. In this position, the cauldron's contents are being
              released, symbolizing the birth of ideas, projects, and energy into the physical realm.
            </p>
            <p>
              This card reflects the moment where action must be taken to turn vision into reality, with the energy and
              momentum driving the process. The focus shifts from potential to manifestation, urging you to bring your
              creations to life.
            </p>

            <h2>Using the Cauldron in Readings</h2>
            <p>
              When the Cauldron cards appear in a reading, they often signify a time of creation, transformation, and
              new beginnings. The 0 Cauldron suggests that something is brewing beneath the surface, while the 1
              Cauldron indicates that it's time to take action and bring your ideas into the world.
            </p>
            <p>
              The Cauldron cards remind us that creation is a process—it begins with the formless potential of 0 and
              moves into the active manifestation of 1. By understanding this process, we can better navigate our own
              creative journeys, knowing when to incubate ideas and when to take decisive action.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/number-pairings">Number Pairings</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/sword">The Sword (2/5)</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
