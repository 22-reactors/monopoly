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
  GameSetup,
  gameSetupLoader,
} from './pages/index';
import { links } from './utils/const';

export const routes = [
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
        loader: gameSetupLoader,
      },
    ],
  },
  {
    path: links.game.path,
    element: <Game />,
    loader: gameLoader,
  },
];

export const routes = [
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
    ],
  },
  {
    path: links.game.path,
    element: <Game />,
    loader: gameLoader,
  },
];