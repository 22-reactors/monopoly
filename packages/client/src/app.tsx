import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { homeProps } from './mocs/homeProps';
import LoginProps from './mocs/loginProps';
import RegistrProps from './mocs/registrProps';
import { GameSetup, gameSetupLoader } from './pages/gameSetup/gameSetup';

import {
  RootBoundary,
  Forum,
  ForumSection1,
  ForumTopic1,
  CreateTopic,
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

const router = createBrowserRouter([
  {
    path: links.root.path,
    element: <Layout />,
    errorElement: <RootBoundary />,
    children: [
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
        path: links.forumsection1.path,
        element: <ForumSection1 />,
      },
      {
        path: links.forumtopic1.path,
        element: <ForumTopic1 />,
      },
      {
        path: links.CreateTopic.path,
        element: <CreateTopic/>,
      },
      {
        path: links.game.path,
        element: <Game />,
        loader: gameLoader,
      }, 
      { 
        path: links.setup.path,
        element: <GameSetup maxPlayers={4} />,
        loader: gameSetupLoader,
      },
    ],
  },
  {
    path: links.game.path,
    element: <Game />,
    loader: gameLoader,
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
