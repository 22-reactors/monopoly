import InputFieldSet from '../../components/fieldset/inputfieldset';
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler';
import './register.module.scss';
import loginStyle from '../login/login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ISignUpData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';

export const registerLoader = authorizedRedirect;

export interface IRegistrProps {
  submitBtnName: string;
  headerName: string;
  linkTitle: string;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  inputsProps: IInputFieldSet[];
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
    return <InputFieldSet key={i} {...inputProp} />;
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
      <ThemeToggler>
        <LoginAndRegistrForm {...props} formAction={formAction}>
          {inputItems}
        </LoginAndRegistrForm>
      </ThemeToggler>
    </div>
  );
};

export default Register;
