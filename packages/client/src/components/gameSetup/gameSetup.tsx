import classNames from 'classnames';
import { useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { Input } from '../input/input';
import Select from '../select/select';
import { IOption } from '../select/selectOption';
import style from './gameSetup.module.scss';
import { Colors, Players } from './players/players';

enum Config {
  NAME = 'name',
  TYPE = 'type',
  COLOR = 'color',
}

enum PlayerTypes {
  BOT = 'Бот',
  HUMAN = 'Живой human',
}

const ColorLabels = {
  [Colors.RED]: 'Красный',
  [Colors.GREEN]: 'Зеленый',
  [Colors.PINK]: 'Фиолетовый',
  [Colors.GREY]: 'Серый',
};

export interface IConfig {
  [Config.NAME]: string;
  [Config.TYPE]: PlayerTypes;
  [Config.COLOR]: typeof ColorLabels[keyof typeof ColorLabels];
}

const initialConfig = {
  [Config.NAME]: '',
  [Config.TYPE]: PlayerTypes.BOT,
  [Config.COLOR]: ColorLabels.grey,
};

export interface IGameProps {
  maxPlayers: number;
}

export const GameSetup = (props: IGameProps) => {
  const { maxPlayers } = props;
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [players, setPlayers] = useState<IConfig[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevState => ({ ...prevState, name: event.target.value }));
  };

  const addPlayer = () => {
    setPlayers(prevState => [...prevState, config]);
  };

  const handleSelectChange = (option: IOption) => {
    setConfig(prevState => ({ ...prevState, [option.value]: option.label }));
  };

  const mapOptions = (
    options: Record<string, string>,
    value: keyof IConfig
  ): IOption[] =>
    Object.values(options).map(label => {
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
        <Input
          name={Config.NAME}
          label="Имя игрока"
          onChange={handleInputChange}
          value={config.name}
        />
        <Select
          label="Цвет игрока"
          options={mapOptions(ColorLabels, Config.COLOR)}
          onChange={handleSelectChange}
        />
        {players.length < maxPlayers &&  (
          <Button variation={ButtonVariation.OUTLINED} onClick={addPlayer}>
            Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
