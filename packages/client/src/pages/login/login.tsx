import InputFieldSet from '../../components/fieldset/inputfieldset'
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet'
import LoginAndRegistrForm from '../../components/form/loginandregistrform'
import ThemeToggler from '../../components/themetoggler'
import style from './login.module.scss'
import { authorizedRedirect } from "../../utils/helpers"

export const loginLoader = authorizedRedirect;

export interface ILoginForm {
    submitBtnName: string
    headerName: string
    linkTitle: string
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    formAction: React.FormEventHandler<HTMLFormElement>
    inputsProps: IInputFieldSet[]
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
