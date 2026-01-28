import type { ReactNode } from "react"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-900">{children}</div>
}
