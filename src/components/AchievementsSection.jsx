import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Zap, Globe, Calendar, Users } from "lucide-react"
import { useBooks } from "@/context/BookContext"

const iconMap = {
  Zap,
  Globe,
  Calendar,
  Users,
}

export default function AchievementsSection() {
  const { achievements } = useBooks()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, i) => {
            const IconComponent = iconMap[achievement.icon]
            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.unlocked ? "bg-primary/5 border-primary/20" : "bg-muted/50"
                }`}
              >
                <IconComponent
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
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
