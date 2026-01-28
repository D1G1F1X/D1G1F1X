"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Format label from URL segment
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Don't add dynamic segments like [id]
    if (!segment.startsWith("[") && index === segments.length - 1) {
      breadcrumbs.push({ label, href: currentPath })
    } else if (!segment.startsWith("[")) {
      breadcrumbs.push({ label, href: currentPath })
    }
  })

  return breadcrumbs
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    null
  )
}
