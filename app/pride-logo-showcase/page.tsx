import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PrideAnimatedLogo } from "@/components/pride-animated-logo"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Heart, Rainbow } from "lucide-react"

export default function PrideLogoShowcasePage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Celebrating Diversity with NUMO Oracle</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our commitment to inclusivity and love, beautifully expressed through our animated Pride logo.
        </p>
      </div>

      <Card className="max-w-xl mx-auto p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary-foreground flex items-center justify-center gap-2">
            <Rainbow className="h-6 w-6 text-purple-500" /> Animated Pride Logo
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Experience the vibrant animation of our special Pride logo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[300px]">
          <div className="w-full max-w-[300px] aspect-square">
            <PrideAnimatedLogo />
          </div>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-primary-foreground flex items-center justify-center gap-2">
          <Heart className="h-7 w-7 text-red-500" /> Our Values
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          At NUMO Oracle, we believe in the power of self-discovery, acceptance, and love for all. Our tools and
          readings are designed to support every individual on their unique spiritual path, regardless of background,
          identity, or orientation. We are committed to fostering a safe, inclusive, and empowering community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-xl text-primary-foreground">Inclusivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Creating a welcoming space for everyone to explore their spiritual journey.
              </p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-xl text-primary-foreground">Authenticity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Encouraging true self-expression and living in alignment with one's inner truth.
              </p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-xl text-primary-foreground">Empowerment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Providing tools and insights that empower individuals to navigate life's challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7 text-purple-500" /> Explore More
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Discover how NUMO Oracle can support your journey.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/tools/card-simulator">Get a Reading</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">Learn About Us</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">Read Our Blog</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
