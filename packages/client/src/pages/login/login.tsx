import style from './login.module.scss';
import { getInputData } from '../../utils/helpers';
import { ILoginData } from '../../api/auth/interfaces';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { Input, IInputProps } from '../../components/input/input';
import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks';
import { clearError, login } from '../../reduxstore/user/userSlice';
import { userErrorSelector } from '../../reduxstore/user/user.selector';
import { useNav } from '../../hooks/useNav';

export interface ILoginProps extends Omit<IAuthFormProps, 'children'> {
  inputsProps: IInputProps[];
}

export interface ILoginForm {
  login: IValue;
  password: IValue;
}

export const Login = (props: ILoginProps) => {
  const { inputsProps, isDarkTheme } = props;
  const dispatch = useAppDispatch();
  const error = useAppSelector(userErrorSelector);

  useNav(links.setup.path, false);

  const inputItems = inputsProps.map((inputProp, i) => {
    return <Input key={i} {...inputProp} />;
  });

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = getInputData<ILoginForm, ILoginData>(event);
    dispatch(login(data));
  };

  const formFocus = () => {
    dispatch(clearError(undefined));
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
