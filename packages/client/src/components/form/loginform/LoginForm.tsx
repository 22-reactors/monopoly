import styles from './LoginForm.module.scss'

interface ILoginForm {
    submitBtnName: string
    children: JSX.Element | JSX.Element[]
}

const LoginForm = (props: ILoginForm) => {
    return (
        <form className={styles.form}>
            {props.children}
            <button className={styles.submitFormBtn}>{props.submitBtnName}</button>
        </form>
    )
}

export default LoginForm
