"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Bookmark,
  Share2,
  Star,
  Edit,
  Trash2,
} from "lucide-react"
import { useBooks } from "@/context/BookContext"

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

export default function Reviews() {
  const { allBooks } = useBooks()
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [viewMode, setViewMode] = useState("reader")

  const reviewedBooks = allBooks.filter((book) => book.review?.length > 0)
  const currentBook = reviewedBooks[currentReviewIndex]

  const nextReview = () => setCurrentReviewIndex((i) => (i + 1) % reviewedBooks.length)
  const prevReview = () => setCurrentReviewIndex((i) => (i - 1 + reviewedBooks.length) % reviewedBooks.length)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="text-4xl font-bold mb-2">My Reviews</h2>
          <p className="text-xl text-muted-foreground">{reviewedBooks.length} books reviewed</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Button variant={viewMode === "reader" ? "default" : "outline"} onClick={() => setViewMode("reader")}>
            Step Reader
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            All Reviews
          </Button>
        </div>
      </motion.div>

      {viewMode === "reader" && currentBook ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="w-full max-w-4xl mx-auto px-4 sm:px-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="text-2xl">Step-by-Step Review Reader</CardTitle>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="lg" onClick={prevReview} disabled={reviewedBooks.length <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-base font-medium">
                    Review {currentReviewIndex + 1} of {reviewedBooks.length}
                  </span>
                  <Button variant="outline" size="lg" onClick={nextReview} disabled={reviewedBooks.length <= 1}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                key={currentBook.id}
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Book Info */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-muted/30 rounded-lg">
                  <img
                    src={currentBook.cover || "/placeholder.svg"}
                    alt={currentBook.title}
                    className="w-20 h-28 sm:w-24 sm:h-36 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{currentBook.title}</h3>
                    <p className="text-lg text-muted-foreground mb-3">by {currentBook.author}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(currentBook.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 font-medium">{currentBook.rating}</span>
                      </div>
                      <Badge variant="secondary">{currentBook.genre}</Badge>
                      <Badge variant="outline">{currentBook.status === "completed" ? "Finished" : "Reading"}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentBook.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review */}
                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">My Review</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">{currentBook.review}</p>
                  {currentBook.dateCompleted && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Completed on {new Date(currentBook.dateCompleted).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Play className="h-4 w-4 mr-2" /> Auto-play Reviews
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Edit className="h-4 w-4 mr-2" /> Edit Review
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Share2 className="h-4 w-4 mr-2" /> Share Review
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Bookmark className="h-4 w-4 mr-2" /> Save Progress
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {reviewedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-20 h-28 sm:h-30 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between mb-3 gap-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{book.title}</h3>
                          <p className="text-muted-foreground mb-2">by {book.author}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-1 text-sm">{book.rating}</span>
                            </div>
                            <Badge variant="secondary">{book.genre}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">{book.review}</p>
                      <div className="flex flex-wrap justify-between">
                        <div className="flex flex-wrap gap-2">
                          {book.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                          ))}
                        </div>
                        {book.dateCompleted && (
                          <span className="text-sm text-muted-foreground">{new Date(book.dateCompleted).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {reviewedBooks.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Edit className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-6">Start writing reviews for your completed books!</p>
          <Button size="lg"><Edit className="h-5 w-5 mr-2" /> Write Your First Review</Button>
        </motion.div>
      )}
    </motion.div>
  )
}
