import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Orders - Admin",
  description: "Manage customer orders.",
}

export default function OrdersPage() {
  // This is a placeholder for order data. In a real app, you'd fetch this from a database.
  const orders = [
    { id: "ORD001", customer: "Alice Smith", date: "2023-10-26", total: 59.99, status: "Delivered" },
    { id: "ORD002", customer: "Bob Johnson", date: "2023-10-25", total: 39.99, status: "Processing" },
    { id: "ORD003", customer: "Charlie Brown", date: "2023-10-24", total: 120.0, status: "Shipped" },
    { id: "ORD004", customer: "Diana Prince", date: "2023-10-23", total: 25.0, status: "Pending" },
    { id: "ORD005", customer: "Eve Adams", date: "2023-10-22", total: 75.5, status: "Cancelled" },
  ]

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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        {/* <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
        </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> All Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="search-orders">Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="search-orders" placeholder="Search by ID or customer..." className="pl-8" />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-status">Filter by Status</Label>
              <Input id="filter-status" placeholder="e.g., Delivered, Processing" />
            </div>
            <div>
              <Label htmlFor="filter-date">Filter by Date</Label>
              <Input id="filter-date" type="date" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
