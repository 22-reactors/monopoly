import InputFieldSet from '../../components/fieldset/inputfieldset';
import { IInputFieldSet } from '../../components/fieldset/inputfieldset/InputFieldSet';
import LoginAndRegistrForm from '../../components/form/loginandregistrform';
import ThemeToggler from '../../components/themetoggler';
import './register.module.scss';
import loginStyle from '../login/login.module.scss';
import { authorizedRedirect } from '../../utils/helpers';

export const registerLoader = authorizedRedirect;

export interface IRegistrForm {
  submitBtnName: string;
  headerName: string;
  linkTitle: string;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  formAction: React.FormEventHandler<HTMLFormElement>;
  inputsProps: IInputFieldSet[];
}

const Register = (props: IRegistrForm) => {
  const { inputsProps } = props;

  const inputItems = inputsProps.map((inputProp, i) => {
    return <InputFieldSet key={i} {...inputProp} />;
  });

  return (
    <div className={loginStyle.bg}>
      <ThemeToggler>
        <LoginAndRegistrForm {...props}>{inputItems}</LoginAndRegistrForm>
      </ThemeToggler>
    </div>
  );
};

export default Register;
