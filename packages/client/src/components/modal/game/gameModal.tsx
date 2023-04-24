import style from './gameModal.module.scss';
import classNames from 'classnames';
import { playMp3sound } from '../../../service/media/media';

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
  if (show) {
    setTimeout(
      () =>
        playMp3sound('/music/notification.mp3', {
          volume: 0.3,
        }),
      1000
    );
  }
  return (
    <dialog className={showModal}>
      <main className={style.modalMain}>
        <h1 className={style.title}>{title}</h1>
        <div className={childrenStyle}>{children}</div>
      </main>
    </dialog>
  );
};
