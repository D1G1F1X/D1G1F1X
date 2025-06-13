"use client"
import { CardDirectory } from "@/components/card-directory"

export default function CardDirectoryPageClient() {
  // The state for selectedCard is now managed within CardDirectory
  // This component simply renders the main directory

  return (
    <div className="container mx-auto py-8">
      {/* The main CardDirectory component will handle its own layout and content */}
      <CardDirectory />
    </div>
  )
}
