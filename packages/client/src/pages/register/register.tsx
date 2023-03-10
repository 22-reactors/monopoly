import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import style from '../login/login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ISignUpData } from '../../api/auth/interfaces';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { IInputProps, Input } from '../../components/input/input';
import { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks';
import {
  userErrorSelector,
  userSelector,
} from '../../reduxstore/user/user.selector';
import { clearError, signUp } from '../../reduxstore/user/userSlice';

export const registerLoader = authorizedRedirect;

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
  const user = useAppSelector(userSelector);
  const error = useAppSelector(userErrorSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate(links.setup.path);
    }
  }, [user]);

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
