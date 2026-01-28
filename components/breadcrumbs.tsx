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
    <nav className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-600 dark:text-gray-300 font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
