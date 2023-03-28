//Создание новой темы на форуме

import { useState, FC } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from '../ForumSection/typings';
import { Button, ButtonVariation, ButtonSizes } from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import Textarea from '../../../components/textarea/textarea';


export const CreateTopic: FC<ForumSectionProps> = () => {
  const pageTitle = 'Форум. Создание новой темы в Разделе 1';

  const [topic, setTopic] = useState ('');
  const [message, setMessage] = useState ('');

  return (
    <>
        <section className={style.pageContainer}>
        <h1 className={style.title}  >
        {pageTitle}
        </h1>
         <div className={style.topic__container}>

         <div className={style.newmessage}>
        <form >
            <Textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            label='Введите название темы'
            />
        </form>  
        </div> 
        <div className={style.newmessage}>
        <form >
        <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            label='Введите сообщение'
            solo
            />
        </form>  
        </div> 
            <Link to={links.CreateTopic.path}>
              <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              rounded>
              {links.CreateTopic.title}
              </Button>
            </Link>
        </div>
        
      </section>
    </>
  );
};