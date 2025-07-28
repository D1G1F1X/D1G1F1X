import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Printer, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id
  // Mock data for a single order
  const order = {
    id: orderId,
    customerName: "Alice Wonderland",
    customerEmail: "alice@example.com",
    orderDate: "2023-10-26",
    status: "Processing",
    items: [
      { id: "prod1", name: "Deluxe Oracle Deck", quantity: 1, price: 49.99 },
      { id: "prod2", name: "Numerology Report", quantity: 1, price: 19.99 },
    ],
    total: 69.98,
    shippingAddress: "123 Rabbit Hole, Wonderland, WH 12345",
    notes: "Customer requested gift wrapping.",
    isPaid: true,
    isShipped: false,
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Details: #{order.id}</h1>
        <Link href="/admin/orders" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Details about the order and customer.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input id="customer-name" defaultValue={order.customerName} />
              </div>
              <div>
                <Label htmlFor="customer-email">Customer Email</Label>
                <Input id="customer-email" type="email" defaultValue={order.customerEmail} />
              </div>
              <div>
                <Label htmlFor="order-date">Order Date</Label>
                <Input id="order-date" type="date" defaultValue={order.orderDate} />
              </div>
              <div>
                <Label htmlFor="order-status">Status</Label>
                <select
                  id="order-status"
                  defaultValue={order.status}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="shipping-address">Shipping Address</Label>
                <Textarea id="shipping-address" defaultValue={order.shippingAddress} rows={3} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="order-notes">Order Notes</Label>
                <Textarea id="order-notes" defaultValue={order.notes} rows={4} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="is-paid" checked={order.isPaid} />
                <Label htmlFor="is-paid">Paid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="is-shipped" checked={order.isShipped} />
                <Label htmlFor="is-shipped">Shipped</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Products included in this order.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 text-right text-lg font-bold">Total: ${order.total.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Perform actions related to this order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Printer className="mr-2 h-4 w-4" /> Print Invoice
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="mr-2 h-4 w-4" /> Send Confirmation Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
