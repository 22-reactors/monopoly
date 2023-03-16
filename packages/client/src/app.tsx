import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { homeProps } from './mocs/homeProps';
import LoginProps from './mocs/loginProps';
import RegistrProps from './mocs/registrProps';
import { GameSetup, gameSetupLoader } from './pages/gameSetup/gameSetup';

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
  Layout,
} from './pages/index';
import { links } from './utils/const';

export const routes = [
  {
    path: links.root.path,
    element: <Layout />,
    errorElement: <RootBoundary />,
    /* children: [
      { index: true, element: <Home {...homeProps} /> },
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
        path: links.setup.path,
        element: <GameSetup maxPlayers={4} />,
        loader: gameSetupLoader,
      },
    ],
  },
/*   {
    path: links.game.path,
    element: <Game />,
    loader: gameLoader,
  }, */
];

const router = createBrowserRouter(routes);

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <RouterProvider router={router} />;
}
