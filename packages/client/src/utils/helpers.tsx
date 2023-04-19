import { Input } from '../components/input/input';
import { TIME_WORDS_MAP } from './const';

export const enum WordMap {
  SINGLE = 'single',
  SOME = 'some',
  MORE = 'more',
}

//Получаем склоненную форму слова из переданного массива
export function getDeclensionWord(
  value: number,
  words: { [value in WordMap]: string }
): string {
  const correct_value = Math.abs(value) % 100;

  if (correct_value > 10 && correct_value < 20) {
    return words[WordMap['MORE']];
  }

  const num = correct_value % 10;

  if (num > 1 && num < 5) {
    return words[WordMap['SOME']];
  }

  if (num == 1) {
    return words[WordMap['SINGLE']];
  }

  return words[WordMap['MORE']];
}

export const getInputData = <T, D>(evt: React.FormEvent<HTMLFormElement>) => {
  const target = evt.target as typeof evt.target & T;
  const inputs = Object.values(target).filter(
    element => element instanceof HTMLInputElement
  ) as HTMLInputElement[];
  const data = inputs.reduce((result, input) => {
    return { ...result, [input.name]: input.value };
  }, {} as D);
  return data;
};

// Разбивает массив на двумерный массив с указанным кол-вом возможной длины
/**
 * @param {array} arr - Массив, который нужно разбить
 * @param {number} limit - Кол-во айтемов из которых состоят внутренние массивы.
 * @return {[array]} Двумерный массив
 *
 * @example
 *
 * getSeparateArray([1, 2, 3, 4, 5, 6], 2);
 * Вернет [[1, 2], [3, 4], [5, 6]];
 */
export function getSeparateArray<T>(arr: T[], limit: number): T[][] {
  const result = [];
  const countArr = Math.ceil(arr.length / limit);
  let current = 0;
  let next = limit;

  for (let i = 0; i < countArr; i++) {
    const separateResults = arr.slice(current, next);

    if (separateResults.length === 0) {
      break;
    }

    result.push(separateResults);
    current += limit;
    next += limit;
  }

  return result;
}

export const getInputName = (element: JSX.Element) => {
  if (element.type === Input) {
    return element.props.name as string;
  }
};

export const isServer = !(typeof window !== 'undefined' && window.document);

// Определяет разницу между двумя датами
export const getDiffTime = (newDate: Date, oldDate: Date) => {
  const ms = newDate.getTime() - oldDate.getTime();

  const secs = Math.round(ms / 1000);
  if (secs < 60) {
    return `${secs} ${getDeclensionWord(secs, TIME_WORDS_MAP.sec)}`;
  }

  const minutes = Math.round(secs / 60);
  if (minutes < 60) {
    return `${minutes} ${getDeclensionWord(minutes, TIME_WORDS_MAP.minute)}`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} ${getDeclensionWord(hours, TIME_WORDS_MAP.hour)}`;
  }

  const days = Math.round(hours / 24);
  if (days < 28) {
    return `${days} ${getDeclensionWord(days, TIME_WORDS_MAP.day)}`;
  }

  const months = Math.round(days / 28);
  if (months < 12) {
    return `${months} ${getDeclensionWord(months, TIME_WORDS_MAP.month)}`;
  }

  const years = Math.round(months / 12);
  return `${years} ${getDeclensionWord(years, TIME_WORDS_MAP.year)}`;
};

/* Формтирует дату (в виде строки, полученной методом toJSON) 
в строку вида 'YYYY-MM-DD HOURS:MINUTES' */
export const formatTime = (time?: string) => {
  const date = time && new Date(time);
  if (date) {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
      .format(date)
      .replace(',', '');
  }
};
