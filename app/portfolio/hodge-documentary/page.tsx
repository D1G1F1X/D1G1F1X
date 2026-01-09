import { ArrowLeft, ExternalLink, Play, Film, Users, Heart } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/page-hero"

export default function HodgeDocumentaryProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="accent"
        title="The Hodge Documentary Website"
        subtitle="A compelling documentary website showcasing Cleveland artists and their impact on social change"
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 mb-8">
              <img
                src="/images/projects/hodge-documentary-hero.jpg"
                alt="The Hodge Documentary Website - Cleveland Artists Platform"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The Hodge" documentary website serves as a powerful digital platform that tells the compelling story of
                Cleveland artists who are stimulating change through their artistic platforms. The site exposes
                injustices and uncovers stories of gentrification, systemic racism, and institutional borders
                segregating Cleveland.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                This project represents more than just a website—it's a digital movement that amplifies the voices of
                local artists and activists who are working to create positive change in their community. The platform
                features embedded video content, artist profiles, and interactive elements that engage visitors in the
                important social issues being addressed.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The dark, cinematic design aesthetic reflects the serious nature of the documentary while maintaining
                accessibility and ensuring the powerful message reaches the widest possible audience.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Video Integration</h3>
                    <p className="text-gray-300 text-sm">
                      Seamless YouTube integration for trailer viewing and documentary content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Artist Profiles</h3>
                    <p className="text-gray-300 text-sm">
                      Dedicated sections highlighting the featured Cleveland artists and their work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Social Impact</h3>
                    <p className="text-gray-300 text-sm">
                      Content focused on social justice, community change, and artistic activism.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Film className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Cinematic Design</h3>
                    <p className="text-gray-300 text-sm">
                      Dark, atmospheric design that reflects the documentary's powerful narrative.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Social Impact & Mission</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The Hodge documentary website serves as a crucial platform for social change, giving voice to
                Cleveland's artistic community and their efforts to address systemic issues. The project highlights how
                art can be a powerful tool for social justice and community transformation.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Through compelling storytelling and visual design, the website helps amplify important conversations
                about gentrification, racism, and community empowerment, making these critical issues accessible to a
                broader audience.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Category</span>
                  <p className="text-white">Client Project</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status</span>
                  <Badge className="bg-accent-500 text-white">Deployed</Badge>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Timeline</span>
                  <p className="text-white">4 months</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      HTML5
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      CSS3
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Video.js
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Web Development
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Documentary
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Video
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Social Impact
                </Badge>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Live Project</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Experience the powerful story of Cleveland artists creating social change.
              </p>
              <Button asChild className="w-full bg-primary-500 hover:bg-primary-600">
                <Link href="https://hodgedoc.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit The Hodge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
