"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Users, BookOpen, TrendingUp } from "lucide-react"

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

const communityHighlights = [
  {
    id: 1,
    quote: "The secret to getting results that last is to never stop making improvements.",
    book: "Atomic Habits",
    user: "@sarah_reads",
    avatar: "SR",
    likes: 12,
    comments: 3,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    book: "The Power of Habit",
    user: "@bookworm_alex",
    avatar: "BA",
    likes: 24,
    comments: 7,
    timeAgo: "4h ago",
  },
  {
    id: 3,
    quote: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    book: "The Midnight Library",
    user: "@reader_jane",
    avatar: "RJ",
    likes: 18,
    comments: 5,
    timeAgo: "6h ago",
  },
]

const readingGroups = [
  {
    id: 1,
    name: "Sci-Fi Book Club",
    description: "Currently reading: Dune",
    members: 24,
    avatar: "SF",
    status: "active",
    isJoined: true,
  },
  {
    id: 2,
    name: "Self-Help Enthusiasts",
    description: "245 members • Very active",
    members: 245,
    avatar: "SH",
    status: "very-active",
    isJoined: false,
  },
  {
    id: 3,
    name: "Fiction Lovers",
    description: "156 members • Weekly discussions",
    members: 156,
    avatar: "FL",
    status: "active",
    isJoined: false,
  },
  {
    id: 4,
    name: "Mystery & Thriller",
    description: "89 members • Monthly picks",
    members: 89,
    avatar: "MT",
    status: "active",
    isJoined: true,
  },
]

const trendingBooks = [
  { title: "Fourth Wing", author: "Rebecca Yarros", trend: "+45%" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", trend: "+32%" },
  { title: "The Atlas Six", author: "Olivie Blake", trend: "+28%" },
  { title: "Project Hail Mary", author: "Andy Weir", trend: "+25%" },
]

export default function Social() {
  const [activeTab, setActiveTab] = useState("highlights")

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
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold">Social Reading</h2>
        <p className="text-xl text-muted-foreground">Connect with fellow book lovers and discover new reads</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "highlights"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Community Highlights
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "groups"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reading Groups
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "trending"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Trending
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {activeTab === "highlights" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {communityHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{highlight.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{highlight.user}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{highlight.timeAgo}</span>
                        </div>
                        <div className="border-l-4 border-primary pl-6 py-2 mb-4">
                          <p className="text-lg italic mb-2">"{highlight.quote}"</p>
                          <p className="text-sm text-muted-foreground">From "{highlight.book}"</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <Button variant="ghost" size="sm" className="h-8 px-3">
                            <Heart className="h-4 w-4 mr-1" />
                            {highlight.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-3">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {highlight.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-3">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "groups" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readingGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{group.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{group.name}</h3>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                          </div>
                        </div>
                        {group.isJoined ? <Badge variant="default">Joined</Badge> : <Button size="sm">Join</Button>}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              group.status === "very-active" ? "bg-green-500" : "bg-blue-500"
                            }`}
                          />
                          <span className="capitalize">{group.status.replace("-", " ")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "trending" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Trending Books This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingBooks.map((book, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {book.trend}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Popular Genres
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { genre: "Fantasy", percentage: 85 },
                    { genre: "Romance", percentage: 72 },
                    { genre: "Sci-Fi", percentage: 68 },
                    { genre: "Mystery", percentage: 54 },
                  ].map((item, index) => (
                    <motion.div
                      key={item.genre}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex justify-between text-sm">
                        <span>{item.genre}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.2 + 0.1 * index, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
