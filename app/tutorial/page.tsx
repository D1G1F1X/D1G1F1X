import { Suspense } from "react"
import type { Metadata } from "next"
import NumoTutorialPage from "@/components/numo-tutorial-page"

export const metadata: Metadata = {
  title: "NUMO Oracle Interactive Tutorial - Learn the System",
  description:
    "An engaging, step-by-step tutorial to master the NUMO Oracle deck, its numerology systems, and mystical insights.",
}

export default function TutorialPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-xl text-purple-400">
          Initializing NUMO Oracle Tutorial...
        </div>
      }
    >
      <NumoTutorialPage />
    </Suspense>
  )
}
