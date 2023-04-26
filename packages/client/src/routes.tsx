import { Outlet } from 'react-router-dom';
import { homeProps } from './mocs/homeProps';
import LoginProps from './mocs/loginProps';
import RegistrProps from './mocs/registrProps';
import { ForumSectionList } from './pages/forum/ForumSectionList/ForumSectionList';

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
        children: [
          { index: true, element: <ForumSectionList /> },
          {
            path: `${links.forumSection.path}/:sectionId`,
            element: <Outlet />,
            children: [
              { index: true, element: <ForumSection /> },
              {
                path: `${links.forumTopic.path}/:topicId`,
                element: <ForumTopic />,
              },
              {
                path: links.createTopic.path,
                element: <CreateTopic />,
              },
            ],
          },
        ],
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
