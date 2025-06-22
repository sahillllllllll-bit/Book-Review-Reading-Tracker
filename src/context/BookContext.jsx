"use client"
import midnightCover from '../assets/midnight.jpg';
import duneCover from '../assets/dune.jpg';
import atomicCover from '../assets/atomic.jpg';
import sevenCover from '../assets/seven.webp';
import hailCover from '../assets/hail.jpg';
import educatedCover from '../assets/educated.jpg';








import { createContext, useContext, useState } from "react"

const BookContext = createContext()

// Mock data
const initialBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: midnightCover,
    rating: 4.5,
    progress: 85,
    status: "reading",
    genre: "Fiction",
    reactions: { heart: 12, smile: 8, thumbsUp: 15 },
    highlights: 3,
    lastRead: "2 hours ago",
    pages: 288,
    currentPage: 245,
    dateStarted: "2024-01-15",
    description: "A magical library between life and death where every book is a different life you could have lived.",
    review:
      "This book completely changed my perspective on life choices and regret. Haig's writing is both philosophical and accessible.",
    tags: ["philosophical", "life-changing", "emotional"],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: atomicCover,
    rating: 5,
    progress: 100,
    status: "completed",
    genre: "Self-Help",
    reactions: { heart: 24, smile: 12, thumbsUp: 31 },
    highlights: 8,
    lastRead: "1 day ago",
    pages: 320,
    currentPage: 320,
    dateStarted: "2024-01-01",
    dateCompleted: "2024-01-28",
    description: "Tiny changes, remarkable results. An easy & proven way to build good habits & break bad ones.",
    review: "The most practical book on habit formation I've ever read. The 1% better concept is revolutionary.",
    tags: ["productivity", "habits", "self-improvement"],
  },
    {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    cover:educatedCover,
    rating: 4.6,
    progress: 100,
    status: "completed",
    genre: "Memoir",
    reactions: { heart: 41, smile: 8, thumbsUp: 52 },
    highlights: 15,
    lastRead: "2 weeks ago",
    pages: 334,
    currentPage: 334,
    dateStarted: "2023-12-01",
    description: "A memoir about education, family, and the struggle between loyalty and independence.",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: duneCover,
    rating: 4,
    progress: 45,
    status: "reading",
    genre: "Sci-Fi",
    reactions: { heart: 18, smile: 6, thumbsUp: 22 },
    highlights: 5,
    lastRead: "3 days ago",
    pages: 688,
    currentPage: 310,
    dateStarted: "2024-01-20",
    description: "Epic space opera set on the desert planet Arrakis, following Paul Atreides' journey.",
    review: "Complex world-building that requires patience but rewards with incredible depth.",
    tags: ["epic", "complex", "world-building"],
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: sevenCover,
    rating: 4.8,
    progress: 100,
    status: "completed",
    genre: "Romance",
    reactions: { heart: 35, smile: 18, thumbsUp: 42 },
    highlights: 12,
    lastRead: "1 week ago",
    pages: 400,
    currentPage: 400,
    dateStarted: "2023-12-15",
    dateCompleted: "2024-01-05",
    description: "Reclusive Hollywood icon reveals her scandalous secrets to an unknown journalist.",
    review: "Absolutely captivating! The plot twists kept me reading until 3 AM. Evelyn is an unforgettable character.",
    tags: ["captivating", "plot-twists", "character-driven"],
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: hailCover,
    rating: 4.7,
    progress: 30,
    status: "reading",
    genre: "Sci-Fi",
    reactions: { heart: 28, smile: 15, thumbsUp: 33 },
    highlights: 2,
    lastRead: "5 days ago",
    pages: 496,
    currentPage: 149,
    dateStarted: "2024-02-01",
    description: "A lone astronaut must save humanity in this thrilling space adventure.",
    review: "Weir's signature blend of science and humor is perfect. The mystery unfolds brilliantly.",
    tags: ["science", "humor", "mystery"],
  },
]

const streakData = {
  current: 15,
  longest: 28,
  thisWeek: [true, true, false, true, true, true, false],
  monthlyGoal: 12,
  monthlyProgress: 8,
  yearlyGoal: 50,
  yearlyProgress: 28,
}

const genres = [
  { name: "Fiction", count: 18, size: 32 },
  { name: "Sci-Fi", count: 12, size: 26 },
  { name: "Self-Help", count: 15, size: 28 },
  { name: "Mystery", count: 8, size: 20 },
  { name: "Romance", count: 11, size: 23 },
  { name: "Biography", count: 6, size: 18 },
  { name: "Fantasy", count: 14, size: 27 },
  { name: "History", count: 9, size: 21 },
  { name: "Memoir", count: 7, size: 19 },
  { name: "Thriller", count: 10, size: 22 },
]

const achievements = [
  { name: "Speed Reader", description: "Read 5 books in a month", icon: "Zap", unlocked: true },
  { name: "Genre Explorer", description: "Read books from 10 different genres", icon: "Globe", unlocked: true },
  { name: "Consistent Reader", description: "Maintain a 30-day reading streak", icon: "Calendar", unlocked: false },
  { name: "Social Butterfly", description: "Get 100 reactions on your reviews", icon: "Users", unlocked: true },
]

export function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const addReaction = (bookId, reactionType) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              reactions: {
                ...book.reactions,
                [reactionType]: book.reactions[reactionType] + 1,
              },
            }
          : book,
      ),
    )
  }

  const updateBookProgress = (bookId, progress) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              progress,
              status: progress === 100 ? "completed" : "reading",
              dateCompleted: progress === 100 ? new Date().toISOString().split("T")[0] : undefined,
            }
          : book,
      ),
    )
  }

  const addBook = (newBook) => {
    const book = {
      ...newBook,
      id: Date.now(),
      reactions: { heart: 0, smile: 0, thumbsUp: 0 },
      highlights: 0,
      dateStarted: new Date().toISOString().split("T")[0],
    }
    setBooks((prevBooks) => [...prevBooks, book])
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || book.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "author":
        return a.author.localeCompare(b.author)
      case "rating":
        return b.rating - a.rating
      case "recent":
      default:
        return new Date(b.dateStarted) - new Date(a.dateStarted)
    }
  })

  const value = {
    books: sortedBooks,
    allBooks: books,
    selectedBook,
    setSelectedBook,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    addReaction,
    updateBookProgress,
    addBook,
    streakData,
    genres,
    achievements,
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}
