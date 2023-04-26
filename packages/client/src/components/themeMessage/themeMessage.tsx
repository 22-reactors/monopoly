import style from './themeMessage.module.scss';
import { IUserAvatar, UserAvatar } from '../userAvatar/userAvatar';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ForumController from '../../controllers/forum';
import { useAppSelector } from '../../reduxstore/hooks';
import { userSelector } from '../../reduxstore/user/user.selector';

export interface IThemeMessage {
  avatar: IUserAvatar;
  status: string;
  comment: string;
  id: number;
}

interface ILikes {
  count: number;
  isUserReacted: boolean;
}

const likeCode = '&#128420;';

export function ThemeMessage(props: IThemeMessage) {
  const [likes, setLikes] = useState<ILikes>({
    count: 0,
    isUserReacted: false,
  });
  const user = useAppSelector(userSelector);

  const setEmojis = (emojis?: Record<string, ILikes>) => {
    if (emojis) {
      const count = emojis[likeCode]?.count ?? 0;
      const isUserReacted = emojis[likeCode]?.isUserReacted ?? false;
      setLikes({ count, isUserReacted });
    }
  };

  useEffect(() => {
    const getEmojis = async () => {
      const emojis = await ForumController.getEmojis(
        props.id,
        user?.login ?? 'Инкогнито'
      );
      setEmojis(emojis);
    };
    getEmojis();
  }, []);

  const iconHandler = async () => {
    if (!user) {
      return;
    }
    const emojis = likes.isUserReacted
      ? await ForumController.deleteEmoji({
          comment_id: props.id,
          userLogin: user?.login,
          emojiCode: likeCode,
        })
      : await ForumController.addEmoji({
          comment_id: props.id,
          userLogin: user?.login,
          emojiCode: likeCode,
        });

    setEmojis(emojis);
  };

  return (
    <div data-testid="theme-message" className={style.wrapper}>
      <UserAvatar {...props.avatar} />
      <span className={style.status}>{props.status} назад</span>
      <p className={style.message}>{props.comment}</p>
      <div className={style.actionWrapper}>
        <span className={style.icon} onClick={iconHandler} role="button">
          Иконка реакции сердца
        </span>
        <span
          className={classNames(style.text, likes.count > 0 && style.textShow)}>
          {likes.count}
        </span>
      </div>
    </div>
  );
}
