import style from './themeCard.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar'
import { getDeclensionWord } from '../../utils/helpers'

export interface IThemeCard {
  title: string;
  avatar: IUserAvatar;
  description: string;
  amountAnswer: number;
  lastMessage?: string;
}

export const enum WordMap {
  SINGLE = 'single',
  SOME = 'some',
  MORE = 'more'
}

const WORD_MAP = { single: 'ответ', some: 'ответа', more: 'ответов' };

export function ThemeCard(props: IThemeCard) {
  const amountAnswer = `${props.amountAnswer} ${getDeclensionWord(props.amountAnswer, WORD_MAP)}`;

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{props.title}</h2>
      <UserAvatar {...props.avatar}/>
      <p className={style.description}>{props.description}</p>
      <div className={style.infoBlock}>
        <span className={style.answer}>{amountAnswer}</span>
        {props.lastMessage && <span className={style.lastMessage}>Последнее сообщение: {props.lastMessage}</span>}
      </div>
    </div>
  );
}
