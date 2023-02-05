import { useEffect } from 'react'
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Outlet,
  redirect,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import ErrorPage from '../error-page/error-page'
import Forum from '../forum/forum'
import Game from '../game/game'
import Home from '../home/home'
import Leaderboard from '../leaderboard/leaderboard'
import Login from '../login/login'
import Profile from '../profile/profile'
import SignUp from '../signup/signup'

/* Компонент для обработки ошибок */
const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorPage status={error.status} message={'Не туда попали'} />
    }
    if (error.status >= 500) {
      return <ErrorPage status={error.status} message={'Мы уже фиксим'} />
    }

    return <ErrorPage status={error.status} message={error.statusText} />
  }
  return <div>Что-то пошло не так</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Home />
        <Outlet />
      </>
    ),
    errorElement: <RootBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />,
        loader: async () => {
          /*
          Когда подключим API авторизации здесь должен быть запрос пользователя. 
          Если уже авторизован, то переход на страница игры */
          const user = null
          if (user) {
            return redirect('/game')
          }
          return true
        },
      },
      {
        path: 'signup',
        element: <SignUp />,
        loader: async () => {
          /*
          Когда подключим API авторизации здесь должен быть запрос пользователя. 
          Если уже авторизован, то переход на страница игры */
          const user = null
          if (user) {
            return redirect('/game')
          }
          return true
        },
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: async () => {
          /*
          Когда подключим API авторизации здесь должен быть запрос пользователя. 
          Если  не авторизован, то переход на страницу авторизации */
          const user = null
          if (!user) {
            return redirect('/login')
          }
          return true
        },
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: 'forum',
        element: <Forum />,
      },
      {
        path: 'game',
        element: <Game />,
        loader: async () => {
          /*
          Когда подключим API авторизации здесь должен быть запрос пользователя. 
          Если  не авторизован, то переход на страницу авторизации */
          const user = null
          if (!user) {
            return redirect('/login')
          }
          return true
        },
      },
    ],
  },
])

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
  return <RouterProvider router={router} />
}

export default App
