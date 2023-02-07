import { isRouteErrorResponse, useRouteError } from "react-router-dom"

/* Компонент для обработки ошибок */
const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorPage status={error.status} message={'Не туда попали'} />
    }
    if (error.status >= 500) {
      return <ErrorPage status={error.status} message={'Мы уже фиксим'} />
    }

    return <ErrorPage status={error.status} message={error.statusText} />
  }
  return <div>Что-то пошло не так</div>
}

const ErrorPage = ({
  status,
  message,
}: {
  status: number
  message: string
}) => {
  return (
    <div>
      <div>{status}</div>
      <div>{message}</div>
    </div>
  )
}

export default RootBoundary;
