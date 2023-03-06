import style from './login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ILoginData } from '../../api/auth/interfaces';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { Input, IInputProps } from '../../components/input/input';
import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks';
import { clearError, login } from '../../reduxstore/user/userSlice';
import {
  userErrorSelector,
  userSelector,
} from '../../reduxstore/user/user.selector';

export const loginLoader = authorizedRedirect;

export interface ILoginProps extends Omit<IAuthFormProps, 'children'> {
  inputsProps: IInputProps[];
}

export interface ILoginForm {
  login: IValue;
  password: IValue;
}

export const Login = (props: ILoginProps) => {
  const { inputsProps, isDarkTheme } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const error = useAppSelector(userErrorSelector);

  useEffect(() => {
    if (user) {
      navigate(links.game.path);
    }
  }, [user]);

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
