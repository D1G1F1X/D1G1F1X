import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/lib/projects"
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

export default function MeltProjectPage() {
  const project = projects.find((p) => p.id === "melt")

  if (!project) {
    return <div className="flex items-center justify-center min-h-[60vh] text-xl text-gray-400">Project not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            In-House Project
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            M.E.L.T. (Monitor Enforcement Locate Threats)
          </h1>
          <p className="text-lg text-gray-300">
            M.E.L.T. (Monitor Enforcement Locate Threats) is a web community-powered platform designed to provide
            real-time alerts, notifications, and insights into immigration & ICE sightings and threat levels in your
            area! 🚨 M.E.L.T. aims to empower communities with critical information.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
              Real-time Alerts
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
              Community Reporting
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
              Threat Monitoring
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
              Location-based Services
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
              Secure Communication
            </Badge>
          </div>
          <div className="flex gap-4">
            <Link href="https://meltice.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                View Build Progress <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-800 bg-transparent">
                Back to Portfolio <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <Image
            src="/images/projects/melt.jpg"
            alt="M.E.L.T. Project Screenshot"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      <div className="mt-16 md:mt-24 space-y-12">
        <h2 className="text-3xl font-bold text-white text-center">Project Insights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Interactive Map:</strong> Visualize sightings and threat perimeters on a dynamic, real-time
                  map. This feature allows users to quickly understand the geographical context of reported incidents.
                </li>
                <li>
                  <strong>Live Chat:</strong> Share and receive details on real-time sighting updates through an
                  integrated live chat system. This fosters immediate communication and community collaboration.
                </li>
                <li>
                  <strong>Community-Powered Reporting:</strong> Users can easily report new sightings, contributing to a
                  continuously updated and comprehensive database of information.
                </li>
                <li>
                  <strong>Secure Authentication:</strong> Robust user authentication ensures data integrity and privacy,
                  with distinct roles for general users and administrators.
                </li>
                <li>
                  <strong>Admin Dashboard:</strong> A dedicated administrative portal for authorized personnel to manage
                  reports, analyze data, and oversee community contributions.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Technologies Used</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Frontend:</strong> Next.js, React, Tailwind CSS, shadcn/ui
                </li>
                <li>
                  <strong>Mapping:</strong> Mapbox GL JS
                </li>
                <li>
                  <strong>Backend/Database:</strong> Supabase (for authentication and real-time data)
                </li>
                <li>
                  <strong>Deployment:</strong> Vercel
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Problem Solved & Future Enhancements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                In an increasingly complex environment, M.E.L.T. provides a vital resource for collective awareness and
                response to immigration and ICE-related activities. It empowers communities by giving them access to
                critical, real-time information, enabling more informed decisions and proactive measures.
              </p>
              <h4 className="font-semibold text-primary-300 mt-4">Future Enhancements:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced analytics and reporting for administrators.</li>
                <li>Push notifications for real-time alerts based on user-defined perimeters.</li>
                <li>Integration with additional data sources for enriched threat assessment.</li>
                <li>Mobile application development for enhanced accessibility.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 md:mt-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Explore More Projects</h2>
        <Link href="/portfolio">
          <Button className="bg-accent-600 hover:bg-accent-700 text-white text-lg px-8 py-4">
            View All Projects <ArrowRightIcon className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
