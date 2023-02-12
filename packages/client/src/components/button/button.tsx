import style from '../button/button.module.scss';
import classNames from 'classnames';

export const enum ButtonVariation {
  PRIMARY = "primary",
  OUTLINED = "outlined",
}

export const enum ButtonSizes {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export interface IButton {
  className?: string;
  variation: ButtonVariation;
  text: string;
  type?: 'button' | 'submit';
  size?: ButtonSizes;
  rounded?: boolean;
  isHide?: boolean;
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
        props.isHide && style.hide
      )}
      type={props.type ?? 'button'}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
