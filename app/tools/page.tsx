import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Sparkles, Calculator, Dice5, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Our Sacred Tools</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock deeper insights and personalize your spiritual journey with our interactive tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Sparkles className="h-16 w-16 text-purple-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Oracle Card Simulator</CardTitle>
            <CardDescription className="text-muted-foreground">
              Draw virtual cards and receive AI-powered interpretations for your questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src="/images/tools/card-simulator.png"
              alt="Card Simulator"
              width={300}
              height={200}
              className="rounded-md object-cover mx-auto mt-4"
            />
          </CardContent>
          <CardFooter>
            <Link href="/tools/card-simulator">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Calculator className="h-16 w-16 text-green-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Numerology Calculator</CardTitle>
            <CardDescription className="text-muted-foreground">
              Discover your life path, expression, and other core numbers based on your birth details.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src="/images/tools/numerology-calculator.png"
              alt="Numerology Calculator"
              width={300}
              height={200}
              className="rounded-md object-cover mx-auto mt-4"
            />
          </CardContent>
          <CardFooter>
            <Link href="/tools/numerology-calculator">
              <Button variant="outline">
                Calculate Numbers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Dice5 className="h-16 w-16 text-orange-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Elemental Dice Roller</CardTitle>
            <CardDescription className="text-muted-foreground">
              Roll the elemental dice for quick insights into the energies influencing your day.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src="/images/tools/elemental-dice.png"
              alt="Elemental Dice"
              width={300}
              height={200}
              className="rounded-md object-cover mx-auto mt-4"
            />
          </CardContent>
          <CardFooter>
            <Link href="/tools/elemental-dice">
              <Button variant="outline">
                Roll the Dice <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <BookOpen className="h-16 w-16 text-blue-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Card Directory</CardTitle>
            <CardDescription className="text-muted-foreground">
              Browse the entire collection of NUMO Oracle cards and their detailed meanings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src="/images/tools/card-directory.png"
              alt="Card Directory"
              width={300}
              height={200}
              className="rounded-md object-cover mx-auto mt-4"
            />
          </CardContent>
          <CardFooter>
            <Link href="/tools/card-directory">
              <Button variant="outline">
                Explore Cards <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Sparkles className="h-16 w-16 text-pink-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Simple Card Reading</CardTitle>
            <CardDescription className="text-muted-foreground">
              A quick and straightforward way to get a single card reading with basic interpretation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src="/images/tools/numo-card-dealer-feature.png"
              alt="Simple Card Reading"
              width={300}
              height={200}
              className="rounded-md object-cover mx-auto mt-4"
            />
          </CardContent>
          <CardFooter>
            <Link href="/tools/simple-card-reading">
              <Button variant="outline">
                Get Simple Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary-foreground">Need More Guidance?</h2>
        <p className="text-lg text-muted-foreground">
          Our comprehensive guidebook and personalized sessions can deepen your understanding.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/buy">Explore Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Book a Session</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
