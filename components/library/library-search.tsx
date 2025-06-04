"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { LibrarySearchFilters } from "@/types/library"

interface LibrarySearchProps {
  onSearch: (filters: LibrarySearchFilters) => void
  loading?: boolean
}

export function LibrarySearch({ onSearch, loading }: LibrarySearchProps) {
  const [query, setQuery] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [fileType, setFileType] = useState<"pdf" | "txt" | "">("")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    "Numerology",
    "Oracle Cards",
    "Tarot",
    "Sacred Geometry",
    "Elements",
    "Spirituality",
    "Divination",
    "Astrology",
  ]

  const handleSearch = () => {
    const filters: LibrarySearchFilters = {
      query: query.trim() || undefined,
      author: author.trim() || undefined,
      category: category || undefined,
      fileType: fileType || undefined,
      isPublic: true, // Only show public documents for now
    }

    onSearch(filters)
  }

  const handleClearFilters = () => {
    setQuery("")
    setAuthor("")
    setCategory("")
    setFileType("")
    onSearch({ isPublic: true })
  }

  const hasActiveFilters = query || author || category || fileType

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by title, author, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg border border-gray-800">
          <div>
            <label className="text-sm font-medium mb-1 block">Author</label>
            <Input placeholder="Filter by author..." value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">File Type</label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as "pdf" | "txt" | "")}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="txt">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Active filters:</span>
          {query && (
            <Badge variant="secondary" className="gap-1">
              Query: {query}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setQuery("")} />
            </Badge>
          )}
          {author && (
            <Badge variant="secondary" className="gap-1">
              Author: {author}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setAuthor("")} />
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="gap-1">
              Category: {category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setCategory("")} />
            </Badge>
          )}
          {fileType && (
            <Badge variant="secondary" className="gap-1">
              Type: {fileType.toUpperCase()}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFileType("")} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
