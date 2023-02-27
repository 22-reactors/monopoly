import { createRoutesFromElements, Route } from 'react-router-dom';

import { Forum } from './forum';
import { ForumSection } from './ForumSection';
import { ForumTopic } from './ForumTopic';

export enum Paths {
    Forum = '/forum',
    Section = '/forum/section',
    Topic = '/topic',
  }

  export const routes = createRoutesFromElements(
<>
<Route path={Paths.Forum}>
          <Route index={true} element={<Forum />}></Route>
          <Route path={`${Paths.Section}/:sectionId`}>
            <Route index={true} element={<ForumSection />}></Route>
            <Route path={`${Paths.Section}/:sectionId/${Paths.Topic}/:topicId`} element={<ForumTopic />}></Route>
          </Route>
</Route>
</>
  )