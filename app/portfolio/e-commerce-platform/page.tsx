import Link from "next/link"
import type { Metadata } from "next/types"

import ImageWithFallback from "@/components/image-with-fallback"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "A modern e-commerce platform built with Next.js and Stripe.",
}

const ECommercePlatformPage = () => {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">E-Commerce Platform</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A modern e-commerce platform built with Next.js, Stripe, and shadcn/ui.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          )}
        >
          View Source Code
        </Link>
        <Link
          href="https://e-commerce-platform-git-develop-shadcn-ui.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2",
          )}
        >
          View Live Demo
        </Link>
      </div>
      <div className="relative w-full overflow-hidden rounded-lg shadow-md">
        <ImageWithFallback
          src="/examples/e-commerce-platform.png"
          fallbackSrc="/placeholder.svg"
          alt="E-Commerce Platform"
          width={1280}
          height={720}
          className="object-cover"
        />
      </div>
    </section>
  )
}

export default ECommercePlatformPage
