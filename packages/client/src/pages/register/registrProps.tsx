import { IRegistrForm } from "./register";

const RegistrProps: IRegistrForm = {
    headerLevel: 'h2',
    headerName: 'Регистрация игрока',
    linkTitle: 'войти',
    linkAction: () => { console.log('router to login page') },
    submitBtnName: 'Зарегистрироваться',
    inputsProps: [
        {
            fieldId: 'email',
            fieldName: 'Почта',
            inputType: 'text'
        },
        {
            fieldId: 'login',
            fieldName: 'Логин',
            inputType: 'text'
        },
        {
            fieldId: 'name',
            fieldName: 'Имя',
            inputType: 'text'
        },
        {
            fieldId: 'surname',
            fieldName: 'Фамилия',
            inputType: 'text'
        },
        {
            fieldId: 'phone',
            fieldName: 'Телефон',
            inputType: 'text'
        },
        {
            fieldId: 'password',
            fieldName: 'Пароль',
            inputType: 'password'
        },
        {
            fieldId: 'checkPwd',
            fieldName: 'Пароль ещё раз',
            inputType: 'password'
        }
    ]
}

export default RegistrProps;
