import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorPage from './Error/errorPage';
import { Forum } from './forum/forum';
import { Game } from './game/game';
import { Home } from './home/home';
import { Leaderboard } from './leaderboard/leaderboard';
import { Login } from './login/login';
import { Register } from './register/register';
import { registerLoader } from './register/register';
import { Layout } from './layout/layout';
import { ForumSection } from './forum/ForumSection/ForumSection';
import { ForumTopic } from './forum/ForumTopic/ForumTopic';
import { CreateTopic } from './forum/ForumTopic/CreateTopic';
import { GameSetup, gameSetupLoader } from './gameSetup/gameSetup';

const RootBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorPage code={error.status} />;
  }

  return <ErrorPage />;
};


export {
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
};
