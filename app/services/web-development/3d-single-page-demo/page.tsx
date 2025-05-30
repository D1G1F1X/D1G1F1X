import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InteractiveDemoPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <PageHero
        badge="Web Development Demo"
        badgeVariant="default"
        title="Interactive 3D Single-Page Website"
        subtitle="Experience the engaging and modern design of our $499 Three.js powered websites."
      />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/services/web-development">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Web Development Services
            </Link>
          </Button>
        </div>

        <div className="aspect-[16/9] w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          <iframe
            src="/3d-interactive-demo.html"
            title="Interactive 3D Single-Page Website Demo"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>
            This demo showcases the type of interactive 3D elements and single-page structure we can create for your
            project.
          </p>
          <p className="mt-2">
            Note: The demo is embedded and uses its own navigation. Use the "Back" button above to return to our main
            site.
          </p>
        </div>
      </div>
    </main>
  )
}
