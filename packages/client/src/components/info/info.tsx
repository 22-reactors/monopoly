import style from './info.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { IValue } from '../../utils/interfaces';
import UserController from '../../controllers/user';
import { IPasswordData, IProfileData } from '../../api/user/interfaces'
import { getInputData } from '../../utils/helpers';
import Input from '../input/input';
import { useNavigate } from 'react-router-dom';

export type FieldInfo = {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
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
  const navigate = useNavigate();
  const [fieldInput, setFieldInput] = useState<Record<string, string>>({});

  const onChangeFieldInput = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    setFieldInput({
      ...fieldInput,
      [target.name]: target.value,
    });
  };

  const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const {oldPassword, newPassword, ...userInfo} = getInputData<IProfileForm, IProfileData & IPasswordData>(evt);

    void await UserController.changeProfile(userInfo);
    void await UserController.changePassword({oldPassword, newPassword});
    void navigate(-1);
  };

  return (
      <form action="#" className={style.form} onSubmit={onSubmitForm}>
        {props.fields.map((field, idx) => (
          <Input
            key={idx}
            {...field}
            value={fieldInput[field.id] ?? field.value}
            onChange={onChangeFieldInput}
          />
        ))}
        <Button
          className={style.button}
          type={'submit'}
          variation={ButtonVariation.PRIMARY}
          rounded>
          Сохранить
        </Button>
      </form>
  );
}
