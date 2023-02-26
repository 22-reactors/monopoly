import { AuthForm, IAuthFormProps } from '../../components/authForm/authForm';
import './register.module.scss';
import loginStyle from '../login/login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ISignUpData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';
import { IInputProps, Input } from '../../components/input/input';

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

const Register = (props: IRegistrProps) => {
  const { inputsProps } = props;

  const inputItems = inputsProps.map((inputProp, i) => {
    return <Input key={i} {...inputProp} />;
  });

  const navigate = useNavigate();

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getInputData<ISignUpForm, ISignUpData>(event);
    const response = await AuthController.signup(data);
    if (response) {
      navigate(links.game.path);
    }
  };

  return (
    <div className={loginStyle.bg}>
        <AuthForm {...props} formAction={formAction}>
          {inputItems}
        </AuthForm>
    </div>
  );
};

export default Register;
