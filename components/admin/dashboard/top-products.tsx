"use client"

import { Progress } from "@/components/ui/progress"

interface Product {
  name: string
  sales: number
  revenue: string
  growth: number
}

const topProducts: Product[] = [
  {
    name: "NUMOracle Complete Deck",
    sales: 342,
    revenue: "$30,780",
    growth: 12.5,
  },
  {
    name: "Premium Membership",
    sales: 276,
    revenue: "$35,604",
    growth: 8.2,
  },
  {
    name: "Numerology Guide Book",
    sales: 189,
    revenue: "$4,725",
    growth: 5.3,
  },
  {
    name: "Personal Reading Session",
    sales: 157,
    revenue: "$11,775",
    growth: 15.8,
  },
  {
    name: "Elemental Card Set",
    sales: 124,
    revenue: "$5,642",
    growth: -2.4,
  },
]

export function TopProducts() {
  const maxSales = Math.max(...topProducts.map((p) => p.sales))

  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sales} sales</p>
          </div>
          <div className="flex items-center space-x-2">
            <Progress value={(product.sales / maxSales) * 100} className="h-2" />
            <p className="text-sm font-medium">{product.revenue}</p>
          </div>
          <p className={`text-xs ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
            {product.growth >= 0 ? "↑" : "↓"} {Math.abs(product.growth)}% from last month
          </p>
        </div>
      ))}
    </div>
  )
}
