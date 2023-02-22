import { ILoginProps } from "../pages/login/login";

const LoginProps: ILoginForm = {
    title: 'Войти',
    linkTitle: 'У вас нет аккаунта?',
    linkName: "Регистрация",
    linkAction: () => { console.log('router to registr page') },
    formAction: () => { console.log('router to submit') },
    submitBtnName: 'Войти',
    inputsProps: [
        {
            fieldId: 'login',
            fieldName: 'Логин',
            inputType: 'text'
        },
        {
            fieldId: 'password',
            fieldName: 'Пароль',
            inputType: 'password'
        }
    ]
}

export default LoginProps;
