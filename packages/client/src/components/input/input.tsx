import classNames from 'classnames';
import { ChangeEvent, HTMLProps, useRef, useState } from 'react';
import style from './input.module.scss';

interface Props {
  value: HTMLProps<HTMLInputElement>['value'];
  label?: string;
  type?: HTMLProps<HTMLInputElement>['type'];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: Props) {
  const { type, value, label, onChange, onBlur } = props;

  const [labelFocus, setLabelFocus] = useState(!!value);

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputContainerFocus = () => {
    setLabelFocus(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      setLabelFocus(false);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div
      tabIndex={0}
      className={style.container}
      onFocus={onInputContainerFocus}>
      <input
        ref={inputRef}
        className={style.input}
        onChange={onChange}
        type={type || 'text'}
        onBlur={onInputBlur}
        value={value}
      />
      <label
        className={classNames(style.label, labelFocus && style.labelFocus)}>
        {label}
      </label>
    </div>
  );
}

export default Input;
