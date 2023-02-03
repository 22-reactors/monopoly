import { useEffect } from 'react'
import style from './app.module.scss'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className={style.app}>Вот тут будет жить ваше приложение :)</div>
}

export default App
