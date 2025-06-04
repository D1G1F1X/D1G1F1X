"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@supabase/supabase-js"
import type { SalesLead } from "@/types/sales-leads"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Mail, Phone, User, ShoppingBag, Edit3, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Initialize Supabase client - use your existing client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function RecentSalesLeads() {
  const [leads, setLeads] = useState<SalesLead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error: dbError } = await supabase
        .from("sales_leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10) // Fetch latest 10 leads

      if (dbError) throw dbError
      setLeads(data || [])
    } catch (err: any) {
      console.error("Error fetching sales leads:", err)
      setError(`Failed to fetch sales leads: ${err.message}`)
      setLeads([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const getStatusBadgeVariant = (status: SalesLead["status"]) => {
    switch (status) {
      case "new":
        return "default" // Blue/Purple
      case "contacted":
        return "outline" // Yellow/Amber
      case "converted":
        return "secondary" // Green
      case "archived":
        return "destructive" // Red/Gray
      default:
        return "default"
    }
  }

  const getStatusBadgeClass = (status: SalesLead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500 hover:bg-blue-600"
      case "contacted":
        return "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
      case "converted":
        return "bg-green-500 hover:bg-green-600"
      case "archived":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return ""
    }
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-500 rounded-md">
        <p>{error}</p>
        <Button onClick={fetchLeads} variant="outline" size="sm" className="mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Recent Deck Inquiries</h3>
        <Button onClick={fetchLeads} variant="outline" size="sm" disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh Leads"}
        </Button>
      </div>
      {isLoading && leads.length === 0 && <p className="text-gray-400">Loading inquiries...</p>}
      {!isLoading && leads.length === 0 && <p className="text-gray-400">No new deck inquiries found.</p>}

      {leads.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Deck Info</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-800/50">
                  <TableCell>
                    <div className="font-medium text-slate-200 flex items-center">
                      <User size={14} className="mr-1.5 text-slate-400" /> {lead.customer_name}
                    </div>
                    <a
                      href={`mailto:${lead.customer_email}`}
                      className="text-xs text-purple-400 hover:underline flex items-center"
                    >
                      <Mail size={12} className="mr-1.5" /> {lead.customer_email}
                    </a>
                    {lead.customer_phone && (
                      <div className="text-xs text-slate-400 flex items-center">
                        <Phone size={12} className="mr-1.5" /> {lead.customer_phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-300 flex items-center">
                      <ShoppingBag size={14} className="mr-1.5 text-slate-400" /> {lead.deck_type} (Qty: {lead.quantity}
                      )
                    </div>
                    {lead.deck_specifications_notes && (
                      <p className="text-xs text-slate-400 truncate max-w-xs" title={lead.deck_specifications_notes}>
                        <Edit3 size={12} className="inline mr-1.5" /> {lead.deck_specifications_notes}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(lead.status)} className={getStatusBadgeClass(lead.status)}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" title="View Details (Not Implemented)">
                      <ExternalLink size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Note: "View Details" and lead status updates would require a dedicated lead management page.
      </p>
    </div>
  )
}
