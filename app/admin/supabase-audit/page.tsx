import { SupabaseAuditReport } from "@/components/admin/supabase-audit-report"

export const metadata = {
  title: "Supabase Audit - Admin",
  description: "Audit Supabase integration and data.",
}

export default function SupabaseAuditPage() {
  return <SupabaseAuditReport />
}
