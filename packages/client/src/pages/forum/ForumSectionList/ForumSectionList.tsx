//Список разделов с кол-вом тем и сообщений в них

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../forum.module.scss';
import { Paginator } from '../../../components/paginator/paginator';
import { ISection } from '../../../api/forum/interfaces';
import ForumController from '../../../controllers/forum';
import { links } from '../../../utils/const';

const sectionTitles: string[] = [
  'Как играть',
  'Технические вопросы',
  'Доска объявлений',
  'Геймдизайнеры',
  'Технологии',
  'Предложения',
  'Флуд',
];

const ITEMS_PER_PAGE = 5;
const pagesCount = Math.ceil(sectionTitles.length / ITEMS_PER_PAGE);

export const ForumSectionList = () => {
  const [sections, setSections] = useState<ISection[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const createSections = async () => {
      const sections = await ForumController.createSections(sectionTitles);
      if (sections) {
        setSections(sections);
      }
    };
    createSections();
  }, []);

  const showPage = (pageNumber: number) => {
    setPage(pageNumber);
    console.log(pageNumber);
  };

  return (
    <>
      <div className={style.forum}>
        <table border={0} className={style.forum__body}>
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
                  <span className={style.forum__cell__1}> темы</span>
                </td>
                <td className={style.forum__cell}>
                  {item.messagesCount}
                  <span className={style.forum__cell__1}> Сообщения</span>
                </td>
              </tr>
            ))}
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
