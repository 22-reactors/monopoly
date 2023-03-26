import { homeProps } from './mocs/homeProps';
import LoginProps from './mocs/loginProps';
import RegistrProps from './mocs/registrProps';

import {
  RootBoundary,
  Forum,
  ForumSection,
  ForumTopic,
  CreateTopic,
  Game,
  Home,
  Leaderboard,
  Login,
  ProfilePage,
  Register,
  Layout,
  GameSetup,
  rootLoader,
} from './pages/index';
import { links } from './utils/const';

export const routes = [
  {
    path: links.root.path,
    element: <Layout />,
    errorElement: <RootBoundary />,
    loader: rootLoader,
    children: [
      { index: true, element: <Home {...homeProps} /> },
      {
        path: links.login.path,
        element: <Login {...LoginProps} />,
      },
      {
        path: links.signup.path,
        element: <Register {...RegistrProps} />,
      },
      {
        path: links.profile.path,
        element: <ProfilePage />,
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
        element: <ForumSection />,
      },
      {
        path: links.forumtopic1.path,
        element: <ForumTopic />,
      },
      {
        path: links.CreateTopic.path,
        element: <CreateTopic/>,
      },
      {
        path: links.setup.path,
        element: <GameSetup maxPlayers={4} />,
      },
    ],
  },
  {
    path: links.game.path,
    element: <Game />,
  },
];
