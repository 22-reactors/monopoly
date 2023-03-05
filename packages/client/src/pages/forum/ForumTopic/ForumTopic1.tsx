//Страница темы- сообщения существующие и оставить свое

import style from '../forum.module.scss';

import { useState, type FC } from 'react';
import { Button, ButtonSizes, ButtonVariation } from '../../../components/button/button';
import { type ForumTopicProps } from './typings';
import { ThemeMessage } from '../../../components/themeMessage/themeMessage';
import { ThemeMessageProps } from '../../../mocs/ForumProps';
import { Paginator } from '../../../components/paginator/paginator';
import Textarea from '../../../components/textarea/textarea';

export const ForumTopic1: FC<ForumTopicProps> = () => {
  const  topicId  = '1';
  const [message, setMessage] = useState ('');
  return (
    <>
      <section className={style.pageContainer}>
        <h1 className={style.forum__title}>Форум {topicId}</h1>
       
        <div className={style.topic__container}>
        <div className={style.topic__name}>
        Тема 1
        </div>
        <div className={style.newmessage}>
        <form >
        <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            label='Введите сообщение'
            solo
            />
        </form>
            <div>
            <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              rounded>
              Отправить
              </Button>
            </div>
            </div>
              <ThemeMessage {...ThemeMessageProps} /> 
              <ThemeMessage {...ThemeMessageProps} />

          <div className={style.paginator}> 
            <Paginator pagesCount={4} />
            </div>
        </div>
      </section>
    </>
  );
};
