import { Link } from 'react-router-dom';
import { Button, ButtonVariation } from '../../components/button/button';
import style from './errorPage.module.scss';

interface Props {
  code?: number;
  message?: string;
  discription?: string;
}

interface CodeText {
  message: string;
  discription?: string;
}

function resolveCodeText(code: Props['code']): CodeText {
  if (!code) {
    return {
      message: 'Непредвиденная ошибка',
      discription: 'Попробуйте обновить страницу',
    };
  }
  if (code === 404) {
    return {
      message: 'Мы не можем найти страницу',
      discription: 'Проверьте указанный вами адрес',
    };
  } else if (code >= 500) {
    return {
      message: 'Произошла непредвиденная ошибка',
      discription: 'Попробуйте обновить страницу',
    };
  }
  return {
    message: 'Непредвиденная ошибка',
    discription: 'Попробуйте обновить страницу',
  };
}

function ErrorPage(props: Props) {
  const { code, message, discription } = props;
  let codeText: CodeText | undefined;

  if (!message) {
    codeText = resolveCodeText(code);
  }

  return (
    <main className={style.pageContainer}>
      <div className={style.container}>
        <div className={style.code}>{code}</div>
        <div className={style.divider}></div>
        <div>
          <p className={style.message}>{codeText?.message || message}</p>
          <p className={style.discription}>
            {codeText?.discription || discription}
          </p>
        </div>
      </div>
      <Link to={'/'}>
        <Button
          variation={ButtonVariation.PRIMARY}
          rounded
          className={style.button}>
          На главную
        </Button>
      </Link>
    </main>
  );
}

export default ErrorPage;
