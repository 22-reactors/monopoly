export const enum Config {
  NAME = 'name',
  TYPE = 'type',
  COLOR = 'color',
}

export const enum PlayerTypes {
  BOT = 'bot',
  HUMAN = 'human',
}

export const PlayerTypesLabels = {
  [PlayerTypes.BOT]: 'Бот',
  [PlayerTypes.HUMAN]: 'Живой Human',
};

export const enum Colors {
  RED = 'red',
  GREEN = 'green',
  PINK = 'pink',
  GREY = 'grey',
}

export const ColorLabels = {
  [Colors.RED]: 'Красный',
  [Colors.GREEN]: 'Зеленый',
  [Colors.PINK]: 'Фиолетовый',
  [Colors.GREY]: 'Серый',
};

export const ErrorText = {
  [Config.NAME]: 'Имя не указано',
  [Config.TYPE]: 'Тип не указан',
  [Config.COLOR]: 'Цвет не указан',
} as const;
