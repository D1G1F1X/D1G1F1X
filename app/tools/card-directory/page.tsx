import { CardDirectoryPageClient } from "./CardDirectoryPageClient"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata = {
  title: "NUMO Oracle Card Directory",
  description: "Explore the complete collection of NUMO Oracle cards with detailed meanings and symbolism.",
}

export default function CardDirectoryPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="NUMO Oracle Card Directory"
        description="Explore the complete collection of NUMO Oracle cards with detailed meanings and symbolism."
        backgroundImage="/images/hero/oracle-card-archive.png"
      />
      <CardDirectoryPageClient />
    </div>
  )
}
