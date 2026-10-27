import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  return (
    <div>
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