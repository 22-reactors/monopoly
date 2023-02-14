import style from './userAvatar.module.scss';
import avatarEmpty from '../../assets/avatar-empty.png';
import classNames from 'classnames'

export interface IUserAvatar {
  className?: string;
  src?: string;
  name: string;
  isDarkTheme?: boolean;
}

export function UserAvatar(props: IUserAvatar) {
  return (
    <div className={classNames(
      props.className,
      style.wrapper,
      props.isDarkTheme && style.isDark
    )}>
      <img className={style.avatar} src={props.src ?? avatarEmpty} alt={`Аватар ${props.name}`}/>
      <span className={style.name}>{props.name}</span>
    </div>
  );
}
