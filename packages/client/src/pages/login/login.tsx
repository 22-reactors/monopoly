import style from './login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ILoginData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { Input, IInputProps } from '../../components/input/input';
import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import { useState } from 'react';

export const loginLoader = authorizedRedirect;

export interface ILoginProps extends Omit<IAuthFormProps, 'children'> {
  inputsProps: IInputProps[];
}

export interface ILoginForm {
  login: IValue;
  password: IValue;
}

const Login = (props: ILoginProps) => {
  const { inputsProps } = props;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const inputItems = inputsProps.map((inputProp, i) => {
    return <Input key={i} {...inputProp} />;
  });

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = getInputData<ILoginForm, ILoginData>(event);
    const response = await AuthController.login(data);

    if (response) {
      if (response === 'OK') {
        navigate(links.game.path);
      } else {
        setError(response.reason);
      }
    }
  };

  const formFocus = () => {
    setError('');
  };

  return (
    <div className={style.bg}>
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

export default Login;
