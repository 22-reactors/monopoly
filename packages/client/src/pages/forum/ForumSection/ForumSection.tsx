//Раздел форума. включает список тем и кол-во сообщений

import { FC, useEffect, useState } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from './typings';
import {
  Button,
  ButtonVariation,
  ButtonSizes,
} from '../../../components/button/button';
import { Link, useParams } from 'react-router-dom';
import { links } from '../../../utils/const';
import { ThemeCard } from '../../../components/themeCard/themeCard';
import { Paginator } from '../../../components/paginator/paginator';
import ForumController from '../../../controllers/forum';
import { ITopicsList } from '../../../api/forum/interfaces';

const defaultTopicsList: ITopicsList = { topics: [], sectionTitle: 'Раздел' };

export const ForumSection: FC<ForumSectionProps> = () => {
  const [{ topics, sectionTitle }, setTopicsList] =
    useState<ITopicsList>(defaultTopicsList);
  const { sectionId } = useParams();

  useEffect(() => {
    const getTopicsList = async () => {
      const data = await ForumController.getTopics(Number(sectionId));
      if (data) {
        setTopicsList(data);
      }
    };
    getTopicsList();
  }, []);

  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.title}>
          {sectionTitle}
          <div className={style.forum__button}>
            <Link to={links.createTopic.path}>
              <Button
                variation={ButtonVariation.PRIMARY}
                size={ButtonSizes.MEDIUM}
                rounded>
                {links.createTopic.title}
              </Button>
            </Link>
          </div>
        </h1>
        {topics.map(topic => (
          <Link
            className={style.link}
            to={`${links.forumTopic.path}/${topic.id}`}>
            <ThemeCard {...topic} />
          </Link>
        ))}
        <Paginator className={style.paginator} pagesCount={4} />
      </section>
    </>
  );
};
