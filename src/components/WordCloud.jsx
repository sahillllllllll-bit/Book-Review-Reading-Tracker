import { genres } from "../data/mockData"

const WordCloud = () => {
  return (
    <div className="card word-cloud">
      <div className="card-header">
        <h3>Genre Explorer</h3>
        <p>Discover your reading patterns across different genres</p>
      </div>
      <div className="card-content">
        <div className="genre-cloud">
          {genres.map((genre, i) => (
            <button
              key={genre.name}
              className="genre-button"
              style={{
                fontSize: `${genre.size}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {genre.name}
              <span className="genre-count">{genre.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WordCloud
