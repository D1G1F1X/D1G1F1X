import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="About Us"
        title="Our Story & Mission"
        subtitle="Pioneering digital transformation through innovative solutions and strategic partnerships"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Lumen Helix was founded in 2013 with a simple yet ambitious vision: to help businesses navigate the
              increasingly complex digital landscape with clarity and confidence. Our founders, seasoned technology and
              business consultants, recognized that most organizations struggled not from a lack of technology options,
              but from a lack of strategic direction and implementation expertise.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              From our humble beginnings as a boutique consulting firm, we've grown into a comprehensive digital
              transformation partner, expanding our services to include AI strategy, project management, web
              development, graphic design, marketing strategy, and technology consulting. Throughout our evolution,
              we've maintained our commitment to delivering integrated solutions that address the full spectrum of
              digital challenges.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">
              To illuminate the path to digital excellence by fusing strategic insight with flawless execution,
              empowering organizations to thrive in an ever-evolving technological landscape.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Innovation with Purpose</h3>
                <p className="text-gray-300">
                  We pursue innovation not for its own sake, but to solve real business challenges and create tangible
                  value. Our solutions combine cutting-edge technologies with practical implementation strategies.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Integrated Excellence</h3>
                <p className="text-gray-300">
                  We believe that true digital transformation requires a holistic approach. Our integrated services work
                  in harmony to deliver comprehensive solutions that address the full spectrum of digital challenges.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Client Partnership</h3>
                <p className="text-gray-300">
                  We view our clients as partners in the transformation journey. We invest in understanding your
                  business, culture, and objectives to deliver solutions that align with your vision and drive
                  sustainable growth.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Continuous Learning</h3>
                <p className="text-gray-300">
                  In a rapidly evolving digital landscape, continuous learning is essential. We invest in ongoing
                  education and research to ensure our team remains at the forefront of emerging technologies and
                  methodologies.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 md:col-span-2">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Measurable Impact</h3>
                <p className="text-gray-300">
                  We believe in accountability and measurable results. Our solutions are designed with clear success
                  metrics and performance indicators to ensure they deliver tangible business value.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Team</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our diverse team brings together experts from various disciplines, including technology, design,
              marketing, and business strategy. This multidisciplinary approach enables us to develop comprehensive
              solutions that address the full spectrum of digital challenges.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Led by our founding partners and a seasoned leadership team, our organization combines the agility of a
              boutique firm with the capabilities of a full-service digital transformation partner. We invest heavily in
              our team's professional development, ensuring they remain at the forefront of emerging technologies and
              methodologies.
            </p>

            <div className="mt-8 text-center">
              <Button asChild className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
