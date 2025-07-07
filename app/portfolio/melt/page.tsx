"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/projects"
import { ArrowUpRight } from "lucide-react"

const melt = projects.find((p) => p.id === "melt")!

export default function MeltPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black py-12 px-4 md:px-8 text-gray-100">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* HERO */}
        <section className="rounded-xl bg-slate-800/70 backdrop-blur-md shadow-lg p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Project: {melt.title}</h1>

          <p className="mb-6 text-gray-200">{melt.description}</p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="secondary" className="uppercase tracking-wide">
              Beta
            </Badge>
            {melt.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Link
            href={melt.liveSiteUrl!}
            target="_blank"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition"
          >
            Visit {melt.domain} <ArrowUpRight size={16} />
          </Link>
        </section>

        {/* SCREENSHOT */}
        <section className="rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={melt.image || "/placeholder.svg"}
            alt="iceMELT.app live screenshot"
            width={1280}
            height={768}
            className="w-full h-auto object-cover"
            priority
          />
        </section>

        {/* DETAILS */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl bg-slate-800/70 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-2">Key Features</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-200">
              <li>Interactive map with threat-level zones.</li>
              <li>Community-powered real-time reports &amp; chat.</li>
              <li>Secure authentication with role-based access.</li>
              <li>Admin dashboard for data oversight.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-800/70 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-2">Tech Stack</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-200">
              <li>Next.js 15 + React 18</li>
              <li>Supabase (auth &amp; realtime DB)</li>
              <li>Mapbox GL JS</li>
              <li>Tailwind CSS &amp; shadcn/ui</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
