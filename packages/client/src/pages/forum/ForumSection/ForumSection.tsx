import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import style from '../forum.module.scss';
import { ExampleSection as topicList } from '../ExampleData';
import { ForumTopicList } from './ForumTopicList';
import { type ForumSectionProps } from './typings';

export const ForumSection: FC<ForumSectionProps> = () => {
  const { sectionId } = useParams();
  return (
    <>
        <section className={style.forum__wrapper}>
        <h1 className="forum__title" data-testid="forum-section-title">
          Раздел {sectionId}
        </h1>
         <ForumTopicList topicList={topicList} sectionId={sectionId} />
      </section>
    </>
  );
};
