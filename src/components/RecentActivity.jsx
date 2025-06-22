const RecentActivity = () => {
  const activities = [
    {
      type: "completed",
      text: 'Finished "Atomic Habits"',
      detail: "Added 8 highlights",
      time: "2h ago",
      color: "green",
    },
    {
      type: "highlight",
      text: 'Added 3 highlights to "Dune"',
      detail: "Chapter 15 notes",
      time: "5h ago",
      color: "blue",
    },
    {
      type: "started",
      text: 'Started "The Midnight Library"',
      detail: "85% complete",
      time: "1d ago",
      color: "purple",
    },
    { type: "joined", text: 'Joined "Sci-Fi Book Club"', detail: "24 active members", time: "2d ago", color: "orange" },
    {
      type: "rated",
      text: 'Rated "The Seven Husbands of Evelyn Hugo"',
      detail: "5 stars • Loved it!",
      time: "3d ago",
      color: "pink",
    },
  ]

  return (
    <div className="card recent-activity">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>
      <div className="card-content">
        <div className="activity-list">
          {activities.map((activity, i) => (
            <div key={i} className="activity-item">
              <div className={`activity-dot ${activity.color}`}></div>
              <div className="activity-content">
                <div className="activity-text">{activity.text}</div>
                <div className="activity-detail">{activity.detail}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentActivity
