import { achievements } from "../data/mockData"

const AchievementsSection = () => {
  return (
    <div className="card achievements">
      <div className="card-header">
        <h3>🏆 Achievements</h3>
      </div>
      <div className="card-content">
        <div className="achievements-grid">
          {achievements.map((achievement, i) => (
            <div key={i} className={`achievement ${achievement.unlocked ? "unlocked" : "locked"}`}>
              <div className="achievement-icon">{achievement.unlocked ? "✅" : "🔒"}</div>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-description">{achievement.description}</div>
              </div>
              {achievement.unlocked && <div className="achievement-badge">Unlocked</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AchievementsSection
