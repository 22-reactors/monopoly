import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  RootBoundary,
  Forum,
  Game,
  gameLoader,
  Home,
  Leaderboard,
  Login,
  loginLoader,
  ProfilePage,
  profileLoader,
  SignUp,
  signUpLoader,
} from './pages/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: 'signup',
        element: <SignUp />,
        loader: signUpLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profileLoader,
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
        loader: gameLoader,
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
