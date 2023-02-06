import classNames from 'classnames'
import style from './header.module.scss'

interface IHeader {
    headingLevel: React.ElementType
    className?: string
    children: string | JSX.Element | JSX.Element[]
    isLightTheme?: boolean
}

const Header = (props: IHeader) => {

    const headerClass = classNames(
        props.className,
        props.isLightTheme ? style.headerLightTheme : style.headerDarkTheme)


    const Header = props.headingLevel;
    return <Header className={headerClass}>{props.children}</Header>
}

export default Header;
