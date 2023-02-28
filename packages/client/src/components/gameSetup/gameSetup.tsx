import classNames from 'classnames';
import { useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import Input from '../input/input';
import Select from '../select/select';
import { IOption } from '../select/selectOption';
import style from './gameSetup.module.scss';
import { COLORS, Players } from './players/players';

export interface IConfig {
  name: string;
  type: IPlayerTypes;
  color: COLORS;
}

enum IPlayerTypes {
  BOT = 'Бот',
  HUMAN = 'Живой human',
}

const initialConfig = {
  name: '',
  type: IPlayerTypes.BOT,
  color: COLORS.GREY,
};

export const GameSetup = () => {
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [players, setPlayers] = useState<IConfig[]>([]);
  const count = players.length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevState => ({ ...prevState, name: event.target.name }));
  };

  const addPlayer = () => {
    setPlayers(prevState => [...prevState, config]);
  };

  const handleSelectChange = (option: IOption) => {
/*     let configKey: keyof IConfig;
    switch (option) {
      case "":
    } */
    setConfig(prevState => ({ ...prevState, [option.label]: option.value }));
  };

  return (
    <div className={style.container}>
      <Players players={players} />
      <div className={style.selection}>
        <Select label="Тип игрока" onChange={handleSelectChange}/>
        <Input label="Имя игрока" onChange={handleChange} value={config.name} />
        <Select label="Цвет игрока" />
        {players.length > 4 && (
          <Button variation={ButtonVariation.OUTLINED} onClick={addPlayer}>
            Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
