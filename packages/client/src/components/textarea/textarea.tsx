import classNames from 'classnames';
import { ChangeEvent, useRef, useState } from 'react';
import { IValidationInputProps } from '../../types/validation';
import style from './textarea.module.scss';

interface Props extends IValidationInputProps {
  value: string;
  label?: string;
  solo?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';
  onChange?: (event?: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event?: ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea(props: Props) {
  const { value, onChange, solo, label, onBlur, resize, errorText } = props;

  const [labelFocus, setLabelFocus] = useState(!!value);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextareaContainer = () => {
    if (textareaRef.current) {
      setLabelFocus(true);
      textareaRef.current.focus();
    }
  };

  const onBlurTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!value) {
      setLabelFocus(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const textareaStyle = {
    resize: resize ?? 'vertical',
  };

  const isValid = !!errorText;

  return (
    <div
      tabIndex={0}
      className={classNames(
        style.container,
        solo && style.containerSolo,
        isValid && style.containerError
      )}
      onFocus={focusTextareaContainer}>
      <textarea
        style={textareaStyle}
        ref={textareaRef}
        placeholder={(solo && label) || ''}
        className={style.textarea}
        value={value}
        onBlur={onBlurTextarea}
        onChange={onChange}
      />
      <label
        className={classNames(style.label, labelFocus && style.labelFocus)}>
        {label}
      </label>
      {errorText && <div className={style.error}>{errorText}</div>}
    </div>
  );
}

export default Textarea;
