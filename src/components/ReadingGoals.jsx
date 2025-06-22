import { streakData } from "../data/mockData"

const ReadingGoals = () => {
  const goals = [
    {
      name: "Weekly Goal",
      current: 2,
      target: 3,
      progress: 66,
      description: "You're doing great! 1 more book to reach your weekly goal.",
    },
    {
      name: "Pages This Week",
      current: 245,
      target: 300,
      progress: 82,
      description: "55 pages to go! You're ahead of schedule.",
    },
    {
      name: "Monthly Challenge",
      current: 8,
      target: 12,
      progress: 67,
      description: "4 more books to complete this month's challenge.",
    },
    {
      name: "Reading Streak",
      current: streakData.current,
      target: streakData.longest,
      progress: 75,
      description: `Keep it up! You're ${streakData.longest - streakData.current} days away from your record.`,
    },
  ]

  return (
    <div className="card reading-goals">
      <div className="card-header">
        <h3>Reading Goals & Progress</h3>
      </div>
      <div className="card-content">
        <div className="goals-list">
          {goals.map((goal, i) => (
            <div key={i} className="goal-item">
              <div className="goal-header">
                <span className="goal-name">{goal.name}</span>
                <span className="goal-stats">
                  {goal.current}/{goal.target}{" "}
                  {goal.name.includes("Pages") ? "pages" : goal.name.includes("Streak") ? "days" : "books"}
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <div className="goal-description">{goal.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReadingGoals
