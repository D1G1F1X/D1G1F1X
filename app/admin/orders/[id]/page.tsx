import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Package, Truck, User } from "lucide-react"

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

// Mock data for a single order
const mockOrder = {
  id: "ORD789012",
  customerName: "Alice Wonderland",
  customerEmail: "alice@example.com",
  orderDate: new Date("2024-07-25T14:30:00Z"),
  status: "Processing",
  totalAmount: 129.99,
  shippingAddress: {
    street: "123 Rabbit Hole",
    city: "Wonderland City",
    state: "WA",
    zip: "98001",
    country: "USA",
  },
  items: [
    {
      id: "prod001",
      name: "Deluxe Oracle Deck",
      quantity: 1,
      price: 79.99,
    },
    {
      id: "prod005",
      name: "Crystal Scrying Ball",
      quantity: 1,
      price: 50.0,
    },
  ],
  paymentMethod: "Credit Card",
  trackingNumber: "TRK987654321",
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = params
  // In a real application, you would fetch order data based on the 'id'
  const order = mockOrder // Using mock data for demonstration

  if (!order) {
    return <div className="p-8 text-center text-muted-foreground">Order with ID &quot;{id}&quot; not found.</div>
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Processing":
        return "secondary"
      case "Shipped":
        return "default"
      case "Delivered":
        return "success"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details: #{order.id}</h1>
          <p className="text-muted-foreground">Manage and view the specifics of this order.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Order</Button>
          <Button variant="destructive">Cancel Order</Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Order Summary
            </CardTitle>
            <CardDescription>Key information about the order.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-medium">Customer:</div>
              <div>
                {order.customerName} ({order.customerEmail})
              </div>

              <div className="font-medium">Order Date:</div>
              <div>{format(order.orderDate, "PPP p")}</div>

              <div className="font-medium">Status:</div>
              <div>
                <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
              </div>

              <div className="font-medium">Total Amount:</div>
              <div className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</div>

              <div className="font-medium">Payment Method:</div>
              <div>{order.paymentMethod}</div>
            </div>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Details
              </CardTitle>
              <CardDescription>Information about where the order is being shipped.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
              {order.trackingNumber && (
                <p className="font-medium flex items-center gap-2">
                  Tracking #: <Badge variant="secondary">{order.trackingNumber}</Badge>
                </p>
              )}
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Update Shipping
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Customer Information
              </CardTitle>
              <CardDescription>Contact details and customer history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                Email:{" "}
                <a href={`mailto:${order.customerEmail}`} className="text-primary hover:underline">
                  {order.customerEmail}
                </a>
              </p>
              <p>
                Total Orders (mock): <strong>5</strong>
              </p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                View Customer Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
