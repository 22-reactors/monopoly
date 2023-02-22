import style from './info.module.scss';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { IUser, IValue } from '../../utils/interfaces';
import UserController from '../../controllers/user';
import { IProfileData } from '../../api/user/interfaces';
import { getInputData } from '../../utils/helpers';

export type FieldInfo = {
  id: string;
  type: string;
  name: string;
  label: string;
  value?: string;
  disabled?: boolean;
  onChange?(evt: ChangeEvent): void;
};

interface IInfo {
  className?: string;
  fields: FieldInfo[];
  onSubmit?(): void;
}

interface IProfileForm {
  email: IValue;
  login: IValue;
  first_name: IValue;
  second_name: IValue;
  display_name: IValue;
  phone: IValue;
}

export function Info(props: IInfo) {
  const [isEdit, setIsEdit] = useState(false);
  const [fieldInput, setFieldInput] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<IUser | null>(null);

  const onChangeFieldInput = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    setFieldInput({
      ...fieldInput,
      [target.name]: target.value,
    });
  };

  const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = getInputData<IProfileForm, IProfileData>(evt);
    const response = await UserController.changeProfile(data);
    if (response) {
      setProfile(response);
    }
    setIsEdit(false);
    console.log('Save info');
  };

  const getFieldValue = (fieldId: string) => {
    if (fieldId in fieldInput) {
      return fieldInput[fieldId];
    }
    if (profile !== null && fieldId) {
      return profile[fieldId as keyof IProfileForm];
    }
    return '';
  };

  return (
    <section className={classNames(props.className, style.wrapper)}>
      <form action="#" className={style.form} onSubmit={onSubmitForm}>
        {props.fields.map((field, idx) => (
          <Field
            key={idx}
            {...field}
            disabled={!isEdit}
            value={getFieldValue(field.id)}
            onChange={onChangeFieldInput}
          />
        ))}
        <div className={style.btnWrapper}>
          <Button
            className={classNames(style.btnEdit, isEdit && style.btnEditActive)}
            variation={ButtonVariation.PRIMARY}
            onClick={() => setIsEdit(prevState => !prevState)}>
            Изменить
          </Button>
          <Button
            type={'submit'}
            variation={ButtonVariation.PRIMARY}
            isHide={!isEdit}>
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
}

function Field(props: FieldInfo) {
  const { label, id, ...otherProps } = props;

  return (
    <fieldset className={style.field}>
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
      <input className={style.input} {...otherProps} />
    </fieldset>
  );
}
