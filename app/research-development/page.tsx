import ResearchDevelopmentClient from "./_components/ResearchDevelopmentClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research & Development | Lumen Helix Solutions",
  description:
    "Pioneering advanced computing architectures, quaternionic systems, and AI research. Explore our work in NUMO Field, Cauldron quantum systems, RUBIC reversible computing, and cutting-edge AI applications.",
}

export default function ResearchDevelopmentPage() {
  return <ResearchDevelopmentClient />
}
