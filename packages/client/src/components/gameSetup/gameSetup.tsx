import classNames from 'classnames';
import { useState } from 'react';
import { Button, ButtonVariation } from '../button/button';
import { Input } from '../input/input';
import Select, { ISelectChangeData } from '../select/select';
import { IOption } from '../select/selectOption';
import { ColorLabels, Config, PlayerTypes, PlayerTypesLabels } from './const';
import style from './gameSetup.module.scss';
import { Players } from './players/players';

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
export interface IGameProps {
  maxPlayers: number;
}

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

export const GameSetup = (props: IGameProps) => {
  const { maxPlayers } = props;
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [players, setPlayers] = useState<IConfig[]>([]);
  const [inputErrors, setInputErrors] =
    useState<IInputErrors>(initialInputErrors);
  const [selectOptions, setSelectOptions] = useState<Record<string, IOption>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevState => ({ ...prevState, name: event.target.value }));
  };

  const handleSelectChange = (data: ISelectChangeData) => {
    setConfig(prevState => ({ ...prevState, [data.name]: data.value }));
    setSelectOptions(prevState => ({
      ...prevState,
      [data.name]: { value: data.value, label: data.label },
    }));
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
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2 className={style.title}>Создание игры</h2>
        <Players players={players} maxPlayers={maxPlayers} />
        <div className={style.configContainer}>
          <div className={style.inputs}>
            <div>
              <Select
                name={Config.TYPE}
                label="Тип игрока"
                options={mapOptions(PlayerTypesLabels)}
                onChange={handleSelectChange}
                errorText={inputErrors[Config.TYPE]}
                value={selectOptions[Config.TYPE]}
      
              />
            </div>
            <Input
              name={Config.NAME}
              label="Имя игрока"
              onChange={handleInputChange}
              value={config.name}
              errorText={inputErrors[Config.NAME]}
            />
            <Select
              name={Config.COLOR}
              label="Цвет игрока"
              options={mapOptions(ColorLabels)}
              onChange={handleSelectChange}
              errorText={inputErrors[Config.COLOR]}
              value={selectOptions[Config.COLOR]}

            />
          </div>
          <Button
            variation={ButtonVariation.OUTLINED}
            onClick={addPlayer}
            rounded
            disabled={players.length >= maxPlayers}>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};
