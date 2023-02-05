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

export default ErrorPage
