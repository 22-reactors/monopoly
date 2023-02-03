import styles from './InputFieldSet.module.css'

export type InputTypeEnum = 'text' | 'password'

export interface IInputFieldSet {
    fieldId: string
    fieldName: string
    inputType: InputTypeEnum
}

const InputFieldSet = (props: IInputFieldSet) => {
    return (
        <fieldset className={styles.fieldset}>
            <input
                id={props.fieldId}
                type={props.inputType}
                className={styles.fieldsetInput}
                placeholder=" " />
            <label className={styles.fieldsetLabel}>{props.fieldName}</label>
        </fieldset>
    )
}

export default InputFieldSet
