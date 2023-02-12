import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginProps from './mocs/loginProps';
import RegistrProps from './mocs/registrProps';
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
  Register,
  registerLoader,
} from './pages/index';

export const links = {
  root: {
    path: '/',
    title: 'Главная страница',
  },
  login: {
    path: '/login',
    title: 'Войти',
  },
  signup: {
    path: '/signup',
    title: 'Регистрация',
  },
  profile: {
    path: '/profile',
    title: 'Профиль',
  },
  leaderboard: {
    path: '/leaderboard',
    title: 'Лидеры',
  },
  forum: {
    path: '/forum',
    title: 'Форум',
  },
  game: {
    path: '/game',
    title: 'Игра',
  },
};

const router = createBrowserRouter([
  {
    path: links.root.path,
    element: <Home />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: links.login.path,
        element: <Login {...LoginProps} />,
        loader: loginLoader,
      },
      {
        path: links.signup.path,
        element: <Register {...RegistrProps} />,
        loader: registerLoader,
      },
      {
        path: links.profile.path,
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: links.leaderboard.path,
        element: <Leaderboard />,
      },
      {
        path: links.forum.path,
        element: <Forum />,
      },
      {
        path: links.game.path,
        element: <Game />,
        loader: gameLoader,
      },
    ],
  },
]);

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <RouterProvider router={router} />;
}
