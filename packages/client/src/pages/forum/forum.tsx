// Главная страница форума. На ней расположен список разделов из компонента ForumSectionList

import '../../styles/globals.scss';
import style from './forum.module.scss';
import { FC } from 'react';

import { ExampleForum as sectionList } from './ExampleData';
import { ForumSectionList } from './ForumSectionList/ForumSectionList';
import { type ForumProps } from './typing';


export const Forum: FC<ForumProps> = () => {
  const pageTitle = 'Форум';
  return (
    <>
      <section className={style.wrapper}>
        <div>
        <h1 className={style.title} >
          {pageTitle}
        </h1>
        <ForumSectionList sectionList={sectionList} />
        </div>
      </section>
    </>
  );
};
