"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Truck, User, Calendar, ShoppingCart } from "lucide-react"

export default function OrderDetailsClientPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Placeholder for order data. In a real app, you'd fetch this from a database.
  const order = {
    id: id,
    customerName: "Jane Doe",
    customerEmail: "jane.doe@example.com",
    orderDate: "2023-10-26",
    status: "Processing", // Can be "Pending", "Processing", "Shipped", "Delivered", "Cancelled"
    totalAmount: 59.99,
    items: [
      { id: "prod1", name: "Numoracle Deck Standard Edition", quantity: 1, price: 39.99 },
      { id: "prod2", name: "Beginner's Guidebook", quantity: 1, price: 20.0 },
    ],
    shippingAddress: {
      street: "123 Mystic Lane",
      city: "Enchanted City",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
    notes: "Customer requested gift wrapping.",
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success"
      case "Shipped":
        return "default"
      case "Processing":
        return "secondary"
      case "Pending":
        return "outline"
      case "Cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleUpdateStatus = (newStatus: string) => {
    console.log(`Updating order ${id} status to: ${newStatus}`)
    // Implement API call to update order status
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id} Details</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" /> Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold text-primary">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Name: {order.customerName}</p>
              <p className="text-sm text-muted-foreground">Email: {order.customerEmail}</p>
              <p className="text-sm text-muted-foreground">Order Date: {order.orderDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" /> Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic text-sm text-muted-foreground">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              <br />
              {order.shippingAddress.country}
            </address>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Order Notes & Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="order-notes">Internal Notes</Label>
                <Textarea id="order-notes" defaultValue={order.notes} rows={3} />
              </div>
              <div>
                <Label htmlFor="update-status">Update Order Status</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Button variant="outline" onClick={() => handleUpdateStatus("Pending")}>
                    Pending
                  </Button>
                  <Button variant="outline" onClick={() => handleUpdateStatus("Processing")}>
                    Processing
                  </Button>
                  <Button variant="outline" onClick={() => handleUpdateStatus("Shipped")}>
                    Shipped
                  </Button>
                  <Button variant="outline" onClick={() => handleUpdateStatus("Delivered")}>
                    Delivered
                  </Button>
                  <Button variant="destructive" onClick={() => handleUpdateStatus("Cancelled")}>
                    Cancel Order
                  </Button>
                </div>
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
