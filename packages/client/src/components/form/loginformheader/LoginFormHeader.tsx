import styles from './loginFormHeader.module.scss'

interface ILoginFormHeader {
    headerName: string
    hrefName: string
}

const LoginFormHeader = (props: ILoginFormHeader) => {
    return (
        <div className={styles.headerFormContainer}>
            <h2>{props.headerName}</h2>
            <a href="#">{props.hrefName}</a>
        </div>
    )
}

export default LoginFormHeader
