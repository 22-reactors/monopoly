import InputFieldSet from '../../components/fieldset/inputfieldset'
import { InputType } from '../../components/fieldset/inputfieldset/InputFieldSet'
import LoginAndRegistrForm from '../../components/form/loginandregistrform'
import ThemeToggler from '../../components/themetoggler'
import style from './login.module.scss'

interface ILoginInput {
    fieldId: string
    fieldName: string
    inputType: InputType
}

export interface ILoginForm {
    headerLevel: React.ElementType
    submitBtnName: string
    headerName: string
    linkTitle: string
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    formAction: React.FormEventHandler<HTMLFormElement>
    inputsProps: ILoginInput[]
}

const Login = (props: ILoginForm) => {

    const { inputsProps } = props;

    const inputItems = inputsProps.map((inputProp, i) => {
        return <InputFieldSet key={i} {...inputProp}/>
    })

    return (
        <div className={style.bg}>
            <ThemeToggler>
                <LoginAndRegistrForm
                    {...props}>
                    {inputItems}
                </LoginAndRegistrForm>
            </ThemeToggler>
        </div>
    )
}

export default Login
