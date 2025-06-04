"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { adminNavItems } from "@/components/admin/sidebar-nav"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 bg-gray-900 border-r-gray-800">
        <div className="px-7">
          <Link href="/admin/dashboard" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold text-xl text-white">NUMO Admin</span>
          </Link>
        </div>
        <div className="flex flex-col space-y-3 mt-8 px-4">
          {adminNavItems
            .filter((item) => !item.disabled)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-purple-900/30 hover:text-white",
                )}
                onClick={() => setOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </Link>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
