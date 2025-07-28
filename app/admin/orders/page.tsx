import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminOrdersPage() {
  const orders = [
    {
      id: "ORD001",
      customer: "Alice Wonderland",
      date: "2023-10-26",
      total: 69.98,
      status: "Processing",
    },
    {
      id: "ORD002",
      customer: "Bob The Builder",
      date: "2023-10-25",
      total: 29.99,
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Charlie Chaplin",
      date: "2023-10-24",
      total: 120.5,
      status: "Delivered",
    },
    {
      id: "ORD004",
      customer: "Diana Prince",
      date: "2023-10-23",
      total: 45.0,
      status: "Pending",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Order Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Orders</CardTitle>
          <CardDescription>Find orders by ID, customer name, or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search orders..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Order</CardTitle>
          <CardDescription>Manually create a new order for a customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/manual-checkout" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Manual Order
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>A list of all orders placed on your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Customer</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{order.id}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{order.customer}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{order.date}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">${order.total.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          order.status === "Processing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : order.status === "Shipped"
                              ? "bg-blue-500/20 text-blue-400"
                              : order.status === "Delivered"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Link href={`/admin/orders/${order.id}`} passHref>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
