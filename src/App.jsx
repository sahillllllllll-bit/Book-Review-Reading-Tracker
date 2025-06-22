"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Flame,
  Star,
  Heart,
  Smile,
  ThumbsUp,
  MessageCircle,
  Search,
  Filter,
  Moon,
  Sun,
  Trophy,
  Target,
  Clock,
  Quote,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Calendar,
  Award,
  Zap,
  Globe,
  Share2,
  Plus,
} from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

// Mock data - expanded
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/placeholder.svg?height=350&width=250",
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
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/placeholder.svg?height=350&width=250",
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
    description: "Tiny changes, remarkable results. An easy & proven way to build good habits & break bad ones.",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "/placeholder.svg?height=350&width=250",
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
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "/placeholder.svg?height=350&width=250",
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
    description: "Reclusive Hollywood icon reveals her scandalous secrets to an unknown journalist.",
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg?height=350&width=250",
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
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    cover: "/placeholder.svg?height=350&width=250",
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
    id: 7,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.3,
    progress: 100,
    status: "completed",
    genre: "Thriller",
    reactions: { heart: 22, smile: 5, thumbsUp: 28 },
    highlights: 7,
    lastRead: "3 weeks ago",
    pages: 336,
    currentPage: 336,
    dateStarted: "2023-11-15",
    description: "A psychotherapist becomes obsessed with treating a woman who refuses to speak.",
  },
  {
    id: 8,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.4,
    progress: 75,
    status: "reading",
    genre: "Fiction",
    reactions: { heart: 19, smile: 11, thumbsUp: 25 },
    highlights: 4,
    lastRead: "1 day ago",
    pages: 384,
    currentPage: 288,
    dateStarted: "2024-01-25",
    description: "A coming-of-age mystery set in the marshlands of North Carolina.",
  },
  {
    id: 9,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.5,
    progress: 60,
    status: "reading",
    genre: "History",
    reactions: { heart: 33, smile: 14, thumbsUp: 45 },
    highlights: 9,
    lastRead: "4 days ago",
    pages: 512,
    currentPage: 307,
    dateStarted: "2024-01-10",
    description: "A brief history of humankind from the Stone Age to the present.",
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.2,
    progress: 100,
    status: "completed",
    genre: "Philosophy",
    reactions: { heart: 27, smile: 16, thumbsUp: 31 },
    highlights: 11,
    lastRead: "1 month ago",
    pages: 208,
    currentPage: 208,
    dateStarted: "2023-11-01",
    description: "A philosophical tale about following your dreams and listening to your heart.",
  },
  {
    id: 11,
    title: "Becoming",
    author: "Michelle Obama",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.7,
    progress: 100,
    status: "completed",
    genre: "Biography",
    reactions: { heart: 48, smile: 22, thumbsUp: 61 },
    highlights: 18,
    lastRead: "2 months ago",
    pages: 448,
    currentPage: 448,
    dateStarted: "2023-10-15",
    description: "An intimate memoir by the former First Lady of the United States.",
  },
  {
    id: 12,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.6,
    progress: 90,
    status: "reading",
    genre: "Fantasy",
    reactions: { heart: 31, smile: 19, thumbsUp: 38 },
    highlights: 6,
    lastRead: "6 days ago",
    pages: 304,
    currentPage: 274,
    dateStarted: "2024-01-05",
    description: "Bilbo Baggins' unexpected journey to the Lonely Mountain with thirteen dwarves.",
  },
  {
    id: 13,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.4,
    progress: 100,
    status: "completed",
    genre: "Finance",
    reactions: { heart: 26, smile: 9, thumbsUp: 34 },
    highlights: 13,
    lastRead: "3 weeks ago",
    pages: 256,
    currentPage: 256,
    dateStarted: "2023-12-20",
    description: "Timeless lessons on wealth, greed, and happiness from behavioral psychology.",
  },
  {
    id: 14,
    title: "Circe",
    author: "Madeline Miller",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.5,
    progress: 40,
    status: "reading",
    genre: "Mythology",
    reactions: { heart: 23, smile: 12, thumbsUp: 29 },
    highlights: 3,
    lastRead: "1 week ago",
    pages: 416,
    currentPage: 166,
    dateStarted: "2024-02-05",
    description: "The story of the Greek goddess Circe, from her childhood to her encounters with mortals.",
  },
  {
    id: 15,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.1,
    progress: 100,
    status: "completed",
    genre: "Self-Help",
    reactions: { heart: 21, smile: 17, thumbsUp: 26 },
    highlights: 8,
    lastRead: "1 month ago",
    pages: 224,
    currentPage: 224,
    dateStarted: "2023-11-20",
    description: "A counterintuitive approach to living a good life through accepting limitations.",
  },
  {
    id: 16,
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.3,
    progress: 25,
    status: "reading",
    genre: "Mystery",
    reactions: { heart: 15, smile: 8, thumbsUp: 19 },
    highlights: 1,
    lastRead: "2 weeks ago",
    pages: 368,
    currentPage: 92,
    dateStarted: "2024-02-10",
    description: "Four unlikely friends meet weekly to investigate cold cases in their retirement village.",
  },
  {
    id: 17,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.0,
    progress: 100,
    status: "completed",
    genre: "Literary Fiction",
    reactions: { heart: 18, smile: 6, thumbsUp: 22 },
    highlights: 9,
    lastRead: "6 weeks ago",
    pages: 320,
    currentPage: 320,
    dateStarted: "2023-10-01",
    description: "An artificial friend observes the world with wonder and growing understanding.",
  },
  {
    id: 18,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover: "/placeholder.svg?height=350&width=250",
    rating: 4.2,
    progress: 70,
    status: "reading",
    genre: "Spirituality",
    reactions: { heart: 29, smile: 13, thumbsUp: 35 },
    highlights: 12,
    lastRead: "3 days ago",
    pages: 236,
    currentPage: 165,
    dateStarted: "2024-01-30",
    description: "A guide to spiritual enlightenment through present-moment awareness.",
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
  { name: "Philosophy", count: 5, size: 17 },
  { name: "Finance", count: 4, size: 16 },
  { name: "Mythology", count: 3, size: 15 },
  { name: "Literary Fiction", count: 6, size: 18 },
  { name: "Spirituality", count: 4, size: 16 },
]

const achievements = [
  { name: "Speed Reader", description: "Read 5 books in a month", icon: Zap, unlocked: true },
  { name: "Genre Explorer", description: "Read books from 10 different genres", icon: Globe, unlocked: true },
  { name: "Consistent Reader", description: "Maintain a 30-day reading streak", icon: Calendar, unlocked: false },
  { name: "Social Butterfly", description: "Get 100 reactions on your reviews", icon: Users, unlocked: true },
]

export default function BookTracker() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [reviewStep, setReviewStep] = useState(0)
  const [showWordCloud, setShowWordCloud] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [libraryTab, setLibraryTab] = useState("all")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const addReaction = (bookId, reactionType) => {
    console.log(`Added ${reactionType} reaction to book ${bookId}`)
  }

  const BookCard = ({ book, size = "normal" }) => (
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

        <h3 className={`font-semibold mb-2 line-clamp-2 ${size === "large" ? "text-lg" : "text-sm"}`}>{book.title}</h3>
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
  )

  const StreakTracker = () => (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-6 w-6 text-orange-500" />
          Reading Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-500 mb-2">{streakData.current}</div>
          <div className="text-sm text-muted-foreground">days current streak</div>
          <div className="text-xs text-muted-foreground mt-1">Longest: {streakData.longest} days</div>
        </div>

        <div className="flex justify-center gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-muted-foreground mb-2">{day}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  streakData.thisWeek[i] ? "bg-orange-500 text-white" : "bg-muted"
                }`}
              >
                {streakData.thisWeek[i] ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Monthly Goal</span>
              <span>
                {streakData.monthlyProgress}/{streakData.monthlyGoal} books
              </span>
            </div>
            <Progress value={(streakData.monthlyProgress / streakData.monthlyGoal) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Yearly Goal</span>
              <span>
                {streakData.yearlyProgress}/{streakData.yearlyGoal} books
              </span>
            </div>
            <Progress value={(streakData.yearlyProgress / streakData.yearlyGoal) * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const WordCloud = () => (
    <Card className="col-span-full">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Genre Explorer</CardTitle>
        <p className="text-muted-foreground">Discover your reading patterns across different genres</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-center items-center min-h-[350px] p-8">
          {genres.map((genre, i) => (
            <Button
              key={genre.name}
              variant="ghost"
              className={`hover:scale-110 transition-transform duration-300 animate-pulse hover:bg-primary/10 px-6 py-3`}
              style={{
                fontSize: `${genre.size}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "2s",
              }}
            >
              {genre.name}
              <Badge variant="secondary" className="ml-3 text-sm">
                {genre.count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const AchievementsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                achievement.unlocked ? "bg-primary/5 border-primary/20" : "bg-muted/50"
              }`}
            >
              <achievement.icon
                className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
              />
              <div>
                <div className={`font-medium text-sm ${achievement.unlocked ? "" : "text-muted-foreground"}`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              {achievement.unlocked && (
                <Badge variant="secondary" className="ml-auto">
                  Unlocked
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Made bigger */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">BookTracker</h1>
              <Badge variant="secondary" className="ml-2">
                Pro
              </Badge>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search books, authors, genres..." className="pl-12 w-80 h-12" />
              </div>

              <Button variant="ghost" size="icon" className="h-12 w-12" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button className="h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>

              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Expanded */}
      <main className="container mx-auto px-8 py-12 max-w-[1600px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <TabsList className="grid w-full grid-cols-4 h-16 text-lg">
            <TabsTrigger value="dashboard" className="text-lg font-medium">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="library" className="text-lg font-medium">
              My Library
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg font-medium">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="social" className="text-lg font-medium">
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-12">
            {/* Hero Stats Section - New */}
            <div className="text-center space-y-6 py-12">
              <h2 className="text-5xl font-bold">Welcome back, John!</h2>
              <p className="text-2xl text-muted-foreground">You're on a {streakData.current}-day reading streak 🔥</p>
              <div className="flex justify-center gap-6 mt-8">
                <Button size="lg" className="h-14 px-8 text-lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Book
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  <Search className="h-5 w-5 mr-2" />
                  Discover Books
                </Button>
              </div>
            </div>

            {/* Stats Cards - Made bigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-yellow-500/10 rounded-full">
                      <Trophy className="h-10 w-10 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold">35</div>
                      <div className="text-base text-muted-foreground">Books Read This Year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-500/10 rounded-full">
                      <Target className="h-10 w-10 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold">70%</div>
                      <div className="text-base text-muted-foreground">Year Goal Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-green-500/10 rounded-full">
                      <Clock className="h-10 w-10 text-green-500" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold">248h</div>
                      <div className="text-base text-muted-foreground">Total Reading Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-purple-500/10 rounded-full">
                      <Star className="h-10 w-10 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold">4.3</div>
                      <div className="text-base text-muted-foreground">Average Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid - Expanded */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3 space-y-8">
                {/* Currently Reading - Larger cards */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Currently Reading</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {books
                      .filter((book) => book.status === "reading")
                      .slice(0, 2)
                      .map((book) => (
                        <BookCard key={book.id} book={book} size="large" />
                      ))}
                  </div>
                </div>

                {/* Recently Completed */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Recently Completed</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {books
                      .filter((book) => book.status === "completed")
                      .slice(0, 3)
                      .map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                  </div>
                </div>

                <WordCloud />

                {/* Recent Activity & Goals Section - Moved from sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">Finished "Atomic Habits"</div>
                          <div className="text-xs text-muted-foreground">Added 8 highlights</div>
                        </div>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">Added 3 highlights to "Dune"</div>
                          <div className="text-xs text-muted-foreground">Chapter 15 notes</div>
                        </div>
                        <span className="text-xs text-muted-foreground">5h ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">Started "The Midnight Library"</div>
                          <div className="text-xs text-muted-foreground">85% complete</div>
                        </div>
                        <span className="text-xs text-muted-foreground">1d ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">Joined "Sci-Fi Book Club"</div>
                          <div className="text-xs text-muted-foreground">24 active members</div>
                        </div>
                        <span className="text-xs text-muted-foreground">2d ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">Rated "The Seven Husbands of Evelyn Hugo"</div>
                          <div className="text-xs text-muted-foreground">5 stars • Loved it!</div>
                        </div>
                        <span className="text-xs text-muted-foreground">3d ago</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Reading Goals & Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-base font-medium">
                          <span>Weekly Goal</span>
                          <span>2/3 books</span>
                        </div>
                        <Progress value={66} className="h-3" />
                        <div className="text-sm text-muted-foreground">
                          You're doing great! 1 more book to reach your weekly goal.
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-base font-medium">
                          <span>Pages This Week</span>
                          <span>245/300 pages</span>
                        </div>
                        <Progress value={82} className="h-3" />
                        <div className="text-sm text-muted-foreground">55 pages to go! You're ahead of schedule.</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-base font-medium">
                          <span>Monthly Challenge</span>
                          <span>8/12 books</span>
                        </div>
                        <Progress value={67} className="h-3" />
                        <div className="text-sm text-muted-foreground">
                          4 more books to complete this month's challenge.
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-base font-medium">
                          <span>Reading Streak</span>
                          <span>{streakData.current} days</span>
                        </div>
                        <Progress value={75} className="h-3" />
                        <div className="text-sm text-muted-foreground">
                          Keep it up! You're {streakData.longest - streakData.current} days away from your record.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-8">
                <StreakTracker />
                <AchievementsSection />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">My Library</h2>
                <p className="text-xl text-muted-foreground">{books.length} books in your collection</p>
              </div>
              <div className="flex items-center gap-6">
                <Button variant="outline" size="lg" className="h-14 px-6">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter & Sort
                </Button>
                <Button size="lg" className="h-14 px-6">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Book
                </Button>
              </div>
            </div>

            {/* Reading Status Tabs */}
            <Tabs value={libraryTab} onValueChange={setLibraryTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-md h-12">
                <TabsTrigger value="all">All ({books.length})</TabsTrigger>
                <TabsTrigger value="reading">
                  Reading ({books.filter((b) => b.status === "reading").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({books.filter((b) => b.status === "completed").length})
                </TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist (12)</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reading">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {books
                    .filter((book) => book.status === "reading")
                    .map((book) => (
                      <BookCard key={book.id} book={book} size="large" />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                  {books
                    .filter((book) => book.status === "completed")
                    .map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="wishlist">
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">No books in wishlist yet</h3>
                  <p className="text-muted-foreground mb-6">Start adding books you want to read!</p>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Step-by-Step Review Reader</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Review: "Atomic Habits" by James Clear</h3>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="lg">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-base font-medium">Step 1 of 5</span>
                      <Button variant="outline" size="lg">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">Initial Thoughts</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      This book completely changed my perspective on habit formation. Clear's approach to breaking down
                      complex behavioral changes into simple, actionable steps is brilliant. The four laws of behavior
                      change provide a practical framework that anyone can implement.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button size="lg">
                      <Play className="h-4 w-4 mr-2" />
                      Auto-play Review
                    </Button>
                    <Button variant="outline" size="lg">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Progress
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Community Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-l-4 border-primary pl-6 py-4">
                    <p className="text-base italic mb-3">
                      "The secret to getting results that last is to never stop making improvements."
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>From "Atomic Habits" • @sarah_reads</span>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <Heart className="h-4 w-4 mr-1" />
                          12
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <MessageCircle className="h-4 w-4 mr-1" />3
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-primary pl-6 py-4">
                    <p className="text-base italic mb-3">
                      "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>From "The Power of Habit" • @bookworm_alex</span>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <Heart className="h-4 w-4 mr-1" />
                          24
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <MessageCircle className="h-4 w-4 mr-1" />7
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Reading Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>SF</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Sci-Fi Book Club</div>
                          <div className="text-sm text-muted-foreground">Currently reading: Dune • 24 members</div>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>SH</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Self-Help Enthusiasts</div>
                          <div className="text-sm text-muted-foreground">245 members • Very active</div>
                        </div>
                      </div>
                      <Button size="lg" variant="outline">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>FC</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">Fiction Lovers</div>
                          <div className="text-sm text-muted-foreground">156 members • Weekly discussions</div>
                        </div>
                      </div>
                      <Button size="lg" variant="outline">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
