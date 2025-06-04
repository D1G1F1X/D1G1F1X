import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function GoddessDanu() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">The Goddess Danu</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-gray-300 mb-4">
            In the NUMO Oracle system, the Goddess Danu plays a central role as the divine mother who offers five sacred
            gifts: the Cauldron, Sword, Spear, Stone, and Cord. These gifts represent essential aspects of
            life—creation, wisdom, strength, stability, and spiritual connection—and help us navigate the cycles of
            existence.
          </p>
          <p className="text-gray-300 mb-4">
            Danu is an ancient Celtic mother goddess associated with water, abundance, wisdom, and the land. Her name is
            connected to several rivers across Europe, including the Danube. As a mother goddess, she represents the
            nurturing, creative force that gives life and sustains it through cycles of growth and transformation.
          </p>
          <p className="text-gray-300">
            In the NUMO system, Danu's influence is present in all elements, each one aligned with a core elemental
            force and a key phase of life. Her gifts form a holistic framework for understanding life's cycles and
            navigating its complexities with wisdom and balance.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden w-full max-w-md">
            <CardContent className="p-0">
              <div className="relative w-full aspect-square">
                <Image
                  src="/placeholder.svg?key=przn0"
                  alt="Goddess Danu"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-gradient-to-b from-purple-900/30 to-black/60">
                <h3 className="text-xl font-bold text-purple-200 mb-2">Danu: Mother of the Elements</h3>
                <p className="text-gray-300 text-sm">
                  The Celtic goddess Danu is often depicted as a flowing river of wisdom, connecting all elements and
                  bringing life to the land. Her five gifts in the NUMO system represent the tools she provides to
                  navigate life's journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
