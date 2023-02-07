import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <ul>
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/login">Авторизация</Link>
        </li>
        <li>
          <Link to="/signup">Регистрация</Link>
        </li>
        <li>
          <Link to="/profile">Профиль</Link>
        </li>
        <li>
          <Link to="/leaderboard">Таблица лидеров</Link>
        </li>
        <li>
          <Link to="/forum">Форум</Link>
        </li>
        <li>
          <Link to="/game">Игра</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  )
}

export default Home
