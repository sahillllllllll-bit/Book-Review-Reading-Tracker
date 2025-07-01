"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, Star, Plus, Search } from "lucide-react"
import { useBooks } from "@/context/BookContext"
import BookCard from "@/components/BookCard"
import StreakTracker from "@/components/StreakTracker"
import WordCloud from "@/components/WordCloud"
import AchievementsSection from "@/components/AchievementsSection"

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

export default function Dashboard() {
  const { allBooks, streakData } = useBooks()

  const currentlyReading = allBooks.filter((book) => book.status === "reading")
  const recentlyCompleted = allBooks.filter((book) => book.status === "completed").slice(0, 3)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="space-y-12"
    >
      {/* Hero Stats Section */}
      <div className="text-center space-y-6 py-12">
        <motion.h2
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back,  <span className="font-semibold"> username</span> !
        </motion.h2>
        <motion.p
          className="text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}element
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {"You're on a " + streakData.current + "-day reading streak 🔥"}
        </motion.p>
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >

          
        <div className="w-full flex justify-center">
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
    <Button
      size="lg"
      className="h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg w-full sm:w-auto"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add New Book
    </Button>

    <Button
      variant="outline"
      size="lg"
      className="h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg w-full sm:w-auto"
    >
      <Search className="h-5 w-5 mr-2" />
      Discover Books
    </Button>
  </div>
</div>


        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
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

      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1  gap-8"> {/* xl:grid-cols-4 */}
        <div className="xl:col-span-3 space-y-8">

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            >
            <StreakTracker />
            <WordCloud />
            <AchievementsSection />

          </motion.div>
            <br />
            <br />

          {/* Currently Reading */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="text-2xl font-bold mb-6">Currently Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentlyReading.slice(0, 2).map((book) => (
                <BookCard key={book.id} book={book} size="large" />
              ))}
            </div>
          </motion.div>

          <br />
            <br />


          {/* Recently Completed */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="text-2xl font-bold mb-6">Recently Completed</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentlyCompleted.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            {/* <WordCloud /> */}
            {/* <StreakTracker /> */}
            
          </motion.div>
        <br />
            <br />

          {/* Recent Activity & Goals */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            >
            {/* <div> */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{'Finished "Atomic Habits"'}</div>
                    <div className="text-xs text-muted-foreground">Added 8 highlights</div>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{'Added 3 highlights to "Dune"'}</div>
                    <div className="text-xs text-muted-foreground">Chapter 15 notes</div>
                  </div>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-4 bg-muted/50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">{'Started "The Midnight Library"'}</div>
                    <div className="text-xs text-muted-foreground">85% complete</div>
                  </div>
                  <span className="text-xs text-muted-foreground">1d ago</span>
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
                    {"You're doing great! 1 more book to reach your weekly goal."}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-base font-medium">
                    <span>Pages This Week</span>
                    <span>245/300 pages</span>
                  </div>
                  <Progress value={82} className="h-3" />
                  <div className="text-sm text-muted-foreground">{"55 pages to go! You're ahead of schedule."}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-base font-medium">
                    <span>Reading Streak</span>
                    <span>{streakData.current} days</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {"Keep it up! You're " + (streakData.longest - streakData.current) + " days away from your record."}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* </div> */}

          </motion.div>

          {/* <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            >
            <StreakTracker />
            <WordCloud />
            <AchievementsSection />

          </motion.div> */}
        </div>
        
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="grid grid-cols-1 gap-16">
            
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
