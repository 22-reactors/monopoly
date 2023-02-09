import {
  Button,
  ButtonSizes,
  ButtonVariation,
} from '../../components/button/button';
import style from './layout.module.scss';

const Layout = () => {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <img src="logo.svg" />
        <div className={style.headerButtons}>
          <Button
            variation={ButtonVariation.PRIMARY}
            text="Войти"
            size={ButtonSizes.MEDIUM}
            rounded
          />
          <Button
            variation={ButtonVariation.OUTLINED}
            text="Регистрация"
            size={ButtonSizes.MEDIUM}
            rounded
          />
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
    </div>
  );
};

export default Layout;
