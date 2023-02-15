import { redirect } from "react-router-dom"
import { links } from "./const"

export const unAuthorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя.
  Если  не авторизован, то переход на страницу авторизации */
  const user = null
  if (!user) {
    return redirect(links.login.path)
  }
  return true
}

export const authorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя.
  Если авторизован, то переход на страницу игры */
  const user = null
  if (user) {
    return redirect(links.game.path)
  }
  return true
}


export const enum WordMap {
  SINGLE = 'single',
  SOME = 'some',
  MORE = 'more'
}

//Получаем склоненную форму слова из переданного массива
export function getDeclensionWord(value: number, words: {[value in WordMap]: string}): string {
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
