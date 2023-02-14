import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';
import { IUser } from '../../utils/interfaces';
import { Button, ButtonSizes, ButtonVariation } from '../button/button';
import style from './header.module.scss';

export interface IHeaderProps {
  navLinks: { path: string; title: string }[];
  isDarkTheme: boolean;
  user?: IUser;
  logoutText: string;
}

export const Header = (props: IHeaderProps) => {
  const { navLinks, isDarkTheme, user, logoutText } = props;

  return (
    <header className={classNames(style.header, isDarkTheme && style.dark)}>
      <nav className={style.nav}>
        <Link to={links.root.path} className={style.logoLink}>
          <img src="logo.svg" alt="logo" className={style.logo} />
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
      {!user && (
        <div className={style.headerButtons}>
          <Link to={links.login.path}>
            <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              rounded>
              {links.login.title}
            </Button>
          </Link>
          <Link to={links.signup.path}>
            <Button
              variation={ButtonVariation.OUTLINED}
              size={ButtonSizes.MEDIUM}
              rounded>
              {links.signup.title}
            </Button>
          </Link>
        </div>
      )}
      {user && (
        <div className={style.user}>
          <img className={style.avatar} src={user.avatar} alt="avatar" />
          <h4 className={classNames(style.name, isDarkTheme && style.darkText)}>
            {user.display_name}
          </h4>
          <div className={style.divider}></div>
          <span
            className={classNames(
              style.logoutText,
              !isDarkTheme && style.lightText,
              isDarkTheme && style.darkText
            )}>
            {logoutText}
          </span>
        </div>
      )}
    </header>
  );
};
