//Список разделов с кол-вом тем и сообщений в них

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../forum.module.scss';
import { Paginator } from '../../../components/paginator/paginator';
import { ISection } from '../../../api/forum/interfaces';
import ForumController from '../../../controllers/forum';
import { links } from '../../../utils/const';
import { usePaginator } from '../../../hooks/usePaginator';
import { getDeclensionWord } from '../../../utils/helpers';

const sectionTitles: string[] = [
  'Как играть',
  'Технические вопросы',
  'Доска объявлений',
  'Геймдизайнеры',
  'Технологии',
  'Предложения',
  'Флуд',
];

const TOPIC_WORD_MAP = { single: 'тема', some: 'темы', more: 'тем' };
const MESSAGE_WORD_MAP = {
  single: 'сообщение',
  some: 'сообщения',
  more: 'сообщений',
};

const ITEMS_PER_PAGE = 3;
const pagesCount = Math.ceil(sectionTitles.length / ITEMS_PER_PAGE);

export const ForumSectionList = () => {
  const [sections, setSections] = useState<ISection[]>([]);
  const [page, showPage] = usePaginator(1);

  useEffect(() => {
    const createSections = async () => {
      const sections = await ForumController.createSections(sectionTitles);
      if (sections) {
        setSections(sections);
      }
    };
    createSections();
  }, []);

  return (
    <>
      <h1 className={style.title}>Форум</h1>
      <div className={style.forum}>
        <table border={0} className={style.forum__body}>
          <tbody>
            {sections
              .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
              .map(item => (
                <tr key={item.id} className={style.forum__item}>
                  <td className={style.forum__name}>
                    <Link
                      className={style.link}
                      to={`${links.forumSection.path}/${item.id}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td className={style.forum__cell}>
                    {item.topicsCount}
                    <span className={style.forum__cell__1}>
                      {` ${getDeclensionWord(
                        item.topicsCount,
                        TOPIC_WORD_MAP
                      )}`}
                    </span>
                  </td>
                  <td className={style.forum__cell}>
                    {item.messagesCount}
                    <span className={style.forum__cell__1}>
                      {` ${getDeclensionWord(
                        item.messagesCount,
                        MESSAGE_WORD_MAP
                      )}`}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {pagesCount > 1 && (
          <Paginator
            className={style.paginator}
            pagesCount={pagesCount}
            pageHandler={showPage}
          />
        )}
      </div>
    </>
  );
};
