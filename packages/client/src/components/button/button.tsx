import style from '../button/button.module.scss'
import classNames from 'classnames'

// https://www.fantasynamegenerators.com/alien-names.php
export const enum ButtonVariation {
  THRAKRAL = 'Thrakral',
  VRUTUKS = 'Vrutuks'
}

export interface IButton {
  className?: string;
  variation: ButtonVariation;
  text: string;
  type?: 'button' | 'submit';
  isHide?: boolean
  onClick?(): void;
}

export function Button(props: IButton) {
  return (
    <button
      className={classNames(
        props.className,
        style.btn,
        style[`btn_${props.variation}`],
        props.isHide && style.hide
      )}
      type={props.type || 'button'}
      {...props.onClick && {onClick: props.onClick}}
    >
      {props.text}
    </button>
  );
}
