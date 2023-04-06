// Главная страница форума. На ней расположен список разделов из компонента ForumSectionList

import '../../styles/globals.scss';
import style from './forum.module.scss';
import { FC, useEffect, useState } from 'react';

import { ForumSectionList } from './ForumSectionList/ForumSectionList';
import { type ForumProps } from './typing';
import { ITopic } from '../../api/forum/interfaces';
import ForumController from '../../controllers/forum';
import { ForumSectionItem } from './ForumSectionList/typings';

const sections: { id: number; title: string }[] = [
  { id: 1, title: 'Как играть' },
  { id: 2, title: 'Технические вопросы' },
  { id: 3, title: 'Доска объявлений' },
  { id: 4, title: 'Флуд' },
];

export const Forum: FC<ForumProps> = () => {
  const pageTitle = 'Форум';
  return (
    <>
      <section className={style.wrapper}>
        <div>
          <h1 className={style.title}>{pageTitle}</h1>
          <ForumSectionList sectionList={} />
        </div>
      </section>
    </>
  );
};
