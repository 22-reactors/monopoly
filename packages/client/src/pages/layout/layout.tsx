import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { headerProps } from '../../mocs/headerProps';
import style from './layout.module.scss';

const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header {...headerProps} />
      <Outlet />
      <footer className={style.footer}>
        <nav className={style.menu}>
          <p className={style.menuTitle}>Меню</p>
          <ul>
            <li className={style.link}>Главная</li>
            <li className={style.link}>Профиль</li>
            <li className={style.link}>Таблица лидеров</li>
            <li className={style.link}>Форум</li>
          </ul>
        </nav>
        <div className={style.info}></div>
      </footer>
    </div>
  );
};

export default Layout;
