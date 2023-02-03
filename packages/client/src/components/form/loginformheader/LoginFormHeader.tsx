import styles from './LoginFormHeader.module.css'

interface ILoginFormHeader {
    headerName: string
    hrefName: string
}

const LoginFormHeader = (props: ILoginFormHeader) => {
    return (
        <div className={styles.headerFormContainer}>
            <h3>{props.headerName}</h3>
            <a href="#">{props.hrefName}</a>
        </div>
    )
}

export default LoginFormHeader
