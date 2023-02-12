import { PropsWithChildren } from 'react';
import style from './select.module.scss';

interface Props extends PropsWithChildren {
  label?: string;
}

function Select(props: Props) {
  const { label } = props;
  return (
    <div className={style.container} tabIndex={0}>
      <input className={style.select}></input>
      <div className={style.options}></div>
    </div>
  );
}

export default Select;
