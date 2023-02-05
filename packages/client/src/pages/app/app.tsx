import { useEffect } from 'react'
import style from './app.module.scss'
import { textStyle, utilityStyle } from '../../assets/scss/modules'

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
  return (
    <div
      className={[
        style.app,
        textStyle.h1,
        textStyle.baseColor,
        utilityStyle.displayFlex,
      ].join(' ')}>
      Вот тут будет жить ваше приложение :)
    </div>
  )
}

export default App
