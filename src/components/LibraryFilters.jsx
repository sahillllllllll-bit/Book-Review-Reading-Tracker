"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBooks } from "@/context/BookContext"

export default function LibraryFilters() {
  const { allBooks, filterStatus, setFilterStatus, sortBy, setSortBy } = useBooks()

  const getFilterCount = (status) => {
    if (status === "all") return allBooks.length
    if (status === "wishlist") return 0 // Mock empty wishlist
    return allBooks.filter((book) => book.status === status).length
  }

  return (
    <div className="space-y-6">
      {/* Status Filter Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg max-w-md">
        {[
          { value: "all", label: "All" },
          { value: "reading", label: "Reading" },
          { value: "completed", label: "Completed" },
          { value: "wishlist", label: "Wishlist" },
        ].map((filter) => (
          <Button
            key={filter.value}
            variant={filterStatus === filter.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterStatus(filter.value)}
            className="flex-1"
          >
            {filter.label} ({getFilterCount(filter.value)})
          </Button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="author">Author (A-Z)</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
