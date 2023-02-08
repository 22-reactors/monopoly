import style from './info.module.scss'
import classNames from 'classnames'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, ButtonVariation } from '../button/button'

export type FieldInfo = {
  id: string;
  type: string;
  name: string;
  label: string;
  value?: string;
  disabled?: boolean;
  onChange?(evt: ChangeEvent): void;
}

interface IInfo {
  className?: string;
  fields: FieldInfo[];
  onSubmit?(): void;
}

export function Info(props: IInfo) {
  const [isEdit, setIsEdit] = useState(false);
  const [fieldInput, setFieldInput] = useState<Record<string, string>>({});

  const onChangeFieldInput = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    setFieldInput({
      ...fieldInput,
      [target.name]: target.value
    });
  };

  const onSubmitForm = (evt: FormEvent) => {
    evt.preventDefault();
    props.onSubmit?.();

    setIsEdit(false);
    console.log('Save info');
  };

  return (
    <section className={classNames(props.className, style.wrapper)}>
      <form
        action='#'
        className={style.form}
        onSubmit={onSubmitForm}
      >
        {props.fields.map((field, idx) =>
          <Field
            key={idx}
            {...field}
            disabled={!isEdit}
            value={fieldInput[field.id] ?? field.value}
            onChange={onChangeFieldInput}
          />
        )}
        <div className={style.btnWrapper}>
          <Button
            className={classNames(style.btnEdit, isEdit && style.btnEditActive)}
            variation={ButtonVariation.THRAKRAL}
            text={'Изменить'}
            onClick={() => setIsEdit(prevState => !prevState)}
          />
          <Button
            type={'submit'}
            variation={ButtonVariation.VRUTUKS}
            text={'Сохранить'}
            isHide={!isEdit}
          />
        </div>
      </form>
    </section>
  );
}

function Field(props:FieldInfo) {
  const {label, id, ...otherProps} = props;

  return (
    <fieldset className={style.field}>
      <label htmlFor={id} className={style.label}>{label}</label>
      <input
        className={style.input}
        {...otherProps}
      />
    </fieldset>
  );
}
