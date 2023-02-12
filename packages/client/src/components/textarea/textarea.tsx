import classNames from 'classnames';
import { ChangeEvent, HTMLProps, useRef, useState } from 'react';
import style from './textarea.module.scss';

interface Props {
  value?: string;
  placeholder?: string;
  label?: string;
  solo?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';
  onChange?: (event?: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event?: ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea(props: Props) {
  const { value, onChange, solo, label, onBlur, resize } = props;

  const [labelFocus, setLabelFocus] = useState(false);

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

  const textateaStyle = {
    resize: resize || 'vertical',
  };

  return (
    <div
      tabIndex={0}
      className={classNames(style.container, solo && style.containerSolo)}
      onFocus={focusTextareaContainer}>
      <textarea
        style={textateaStyle}
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
    </div>
  );
}

export default Textarea;
