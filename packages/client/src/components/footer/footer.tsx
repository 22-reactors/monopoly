import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';
import { Logo } from '../../icons/logo';
import style from './footer.module.scss';
import { IUser } from '../../utils/interfaces';
import { useAppSelector } from '../../reduxstore/hooks';
import { userSelector } from '../../reduxstore/user/user.selector';

export interface IFooterProps {
  navTitle: string;
  navLinks: { path: string; title: string }[];
  infoText: string[];
  isDarkTheme: boolean;
}

const isLoginLinksAndAuthorized = (title: string, user: IUser | null) => {
  return user && (title === links.login.title || title === links.signup.title);
};

export const Footer = (props: IFooterProps) => {
  const { navLinks, navTitle, infoText, isDarkTheme } = props;
  const user = useAppSelector(userSelector);

  return (
    <footer className={classNames(style.footer, isDarkTheme && style.dark)}>
      <div className={style.container}>
        <div className={classNames(style.menu, isDarkTheme && style.dark)}>
          <h4 className={classNames(style.title, isDarkTheme && style.dark)}>
            {navTitle}
          </h4>
          <nav>
            <ul className={style.navList}>
              {navLinks.map(({ path, title }) => {
                if (!isLoginLinksAndAuthorized(title, user)) {
                  return (
                    <li key={path}>
                      <Link to={path} className={style.link}>
                        {title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>
        <div className={style.infoContainer}>
          <Logo className={style.logo} />
          {infoText.map((text, index) => (
            <p key={index} className={style.info}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};
