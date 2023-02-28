//Страница темы- сообщения существующие и оставить свое

//import style from './ForumTopic.scss';
import style from '../forum.module.scss';

import { type FC } from 'react';
//import { Button, ButtonSizes, ButtonVariation } from '../../../components/button/button';

//import { ExampleTopic as topicList } from '../ExampleData';
//import { ForumMessage } from './ForumMessage';
import { type ForumTopicProps } from './typings';
import { ThemeMessage } from '../../../components/themeMessage/themeMessage';
import { ThemeMessageProps } from '../../../mocs/ForumProps';
import { Paginator } from '../../../components/paginator/paginator';



export const ForumTopic1: FC<ForumTopicProps> = () => {
  const  topicId  = '1';

  return (
    <>
      <section className={style.pageContainer}>
        <h1 className={style.forum__title}>Топик {topicId}</h1>
       
        <div className={style.topic__container}>


          {/* Это реализация варианта с составными айди
            <div className={style.forum__body}>
            {topicList.map(row => (
              <ForumMessage key={row.id} message={row} />
            ))}
          </div> */}
          <div className={style.forum__body}>
            
              <ThemeMessage {...ThemeMessageProps} />
              <ThemeMessage {...ThemeMessageProps} />
          </div>
          <div className={style.paginator}> 
            <Paginator pagesCount={4} />
            </div>
        </div>
      </section>
    </>
  );
};
