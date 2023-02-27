import { ILoginProps } from "../pages/login/login";
import { links } from "../utils/const";

const LoginProps: ILoginProps = {
  title: 'Вход',
  linkTitle: 'У вас нет аккаунта?',
  linkName: 'Регистрация',
  linkPath: links.signup.path,
  isDarkTheme: false,
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
