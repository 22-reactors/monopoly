import style from './themeMessage.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar';
import { useMemo, useState } from 'react';
import classNames from 'classnames';

export interface IThemeMessage {
  avatar: IUserAvatar;
  status: string;
  message: string;
  countLikes?: number;
}

export function ThemeMessage(props: IThemeMessage) {
  const [hasLike, setHasLike] = useState(false);

  const iconHandler = () => setHasLike(prevState => !prevState);
  const countLikes = useMemo(() => {
    return (props.countLikes ?? 0) + Number(hasLike);
  }, [hasLike, props.countLikes]);

  return (
    <div className={style.wrapper}>
      <UserAvatar {...props.avatar} />
      <span className={style.status}>{props.status} назад</span>
      <p className={style.message}>{props.message}</p>
      <div className={style.actionWrapper}>
        <span className={style.icon} onClick={iconHandler} role="button">
          Иконка реакции сердца
        </span>
        <span
          className={classNames(style.text, countLikes > 0 && style.textShow)}>
          {countLikes}
        </span>
      </div>
    </div>
  );
}
