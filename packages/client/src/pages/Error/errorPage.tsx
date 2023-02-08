import style from './errorPage.module.scss'

interface Props {
  code: number
  message?: string
  discription?: string
}

interface CodeText {
  message: string
  discription?: string
}

function resolveCodeText(code: Props['code']): CodeText {
  if (code === 404) {
    return {
      message: 'Мы не можем найти страницу',
      discription: 'Проверьте указанный вами адрес',
    }
  } else if (code >= 500) {
    return {
      message: 'Произошла непредвиденная ошибка',
      discription: 'Попробуйте обновить страницу',
    }
  }
  return {
    message: 'Непредвиденная ошибка',
    discription: 'Попробуйте обновить страницу',
  }
}

function ErrorPage({ code, message, discription }: Props) {
  let codeText: CodeText | undefined

  if (!message) {
    codeText = resolveCodeText(code)
  }

  return (
    <main className={style.pageContainer}>
      <div className={style.container}>
        <div className={style.code}>{code}</div>
        <div className={style.divider}></div>
        <div>
          <div className={style.message}>{codeText?.message || message}</div>
          <div className={style.discription}>
            {codeText?.discription || discription}
          </div>
        </div>
      </div>
      <button className={style.button}>Вернуться</button>
    </main>
  )
}

export default ErrorPage
