import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';
import style from './header.module.scss';
import {
  ILoginButtonsProps,
  LoginButtons,
} from './login-buttons/login-buttons';

export interface IHeaderProps extends ILoginButtonsProps {
  navLinks: { path: string; title: string }[];
  isDarkTheme: boolean;
  user?: IUser;
  logoutText: string;
}

export const Header = (props: IHeaderProps) => {
  const { navLinks, isDarkTheme, logoutText } = props;

  return (
    <header className={classNames(style.header, isDarkTheme && style.dark)}>
      <nav className={style.nav}>
        <Link to={links.root.path} className={style.logoLink}>
          <img src="logo.svg" alt="logo" />
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
      <LoginButtons {...{ logoutText, isDarkTheme }} />
    </header>
  );
};
