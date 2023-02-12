import style from './profile.module.scss';
import { Info } from '../../components/info/info';
import { fields } from '../../mocs/profile-fields';
import { unAuthorizedRedirect } from '../../utils/helpers';
import Avatar from '../../components/avatar/avatar';

export const profileLoader = unAuthorizedRedirect;

export function ProfilePage(): JSX.Element {
  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <Info fields={fields} />
        <Avatar />
      </div>
    </main>
  );
}
