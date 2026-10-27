import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null) // Moved to top level

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  const diaryCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newDiary = {
      date,
      visibility,
      weather,
      comment
    }

    diaryService.create(newDiary)
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary))
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setTimeout(() => {
        setError(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          date <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility:
          good <input type="radio" name="visibility" value="good" checked={visibility === 'good'} onChange={(e) => setVisibility(e.target.value)} />
          ok <input type="radio" name="visibility" value="ok" checked={visibility === 'ok'} onChange={(e) => setVisibility(e.target.value)} />
          poor <input type="radio" name="visibility" value="poor" checked={visibility === 'poor'} onChange={(e) => setVisibility(e.target.value)} />
        </div>
        <div>
          weather:
          sunny <input type="radio" name="weather" value="sunny" checked={weather === 'sunny'} onChange={(e) => setWeather(e.target.value)} />
          rainy <input type="radio" name="weather" value="rainy" checked={weather === 'rainy'} onChange={(e) => setWeather(e.target.value)} />
          cloudy <input type="radio" name="weather" value="cloudy" checked={weather === 'cloudy'} onChange={(e) => setWeather(e.target.value)} />
          stormy <input type="radio" name="weather" value="stormy" checked={weather === 'stormy'} onChange={(e) => setWeather(e.target.value)} />
          windy <input type="radio" name="weather" value="windy" checked={weather === 'windy'} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          comment <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Flight Diaries</h2>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            {diary.comment && <p>comment: {diary.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App