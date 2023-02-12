import classNames from 'classnames';
import { memo, useRef, useState } from 'react';
import style from './select.module.scss';
import SelectOption, { IOption } from './selectOption';
import { IValidationInputProps } from '../../types/validation';

interface Props extends IValidationInputProps {
  label?: string;
  value?: IOption | undefined;
  options?: IOption[];
  onChange?: (option: IOption) => void;
}

const defaultOption: IOption = {
  label: '',
  value: '',
};

function Select(props: Props) {
  const { label, value, onChange, options, errorText } = props;

  const [labelFocus, setLabelFocus] = useState(!!value);
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>(
    options?.find(o => o.value === value?.value) || defaultOption
  );

  const selectRef = useRef<HTMLInputElement>(null);

  const onSelectContainerFocus = () => {
    setLabelFocus(true);

    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const onSelectContainerBlur = () => {
    setIsOpen(false);
    if (!value) {
      setLabelFocus(false);
    }
  };

  const onSelectContainerClick = () => {
    setIsOpen(prev => !prev);
  };

  const onOptionSelectClick = (option: IOption) => {
    if (onChange) {
      onChange(option);
    }
    setSelectedOption(option);
  };

  const isValid = !!errorText;

  return (
    <button
      className={classNames(style.container, isValid && style.errorContainer)}
      onFocus={onSelectContainerFocus}
      onBlur={onSelectContainerBlur}
      onClick={onSelectContainerClick}>
      <input
        value={selectedOption?.label}
        ref={selectRef}
        disabled
        className={style.select}></input>
      <label
        className={classNames(style.label, labelFocus && style.labelFocus)}>
        {label}
      </label>
      <svg
        className={classNames(
          style.icon,
          labelFocus && style.iconFocus,
          isOpen && style.iconOpen
        )}
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L7 1" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div
        className={classNames(style.options, isOpen && style.optionsOpen)}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}>
        {options?.map(o => (
          <SelectOption
            key={o.label}
            label={o.label}
            value={o.value}
            selected={value?.value === o.value && !isMouseOver}
            onClick={() => onOptionSelectClick(o)}
          />
        ))}
      </div>
      {isValid && <div className={style.error}>{errorText}</div>}
    </button>
  );
}

export default memo(Select);
