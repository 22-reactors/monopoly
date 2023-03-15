import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxstore/hooks';
import { userSelector } from '../../../reduxstore/user/user.selector';
import { getUser, logoutAction } from '../../../reduxstore/user/userSlice'
import { links, resourceURL } from '../../../utils/const';
import { Button, ButtonSizes, ButtonVariation } from '../../button/button';
import style from './login-buttons.module.scss';
import { UserAvatar } from '../../userAvatar/userAvatar'

export interface ILoginButtonsProps {
  logoutText: string;
  isDarkTheme?: boolean;
}

export const LoginButtons = (props: ILoginButtonsProps) => {
  const { isDarkTheme, logoutText } = props;
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  if (!user) {
    dispatch(getUser());
  }

  const logout = () => {
    dispatch(logoutAction());
  };

  const avatar = user?.avatar ? `${resourceURL}${user.avatar}` : '';

  return user
    ? (
      <div className={style.user}>
        <UserAvatar name={user.display_name} src={avatar} isDarkTheme={isDarkTheme}/>
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
    )
    : (
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
