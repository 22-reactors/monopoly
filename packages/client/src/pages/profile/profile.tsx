import style from "./profile.module.scss";
import { Avatar } from '../../components/avatar/avatar'
import { Info } from '../../components/info/info'
import { fields } from '../../mocs/profile-fields'
import { unAuthorizedRedirect } from "../../utils/helpers";

export const profileLoader = unAuthorizedRedirect;

export function ProfilePage(): JSX.Element {
  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <Info fields={fields}/>
        <Avatar/>
      </div>
    </main>
  );
}
