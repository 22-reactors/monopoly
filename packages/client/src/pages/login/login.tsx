import InputFieldSet from '../../components/fieldset/inputfieldset';
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler';
import style from './login.module.scss';
import { authorizedRedirect, getInputData } from '../../utils/helpers';
import { ILoginData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { IValue } from '../../utils/interfaces';

export const loginLoader = authorizedRedirect;

export interface ILoginForm extends Omit<IAuthFormProps, 'children'> {
  inputsProps: IInputFieldSet[];
}

export interface ILoginForm {
  login: IValue;
  password: IValue;
}

const Login = (props: ILoginProps) => {
  const { inputsProps } = props;

  const inputItems = inputsProps.map((inputProp, i) => {
    return <InputFieldSet key={i} {...inputProp} />;
  });

  const navigate = useNavigate();

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getInputData<ILoginForm, ILoginData>(event);
    const response = await AuthController.login(data);

    if (response) {
      navigate(links.game.path);
    }
  };

  return (
    <div className={style.bg}>
      <ThemeToggler>
        <LoginAndRegistrForm {...props} formAction={formAction}>
          {inputItems}
        </LoginAndRegistrForm>
      </ThemeToggler>
    </div>
  );
};

export default Login;
