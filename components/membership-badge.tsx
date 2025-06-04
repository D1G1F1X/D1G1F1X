import { Badge } from "@/components/ui/badge"
import { Star, CreditCard, Smartphone } from "lucide-react"
import type { MembershipType } from "@/lib/membership-types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MembershipBadgeProps {
  type: MembershipType
  productType?: "app" | "card" | "subscription"
  className?: string
}

export function MembershipBadge({ type, productType, className = "" }: MembershipBadgeProps) {
  if (type === "free") {
    return (
      <Badge variant="outline" className={`bg-gray-700 text-gray-200 border-gray-600 ${className}`}>
        Free
      </Badge>
    )
  }

  if (type === "regular") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={`bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-0 ${className}`}
            >
              {productType === "app" ? (
                <Smartphone className="h-3 w-3 mr-1" />
              ) : (
                <CreditCard className="h-3 w-3 mr-1" />
              )}
              Member
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Access via {productType === "app" ? "App Purchase" : "Card Purchase"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Badge
      variant="outline"
      className={`bg-gradient-to-r from-purple-600 to-blue-500 text-white border-0 ${className}`}
    >
      <Star className="h-3 w-3 mr-1" /> Premium
    </Badge>
  )
}
