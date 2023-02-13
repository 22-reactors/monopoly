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
  isAuthorized: boolean;
}

export const Home = (props: IHomeProps) => {
  const { title, description, linkText, isAuthorized } = props;

  return (
    <main className={style.main}>
      {!isAuthorized && (
        <>
          <div className={style.mainContent}>
            <h1 className={style.title}>{title}</h1>
            <h2 className={style.description}>{description}</h2>
            <Link className={style.link} to={links.game.path}>
              <Button
                className={style.button}
                variation={ButtonVariation.PRIMARY}
                size={ButtonSizes.LARGE}
                rounded>
                {linkText}
              </Button>
            </Link>
          </div>
          <img
            className={style.cardsImage}
            src="cards.svg"
            alt="monopoly cards"
          />
        </>
      )}
      {isAuthorized && <></>}
    </main>
  );
};
