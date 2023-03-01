import classNames from 'classnames';
import { useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import Input from '../input/input';
import Select from '../select/select';
import { IOption } from '../select/selectOption';
import style from './gameSetup.module.scss';
import { COLORS, Players } from './players/players';

enum Config {
  NAME = 'name',
  TYPE = 'type',
  COLOR = 'color',
}

export interface IConfig {
  [Config.NAME]: string;
  [Config.TYPE]: PlayerTypes;
  [Config.COLOR]: COLORS;
}

enum PlayerTypes {
  BOT = 'Бот',
  HUMAN = 'Живой human',
}

const initialConfig = {
  [Config.NAME]: '',
  [Config.TYPE]: PlayerTypes.BOT,
  [Config.COLOR]: COLORS.GREY,
};

export interface IGameProps {
  maxPlayers: number;
}

export const GameSetup = (props: IGameProps) => {
  const { maxPlayers } = props;
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [players, setPlayers] = useState<IConfig[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevState => ({ ...prevState, name: event.target.name }));
  };

  const addPlayer = () => {
    setPlayers(prevState => [...prevState, config]);
  };

  const handleSelectChange = (option: IOption) => {
    setConfig(prevState => ({ ...prevState, [option.label]: option.value }));
  };

  const mapOptions = (
    options: Record<string, string>,
    label: keyof IConfig
  ): IOption[] =>
    Object.values(options).map(value => {
      return { value, label };
    });

  return (
    <div className={style.container}>
      <Players players={players} />
      <div className={style.selection}>
        <Select
          label="Тип игрока"
          options={mapOptions(PlayerTypes, Config.TYPE)}
          onChange={handleSelectChange}
        />
        <Input label="Имя игрока" onChange={handleInputChange} value={config.name} />
        <Select
          label="Цвет игрока"
          options={mapOptions(COLORS, Config.COLOR)}
          onChange={handleSelectChange}
        />
        {players.length > maxPlayers && (
          <Button variation={ButtonVariation.OUTLINED} onClick={addPlayer}>
            Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
