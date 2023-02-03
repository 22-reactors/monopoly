import { useState } from 'react'
import styles from './ThemeToggler.module.css'

interface IThemeToggler {
    children: JSX.Element | JSX.Element[]
}

const ThemeToggler = (props: IThemeToggler) => {

    const [isLightTheme, setIsLightTheme] = useState(true)

    const toggleTheme = () => {
        setIsLightTheme(lightTheme => !lightTheme)
    }

    const themeIcon = isLightTheme ? styles.sunIcon : styles.moonIcon;
    const themeStyle = isLightTheme ? styles.formContainerLightTheme : styles.formContainerDarkTheme;

    return (
        <div>
            <div className={`${styles.formContainer} ${themeStyle}`}>
                {props.children}
            </div>
            <div className={styles.themeTogglerBtnContainer}>
                <button onClick={toggleTheme} className={`${styles.themeTogglerBtn} ${themeIcon}`}></button>
            </div>
        </div>
    )
}

export default ThemeToggler
