import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonSizes,
  ButtonVariation,
} from '../../components/button/button';
import { links } from '../../utils/const';
import style from './home.module.scss';

export interface IHomeProps {
  title: string;
  description: string;
  linkText: string;
  isDarkTheme: boolean;
}

export const Home = (props: IHomeProps) => {
  const { title, description, linkText, isDarkTheme } = props;

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
      <img className={style.cardsImage} src="cards.svg" alt="monopoly cards" />
    </main>
  );
};
