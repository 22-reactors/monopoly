import { IRegistrProps } from '../pages/register/register';

const RegistrProps: IRegistrProps = {
  title: 'Регистрация игрока',
  validation: true,
  linkAction: () => {
    console.log('router to login page');
  },
  submitBtnName: 'Зарегистрироваться',
  formAction: () => {
    console.log('router to submit');
  },
  inputsProps: [
    {
      name: 'email',
      label: 'Почта',
      type: 'text',
      value: '',
    },
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      value: '',
    },
    {
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      value: '',
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      value: '',
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      value: '',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      value: '',
    },
    {
      name: 'confirmPassword',
      label: 'Пароль ещё раз',
      type: 'password',
      value: '',
    },
  ],
};

export default RegistrProps;
