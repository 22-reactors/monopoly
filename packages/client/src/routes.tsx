import { homeProps } from './mocs/homeProps';
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
