import { type FC } from 'react';
import { Link } from 'react-router-dom';
import style from '../forum.module.scss';
//import { Paths } from '../src/pages/forum/constans';
import { type ForumSectionListProps } from './typings';
export enum Paths {
  Forum = '/forum',
  Section = '/forum/section',
  Topic = '/topic',
}

export const ForumSectionList: FC<ForumSectionListProps> = ({ sectionList }) => {
  return (
    <table border={1} className={style.forum}>
    
      <tbody className={style.forum__body}>
        {sectionList.map(item => (
          <tr key={item.id} className="forum__item">
            <td className="forum__first-column">
              <Link to={`${Paths.Section}/${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.topicCount}</td>
            <td>{item.messages}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
