//Раздел форума. включает список тем и кол-во сообщений

import { FC, useEffect, useState } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from './typings';
import {
  Button,
  ButtonVariation,
  ButtonSizes,
} from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import { ThemeCard } from '../../../components/themeCard/themeCard';
import { ThemeCardProps } from '../../../mocs/ForumProps';
import { Paginator } from '../../../components/paginator/paginator';
import ForumController from '../../../controllers/forum';
import { ITopic } from '../../../api/forum/interfaces';

export const ForumSection: FC<ForumSectionProps> = () => {
  const pageTitle = 'Форум 1';

  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const getTopics = async () => {
      const response = await ForumController.getTopics();
      if (response) {
        setTopics(response.topics);
      }
    };
    getTopics();
  }, []);

  const addTopic = () => {
    ForumController.addTopic({
      title: 'Как играть?',
      description: 'Правила игры',
      userLogin: 'petrovich',
    });
  };

  const getTopics = async () => {
    const response = await ForumController.getTopics();
    console.log(response);
  };

  const addComment = async () => {
    const response = await ForumController.addComment({
      topic_id: 1,
      parent_id: null,
      userLogin: 'petrovich',
      comment: 'Хей Хоу',
    });
    console.log(response);
  };

  const getComments = async () => {
    const response = await ForumController.getComments(1);
    console.log(response);
  };

  const deleteComment = async () => {
    const response = await ForumController.deleteComment(3);
    console.log(response);
  };

  const addEmoji = async () => {
    const response = await ForumController.addEmoji({
      comment_id: 2,
      emojiCode: '$#128518;',
      userLogin: 'petrovich',
    });
  };

  const getEmojis = async () => {
    const response = await ForumController.getEmojis('petrovich');
    console.log(response);
  };

  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.title}>
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
          <Button variation={ButtonVariation.OUTLINED} onClick={addTopic}>
            Создать топик
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={getTopics}>
            Получить топики
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={addComment}>
            Добавить коммент
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={getComments}>
            Получить комменты
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={deleteComment}>
            Удалить коммент
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={addEmoji}>
            Добавить эмодзи
          </Button>
          <Button variation={ButtonVariation.OUTLINED} onClick={getEmojis}>
            Получить эмодзи
          </Button>
        </h1>
        {/*         {topics.map(topic => )}
         */}{' '}
        <Link className={style.link} to={links.forumtopic1.path}>
          <ThemeCard {...ThemeCardProps} />
        </Link>
        <ThemeCard {...ThemeCardProps} />
        <ThemeCard {...ThemeCardProps} />
        <Paginator className={style.paginator} pagesCount={4} />
      </section>
    </>
  );
};
