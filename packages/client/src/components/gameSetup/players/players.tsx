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
}

export const enum Colors {
  RED = 'red',
  GREEN = 'green',
  PINK = 'pink',
  GREY = 'grey',
}

export const Players = (props: IPlayersProps) => {
  const { players } = props;

  return (
    <>
      <h2 className={style.title}></h2>
      <div className={style.playersContainer}>
        <p className={style.info}>Максимум 4 игрока</p>
        <div className={style.players}>
          <div className={style.chips}>
            {players.map(({ name, color }) => (
              <Chip name={name} color={color} />
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
