import { useState } from 'react'
import style from './themeToggler.module.scss'
import classNames from 'classnames'
import React from 'react'

export type themePropsType = {
    isLightTheme?: boolean
}

interface IThemeToggler {
    children: JSX.Element | JSX.Element[]
}

const ThemeToggler = (props: IThemeToggler) => {
    const [isLightTheme, setIsLightTheme] = useState(true)

    const toggleTheme = () => {
        setIsLightTheme(lightTheme => !lightTheme)
    }

    const themeContainerClass = classNames(style.formContainer,
        isLightTheme ? style.formContainerLightTheme : style.formContainerDarkTheme)

    const toggleBtn = classNames(style.themeTogglerBtn,
        isLightTheme ? style.sunIcon : style.moonIcon)

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<themePropsType>, 
                {isLightTheme: isLightTheme})
        }
        return child;
    });

    return (
        <>
            <div className={themeContainerClass}>
                {childrenWithProps}
            </div>
            <div className={style.themeTogglerBtnContainer}>
                <button onClick={toggleTheme} className={toggleBtn}></button>
            </div>
        </>
    )
}

export default ThemeToggler
