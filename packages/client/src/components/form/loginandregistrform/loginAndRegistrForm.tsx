import React from 'react'
import Header from '../../header'
import Link from '../../link'
import style from './loginAndRegistrForm.module.scss'
import classNames from 'classnames'
import { themePropsType } from '../../themetoggler/themeToggler'

export interface ILoginAndRegistrForm {
    headerLevel: React.ElementType
    submitBtnName: string
    children: JSX.Element | JSX.Element[]
    headerName: string
    linkTitle: string
    linkAction: React.MouseEventHandler<HTMLAnchorElement>
    isLightTheme?: boolean
}

const LoginAndRegistrForm = (props: ILoginAndRegistrForm) => {

    const btnClass = classNames(style.submitFormBtn,
        [props.isLightTheme ? style.btnLightTheme : style.btnDarkTheme])

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<themePropsType>, 
                {isLightTheme: props.isLightTheme})
        }
        return child;
    })

    return (
        <>
            <div className={style.headerFormContainer}>
                <Header
                    isLightTheme={props.isLightTheme}
                    headingLevel={props.headerLevel}>
                    {props.headerName}
                </Header>
                <Link
                    isLightTheme={props.isLightTheme}
                    action={props.linkAction}
                    title={props.linkTitle} />
            </div>
            <form className={style.form}>
                {childrenWithProps}
                <button className={btnClass}>{props.submitBtnName}</button>
            </form>
        </>
    )
}

export default LoginAndRegistrForm
