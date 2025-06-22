"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Filter, Plus, BookOpen } from "lucide-react"
import { useBooks } from "@/context/BookContext"
import BookCard from "@/components/BookCard"
import LibraryFilters from "@/components/LibraryFilters"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

export default function Library() {
  const { books, allBooks, filterStatus } = useBooks()

  const getFilteredBooks = (status) => {
    if (status === "all") return allBooks
    if (status === "wishlist") return [] // Mock empty wishlist
    return allBooks.filter((book) => book.status === status)
  }

  const currentBooks = getFilteredBooks(filterStatus)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-10"
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >


       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 w-full">
  {/* Left: Title + Count */}
  <div>
    <h2 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">My Library</h2>
    <p className="text-base sm:text-xl text-muted-foreground">
      {allBooks.length} books in your collection
    </p>
  </div>

  {/* Right: Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
    <Button
      variant="outline"
      size="lg"
      className="h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base w-full sm:w-auto"
    >
      <Filter className="h-5 w-5 mr-2" />
      Filter & Sort
    </Button>

    <Button
      size="lg"
      className="h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base w-full sm:w-auto"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add Book
    </Button>
  </div>
</div>


      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <LibraryFilters />
      </motion.div>

      {/* Books Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {currentBooks.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8"
            layout
          >
            {currentBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                layout
              >
                <BookCard book={book} size={book.status === "reading" ? "large" : "normal"} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              {filterStatus === "wishlist" ? "No books in wishlist yet" : `No ${filterStatus} books`}
            </h3>
            <p className="text-muted-foreground mb-6">
              {filterStatus === "wishlist"
                ? "Start adding books you want to read!"
                : "Try adjusting your filters or add some books to your library."}
            </p>
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              {filterStatus === "wishlist" ? "Add to Wishlist" : "Add Book"}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
