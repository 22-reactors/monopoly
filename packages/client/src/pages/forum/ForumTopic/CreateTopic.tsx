//Создание новой темы на форуме

import { type FC } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from '../ForumSection/typings';
import { Button, ButtonVariation, ButtonSizes } from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';

export const CreateTopic: FC<ForumSectionProps> = () => {
  const pageTitle = 'Форум. Создание новой темы в Разделе 1';
  return (
    <>
        <section className={style.pageContainer}>
        <h1 className={style.forum__title}  >
        {pageTitle}
        </h1>
         <div className={style.topic__container}>

         <div className={style.newmessage}>
        <form >
            <textarea 
              name="message"
              id="message"
              className={style.newmessage__text}
              rows={2}
              placeholder="Название темы"

            />
        </form>  
        </div> 
        <div className={style.newmessage}>
        <form >
            <textarea 
              name="message"
              id="message"
              className={style.newmessage__text}
              rows={4}
              placeholder="Сообщение"
            />
        </form>  
        </div> 
         <div >
            <Link to={links.CreateTopic.path}>
              <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              rounded>
              {links.CreateTopic.title}
              </Button>
            </Link>
        </div>
         </div>
      </section>
    </>
  );
};