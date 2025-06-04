"use client"

import { Suspense } from "react"
import HomeContent from "@/components/home-content"
import { BlogPreview } from "@/components/blog-preview"

export default function HomeWrapper() {
  return (
    <main>
      <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
        <HomeContent />
        <BlogPreview />
      </Suspense>
    </main>
  )
}
