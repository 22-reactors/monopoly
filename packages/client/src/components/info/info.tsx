import style from './info.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, ButtonVariation } from '../button/button';
import { IValue } from '../../utils/interfaces';
import UserController from '../../controllers/user';
import { IPasswordData, IProfileData } from '../../api/user/interfaces';
import { getInputData } from '../../utils/helpers';
import { Input } from '../input/input';
import { useNavigate } from 'react-router-dom';
import validate, { mapErrorMessage } from '../../service/validate/validate';
import { InputsState } from '../authForm/authForm'

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
  validation: boolean;
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
  const [fieldInput, setFieldInput] = useState<
    Record<string, { value: string; errorText?: string }>
  >({});

  const onChangeFieldInput = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const { value, name } = target;
    let errorText: string | undefined;

    if (props.validation && !validate.isValidField(target)) {
      errorText = mapErrorMessage[name as keyof typeof mapErrorMessage];
    }

    setFieldInput(prevState => {
      return { ...prevState, [name]: { value, errorText } };
    });
  };

  const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let isValid = true;

    const inputs = Object.values(evt.target).filter(
      element => element instanceof HTMLInputElement
    ) as HTMLInputElement[];

    const newInputsState: InputsState = {};

    inputs.forEach((input) => {
      const { value, name } = input;
      let errorText: string | undefined;

      if (props.validation && !validate.isValidField(input)) {
        errorText = mapErrorMessage[name as keyof typeof mapErrorMessage];
        isValid = false;
      }

      if (errorText) {
        newInputsState[name] = { value };
        newInputsState[name].errorText = errorText;
      } else {
        isValid = true;
      }
    });

    if (isValid) {
      const { oldPassword, newPassword, ...userInfo } = getInputData<
        IProfileForm,
        IProfileData & IPasswordData
      >(evt);

      void (await UserController.changeProfile(userInfo));
      void (await UserController.changePassword({ oldPassword, newPassword }));
      void navigate(-1);
    } else {
      setFieldInput(prevState => {
        return { ...prevState, ...newInputsState };
      });
    }
  };

  return (
    <form action="#" className={style.form} onSubmit={onSubmitForm}>
      {props.fields.map((field, idx) => (
        <Input
          key={idx}
          {...field}
          value={fieldInput[field.id]?.value ?? field.value}
          onChange={onChangeFieldInput}
          errorText={fieldInput[field.id]?.errorText}
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
