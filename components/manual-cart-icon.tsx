"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useManualCart } from "@/contexts/manual-cart-context"
import { Button } from "@/components/ui/button"

export default function ManualCartIcon() {
  const { getItemCount, isCartLoaded } = useManualCart()
  const itemCount = getItemCount()

  // Only render the cart icon if the cart has been loaded from localStorage
  // to prevent hydration mismatch if server-rendered with 0 items initially.
  if (!isCartLoaded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
        disabled
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Link href="/manual-checkout" passHref legacyBehavior>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`View cart with ${itemCount} items`}
        className="relative text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
