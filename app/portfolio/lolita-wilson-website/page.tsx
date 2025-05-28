import Link from "next/link"
import { ArrowLeft, ExternalLink, Code, Palette, ShoppingBag, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHero from "@/components/page-hero"

export default function LolitaWilsonProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="accent"
        title="LolitaWilson.com"
        subtitle="Artist portfolio website with custom web application and e-commerce integration"
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 mb-8">
              <div className="relative">
                <img
                  src="/images/projects/lolita-wilson-website.png"
                  alt="LolitaWilson.com Preview"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(
                      "LolitaWilson.com",
                    )}`
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary-500 text-white">Building</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 mb-6">
                LolitaWilson.com is a comprehensive artist portfolio website designed to showcase the client's work,
                manage events, and sell merchandise. The project features a custom logo design, elegant user interface,
                and integrated web applications for event management and e-commerce functionality.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Web Development
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Logo Design
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Custom Web App
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  E-commerce
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Artist Portfolio
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <Palette className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Custom logo design with elegant gold typography</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Event management system with calendar integration</span>
                  </li>
                  <li className="flex items-start">
                    <ShoppingBag className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Integrated e-commerce platform for merchandise sales</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Portfolio showcase with categorized galleries</span>
                  </li>
                  <li className="flex items-start">
                    <Code className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Custom web application with user authentication</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://lolitawilson.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                    Preview Build
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">CLIENT</h4>
                  <p className="text-white">Lolita Wilson</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">CATEGORY</h4>
                  <p className="text-white">Client Project</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">STATUS</h4>
                  <p className="text-white">Building (Preview Available)</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">SERVICES</h4>
                  <p className="text-white">Web Development, Logo Design, Web Application</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">TECHNOLOGIES</h4>
                  <p className="text-white">Next.js, React, Tailwind CSS, Vercel</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Logo Design</h3>
              <div className="bg-black p-4 rounded-lg mb-4 flex justify-center">
                <img
                  src="/images/logos/lolita-wilson-logo.png"
                  alt="LolitaWilson.com Logo"
                  className="h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=96&width=300&text=${encodeURIComponent(
                      "LolitaWilson.com",
                    )}`
                  }}
                />
              </div>
              <p className="text-gray-300">
                The custom logo design features elegant gold typography that reflects the artist's sophisticated brand
                identity. The script font conveys creativity and artistic expression while maintaining readability and
                recognition.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50 mb-12">
          <Tabs defaultValue="implementation">
            <TabsList className="bg-gray-900/50 border border-gray-700/50 mb-6">
              <TabsTrigger value="implementation">Technical Implementation</TabsTrigger>
              <TabsTrigger value="process">Design Process</TabsTrigger>
              <TabsTrigger value="challenges">Challenges & Solutions</TabsTrigger>
            </TabsList>
            <TabsContent value="implementation" className="text-gray-300 space-y-4">
              <p>
                LolitaWilson.com is built using Next.js and React, providing a fast, responsive user experience with
                server-side rendering capabilities. The site features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom authentication system for admin access to manage content</li>
                <li>Event management system with calendar integration</li>
                <li>E-commerce functionality with secure payment processing</li>
                <li>Dynamic portfolio galleries with filtering capabilities</li>
                <li>Responsive design optimized for all device sizes</li>
                <li>Dark mode support with elegant color transitions</li>
              </ul>
              <p>
                The application is deployed on Vercel for optimal performance and reliability, with continuous
                integration ensuring seamless updates as new features are developed.
              </p>
            </TabsContent>
            <TabsContent value="process" className="text-gray-300 space-y-4">
              <p>
                The design process for LolitaWilson.com began with extensive client consultation to understand the
                artist's vision, target audience, and functional requirements. Key steps included:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Brand identity development and logo design exploration</li>
                <li>Wireframing and prototyping of key user interfaces</li>
                <li>User flow mapping for optimal navigation experience</li>
                <li>Color palette selection emphasizing elegance and sophistication</li>
                <li>Typography selection for optimal readability and brand alignment</li>
              </ul>
              <p>
                Multiple design iterations were created based on client feedback, resulting in a final design that
                perfectly captures the artist's unique aesthetic while providing intuitive functionality.
              </p>
            </TabsContent>
            <TabsContent value="challenges" className="text-gray-300 space-y-4">
              <p>
                During the development of LolitaWilson.com, several challenges were addressed with innovative solutions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Challenge:</strong> Integrating e-commerce functionality with event ticketing
                  <br />
                  <strong>Solution:</strong> Custom API development to unify the shopping experience across merchandise
                  and event tickets
                </li>
                <li>
                  <strong>Challenge:</strong> Optimizing image-heavy portfolio for performance
                  <br />
                  <strong>Solution:</strong> Implementation of lazy loading and image optimization techniques
                </li>
                <li>
                  <strong>Challenge:</strong> Creating a cohesive design language across diverse content types
                  <br />
                  <strong>Solution:</strong> Development of a custom design system with reusable components
                </li>
              </ul>
              <p>
                These solutions not only addressed immediate challenges but also created a scalable foundation for
                future feature additions and content expansion.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Interested in a similar project?</h2>
          <Link href="/contact">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
