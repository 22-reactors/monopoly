import style from './info.module.scss';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { IUser } from '../../utils/interfaces';
import UserController from '../../controllers/user';
import { IProfileData } from '../../api/user/interfaces';

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
  email: { value: string };
  login: { value: string };
  first_name: { value: string };
  second_name: { value: string };
  display_name: { value: string };
  phone: { value: string };
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

  const onSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();
    const target = evt.target as typeof evt.target & IProfileForm;
    const inputs = Object.values(target).filter(
      element => element instanceof HTMLInputElement
    ) as HTMLInputElement[];
    const data = inputs.reduce((result, input) => {
      return { ...result, [input.name]: input.value };
    }, {} as IProfileData);
    const response = await UserController.changeProfile(data);
    if (response) {
      setProfile(response);
    }
    setIsEdit(false);
    console.log('Save info');
  };

  return (
    <section className={classNames(props.className, style.wrapper)}>
      <form action="#" className={style.form} onSubmit={onSubmitForm}>
        {props.fields.map((field, idx) => (
          <Field
            key={idx}
            {...field}
            disabled={!isEdit}
            value={
              fieldInput[field.id] ??
              (profile && profile[field.id as keyof IProfileForm]) ??
              ''
            }
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
