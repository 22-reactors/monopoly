import LoginBackGroundTheme from '../../components/backgroundtheme/loginbackgroundtheme'
import InputFieldSet from '../../components/fieldset/inputfieldset'
import { LoginForm, LoginFormHeader } from '../../components/form'
import ThemeToggler from '../../components/themetoggler'

const Login = () => {
    return (
        <LoginBackGroundTheme>
            <ThemeToggler>
                <LoginFormHeader
                    headerName="Вход в игру"
                    hrefName="создать аккаунт" />
                <LoginForm submitBtnName="Войти">
                    <InputFieldSet
                        fieldId="login"
                        fieldName="Логин"
                        inputType="text"
                        key="1" />
                    <InputFieldSet
                        fieldId="password"
                        fieldName="Пароль"
                        inputType="password"
                        key="2" />
                </LoginForm>
            </ThemeToggler>
        </LoginBackGroundTheme>
    )
}

export default Login
