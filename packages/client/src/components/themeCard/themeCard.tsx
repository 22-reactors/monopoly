//Компонент. карточка темы форума

import style from './themeCard.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar';
import { getDeclensionWord } from '../../utils/helpers';

export interface IThemeCard {
  title: string;
  avatar: IUserAvatar;
  description?: string;
  amountAnswer: number;
  lastMessageTime?: string;
}

const WORD_MAP = { single: 'ответ', some: 'ответа', more: 'ответов' };

const formatTime = (time?: string) => {
  const date = time && new Date(time);
  if (date) {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
      .format(date)
      .replace(',', '');
  }
};

export function ThemeCard(props: IThemeCard) {
  const amountAnswer = `${props.amountAnswer} ${getDeclensionWord(
    props.amountAnswer,
    WORD_MAP
  )}`;

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{props.title}</h2>
      <UserAvatar {...props.avatar} />
      <p className={style.description}>{props.description}</p>
      <div className={style.infoBlock}>
        <span className={style.answer}>{amountAnswer}</span>
        {props.lastMessageTime && (
          <span className={style.lastMessage}>
            Последнее сообщение: {formatTime(props.lastMessageTime)}
          </span>
        )}
      </div>
    </div>
  );
}
