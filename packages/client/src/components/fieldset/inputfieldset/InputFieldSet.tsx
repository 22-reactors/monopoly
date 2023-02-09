import style from './InputFieldSet.module.scss'
import classNames from 'classnames'

export type InputType = 'text' | 'password'

export interface IInputFieldSet {
    fieldId: string
    fieldName: string
    inputType: InputType
    isLightTheme?: boolean
}

const InputFieldSet = (props: IInputFieldSet) => {

    const labelClass = classNames(style.fieldsetLabel,
        props.isLightTheme ? style.labelLightTheme : style.labelDarkTheme)

    const inputClass = classNames(style.fieldsetInput,
        props.isLightTheme ? style.inputLightTheme : style.inputDarkTheme)

    return (        
        <fieldset className={style.fieldset}>
            <input
                id={props.fieldId}
                type={props.inputType}
                className={inputClass}
                placeholder=" " />
            <label className={labelClass}>{props.fieldName}</label>
        </fieldset>
    )
}

export default InputFieldSet
