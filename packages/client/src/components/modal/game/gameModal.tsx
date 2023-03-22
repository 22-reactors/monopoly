import style from './gameModal.module.scss';
import classNames from 'classnames';

interface IGameModal {
    title: string;
    show: boolean;
    children: JSX.Element | JSX.Element[];
    childrenClassName?: string;
    width?: number
}

export const GameModal = (props: IGameModal) => {
    const { title, children, show, childrenClassName, width } = props;

    const widthStyle = {
        width: width ?? 'auto'
    };

    const showHideClassName = classNames(style.modal, show ? style.displayBlock : style.displayNone);
    const childrenStyle = childrenClassName ?? style.defaultChildrenClassName;

    return (
        <div className={showHideClassName}>
            <main
                className={style.modalMain}
                style={widthStyle}>
                <h1 className={style.title}>{title}</h1>
                <div className={childrenStyle}>
                    {children}
                </div>
            </main>
        </div>
    );
}
