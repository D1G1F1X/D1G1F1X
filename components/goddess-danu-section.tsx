"use client"

import Image from "next/image"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GoddessDanuSection() {
  const [activeTab, setActiveTab] = useState("story")

  return (
    <section className="py-12 relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-4">
            Goddess Danu & The Sacred Treasures
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The divine mother goddess who bestowed the sacred treasures upon her children, the Tuatha Dé Danann
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <Image
              src="/goddess-danu.png"
              alt="Goddess Danu"
              width={500}
              height={500}
              className="rounded-lg shadow-lg border border-purple-800"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-300">The Mother Goddess</h3>
            <p className="text-gray-300 mb-4">
              Danu is the ancient mother goddess of the Tuatha Dé Danann, representing divine wisdom and the cycles of
              nature. Her name means "flowing one," connecting her to rivers, water, and the flow of life itself.
            </p>
            <p className="text-gray-300 mb-4">
              As the divine mother, she embodies fertility, abundance, and nurturing energy. Her wisdom flows through
              the NUMO Oracle system, guiding seekers toward deeper understanding and spiritual growth.
            </p>
            <p className="text-gray-300">
              The sacred number patterns within the NUMO Oracle deck reflect Danu's divine patterns and the cosmic order
              she represents.
            </p>
          </div>
        </div>

        <Tabs defaultValue="story" className="w-full mt-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
            <TabsTrigger value="story">The Story</TabsTrigger>
            <TabsTrigger value="treasures">Sacred Treasures</TabsTrigger>
            <TabsTrigger value="connection">NUMO Connection</TabsTrigger>
          </TabsList>
          <TabsContent value="story" className="p-6 bg-gray-900/30 rounded-b-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-purple-300">The Legend of Danu</h3>
            <p className="text-gray-300 mb-4">
              In ancient Celtic mythology, Danu was revered as the mother goddess of the Tuatha Dé Danann, a race of
              divine beings who ruled Ireland before the coming of the Milesians. Her name is connected to the Danube
              River, reflecting her association with flowing water and life-giving energy.
            </p>
            <p className="text-gray-300">
              As the divine mother, Danu bestowed upon her children great wisdom, magical abilities, and five sacred
              treasures that embodied different aspects of power and knowledge. These treasures became central to the
              mythology of the Tuatha Dé Danann, who were revered for their magical abilities and connection to the
              divine feminine.
            </p>
          </TabsContent>
          <TabsContent value="treasures" className="bg-gray-900/30 rounded-b-lg border border-gray-800">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-300">The Five Sacred Treasures</h3>
              <p className="text-gray-300 mb-6">
                The Tuatha Dé Danann possessed five powerful treasures that were symbols of their divine power:
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="relative w-full h-[300px] md:h-[400px] mb-8">
                <Image
                  src="/five-sacred-treasures.png"
                  alt="The Five Sacred Treasures of Danu"
                  fill
                  className="object-contain"
                />
              </div>

              <ul className="space-y-4">
                <li>
                  <h4 className="text-lg font-bold text-purple-300">The Sword of Nuada</h4>
                  <p className="text-gray-300">
                    A sword that could not be defeated, symbolizing truth, justice, and decisive action
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-bold text-purple-300">The Spear of Lugh</h4>
                  <p className="text-gray-300">
                    A spear that never missed its target, representing focus, intention, and protection
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-bold text-purple-300">The Cauldron of the Dagda</h4>
                  <p className="text-gray-300">
                    A cauldron of abundance that never emptied, symbolizing nourishment, creation, and rebirth
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-bold text-purple-300">The Stone of Destiny (Lia Fáil)</h4>
                  <p className="text-gray-300">
                    A stone that would cry out when the rightful king touched it, representing sovereignty and truth
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-bold text-purple-300">The Cord of Fate</h4>
                  <p className="text-gray-300">
                    A magical cord that connected all beings to their destiny, symbolizing connection and time
                  </p>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="connection" className="p-6 bg-gray-900/30 rounded-b-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-purple-300">Connection to NUMO Oracle</h3>
            <p className="text-gray-300 mb-4">
              The NUMO Oracle system draws inspiration from Danu's divine wisdom and the five sacred treasures. Each
              element of the deck connects to aspects of these treasures:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li>
                <span className="font-bold text-purple-300">The Sword:</span> Represents clarity and decisive insight in
                readings
              </li>
              <li>
                <span className="font-bold text-purple-300">The Spear:</span> Symbolizes focused intention and the
                directed energy of numerology
              </li>
              <li>
                <span className="font-bold text-purple-300">The Cauldron:</span> Reflects the transformative and
                creative aspects of the oracle process
              </li>
              <li>
                <span className="font-bold text-purple-300">The Stone:</span> Embodies the foundational truths revealed
                through numerological patterns
              </li>
              <li>
                <span className="font-bold text-purple-300">The Cord:</span> Symbolizes the connections between numbers,
                elements, and spiritual insights
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
