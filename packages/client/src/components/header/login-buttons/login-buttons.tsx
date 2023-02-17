import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import { IUser } from '../../../utils/interfaces';
import { Button, ButtonSizes, ButtonVariation } from '../../button/button';
import style from './login-buttons.module.scss';

export interface ILoginButtonsProps {
  logoutText: string;
  user?: IUser;
  isDarkTheme?: boolean;
}

export const LoginButtons = (props: ILoginButtonsProps) => {
  const { user, isDarkTheme, logoutText } = props;

  return (
    <>
      {user ? (
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
            )}>
            {logoutText}
          </span>
        </div>
      ) : (
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
      )}
    </>
  );
};
