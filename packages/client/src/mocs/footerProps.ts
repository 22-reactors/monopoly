import { IFooterProps } from '../components/footer/footer';
import { links } from '../utils/const';

export const footerProps: IFooterProps = {
  navLinks: [
    links.root,
    links.signup,
    links.login,
    links.profile,
    links.forum,
    links.leaderboard,
  ],
  navTitle: 'Меню',
  infoText: [
    `Все бренды и торговые марки на этой странице 
  принадлежат правообладателям и размещены на правах рекламы.`,
    `Собственность 22 когорты, команда “Реакторы”, все права защищены`,
  ],
  isDarkTheme: false,
};
