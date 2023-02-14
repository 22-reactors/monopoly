import { IHeaderProps } from '../components/header/header';
import { links } from '../utils/const';

export const headerProps: IHeaderProps = {
  navLinks: [links.game, links.forum, links.leaderboard],
  user: {
    id: 1,
    first_name: "Alex",
    second_name: "Shabanov",
    display_name: "skaamoogs",
    login: "skaamoogs",
    email: "mail@mail.com",
    phone: "+71234567899",
    avatar: "avatar.jpg",
  },
  isDarkTheme: false,
  logoutText: 'Выйти',
};
