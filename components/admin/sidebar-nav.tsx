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
  Star,
  BarChart,
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
    disabled?: boolean
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items
        .filter((item) => !item.disabled)
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-purple-900/50 text-white"
                : "text-gray-300 hover:bg-purple-900/30 hover:text-white",
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.title}
          </Link>
        ))}
    </nav>
  )
}

export const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Content",
    href: "/admin/pages",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Knowledge Base",
    href: "/admin/knowledge-base",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    title: "Library",
    href: "/admin/library",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Prompts",
    href: "/admin/prompts",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: <Star className="h-4 w-4" />,
  },
  {
    title: "Files",
    href: "/admin/files",
    icon: <FolderOpen className="h-4 w-4" />,
  },
  {
    title: "Card Data Editor",
    href: "/admin/card-data-editor",
    icon: <Database className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]
