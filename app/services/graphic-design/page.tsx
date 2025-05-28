import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CallToAction } from "@/components/call-to-action"

export const metadata: Metadata = {
  title: "Graphic Design Services | Creative Design Agency",
  description:
    "Elevate your brand with our expert graphic design services. We create stunning visuals that capture your brand essence and engage your audience.",
}

const GraphicDesignPage = () => {
  return (
    <div className="container py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Graphic Design Services</h1>
        <p className="text-gray-300 leading-relaxed">
          We offer comprehensive graphic design services to help businesses create a strong visual identity. From logo
          design to marketing materials, our designs are tailored to meet your specific needs and goals.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Project Showcase</h2>

        {/* The Hodge Documentary Showcase */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
                Logo Design
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-4">The Hodge Documentary</h3>
              <p className="text-gray-300 mb-4">
                A bold and impactful logo design for a documentary film. The design reflects the serious and
                thought-provoking nature of the film.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Film Branding
                </Badge>
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Documentary
                </Badge>
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Minimalist Design
                </Badge>
              </div>
              <Button asChild variant="outline" className="border-accent-500/30 text-accent-400 hover:bg-accent-500/10">
                <Link href="/portfolio/the-hodge-documentary">View Project</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-950 p-8 rounded-lg border border-gray-700/50 w-full max-w-md flex items-center justify-center min-h-[200px]">
                <img
                  src="/images/logos/the-hodge-logo.png"
                  alt="The Hodge Documentary Logo"
                  className="w-full h-auto"
                  style={{ filter: "drop-shadow(0 0 20px rgba(163, 37, 37, 0.3))" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LolitaWilson.com Logo Showcase */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
                Logo Design
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-4">LolitaWilson.com</h3>
              <p className="text-gray-300 mb-4">
                An elegant script logo design that perfectly captures the artistic spirit of this creative portfolio.
                The flowing typography in warm golden-orange creates a personal, sophisticated brand identity.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Script Typography
                </Badge>
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Artist Branding
                </Badge>
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                  Web Design
                </Badge>
              </div>
              <Button asChild variant="outline" className="border-accent-500/30 text-accent-400 hover:bg-accent-500/10">
                <Link href="/portfolio/lolita-wilson-website">View Project</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-950 p-8 rounded-lg border border-gray-700/50 w-full max-w-md flex items-center justify-center min-h-[200px]">
                <img
                  src="/images/logos/lolita-wilson-logo.png"
                  alt="LolitaWilson.com Logo"
                  className="w-full h-auto"
                  style={{ filter: "drop-shadow(0 0 20px rgba(251, 146, 60, 0.3))" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8">Our Graphic Design Services Include</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Logo Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Distinctive brand marks that capture your essence and stand out in the market. Featured work includes
                The Hodge Documentary and LolitaWilson.com logos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Brand Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Comprehensive branding solutions to create a cohesive and recognizable brand presence across all
                platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Marketing Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Eye-catching brochures, flyers, and posters designed to promote your products and services effectively.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Web Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Visually appealing and user-friendly website designs that enhance your online presence and drive
                engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Social Media Graphics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Engaging and shareable social media visuals that increase brand awareness and drive traffic to your
                website.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Packaging Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Creative and functional packaging designs that protect your products and attract customers on the
                shelves.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CallToAction />
    </div>
  )
}

export default GraphicDesignPage
