"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Smile, ThumbsUp, Star, Quote } from "lucide-react"
import { useBooks } from "@/context/BookContext"

export default function BookCard({ book, size = "normal" }) {
  const { addReaction } = useBooks()

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className={`group hover:shadow-xl transition-all duration-300 relative overflow-hidden ${size === "large" ? "h-auto" : ""}`}
      >
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1 bg-background/90 backdrop-blur-sm rounded-full p-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => addReaction(book.id, "heart")}>
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => addReaction(book.id, "smile")}>
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => addReaction(book.id, "thumbsUp")}>
              <ThumbsUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className={`${size === "large" ? "p-6" : "p-4"}`}>
          <div className="relative mb-4">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              className={`w-full object-cover rounded-lg ${size === "large" ? "h-64" : "h-48"}`}
            />
            <Badge variant={book.status === "completed" ? "default" : "secondary"} className="absolute bottom-3 left-3">
              {book.status === "completed" ? "Finished" : `${book.progress}%`}
            </Badge>
            {book.status === "reading" && (
              <Badge variant="outline" className="absolute bottom-3 right-3 bg-background/90">
                {book.currentPage}/{book.pages}
              </Badge>
            )}
          </div>

          <h3 className={`font-semibold mb-2 line-clamp-2 ${size === "large" ? "text-lg" : "text-sm"}`}>
            {book.title}
          </h3>
          <p className={`text-muted-foreground mb-3 ${size === "large" ? "text-sm" : "text-xs"}`}>{book.author}</p>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`${size === "large" ? "h-4 w-4" : "h-3 w-3"} ${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className={`text-muted-foreground ml-2 ${size === "large" ? "text-sm" : "text-xs"}`}>
              {book.rating}
            </span>
          </div>

          {book.status === "reading" && <Progress value={book.progress} className="mb-3 h-2" />}

          <div
            className={`flex items-center justify-between text-muted-foreground ${size === "large" ? "text-sm" : "text-xs"}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Quote className={`${size === "large" ? "h-4 w-4" : "h-3 w-3"}`} />
                <span>{book.highlights}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className={`${size === "large" ? "h-4 w-4" : "h-3 w-3"}`} />
                <span>{book.reactions.heart}</span>
              </div>
            </div>
            <span>{book.lastRead}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
