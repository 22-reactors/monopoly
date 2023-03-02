import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { links } from '../../../utils/const';
import { Button, ButtonVariation } from '../../button/button';
import { IConfig } from '../gameSetup';
import style from './players.module.scss';

interface IChipProps {
  name: string;
  color: string;
}

interface IPlayersProps {
  players: IConfig[];
  maxPlayers: number;
}

export const Players = (props: IPlayersProps) => {
  const { players, maxPlayers } = props;

  return (
    <>
      <div className={style.playersContainer}>
        <p className={style.info}>{`Максимум ${maxPlayers} игрока`}</p>
        <div className={style.players}>
          <div>
            {players.map(({ name, color }, index) => (
              <Chip name={name} color={color} key={index} />
            ))}
          </div>
          <Link to={links.game.path}>
            <Button
              className={style.startButton}
              variation={ButtonVariation.PRIMARY}
              rounded>
              Начать игру
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

const Chip = (props: IChipProps) => {
  const { name, color } = props;

  return (
    <div className={style.chipContainer}>
      <div className={classNames(style.chip, style[`chip_${color}`])}></div>
      <span className={classNames(style.name, style[`name_${color}`])}>
        {name}
      </span>
    </div>
  );
};
