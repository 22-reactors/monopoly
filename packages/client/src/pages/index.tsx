import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorPage from './Error/errorPage';
import { Forum } from './forum/forum';
import { Game, gameLoader } from './game/game';
import { Home } from './home/home';
import { Leaderboard } from './leaderboard/leaderboard';
import { Login } from './login/login';
import { loginLoader } from './login/login';
import { ProfilePage, profileLoader } from './profile/profile';
import { Register } from './register/register';
import { registerLoader } from './register/register';
import { Layout } from './layout/layout';
import { ForumSection1 } from './forum/ForumSection/ForumSection1';
import { ForumTopic1 } from './forum/ForumTopic/ForumTopic1';
import { CreateTopic } from './forum/ForumTopic/CreateTopic';

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
};
