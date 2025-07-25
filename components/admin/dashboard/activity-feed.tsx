import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, CheckCircle, MessageSquare, ShoppingCart, UserPlus } from "lucide-react"

const activities = [
  {
    id: "1",
    timestamp: "2023-10-26T10:30:00",
    type: "new_order",
    user: {
      name: "Olivia Martin",
      image: "/placeholder-user.jpg",
    },
    description: "placed a new order",
    amount: "$59.99",
  },
  {
    id: "2",
    timestamp: "2023-10-26T09:15:00",
    type: "new_user",
    user: {
      name: "Jackson Lee",
      image: null,
    },
    description: "joined the platform",
  },
  {
    id: "3",
    timestamp: "2023-10-26T08:00:00",
    type: "new_review",
    user: {
      name: "Sofia Miller",
      image: "/placeholder-user.jpg",
    },
    description: "left a 5-star review on Numoracle Deck",
  },
  {
    id: "4",
    timestamp: "2023-10-25T18:45:00",
    type: "new_subscriber",
    user: {
      name: "William Moore",
      image: null,
    },
    description: "subscribed to the newsletter",
  },
  {
    id: "5",
    timestamp: "2023-10-25T12:00:00",
    type: "order_shipped",
    user: {
      name: "Sofia Davis",
      image: "/placeholder-user.jpg",
    },
    description: "order has been shipped",
    orderId: "ORD001",
  },
]

const activityIcons = {
  new_order: <ShoppingCart className="h-4 w-4 text-green-500" />,
  new_user: <UserPlus className="h-4 w-4 text-blue-500" />,
  new_review: <MessageSquare className="h-4 w-4 text-yellow-500" />,
  new_subscriber: <Calendar className="h-4 w-4 text-purple-500" />,
  order_shipped: <CheckCircle className="h-4 w-4 text-green-500" />,
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Timestamp</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.timestamp.substring(11, 16)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {activityIcons[activity.type]} {activity.description}
                        {activity.orderId && ` (Order #${activity.orderId})`}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{activity.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
