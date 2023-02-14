import style from './themeMessage.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar'
import { getDeclensionWord } from '../../utils/helpers'

export interface IThemeMessage {
  title: string;
  avatar: IUserAvatar;
  description: string;
  amountAnswer: number;
  lastMessage?: string;
}

export function ThemeMessage(props: IThemeMessage) {
  const amountAnswer = `${props.amountAnswer} ${getDeclensionWord(props.amountAnswer, ['ответ', 'ответа', 'ответов'])}`;

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
