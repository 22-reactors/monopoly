import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonSizes,
  ButtonVariation,
} from '../../components/button/button';
import { GameSetup } from '../../components/gameSetup/gameSetup';
import { useAppSelector } from '../../reduxstore/hooks';
import { userSelector } from '../../reduxstore/user/user.selector';
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
  const user = useAppSelector(userSelector);

  return (
    <main className={classNames(style.main, isDarkTheme && style.dark)}>
      {!user && (
        <>
          <div className={style.mainContent}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.description}>{description}</p>
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
      {user && <GameSetup maxPlayers={4}/>}
    </main>
  );
};
