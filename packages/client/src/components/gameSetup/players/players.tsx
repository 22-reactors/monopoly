import classNames from 'classnames';
import { Button, ButtonVariation } from '../../button/button';
import { IConfig } from '../gameSetup';
import style from './players.module.scss';

interface IChipProps {
  name: string;
  color: string;
}

interface IPlayersProps {
  players: IConfig[]
}

export enum COLORS {
  RED = 'red',
  GREEN = 'green',
  PINK = 'pink',
  GREY = 'grey',
}

/* const players = [
  { name: 'Alex', color: COLORS.GREEN },
  { name: 'John', color: COLORS.RED },
  { name: 'Frank', color: COLORS.PINK },
]; */

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
          <Button
            className={style.startButton}
            variation={ButtonVariation.PRIMARY}
            rounded>
            Начать игру
          </Button>
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
