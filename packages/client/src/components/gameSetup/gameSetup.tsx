import classNames from 'classnames';
import { useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { Input } from '../input/input';
import Select, { ISelectChangeData } from '../select/select';
import { IOption } from '../select/selectOption';
import style from './gameSetup.module.scss';
import { Colors, Players } from './players/players';

enum Config {
  NAME = 'name',
  TYPE = 'type',
  COLOR = 'color',
}

enum PlayerTypes {
  BOT = 'bot',
  HUMAN = 'human',
}

export interface IConfig {
  [Config.NAME]: string;
  [Config.TYPE]: PlayerTypes | '';
  [Config.COLOR]: typeof ColorLabels[keyof typeof ColorLabels] | '';
}

export interface IInputErrors {
  [Config.NAME]: string | undefined;
  [Config.TYPE]: string | undefined;
  [Config.COLOR]: string | undefined;
}

const PlayerTypesLabels = {
  [PlayerTypes.BOT]: 'Бот',
  [PlayerTypes.HUMAN]: 'Живой Human',
};

const ColorLabels = {
  [Colors.RED]: 'Красный',
  [Colors.GREEN]: 'Зеленый',
  [Colors.PINK]: 'Фиолетовый',
  [Colors.GREY]: 'Серый',
};

const ErrorText = {
  [Config.NAME]: 'Имя не указано',
  [Config.TYPE]: 'Тип не указан',
  [Config.COLOR]: 'Цвет не указан',
};

const initialConfig: IConfig = {
  [Config.NAME]: '',
  [Config.TYPE]: '',
  [Config.COLOR]: '',
};

const initialInputErrors: IInputErrors = {
  [Config.NAME]: undefined,
  [Config.TYPE]: undefined,
  [Config.COLOR]: undefined,
};

export interface IGameProps {
  maxPlayers: number;
}

export const GameSetup = (props: IGameProps) => {
  const { maxPlayers } = props;
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [players, setPlayers] = useState<IConfig[]>([]);
  const [inputErrors, setInputErrors] =
    useState<IInputErrors>(initialInputErrors);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevState => ({ ...prevState, name: event.target.value }));
  };

  const handleSelectChange = (data: ISelectChangeData) => {
    setConfig(prevState => ({ ...prevState, [data.name]: data.value }));
  };

  const addPlayer = () => {
    let isValid = true;
    Object.entries(config).forEach(([key, value]) => {
      if (value === '') {
        isValid = false;
        setInputErrors(prevState => ({ ...prevState, [key]: '' }));
      }
    });
    if (isValid) {
      setPlayers(prevState => [...prevState, config]);
    }
  };

  const mapOptions = (options: Record<string, string>): IOption[] =>
    Object.entries(options).map(([value, label]) => {
      return { value, label };
    });

  return (
    <div className={style.container}>
      <Players players={players} />
      <div className={style.selection}>
        <Select
          name={Config.TYPE}
          label="Тип игрока"
          options={mapOptions(PlayerTypesLabels)}
          onChange={handleSelectChange}
        />
        <Input
          name={Config.NAME}
          label="Имя игрока"
          onChange={handleInputChange}
          value={config.name}
        />
        <Select
          name={Config.COLOR}
          label="Цвет игрока"
          options={mapOptions(ColorLabels)}
          onChange={handleSelectChange}
        />
        {players.length < maxPlayers && (
          <Button variation={ButtonVariation.OUTLINED} onClick={addPlayer}>
            Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
