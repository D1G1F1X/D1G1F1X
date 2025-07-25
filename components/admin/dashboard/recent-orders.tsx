import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentOrders = [
  {
    id: "ORD001",
    customer: "Olivia Martin",
    date: "2023-10-26",
    total: "$59.99",
    status: "Delivered",
  },
  {
    id: "ORD002",
    customer: "Jackson Lee",
    date: "2023-10-25",
    total: "$39.00",
    status: "Processing",
  },
  {
    id: "ORD003",
    customer: "Sofia Miller",
    date: "2023-10-24",
    total: "$299.00",
    status: "Shipped",
  },
  {
    id: "ORD004",
    customer: "William Moore",
    date: "2023-10-23",
    total: "$99.00",
    status: "Pending",
  },
  {
    id: "ORD005",
    customer: "Sofia Davis",
    date: "2023-10-22",
    total: "$39.00",
    status: "Cancelled",
  },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell className="text-right">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
