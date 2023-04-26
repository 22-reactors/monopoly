import style from './userAvatar.module.scss';
import avatarEmpty from '../../assets/avatar-empty.png';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';

export interface IUserAvatar {
  src?: string;
  name: string;
  isDarkTheme?: boolean;
  isLinkToProfile?: boolean;
}

const showUserName = (isLink: boolean, name: string) => {
  if (isLink) {
    return (
      <Link
        to={links.profile.path}
        className={classNames(style.name, style.isLink)}>
        {name}
      </Link>
    );
  }
  return <span className={style.name}>{name}</span>;
};

export function UserAvatar(props: IUserAvatar) {
  return (
    <div
      data-testid="user-avatar"
      className={classNames(style.wrapper, props.isDarkTheme && style.isDark)}>
      <img
        className={style.avatar}
        src={props.src ?? avatarEmpty}
        alt={`Аватар ${props.name}`}
      />
      {showUserName(Boolean(props.isLinkToProfile), props.name)}
    </div>
  );
}
