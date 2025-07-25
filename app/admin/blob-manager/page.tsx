import { BlobManagerPageClient } from "./BlobManagerPageClient"

export const metadata = {
  title: "Blob Manager - Admin",
  description: "Manage Vercel Blob storage for card images.",
}

export default function BlobManagerPage() {
  return <BlobManagerPageClient />
}
