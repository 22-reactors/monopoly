import { Link, Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { headerProps } from '../../mocs/headerProps';
import { links } from '../../utils/const';

export const Home = () => {
  return (
    <main>
      <Header {...headerProps} />
      <ul>
        {Object.values(links).map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  )
}
