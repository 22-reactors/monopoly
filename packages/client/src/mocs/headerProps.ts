import { IHeaderProps } from '../components/header/header';
import { links } from '../utils/const';

export const headerProps: IHeaderProps = {
  navLinks: [links.setup, links.forum, links.leaderboard],
  logoutText: 'Выйти',
  isDarkTheme: true,
};
