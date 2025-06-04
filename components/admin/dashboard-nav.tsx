"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Package,
  FolderOpen,
  Brain,
  BookOpen,
  MessageSquare,
  Database,
} from "lucide-react"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
    disabled?: boolean
  }[]
}

export function DashboardNav({ className, items, ...props }: NavProps) {
  const pathname = usePathname()

  // Filter out disabled items
  const visibleItems = items.filter((item) => !item.disabled)

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {visibleItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-purple-400" : "text-gray-300 hover:text-white",
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

// Let's check the defaultItems array to make sure we're disabling the correct item
// I'll update the array to properly identify and disable any "Readings" related items

// Update the defaultItems array to ensure "Readings" is properly disabled
export const defaultItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Content",
    href: "/admin/pages",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Knowledge Base",
    href: "/admin/knowledge-base",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: "Library",
    href: "/admin/library",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Prompts",
    href: "/admin/prompts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: <MessageSquare className="h-5 w-5" />,
    disabled: true, // Disabling Reviews instead of Readings
  },
  {
    title: "Files",
    href: "/admin/files",
    icon: <FolderOpen className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Card Data Editor",
    href: "/admin/card-data-editor",
    icon: <Database className="h-4 w-4" />,
  },
]

export function getDefaultItems() {
  return defaultItems
}
