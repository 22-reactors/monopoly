import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUserData } from '../../../api/auth/interfaces';
import AuthController from '../../../controllers/auth';
import { links } from '../../../utils/const';
import { Button, ButtonSizes, ButtonVariation } from '../../button/button';
import style from './login-buttons.module.scss';

export interface ILoginButtonsProps {
  logoutText: string;
  isDarkTheme?: boolean;
}

export const LoginButtons = (props: ILoginButtonsProps) => {
  const { isDarkTheme, logoutText } = props;

  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthController.getUser();
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, []);

  const logout = () => {
    AuthController.logout();
    setUser(null);
  };

  if (user) {
    return (
      <div className={style.user}>
        <img className={style.avatar} src={user.avatar} alt="avatar" />
        <h4 className={classNames(style.name, isDarkTheme && style.darkText)}>
          {user.display_name}
        </h4>
        <div className={style.divider}></div>
        <span
          className={classNames(
            style.logoutText,
            isDarkTheme ? style.darkText : style.lightText
          )}
          onClick={logout}>
          {logoutText}
        </span>
      </div>
    );
  }
  return (
    <div className={style.buttons}>
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
  );
};
