import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Button,
  ButtonSizes,
  ButtonVariation,
} from '../../components/button/button';
import { links } from '../../utils/const';
import style from './home.module.scss';
import { useCallback, useEffect } from 'react';
import OAuthController from '../../controllers/oAuth';

export interface IHomeProps {
  title: string;
  description: string;
  linkText: string;
  isDarkTheme: boolean;
}

export const Home = ({
  title,
  description,
  linkText,
  isDarkTheme,
}: IHomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const oAuthYandex = useCallback(async () => {
    const code = searchParams.get('code') ?? '';
    await OAuthController.signin(code);
    setSearchParams('');
  }, []);

  useEffect(() => {
    if (searchParams.has('code')) {
      oAuthYandex().catch(err => console.log(err));
    }
  }, [oAuthYandex]);

  return (
    <main className={classNames(style.main, isDarkTheme && style.dark)}>
      <div className={style.mainContent}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.description}>{description}</p>
        <Link className={style.link} to={links.setup.path}>
          <Button
            className={style.button}
            variation={ButtonVariation.PRIMARY}
            size={ButtonSizes.LARGE}
            rounded>
            {linkText}
          </Button>
        </Link>
      </div>
    </main>
  );
};
