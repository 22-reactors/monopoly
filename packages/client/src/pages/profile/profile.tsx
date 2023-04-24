import style from './profile.module.scss';
import { FieldInfo, Info } from '../../components/info/info';
import Avatar from '../../components/avatar/avatar';
import { useEffect, useState } from 'react';
import { IUserData } from '../../api/auth/interfaces';
import { useAppSelector } from '../../reduxstore/hooks';
import { userSelector } from '../../reduxstore/user/user.selector';
import { links } from '../../utils/const';
import { useNav } from '../../hooks/useNav';

export const FieldMap: Record<string, FieldInfo> = {
  email: {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Почта',
    value: '',
  },
  login: {
    id: 'login',
    name: 'login',
    type: 'text',
    label: 'Логин',
    value: '',
  },
  first_name: {
    id: 'first_name',
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    value: '',
  },
  second_name: {
    id: 'second_name',
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    value: '',
  },
  display_name: {
    id: 'display_name',
    name: 'display_name',
    type: 'text',
    label: 'Имя в чате',
    value: '',
  },
  phone: {
    id: 'phone',
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    value: '',
  },
};

const PASSWORD_FIELDS = [
  {
    id: 'oldPassword',
    name: 'oldPassword',
    type: 'password',
    label: 'Старый пароль',
    value: '',
  },
  {
    id: 'newPassword',
    name: 'newPassword',
    type: 'password',
    label: 'Новый пароль',
    value: '',
  },
];

const defaultUserFields = Object.values(FieldMap);

export function ProfilePage(): JSX.Element {
  const user = useAppSelector(userSelector);

  const [fields, setFields] = useState<FieldInfo[]>(defaultUserFields);
  const [avatar, setAvatar] = useState<string>('');

  useNav(links.login.path, true);

  useEffect(() => {
    const userFields = user ? connectorUserFields(user) : defaultUserFields;

    if (user?.avatar) {
      setAvatar(user.avatar);
    }

    setFields(userFields);
  }, [user]);

  return (
    <main className={style.wrapper}>
      <h2 className={style.title}>Профиль</h2>
      <div className={style.container}>
        <Avatar src={avatar} />
        <Info fields={fields} validation />
      </div>
    </main>
  );
}

function connectorUserFields(userInfo?: IUserData): FieldInfo[] {
  if (!userInfo?.login) {
    return [];
  }

  const filteredFields = Object.entries(userInfo)
    .map(([key, value]) => ({ ...FieldMap[key], value }))
    .filter(field => FieldMap[field.name]);

  return [...filteredFields, ...PASSWORD_FIELDS];
}
