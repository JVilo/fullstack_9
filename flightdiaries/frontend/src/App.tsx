import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

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

    diaryService.create(newDiary).then(returnedDiary => {
      setDiaries(diaries.concat(returnedDiary))
      // Reset form fields
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
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
          good <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)} />
          ok <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)} />
          poor <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)} />
        </div>
        <div>
          weather:
          sunny <input type="radio" name="weather" value="sunny" onChange={(e) => setWeather(e.target.value)} />
          rainy <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)} />
          cloudy <input type="radio" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value)} />
          stormy <input type="radio" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value)} />
          windy <input type="radio" name="weather" value="windy" onChange={(e) => setWeather(e.target.value)} />
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