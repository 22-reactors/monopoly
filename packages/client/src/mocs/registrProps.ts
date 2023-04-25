import { IRegistrProps } from '../pages/register/register';
import { InputId } from '../service/validate/validate';

const RegistrProps: IRegistrProps = {
  title: 'Регистрация игрока',
  validation: true,
  isDarkTheme: false,
  submitBtnName: 'Зарегистрироваться',
  formAction: () => {
    console.log('router to submit');
  },
  inputsProps: [
    {
      name: InputId.EMAIL,
      label: 'Почта',
      type: 'text',
      value: '',
    },
    {
      name: InputId.LOGIN,
      label: 'Логин',
      type: 'text',
      value: '',
    },
    {
      name: InputId.FIRST_NAME,
      label: 'Имя',
      type: 'text',
      value: '',
    },
    {
      name: InputId.SECOND_NAME,
      label: 'Фамилия',
      type: 'text',
      value: '',
    },
    {
      name: InputId.PHONE,
      label: 'Телефон',
      type: 'text',
      value: '',
    },
    {
      name: InputId.PASSWORD,
      label: 'Пароль',
      type: 'password',
      value: '',
    },
    {
      name: InputId.CONFIRM_PASSWORD,
      label: 'Пароль ещё раз',
      type: 'password',
      value: '',
    },
  ],
};

export default RegistrProps;
