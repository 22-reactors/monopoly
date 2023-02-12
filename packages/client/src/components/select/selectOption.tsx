import classNames from 'classnames';
import style from './selectOption.module.scss';

export interface IOption<T = unknown> {
  label: string;
  value: string;
  data?: T;
}

export interface ISelectOptionProps extends IOption {
  selected?: boolean;
  onClick?: () => void;
}

function SelectOption(props: ISelectOptionProps) {
  const { label, selected, onClick } = props;

  return (
    <div
      className={classNames(style.option, selected && style.optionSelected)}
      onClick={onClick}>
      {label}
    </div>
  );
}

export default SelectOption;
