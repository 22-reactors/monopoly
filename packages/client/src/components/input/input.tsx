import classNames from 'classnames';
import { ChangeEvent, HTMLProps, useRef, useState } from 'react';
import EyeIcon from '../../icons/EyeIcon';
import { IValidationInputProps } from '../../types/validation';
import style from './input.module.scss';

interface Props extends IValidationInputProps {
  value: HTMLProps<HTMLInputElement>['value'];
  label?: string;
  type?: HTMLProps<HTMLInputElement>['type'];
  showPassword?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: Props) {
  const { type, value, label, onChange, showPassword, onBlur, errorText } =
    props;

  const [labelFocus, setLabelFocus] = useState(!!value);
  const [showPasswordComputed, setShowPasswordComputed] = useState(false);

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

  const onClickEyeShow = () => {
    setShowPasswordComputed(prev => !prev);
  };

  const isValid = !!errorText;
  const inputType = showPasswordComputed ? 'text' : type ?? 'text';

  return (
    <div
      tabIndex={0}
      className={classNames(style.container, isValid && style.errorContainer)}
      onFocus={onInputContainerFocus}>
      <input
        ref={inputRef}
        className={style.input}
        onChange={onChange}
        type={inputType}
        onBlur={onInputBlur}
        value={value}
      />
      <label
        className={classNames(style.label, labelFocus && style.labelFocus)}>
        {label}
      </label>
      {errorText && <div className={style.error}>{errorText}</div>}
      {showPassword && (
        <EyeIcon className={style.eyeIcon} onClick={onClickEyeShow} />
      )}
    </div>
  );
}

export default Input;
