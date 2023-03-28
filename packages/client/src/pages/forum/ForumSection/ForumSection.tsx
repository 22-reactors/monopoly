//Раздел форума. включает список тем и кол-во сообщений

import { FC } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from './typings';
import { Button, ButtonVariation, ButtonSizes } from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import { ThemeCard } from '../../../components/themeCard/themeCard';
import { ThemeCardProps } from '../../../mocs/ForumProps';
import { Paginator } from '../../../components/paginator/paginator';

export const ForumSection: FC<ForumSectionProps> = () => {
  const pageTitle = 'Форум 1';
  return (
    <>
        <section className={style.wrapper}>
        <h1 className={style.title}  >
        {pageTitle}
        <div className={style.forum__button}>
            <Link to={links.CreateTopic.path}>
              <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              rounded>
              {links.CreateTopic.title}
              </Button>
            </Link>
        </div>
        </h1>

         <Link  className={style.link} to={links.forumtopic1.path} >
         <ThemeCard  {...ThemeCardProps}/>
         </Link>
         <ThemeCard {...ThemeCardProps}/>
         <ThemeCard {...ThemeCardProps}/>
         
         < Paginator className={style.paginator} pagesCount={4} />

      </section>
    </>
  );
};
