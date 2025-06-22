"use client"

import { useState } from "react"

const BookCard = ({ book, size = "normal", onReaction }) => {
  const [showReactions, setShowReactions] = useState(false)

  const handleReaction = (reactionType) => {
    onReaction(book.id, reactionType)
  }

  return (
    <div
      className={`book-card ${size === "large" ? "book-card-large" : ""}`}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div className={`reaction-buttons ${showReactions ? "show" : ""}`}>
        <button onClick={() => handleReaction("heart")} className="reaction-btn">
          ❤️
        </button>
        <button onClick={() => handleReaction("smile")} className="reaction-btn">
          😊
        </button>
        <button onClick={() => handleReaction("thumbsUp")} className="reaction-btn">
          👍
        </button>
      </div>

      <div className="book-cover-container">
        <img src={book.cover || "/placeholder.svg"} alt={book.title} className="book-cover" />
        <div className={`status-badge ${book.status === "completed" ? "completed" : "reading"}`}>
          {book.status === "completed" ? "Finished" : `${book.progress}%`}
        </div>
        {book.status === "reading" && (
          <div className="page-badge">
            {book.currentPage}/{book.pages}
          </div>
        )}
      </div>

      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>

      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < Math.floor(book.rating) ? "filled" : ""}`}>
            ⭐
          </span>
        ))}
        <span className="rating-text">{book.rating}</span>
      </div>

      {book.status === "reading" && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${book.progress}%` }}></div>
        </div>
      )}

      <div className="book-stats">
        <div className="stat">
          <span>💬 {book.highlights}</span>
          <span>❤️ {book.reactions.heart}</span>
        </div>
        <span className="last-read">{book.lastRead}</span>
      </div>
    </div>
  )
}

export default BookCard
