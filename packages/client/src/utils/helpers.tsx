import { redirect } from "react-router-dom"

export const unAuthorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя. 
  Если  не авторизован, то переход на страницу авторизации */
  const user = null
  if (!user) {
    return redirect('/login')
  }
  return true
}

export const authorizedRedirect = async () => {
  /*
  Когда подключим API авторизации здесь должен быть запрос пользователя. 
  Если авторизован, то переход на страницу игры */
  const user = null
  if (user) {
    return redirect('/game')
  }
  return true
}