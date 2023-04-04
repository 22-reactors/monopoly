//Список разделов с кол-вом тем и сообщений в них

import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from '../forum.module.scss';
import { type ForumSectionListProps } from './typings';
import { Paginator } from '../../../components/paginator/paginator';

export enum Paths {
  Forum = '/forum',
  Section = '/forum/section',
  Topic = '/topic',
}

export const ForumSectionList: FC<ForumSectionListProps> = ({
  sectionList,
}) => {
  return (
    <div className={style.forum}>
      <table border={0} className={style.forum__body}>
        {sectionList.map(item => (
          <tr key={item.id} className={style.forum__item}>
            <td className={style.forum__name}>
              <Link className={style.link} to={`${Paths.Section}/${item.id}`}>
                {item.name}
              </Link>
            </td>
            <td className={style.forum__cell}>
              {item.topicCount}
              <text className={style.forum__cell__1}>темы</text>
            </td>
            <td className={style.forum__cell}>
              {item.messages}
              <text className={style.forum__cell__1}>Сообщения</text>
            </td>
          </tr>
        ))}
      </table>
      <Paginator className={style.paginator} pagesCount={4} />
    </div>
  );
};
