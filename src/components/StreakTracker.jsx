import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame } from "lucide-react"
import { useBooks } from "@/context/BookContext"

export default function StreakTracker() {
  const { streakData } = useBooks()

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          Reading Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500 mb-1">{streakData.current}</div>
          <div className="text-sm text-muted-foreground">days current streak</div>
          <div className="text-xs text-muted-foreground mt-1">Longest: {streakData.longest} days</div>
        </div>

        <div className="flex justify-center gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{day}</div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  streakData.thisWeek[i] ? "bg-orange-500 text-white" : "bg-muted"
                }`}
              >
                {streakData.thisWeek[i] ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Monthly Goal</span>
              <span>
                {streakData.monthlyProgress}/{streakData.monthlyGoal} books
              </span>
            </div>
            <Progress value={(streakData.monthlyProgress / streakData.monthlyGoal) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
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
}
