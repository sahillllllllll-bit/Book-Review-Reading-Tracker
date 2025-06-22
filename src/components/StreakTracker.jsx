import { streakData } from "../data/mockData"

const StreakTracker = () => {
  return (
    <div className="card streak-tracker">
      <div className="card-header">
        <h3>🔥 Reading Streak</h3>
      </div>
      <div className="card-content">
        <div className="streak-display">
          <div className="streak-number">{streakData.current}</div>
          <div className="streak-label">days current streak</div>
          <div className="streak-longest">Longest: {streakData.longest} days</div>
        </div>

        <div className="week-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="day-column">
              <div className="day-label">{day}</div>
              <div className={`day-indicator ${streakData.thisWeek[i] ? "active" : ""}`}>
                {streakData.thisWeek[i] ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="goals">
          <div className="goal">
            <div className="goal-header">
              <span>Monthly Goal</span>
              <span>
                {streakData.monthlyProgress}/{streakData.monthlyGoal} books
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(streakData.monthlyProgress / streakData.monthlyGoal) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="goal">
            <div className="goal-header">
              <span>Yearly Goal</span>
              <span>
                {streakData.yearlyProgress}/{streakData.yearlyGoal} books
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(streakData.yearlyProgress / streakData.yearlyGoal) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreakTracker
