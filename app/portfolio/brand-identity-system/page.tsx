import Link from "next/link"
import type { Metadata } from "next/types"

import { cn } from "@/lib/utils"
import ImageWithFallback from "@/components/image-with-fallback"

export const metadata: Metadata = {
  title: "Brand Identity System - Portfolio",
  description: "A comprehensive brand identity system.",
}

const BrandIdentitySystemPage = () => {
  return (
    <div className="container relative overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-24">
        <div className="flex flex-col">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Brand Identity System</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            A comprehensive brand identity system designed to create a cohesive and recognizable brand presence.
          </p>
          <div className="mt-8 space-y-3">
            <p>
              <strong>Client:</strong> Acme Corp
            </p>
            <p>
              <strong>Services:</strong> Brand Strategy, Visual Identity, Logo Design, Brand Guidelines
            </p>
            <p>
              <strong>Year:</strong> 2023
            </p>
            <Link
              href="#"
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
                "mt-4",
              )}
            >
              Visit Website
            </Link>
          </div>
        </div>
        <div>
          <ImageWithFallback
            src="/images/portfolio/brand-identity-system/brand-identity-system-1.png"
            fallbackSrc="/placeholder.svg"
            alt="Brand Identity System"
            width={800}
            height={600}
            className="rounded-md shadow-md"
          />
          <div className="mt-6 grid gap-4">
            <ImageWithFallback
              src="/images/portfolio/brand-identity-system/brand-identity-system-2.png"
              fallbackSrc="/placeholder.svg"
              alt="Brand Identity System - Logo"
              width={800}
              height={600}
              className="rounded-md shadow-md"
            />
            <ImageWithFallback
              src="/images/portfolio/brand-identity-system/brand-identity-system-3.png"
              fallbackSrc="/placeholder.svg"
              alt="Brand Identity System - Colors"
              width={800}
              height={600}
              className="rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandIdentitySystemPage
