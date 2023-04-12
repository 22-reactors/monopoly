import style from './gameModal.module.scss';
import classNames from 'classnames';

interface IGameModal {
  title: string;
  show: boolean;
  children: JSX.Element | JSX.Element[];
  childrenClassName?: string;
}

export const GameModal = ({
  title,
  children,
  show,
  childrenClassName,
}: IGameModal) => {
  const showModal = classNames(style.modal, show ? style.show : style.hide);
  const childrenStyle = childrenClassName ?? style.defaultChildrenClassName;

  return (
    <dialog className={showModal}>
      <main className={style.modalMain}>
        <h1 className={style.title}>{title}</h1>
        <div className={childrenStyle}>{children}</div>
      </main>
    </dialog>
  );
};
