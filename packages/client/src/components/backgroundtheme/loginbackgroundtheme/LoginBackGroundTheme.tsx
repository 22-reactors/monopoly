import styles from './loginBackGroundTheme.module.scss'

interface ILoginBackGroundTheme {
    children: JSX.Element | JSX.Element[]
}

const LoginBackGroundTheme = (props: ILoginBackGroundTheme) => {
    return (
        <div className={styles.loginBackground}>
            {props.children}
        </div>
    )
}

export default LoginBackGroundTheme
