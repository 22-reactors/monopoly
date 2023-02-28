// Главная страница форума. На ней расположен список разделов из компонента ForumSectionList

import '../../styles/globals.scss';
import style from './forum.module.scss';
import { type FC } from 'react';

import { ExampleForum as sectionList } from './ExampleData';
import { ForumSectionList } from './ForumSectionList';
import { type ForumProps } from './typing';



export const Forum: FC<ForumProps> = () => {
  const pageTitle = 'Форум';
  return (
    <>
     
      <section className={style.forum__wrapper}>
        <h1 className={style.forum__title} >
          {pageTitle}
        </h1>
        <ForumSectionList sectionList={sectionList} />
        

      </section>
      
    </>
  );
};
