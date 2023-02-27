import '../../styles/globals.scss';
import style from './forum.module.scss';
import { type FC } from 'react';

import { ExampleForum as sectionList } from './ExampleData';
import { ForumSectionList } from './ForumSectionList';
import { type ForumProps } from './typing';
import { Paginator } from '../../components/paginator/paginator';


export const Forum: FC<ForumProps> = () => {
  const pageTitle = 'Форум';
  return (
    <>
     
      <section className={style.forum__wrapper}>
        <h1 className={style.forum__title} >
          {pageTitle}
        </h1>
        <ForumSectionList sectionList={sectionList} />
        
        <Paginator pagesCount={4} />
      </section>
      
    </>
  );
};
