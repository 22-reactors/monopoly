import { redirect } from 'react-router-dom';
import AuthController from '../controllers/auth';
import { links } from './const';

export const unAuthorizedRedirect = async () => {
  const user = await AuthController.getUser();
  if (!user) {
    return redirect(links.login.path);
  }
  return true;
};

export const authorizedRedirect = async () => {
  const user = await AuthController.getUser();
  if (user) {
    return redirect(links.game.path);
  }
  return true;
};

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
