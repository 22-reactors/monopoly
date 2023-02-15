import { ILoginData } from '../api/auth.api';
import AuthController from '../controllers/auth.controller';
import { ILoginForm } from '../pages/login/login';

const LoginProps: ILoginForm = {
  headerName: 'Вход в игру',
  linkTitle: 'создать аккаунт',
  linkAction: () => {
    console.log('router to registr page');
  },
  formAction: async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ILoginData = { login: 'jBrown', password: 'abcdefghi1' };
/*     try {
      const response = await fetch(
        'https://ya-praktikum.tech/api/v2/auth/signin',
        {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } */
    AuthController.login(data);
  },
  submitBtnName: 'Войти',
  inputsProps: [
    {
      fieldId: 'login',
      fieldName: 'Логин',
      inputType: 'text',
    },
    {
      fieldId: 'password',
      fieldName: 'Пароль',
      inputType: 'password',
    },
  ],
};

export default LoginProps;
