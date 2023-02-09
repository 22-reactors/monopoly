import { FieldInfo } from '../components/info/info';

export const fields: FieldInfo[] = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    value: 'ivan@yandex.ru',
    label: 'Почта',
  },
  {
    id: 'login',
    name: 'login',
    type: 'text',
    value: 'ivanbest007',
    label: 'Логин',
  },
  {
    id: 'name',
    name: 'name',
    type: 'text',
    value: 'Иван',
    label: 'Имя',
  },
  {
    id: 'second_name',
    name: 'second_name',
    type: 'text',
    value: 'Иванов',
    label: 'Фамилия',
  },
  {
    id: 'display_name',
    name: 'display_name',
    type: 'text',
    value: 'Vano',
    label: 'Имя в чате',
  },
  {
    id: 'phone',
    name: 'phone',
    type: 'tel',
    value: '+79998887766',
    label: 'Телефон',
  },
];
