import classNames from 'classnames';
import { ChangeEvent, HTMLProps, useEffect, useRef, useState } from 'react'
import EyeIcon from '../../icons/EyeIcon';
import { IValidationInputProps } from '../../types/validation';
import style from './input.module.scss';

export interface IInputProps extends IValidationInputProps {
  value: HTMLProps<HTMLInputElement>['value'];
  name: string;
  className?: string;
  label?: string;
  type?: HTMLProps<HTMLInputElement>['type'];
  showPassword?: boolean;
  isDarkTheme?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: IInputProps) {
  const { type, value, label, onChange, showPassword, onBlur, errorText, name, className, isDarkTheme } =
    props;

  const [labelFocus, setLabelFocus] = useState(!!value);
  const [showPasswordComputed, setShowPasswordComputed] = useState(false);

  useEffect(() => {
    setLabelFocus(!!value);
  }, [value]);

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
      className={classNames(style.container, isValid && style.errorContainer, className)}
      onFocus={onInputContainerFocus}>
      <input
        ref={inputRef}
        className={classNames(style.input, isDarkTheme && style.dark)}
        onChange={onChange}
        type={inputType}
        name={name}
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