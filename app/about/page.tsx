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
            <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              With over 30 years of experience as a seasoned technology consultant and project manager, I've been an
              integral part of multiple development companies throughout my career. My journey has taken me through the
              evolution of technology from its early enterprise days to the sophisticated digital landscape we navigate
              today.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              After a brief hiatus following the COVID pandemic, I recognized the dawning of the AI revolution and its
              transformative potential for businesses across all industries. This realization reignited my passion for
              technology consulting, and I began freelancing again, helping organizations navigate this new frontier.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              The natural evolution of this journey led to the launch of Lumen Helix Solutions—a comprehensive digital
              transformation consultancy that combines decades of proven expertise with cutting-edge AI strategy and
              implementation. Today, I lead a team of specialists who share my vision of illuminating the path to
              digital excellence for organizations ready to embrace the future.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">My Mission</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">
              To illuminate the path to digital excellence by fusing three decades of strategic insight with
              cutting-edge AI innovation, empowering organizations to not just adapt to technological change, but to
              lead it.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">My Core Values</h2>

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
            <h2 className="text-3xl font-bold text-white mb-6">Leadership & Expertise</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Drawing from over three decades of hands-on experience in technology consulting and project management, I
              bring a unique perspective that bridges traditional enterprise solutions with emerging AI technologies. My
              extensive background includes leadership roles across multiple development companies, giving me deep
              insights into what works—and what doesn't—in digital transformation initiatives.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              At Lumen Helix Solutions, I've assembled a carefully curated team of specialists who complement my
              experience with fresh perspectives and cutting-edge expertise. Together, we combine the wisdom of proven
              methodologies with the innovation required to harness AI's transformative potential.
            </p>

            <div className="mt-8 text-center">
              <Button asChild className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/contact">Let's Discuss Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
