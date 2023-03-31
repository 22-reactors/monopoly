import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import style from '../login/login.module.scss';
import { getInputData } from '../../utils/helpers';
import { ISignUpData } from '../../api/auth/interfaces';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { IInputProps, Input } from '../../components/input/input';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks';
import { userErrorSelector } from '../../reduxstore/user/user.selector';
import { clearError, signUp } from '../../reduxstore/user/userSlice';
import { useNav } from '../../hooks/useNav';

export interface IRegistrProps extends Omit<IAuthFormProps, 'children'> {
  inputsProps: IInputProps[];
}

export interface ISignUpForm {
  login: IValue;
  password: IValue;
  first_name: IValue;
  second_name: IValue;
  email: IValue;
  phone: IValue;
}

export const Register = (props: IRegistrProps) => {
  const { inputsProps, isDarkTheme } = props;
  const error = useAppSelector(userErrorSelector);
  const dispatch = useAppDispatch();

  useNav(links.setup.path, false);

  const inputItems = inputsProps.map((inputProp, i) => {
    return <Input key={i} {...inputProp} />;
  });

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = getInputData<ISignUpForm, ISignUpData>(event);
    dispatch(signUp(data));
  };

  const formFocus = () => {
    dispatch(clearError());
  };

  return (
    <div className={classNames(style.wrapper, isDarkTheme && style.dark)}>
      <AuthForm
        {...props}
        formAction={formAction}
        errorTitle={error}
        formFocus={formFocus}>
        {inputItems}
      </AuthForm>
    </div>
  );
};
