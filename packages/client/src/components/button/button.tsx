import style from '../button/button.module.scss';
import classNames from 'classnames';

export const enum ButtonVariation {
  PRIMARY = 'primary',
  OUTLINED = 'outlined',
}

export const enum ButtonSizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export interface IButton {
  className?: string;
  variation: ButtonVariation;
  type?: 'button' | 'submit';
  size?: ButtonSizes;
  rounded?: boolean;
  isHide?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?(): void;
}

export function Button(props: IButton) {
  return (
    <button
      className={classNames(
        props.className,
        style.btn,
        style[`btn_${props.variation}`],
        style[`btn_${props.size}`],
        props.rounded && style.rounded,
        props.disabled && style.disabled,
        props.isHide && style.hide
      )}
      disabled={props.disabled}
      type={props.type ?? 'button'}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
