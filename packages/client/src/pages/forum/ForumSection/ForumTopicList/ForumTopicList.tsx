//Список топиков в N-м разделе форума.  вариант1 на будущее- с составными путями

import { type FC } from 'react';
import { Link } from 'react-router-dom';
import style from '../../forum.module.scss';
//import { Paths } from '../constants';
import { type ForumTopicListProps } from './typings';
//import { Paginator } from '../../../../components/paginator/paginator';
export enum Paths {
  Forum = '/forum',
  Section = '/forum/section',
  Topic = '/topic',
}

export const ForumTopicList: FC<ForumTopicListProps> = ({ topicList, sectionId }) => {
  return (
    <div className={style.forum}>
    <table border={0} className={style.forum__body}>
        {topicList.map(item => (
          <tr key={item.id}  className={style.forum__item}>
            <td className={style.forum__name}>
              <Link to={`${Paths.Section}/${sectionId}${Paths.Topic}/${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.messages}</td>
          </tr>
        ))}
    </table>
    </div>
  );
};
