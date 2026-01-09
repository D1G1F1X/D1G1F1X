import Link from "next/link"
import type { Metadata } from "next/types"

import { Button } from "@/components/ui/button"
import ImageWithFallback from "@/components/image-with-fallback"

export const metadata: Metadata = {
  title: "Virtual Event Platform - Portfolio",
  description: "Virtual Event Platform project details.",
}

const VirtualEventPlatformPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Virtual Event Platform</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Overview</h2>
        <p className="text-gray-100">
          A comprehensive virtual event platform designed to host and manage online conferences, webinars, and
          workshops. This platform provides features such as live streaming, interactive Q&A sessions, virtual booths,
          and networking opportunities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Key Features</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Live Streaming with real-time chat</li>
          <li>Interactive Q&A and Polling</li>
          <li>Virtual Booths for exhibitors</li>
          <li>Networking Lounges for attendees</li>
          <li>Session Recording and Playback</li>
          <li>Detailed Analytics and Reporting</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Next.js</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>WebSockets (for real-time communication)</li>
          <li>Cloudinary (for image and video storage)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageWithFallback
            src="/images/virtual-event-platform/screenshot1.png"
            fallbackSrc="/placeholder.svg"
            alt="Screenshot 1"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
          <ImageWithFallback
            src="/images/virtual-event-platform/screenshot2.png"
            fallbackSrc="/placeholder.svg"
            alt="Screenshot 2"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
          <ImageWithFallback
            src="/images/virtual-event-platform/screenshot3.png"
            fallbackSrc="/placeholder.svg"
            alt="Screenshot 3"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Links</h2>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Link>
          </Button>
          <Button asChild>
            <Link href="https://your-live-demo.com" target="_blank" rel="noopener noreferrer">
              Live Demo
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default VirtualEventPlatformPage
