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
import { links, resourceURL } from '../../../utils/const';
import { ThemeCard } from '../../../components/themeCard/themeCard';
import { Paginator } from '../../../components/paginator/paginator';
import ForumController from '../../../controllers/forum';
import { ITopics } from '../../../api/forum/interfaces';
import { usePaginator } from '../../../hooks/usePaginator';
import { IUserAvatar } from '../../../components/userAvatar/userAvatar';

const defaultTopicsList: ITopics = { topics: [], sectionTitle: 'Раздел' };

const ITEMS_PER_PAGE = 3;

export const ForumSection: FC<ForumSectionProps> = () => {
  const [{ topics, sectionTitle }, setTopicsList] = useState(defaultTopicsList);
  const [page, showPage] = usePaginator(1);

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

  const pagesCount = Math.ceil(topics.length / ITEMS_PER_PAGE);

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
        <div className={style.topics}>
          {topics
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            .map(topic => {
              const avatar: IUserAvatar = {
                src: `${resourceURL}${topic.userData.avatar}`,
                name: topic.userData.display_name,
              };
              return (
                <Link
                  key={topic.id}
                  className={style.link}
                  to={`${links.forumTopic.path}/${topic.id}`}>
                  <ThemeCard {...topic} avatar={avatar} />
                </Link>
              );
            })}
        </div>
        {pagesCount > 1 && (
          <Paginator
            className={style.paginator}
            pagesCount={pagesCount}
            pageHandler={showPage}
          />
        )}
      </section>
    </>
  );
};
