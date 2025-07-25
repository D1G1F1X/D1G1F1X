import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentSalesLeads = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    date: "2023-10-26",
    source: "Google Ads",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    date: "2023-10-25",
    source: "Newsletter",
  },
  {
    id: "3",
    name: "Sofia Miller",
    email: "sofia.miller@email.com",
    date: "2023-10-24",
    source: "Referral",
  },
  {
    id: "4",
    name: "William Moore",
    email: "william.moore@email.com",
    date: "2023-10-23",
    source: "Organic Search",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    date: "2023-10-22",
    source: "Social Media",
  },
]

export function RecentSalesLeads() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales Leads</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSalesLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.date}</TableCell>
                <TableCell className="text-right">{lead.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
