import { Link, Outlet } from 'react-router-dom';
import { links } from '../../app';

export const Home = () => {
  return (
    <main>
      <ul>
        {Object.values(links).map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
};
