import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks';
import {
  playersNumberSelector,
  playersSelector,
} from '../../reduxstore/players/players.selector';
import { addPlayerAction } from '../../reduxstore/players/playersSlice';
import { Button, ButtonVariation } from '../../components/button/button';
import { Input } from '../../components/input/input';
import Select, { ISelectChangeData } from '../../components/select/select';
import { IOption } from '../../components/select/selectOption';
import {
  ColorLabels,
  Config,
  ErrorDupText,
  ErrorText,
  PlayerTypesLabels,
} from './const';
import style from './gameSetup.module.scss';
import { Players } from './players/players';
import { links } from '../../utils/const';
import { useNav } from '../../hooks/useNav';

export interface IConfig {
  [Config.NAME]: string;
  [Config.TYPE]: string;
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

const mapOptions = (options: Record<string, string>): IOption[] =>
  Object.entries(options).map(([value, label]) => {
    return { value, label };
  });

export const GameSetup = (props: IGameProps) => {
  const { maxPlayers } = props;
  const [config, setConfig] = useState<IConfig>(initialConfig);
  const [inputErrors, setInputErrors] =
    useState<IInputErrors>(initialInputErrors);
  const [selectOptions, setSelectOptions] = useState<Record<string, IOption>>(
    {}
  );

  const playersNumber = useAppSelector(playersNumberSelector);
  const players: IConfig[] = useAppSelector(playersSelector);
  const dispatch = useAppDispatch();

  useNav(links.login.path, true);

  useEffect(() => {
    Object.entries(config).forEach(([key, value]) => {
      if (value) {
        setInputErrors(prevState => ({
          ...prevState,
          [key]: '',
        }));
      }
    });
  }, [config]);

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
    const validator = { isValid: true };
    Object.entries(config).forEach(([key, value]) => {
      if (value === '') {
        validator.isValid = false;
        setInputErrors(prevState => ({
          ...prevState,
          [key]: ErrorText[key as keyof IConfig],
        }));
      }
    });

    validFieldOnDup(Config.NAME, validator);
    validFieldOnDup(Config.COLOR, validator);

    if (validator.isValid) {
      dispatch(addPlayerAction(config));
      setSelectOptions(prevState =>
        Object.fromEntries(
          Object.entries(prevState).map(([key]) => [
            key,
            { value: '', label: '' },
          ])
        )
      );
      setConfig(initialConfig);
    }
  };

  const validFieldOnDup = (
    fieldName: Config.NAME | Config.COLOR,
    validator: { isValid: boolean }
  ): void => {
    players.forEach(player => {
      if (player[fieldName] == config[fieldName]) {
        setInputErrors(prevState => ({
          ...prevState,
          [fieldName]: ErrorDupText[fieldName],
        }));
        validator.isValid = false;
        return;
      }
    });
  };

  return (
    <main>
      <div className={style.container}>
        <h2 className={style.title}>Создание игры</h2>
        <Players maxPlayers={maxPlayers} />
        <div className={style.configContainer}>
          <div className={style.inputs}>
            <Select
              name={Config.TYPE}
              label="Тип игрока"
              options={mapOptions(PlayerTypesLabels)}
              onChange={handleSelectChange}
              errorText={inputErrors[Config.TYPE]}
              value={selectOptions[Config.TYPE]}
            />
            <Input
              name={Config.NAME}
              label="Имя игрока"
              onChange={handleInputChange}
              value={config.name}
              errorText={inputErrors[Config.NAME]}
              errorAbsolutePosition
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
            disabled={playersNumber >= maxPlayers}>
            Добавить
          </Button>
        </div>
      </div>
    </main>
  );
};
