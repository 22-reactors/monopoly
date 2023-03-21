import { ILoginProps } from '../pages/login/login';
import { InputId } from '../service/validate/validate';
import { links } from '../utils/const';

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
      name: InputId.LOGIN,
      label: 'Логин',
      type: 'text',
      value: '',
    },
    {
      name: InputId.PASSWORD,
      label: 'Пароль',
      type: 'password',
      value: '',
    },
  ],
};

export default LoginProps;
