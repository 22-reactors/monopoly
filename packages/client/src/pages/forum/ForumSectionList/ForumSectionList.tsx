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
  'Флуд',
];

export const ForumSectionList = () => {
  const [sections, setSections] = useState<ISection[]>([]);

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
          {sections.map(item => {
            return (
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
            );
          })}
        </table>
        <Paginator className={style.paginator} pagesCount={4} />
      </div>
    </>
  );
};
