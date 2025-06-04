"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  product: string
  date: string
  amount: string
  status: "completed" | "processing" | "failed"
}

const recentOrders: Order[] = [
  {
    id: "ORD-7652",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/stylized-letters-sj.png",
    },
    product: "NUMOracle Complete Deck",
    date: "2023-05-12",
    amount: "$89.99",
    status: "completed",
  },
  {
    id: "ORD-7651",
    customer: {
      name: "Michael Chen",
      email: "mchen@example.com",
      avatar: "/microphone-concert-stage.png",
    },
    product: "Numerology Guide Book",
    date: "2023-05-12",
    amount: "$24.95",
    status: "processing",
  },
  {
    id: "ORD-7650",
    customer: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      avatar: "/graffiti-ew.png",
    },
    product: "Premium Membership (Annual)",
    date: "2023-05-11",
    amount: "$129.00",
    status: "completed",
  },
  {
    id: "ORD-7649",
    customer: {
      name: "James Rodriguez",
      email: "jrodriguez@example.com",
      avatar: "/stylized-jr-logo.png",
    },
    product: "Personal Reading Session",
    date: "2023-05-11",
    amount: "$75.00",
    status: "failed",
  },
  {
    id: "ORD-7648",
    customer: {
      name: "Olivia Taylor",
      email: "olivia.t@example.com",
      avatar: "/abstract-ot.png",
    },
    product: "Elemental Card Set",
    date: "2023-05-10",
    amount: "$45.50",
    status: "completed",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
              <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{order.customer.name}</p>
              <p className="text-xs text-muted-foreground">{order.customer.email}</p>
            </div>
          </div>

          <div className="hidden md:block">
            <p className="text-sm">{order.product}</p>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>

          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium">{order.amount}</p>
            <Badge
              variant={
                order.status === "completed" ? "default" : order.status === "processing" ? "outline" : "destructive"
              }
              className={
                order.status === "completed"
                  ? "bg-green-500"
                  : order.status === "processing"
                    ? "border-amber-500 text-amber-500"
                    : ""
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
