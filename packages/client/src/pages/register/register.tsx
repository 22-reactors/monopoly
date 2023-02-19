import InputFieldSet from '../../components/fieldset/inputfieldset';
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler';
import './register.module.scss';
import loginStyle from '../login/login.module.scss';
import { authorizedRedirect } from '../../utils/helpers';
import { ISignUpData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth.controller';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';

export const registerLoader = authorizedRedirect;

export interface IRegistrForm {
  submitBtnName: string;
  headerName: string;
  linkTitle: string;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  inputsProps: IInputFieldSet[];
}

const Register = (props: IRegistrForm) => {
  const { inputsProps } = props;

  const inputItems = inputsProps.map((inputProp, i) => {
    return <InputFieldSet key={i} {...inputProp} />;
  });

  const navigate = useNavigate();

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      password: { value: string };
      first_name: { value: string };
      second_name: { value: string };
      email: { value: string };
      phone: { value: string };
    };
    const data: ISignUpData = {
      login: target.login.value,
      password: target.password.value,
      first_name: target.first_name.value,
      second_name: target.second_name.value,
      email: target.email.value,
      phone: target.phone.value,
    };
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
