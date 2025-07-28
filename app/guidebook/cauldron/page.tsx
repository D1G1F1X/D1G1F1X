import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Lightbulb, Sparkles } from "lucide-react"

export default function CauldronGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">The Cauldron of Creation</h1>
        <p className="text-lg text-muted-foreground">
          Delve into the symbolism and power of the Cauldron suit in the NUMO Oracle.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image src="/cauldron-of-dagda.png" alt="Cauldron of Dagda" fill className="object-cover" priority />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The Cauldron, a central symbol in Celtic mythology and the NUMO Oracle, represents the womb of creation,
            transformation, and infinite potential. It is the vessel where ideas brew, energies merge, and new realities
            are forged. In readings, the Cauldron often signifies beginnings, spiritual nourishment, and the alchemical
            process of turning raw potential into manifest form.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <BookOpen className="h-7 w-7" /> Key Meanings & Interpretations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Potential & Beginnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Cauldron often appears when new cycles are beginning, or when you are at the precipice of a creative
                endeavor. It signifies the unmanifested, the raw ingredients waiting to be transformed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transformation & Alchemy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This suit speaks to the process of change, growth, and the alchemical blending of disparate elements
                into a harmonious whole. It encourages embracing the journey of metamorphosis.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Nourishment & Abundance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Cauldron is a source of spiritual and creative sustenance. It can indicate a period of receiving
                divine inspiration, nurturing ideas, or finding abundance in unexpected places.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Intuition & Inner Wisdom</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connected to the depths of the subconscious, the Cauldron encourages listening to your inner voice and
                trusting your intuitive guidance as you navigate creative processes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <Lightbulb className="h-7 w-7" /> Cauldron in Practice
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">Drawing a Cauldron Card</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              When a Cauldron card appears in your reading, it often signals a time of gestation, creation, or the
              unveiling of new possibilities. Pay attention to your inner world and the seeds you are planting.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Elemental Influences</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              The Cauldron interacts with the five elements (Fire, Water, Air, Earth, Spirit) to refine its meaning. For
              example, Cauldron with Fire might mean passionate creation, while Cauldron with Water could indicate
              emotional depth in new beginnings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Overcoming Blocks</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              If you feel stuck, a Cauldron card can be a reminder to return to your core creative energy, to allow
              ideas to simmer, and to trust the transformative process.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7" /> Deepen Your Understanding
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Explore other aspects of the NUMO Oracle to enhance your readings.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/guidebook/introduction">Introduction to NUMO</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/guidebook/using-the-deck">Using the Deck</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/card-directory">Card Directory</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
