//import style from './ForumTopic.scss';
import style from '../forum.module.scss';

import { type FC } from 'react';
//import { Button, ButtonSizes, ButtonVariation } from '../../../components/button/button';

import { ExampleTopic as topicList } from '../ExampleData';
import { ForumMessage } from './ForumMessage';
import { type ForumTopicProps } from './typings';


export const ForumTopic1: FC<ForumTopicProps> = () => {
  const  topicId  = '1';

  return (
    <>
      
      <section className={style.pageContainer}>
        <h1 className="forum-topic__title">Топик {topicId}</h1>
       
        <div className="forum-topic__container">
          <div className="forum-topic__messages">
            {topicList.map(row => (
              <ForumMessage key={row.id} message={row} />
            ))}
          </div>
          
        
          
        </div>
      </section>
    </>
  );
};
