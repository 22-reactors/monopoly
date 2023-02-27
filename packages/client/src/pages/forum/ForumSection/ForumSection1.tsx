import { type FC } from 'react';

import style from '../forum.module.scss';

import { ExampleSection as topicList } from '../ExampleData';
import { ForumTopicList } from './ForumTopicList';
import { type ForumSectionProps } from './typings';


export const ForumSection1: FC<ForumSectionProps> = () => {
  const pageTitle = 'Раздел1';
  return (
    <>
        <section className={style.forum__wrapper}>
        <h1 className={style.forum__title}  >
        {pageTitle}
        </h1>
         <ForumTopicList topicList={topicList} sectionId= '1' />
      </section>
    </>
  );
};
