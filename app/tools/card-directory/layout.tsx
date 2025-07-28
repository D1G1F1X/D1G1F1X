import type React from "react"
export default function CardDirectoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="card-directory-layout">{children}</div>
}
