import { Button, ButtonVariation } from '../../components/button/button';
import style from './layout.module.scss';

const Layout = () => {
  return (
    <>
      <header className={style.header}>
        <img src="logo.svg" />
        <div className={style.headerButtons}>
          <Button variation={ButtonVariation.KORGUKS} text="Войти" />
          <Button variation={ButtonVariation.KORGUKS} text="Регистрация" />
        </div>
      </header>
      <main className={style.main}></main>
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
    </>
  );
};

export default Layout;
