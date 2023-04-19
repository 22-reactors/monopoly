//Страница темы- сообщения существующие и оставить свое

import style from '../forum.module.scss';

import { useState, FC, useEffect } from 'react';
import {
  Button,
  ButtonSizes,
  ButtonVariation,
} from '../../../components/button/button';
import { type ForumTopicProps } from './typings';
import { ThemeMessage } from '../../../components/themeMessage/themeMessage';
import { Paginator } from '../../../components/paginator/paginator';
import Textarea from '../../../components/textarea/textarea';
import { useParams } from 'react-router-dom';
import { usePaginator } from '../../../hooks/usePaginator';
import ForumController from '../../../controllers/forum';
import { IComments } from '../../../api/forum/interfaces';
import { useAppSelector } from '../../../reduxstore/hooks';
import { userSelector } from '../../../reduxstore/user/user.selector';
import { IUserData } from '../../../api/auth/interfaces';
import { resourceURL } from '../../../utils/const';
import { getDiffTime } from '../../../utils/helpers';

const defaultComments: IComments = { comments: [], topicTitle: 'Тема' };

const ITEMS_PER_PAGE = 3;

export const ForumTopic: FC<ForumTopicProps> = () => {
  const [message, setMessage] = useState('');
  const [{ comments, topicTitle }, setComments] = useState(defaultComments);
  const { topicId } = useParams();
  const [page, showPage] = usePaginator(1);
  const user = useAppSelector(userSelector);

  useEffect(() => {
    const getComments = async () => {
      const data = await ForumController.getComments(Number(topicId));
      if (data) {
        setComments(data);
      }
    };
    getComments();
  }, [message]);

  const pagesCount = Math.ceil(comments.length / ITEMS_PER_PAGE);

  const sendComment = async () => {
    if (message) {
      const response = await ForumController.addComment({
        topic_id: Number(topicId),
        comment: message,
        userData: user ?? ({} as IUserData),
      });
      if (response) {
        setMessage('');
      }
    }
  };

  return (
    <>
      <section className={style.pageContainer}>
        <div className={style.topic__container}>
          <form className={style.newmessage}>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              label="Введите сообщение"
              solo
            />
            <div>
              <Button
                variation={ButtonVariation.PRIMARY}
                size={ButtonSizes.MEDIUM}
                onClick={sendComment}
                rounded>
                Отправить
              </Button>
            </div>
          </form>
          <h2 className={style.topic__name}>{topicTitle}</h2>
          {comments
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map(comment => {
              const avatar = {
                src: `${resourceURL}/${comment.userData.avatar}`,
                name: comment.userData.display_name ?? 'Инкогнито',
              };
              const status = getDiffTime(
                new Date(),
                new Date(comment.updatedAt)
              );
              return (
                <ThemeMessage
                  key={comment.id}
                  {...comment}
                  avatar={avatar}
                  status={status}
                />
              );
            })}
          <div className={style.paginator}>
            {pagesCount > 1 && (
              <Paginator pagesCount={pagesCount} pageHandler={showPage} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
