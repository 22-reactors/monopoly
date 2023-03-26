import { Input } from '../components/input/input';

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
