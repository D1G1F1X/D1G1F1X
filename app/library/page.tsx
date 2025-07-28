import type { Metadata } from "next"
import LibraryClientPage from "./LibraryClientPage"

export const metadata: Metadata = {
  title: "NUMO Oracle Library | Resources & Guides",
  description: "Access a comprehensive library of resources, guides, and articles on NUMO Oracle and numerology.",
}

export default function LibraryPage() {
  return <LibraryClientPage />
}
