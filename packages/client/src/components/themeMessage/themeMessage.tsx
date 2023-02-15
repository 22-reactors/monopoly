import style from './themeMessage.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar'
import { useState } from 'react'
import classNames from 'classnames'

export interface IThemeMessage {
  avatar: IUserAvatar;
  status: string;
  message: string;
  countLikes?: number;
}

export function ThemeMessage(props: IThemeMessage) {
  const [countLike, setCountLike] = useState(0);

  const iconHandler = () => setCountLike((prevState) => prevState > 0 ? --prevState : ++prevState);
  const amountLikes = props.countLikes ? props.countLikes + countLike : countLike;

  return (
    <div className={style.wrapper}>
      <UserAvatar {...props.avatar}/>
      <span className={style.status}>{props.status} назад</span>
      <p className={style.message}>{props.message}</p>
      <div className={style.actionWrapper}>
        <span className={style.icon} onClick={iconHandler} role={'button'}>Иконка реакции сердца</span>
        <span className={classNames(style.text, amountLikes > 0 && style.textShow)}>{amountLikes} Likes</span>
      </div>
    </div>
  );
}
