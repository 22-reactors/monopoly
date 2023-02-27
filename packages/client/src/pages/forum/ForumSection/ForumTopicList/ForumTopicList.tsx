import { type FC } from 'react';
import { Link } from 'react-router-dom';
import style from '../../forum.module.scss';
//import { Paths } from '../constants';
import { type ForumTopicListProps } from './typings';
export enum Paths {
  Forum = '/forum',
  Section = '/forum/section',
  Topic = '/topic',
}

export const ForumTopicList: FC<ForumTopicListProps> = ({ topicList, sectionId }) => {
  return (
    <table border={1} className={style.forum}>
      
      <tbody className="forum__body">
        {topicList.map(item => (
          <tr key={item.id} data-testid={item.id} className="forum__item">
            <td className="forum__first-column">
              <Link to={`${Paths.Section}/${sectionId}${Paths.Topic}/${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.messages}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
