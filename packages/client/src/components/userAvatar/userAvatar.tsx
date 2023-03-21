import style from './userAvatar.module.scss';
import avatarEmpty from '../../assets/avatar-empty.png';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../utils/const';

export interface IUserAvatar {
  src?: string;
  name: string;
  isDarkTheme?: boolean;
}

export function UserAvatar(props: IUserAvatar) {
  return (
    <div
      className={classNames(style.wrapper, props.isDarkTheme && style.isDark)}>
      <img
        className={style.avatar}
        src={props.src ?? avatarEmpty}
        alt={`Аватар ${props.name}`}
      />
      <Link to={links.profile.path} className={style.name}>
        {props.name}
      </Link>
    </div>
  );
}
