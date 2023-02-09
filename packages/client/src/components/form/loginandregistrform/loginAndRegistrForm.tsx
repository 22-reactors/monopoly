import React from 'react'
import style from './loginAndRegistrForm.module.scss'
import classNames from 'classnames'
import { themePropsType } from '../../themetoggler/ThemeToggler'

export interface ILoginAndRegistrForm {
    submitBtnName: string
    children: JSX.Element | JSX.Element[]
    headerName: string
    linkTitle: string
    isLightTheme?: boolean
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    formAction: React.FormEventHandler<HTMLFormElement>
}

const LoginAndRegistrForm = (props: ILoginAndRegistrForm) => {

    const headerClass = classNames(
        props.isLightTheme ? style.headerLightTheme : style.headerDarkTheme)

    const btnClass = classNames(style.submitFormBtn,
        props.isLightTheme ? style.btnLightTheme : style.btnDarkTheme)

    const linkClass = classNames(
        props.isLightTheme ? style.linkLightTheme : style.linkDarkTheme)

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<themePropsType>,
                { isLightTheme: props.isLightTheme })
        }
        return child;
    })

    return (
        <>
            <div className={style.headerFormContainer}>
                <h2 className={headerClass}>{props.headerName}</h2>
                <a href="#" onClick={props.linkAction}
                    className={linkClass}>{props.linkTitle}</a>
            </div>
            <form className={style.form} onSubmit={props.formAction}>
                {childrenWithProps}
                <button className={btnClass}>{props.submitBtnName}</button>
            </form>
        </>
    )
}

export default LoginAndRegistrForm
