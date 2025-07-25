import LibraryClientPage from "./LibraryClientPage"
import { getLibraryResources } from "@/lib/services/library-service"

export const metadata = {
  title: "Library",
  description: "Explore a collection of resources to enhance your understanding.",
}

export default async function LibraryPage() {
  const initialResources = await getLibraryResources()

  return <LibraryClientPage initialResources={initialResources} />
}
