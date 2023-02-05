import style from "./link.module.scss"
import classNames from 'classnames'

interface ILink {
    title: string
    action: React.MouseEventHandler<HTMLAnchorElement>
    className?: string
    isLightTheme?: boolean
}

const Link = (props: ILink) => {

    const linkClass = classNames(
        [props.className ? props.className : ''],
        [props.isLightTheme ? style.linkLightTheme : style.linkDarkTheme])

    return (
        <a href="#" onClick={props.action} className={linkClass}>{props.title}</a>
    )
}

export default Link
