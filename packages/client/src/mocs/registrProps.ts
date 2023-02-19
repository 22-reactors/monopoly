import { IRegistrForm } from '../pages/register/register';

const RegistrProps: IRegistrForm = {
  headerName: 'Регистрация игрока',
  linkTitle: 'войти',
  linkAction: () => {
    console.log('router to login page');
  },
  submitBtnName: 'Зарегистрироваться',
  inputsProps: [
    {
      fieldId: 'email',
      fieldName: 'Почта',
      inputType: 'text',
    },
    {
      fieldId: 'login',
      fieldName: 'Логин',
      inputType: 'text',
    },
    {
      fieldId: 'first_name',
      fieldName: 'Имя',
      inputType: 'text',
    },
    {
      fieldId: 'second_name',
      fieldName: 'Фамилия',
      inputType: 'text',
    },
    {
      fieldId: 'phone',
      fieldName: 'Телефон',
      inputType: 'text',
    },
    {
      fieldId: 'password',
      fieldName: 'Пароль',
      inputType: 'password',
    },
    {
      fieldId: 'confirmPassword',
      fieldName: 'Пароль ещё раз',
      inputType: 'password',
    },
  ],
};

export default RegistrProps;
