import LoginBackGroundTheme from '../../components/backgroundtheme/loginbackgroundtheme'
import InputFieldSet from '../../components/fieldset/inputfieldset'
import { LoginForm, LoginFormHeader } from '../../components/form'
import ThemeToggler from '../../components/themetoggler'
import './register.module.scss'

const Register = () => {
    return (
        <LoginBackGroundTheme>
            <ThemeToggler>
                <LoginFormHeader
                    headerName="Вход в игру"
                    hrefName="создать аккаунт" />
                <LoginForm submitBtnName="Войти">
                    <InputFieldSet
                        fieldId="email"
                        fieldName="Почта"
                        inputType="text"
                        key="1" />
                    <InputFieldSet
                        fieldId="login"
                        fieldName="Логин"
                        inputType="text"
                        key="2" />
                    <InputFieldSet
                        fieldId="name"
                        fieldName="Имя"
                        inputType="text"
                        key="3" />
                    <InputFieldSet
                        fieldId="surname"
                        fieldName="Фамилия"
                        inputType="text"
                        key="4" />
                    <InputFieldSet
                        fieldId="phone"
                        fieldName="Телефон"
                        inputType="text"
                        key="5" />
                    <InputFieldSet
                        fieldId="password"
                        fieldName="Пароль"
                        inputType="password"
                        key="6" />
                    <InputFieldSet
                        fieldId="checkPwd"
                        fieldName="Пароль ещё раз"
                        inputType="password"
                        key="7" />
                </LoginForm>
            </ThemeToggler>
        </LoginBackGroundTheme>
    )
};

export default Register
