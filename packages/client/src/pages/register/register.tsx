import InputFieldSet from '../../components/fieldset/inputfieldset'
import { InputTypeEnum } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler'
import style from './register.module.scss'

interface IRegistrInput {
    fieldId: string
    fieldName: string
    inputType: InputTypeEnum
}

export interface IRegistrForm {
    headerLevel: React.ElementType
    submitBtnName: string
    headerName: string
    linkTitle: string
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    inputsProps: IRegistrInput[]
}

interface IRegistr {
    registrProps: IRegistrForm
}

const Register = (props: IRegistr) => {

    const registrFormProps = props.registrProps;
    const registrInputsProps = registrFormProps.inputsProps;

    const inputItems = registrInputsProps.map((inputProp, i) => {
        return <InputFieldSet key={i}
            fieldId={inputProp.fieldId}
            fieldName={inputProp.fieldName}
            inputType={inputProp.inputType} />
    })

    return (
        <div className={style.registrBackground}>
            <ThemeToggler>
                <LoginAndRegistrForm
                    headerLevel={registrFormProps.headerLevel}
                    headerName={registrFormProps.headerName}
                    linkTitle={registrFormProps.linkTitle}
                    linkAction={registrFormProps.linkAction}
                    submitBtnName={registrFormProps.submitBtnName}>
                    {inputItems}
                </LoginAndRegistrForm>
            </ThemeToggler>
        </div>
    )
};

export default Register
