"use client"

import type React from "react"
import type { ManualCartItem } from "@/contexts/manual-cart-context" // Adjust path if needed
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

interface OrderSummaryDisplayProps {
  items: ManualCartItem[]
  total: number
  currencySymbol?: string
}

const OrderSummaryDisplay: React.FC<OrderSummaryDisplayProps> = ({ items, total, currencySymbol = "$" }) => {
  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your cart is empty.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell className="hidden md:table-cell">
                  {item.product.image ? (
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.product.name}</div>
                  {item.product.description && (
                    <div className="text-sm text-muted-foreground hidden sm:block">
                      {item.product.description.substring(0, 50)}
                      {item.product.description.length > 50 ? "..." : ""}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {currencySymbol}
                  {item.product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {currencySymbol}
                  {(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="text-xl font-semibold">
          Grand Total: {currencySymbol}
          {total.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  )
}

export default OrderSummaryDisplay
