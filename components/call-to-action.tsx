"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CallToActionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}

export function CallToAction({
  title = "Ready to Start Your Project?",
  description = "Let's work together to bring your vision to life with our comprehensive suite of services.",
  primaryButtonText = "Get Started",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View Portfolio",
  secondaryButtonHref = "/portfolio",
  className = "",
}: CallToActionProps) {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={primaryButtonHref}>
              {primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {secondaryButtonText && secondaryButtonHref && (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
