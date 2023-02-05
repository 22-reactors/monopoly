import InputFieldSet from '../../components/fieldset/inputfieldset'
import { InputTypeEnum } from '../../components/fieldset/inputfieldset/InputFieldSet'
import LoginAndRegistrForm from '../../components/form/loginandregistrform'
import ThemeToggler from '../../components/themetoggler'
import style from './login.module.scss'

interface ILoginInput {
    fieldId: string
    fieldName: string
    inputType: InputTypeEnum
}

export interface ILoginForm {
    headerLevel: React.ElementType
    submitBtnName: string
    headerName: string
    linkTitle: string
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    inputsProps: ILoginInput[]
}

interface ILogin {
    loginProps: ILoginForm
}

const Login = (props: ILogin) => {

    const loginFormProps = props.loginProps;
    const loginInputsProps = loginFormProps.inputsProps;

    const inputItems = loginInputsProps.map((inputProp, i) => {
        return <InputFieldSet key={i}
            fieldId={inputProp.fieldId}
            fieldName={inputProp.fieldName}
            inputType={inputProp.inputType} />
    })

    return (
        <div className={style.loginBackground}>
            <ThemeToggler>
                <LoginAndRegistrForm
                    headerLevel={loginFormProps.headerLevel}
                    headerName={loginFormProps.headerName}
                    linkTitle={loginFormProps.linkTitle}
                    linkAction={loginFormProps.linkAction}
                    submitBtnName={loginFormProps.submitBtnName}>
                    {inputItems}
                </LoginAndRegistrForm>
            </ThemeToggler>
        </div>
    )
}

export default Login
