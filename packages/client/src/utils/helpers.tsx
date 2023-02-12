import { redirect } from "react-router-dom"
import { links } from "../app"

export const unAuthorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя. 
  Если  не авторизован, то переход на страницу авторизации */
  const user = {}
  if (!user) {
    return redirect(links.login.path)
  }
  return true
}

export const authorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя. 
  Если авторизован, то переход на страницу игры */
  const user = {}
  if (user) {
    return redirect(links.game.path)
  }
  return true
}