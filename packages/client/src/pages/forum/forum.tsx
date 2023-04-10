// Главная страница форума. На ней расположен список разделов из компонента ForumSectionList

import { Outlet } from 'react-router-dom';
import style from './forum.module.scss';

export const Forum = () => {
  return (
    <>
      <section className={style.wrapper}>
        <div>
          <Outlet />
        </div>
      </section>
    </>
  );
};
