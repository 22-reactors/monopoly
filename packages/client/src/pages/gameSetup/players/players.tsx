import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxstore/hooks';
import { playersSelector } from '../../../reduxstore/players/players.selector';
import { links } from '../../../utils/const';
import { Button, ButtonVariation } from '../../../components/button/button';
import style from './players.module.scss';
import { initMonopolyUserConfig, isGameExist } from '../../../game-engine/config/monopolyConfig';
import { resetPlayersAction } from '../../../reduxstore/players/playersSlice';


interface IChipProps {
  name: string;
  color: string;
}

interface IPlayersProps {
  maxPlayers: number;
}

export const Players = (props: IPlayersProps) => {
  const { maxPlayers } = props;
  const players = useAppSelector(playersSelector);
  const dispatch = useAppDispatch();

  const defaultPlayers: React.ReactNode[] = [];
  for (let i = players.length; i < maxPlayers; i++) {
    defaultPlayers.push(
      <div className={classNames(style.chip, style.defaultChip)} key={i}>
        <span>?</span>
      </div>
    );
  }

  const initGameConfig = () => {
    initMonopolyUserConfig(players);
  };

  const isPlayerNotExists = () => {
    return players.length === 0;
  }

  const resetPlayers = () => {
    dispatch(resetPlayersAction())
  }

  return (
    <div className={style.playersContainer}>
      <p className={style.info}>{`Максимум ${maxPlayers} игрока`}</p>
      <div className={style.players}>
        <div className={style.chips}>
          {players.map(({ name, color }, index) => (
            <Chip name={name} color={color} key={index} />
          ))}
          {defaultPlayers}
        </div>
        <div className={style.startGameBtns}>
          <Link to={links.game.path}>
            <Button
              className={style.startButton}
              variation={ButtonVariation.PRIMARY}
              onClick={initGameConfig}
              disabled={isPlayerNotExists()}
              rounded>
              Начать игру
            </Button>
          </Link>
          <Link to={links.game.path}>
            <Button
              className={style.startButton}
              variation={ButtonVariation.PRIMARY}
              rounded
              disabled={!isGameExist()}>
              Продолжить
            </Button>
          </Link>
          <Button
            className={style.startButton}
            variation={ButtonVariation.PRIMARY}
            onClick={resetPlayers}
            disabled={isPlayerNotExists()}
            rounded>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};

const Chip = (props: IChipProps) => {
  const { name, color } = props;

  return (
    <div className={style.chipContainer}>
      <div className={classNames(style.chip, style[`chip_${color}`])}></div>
      <p className={classNames(style.name, style[`name_${color}`])}>{name}</p>
    </div>
  );
};
