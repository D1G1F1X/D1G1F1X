import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogFooterCTA() {
  return (
    <div className="my-16 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border border-teal-500/20 rounded-xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Want this applied to your workflow?
        </h3>
        <p className="text-gray-300 mb-8 text-lg">
          Get personalized guidance tailored to your specific needs and challenges.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
            <Link href="/diagnostic" className="flex items-center gap-2">
              Start Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 bg-transparent"
          >
            <Link href="/resources" className="flex items-center gap-2">
              Get Free Templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
