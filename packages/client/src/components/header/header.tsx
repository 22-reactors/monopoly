import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';
import { Logo } from '../../icons/logo';
import style from './header.module.scss';

import {
  ILoginButtonsProps,
  LoginButtons,
} from './login-buttons/login-buttons';
import ThemeToggle from '../themetoggle/ThemeToggle';

export interface IHeaderProps extends ILoginButtonsProps {
  navLinks: { path: string; title: string }[];
  isDarkTheme: boolean;
  logoutText: string;
}

export const Header = (props: IHeaderProps) => {
  const { navLinks, isDarkTheme, logoutText } = props;

  return (
    <header
      data-testid="header"
      className={classNames(style.header, isDarkTheme && style.dark)}>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to={links.root.path} className={style.logoLink}>
            <Logo className={style.logo} />
          </Link>
          <ul className={style.navList}>
            {navLinks.map(link => (
              <li key={link.path} className={style.li}>
                <Link
                  className={classNames(
                    style.link,
                    isDarkTheme && style.darkText
                  )}
                  to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
        <LoginButtons {...{ logoutText, isDarkTheme }} />
      </div>
    </header>
  );
};
