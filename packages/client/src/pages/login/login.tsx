import InputFieldSet from '../../components/fieldset/inputfieldset';
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler';
import style from './login.module.scss';
import { authorizedRedirect } from '../../utils/helpers';
import { ILoginData } from '../../api/auth/interfaces';
import AuthController from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';

export const loginLoader = authorizedRedirect;

export interface ILoginForm {
  submitBtnName: string;
  headerName: string;
  linkTitle: string;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  inputsProps: IInputFieldSet[];
}

const Login = (props: ILoginForm) => {
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
    };
    const data: ILoginData = {
      login: target.login.value,
      password: target.password.value,
    };
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
