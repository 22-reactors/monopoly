import { ILoginProps } from "../pages/login/login";

const LoginProps: ILoginProps = {
  title: 'Войти',
  linkTitle: 'У вас нет аккаунта?',
  linkName: 'Регистрация',
  linkAction: () => {
    console.log('router to registr page');
  },
  formAction: () => {
    console.log('router to submit');
  },
  submitBtnName: 'Войти',
  inputsProps: [
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
      value: '',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      value: '',
    },
  ],
};

export default LoginProps;
