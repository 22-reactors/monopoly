//Компонент карточка темы форума

import { type FC } from 'react';
import style from '../forum.module.scss';
//import { ExampleSection as topicList } from '../ExampleData';
//import { ForumTopicList } from './ForumTopicList';
import { type ForumSectionProps } from './typings';
import { Button, ButtonVariation, ButtonSizes } from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import { ThemeCard } from '../../../components/themeCard/themeCard';
import { ThemeCardProps } from '../../../mocs/ForumProps';
import { Paginator } from '../../../components/paginator/paginator';

export const ForumSection1: FC<ForumSectionProps> = () => {
  const pageTitle = 'Форум 1';
  return (
    <>
        <section className={style.forum__wrapper}>
        <h1 className={style.forum__title}  >
        {pageTitle}
        </h1>
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
         {/* <ForumTopicList topicList={topicList} sectionId= '1' /> */}
         <div className={style.forum}>
         <div className={style.forum__body}>
         <Link to={links.forumtopic1.path} >
         <ThemeCard {...ThemeCardProps}/>
         </Link>
         <ThemeCard {...ThemeCardProps}/>
         <ThemeCard {...ThemeCardProps}/>
         </div>
         <div className={style.paginator}> 
         <Paginator pagesCount={4} />
         </div>
         </div>
      </section>
    </>
  );
};
