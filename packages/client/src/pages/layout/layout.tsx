import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { footerProps } from '../../mocs/footerProps';
import { headerProps } from '../../mocs/headerProps';
import style from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header {...headerProps} />
      <Outlet />
      <Footer {...footerProps} />
    </div>
  );
};
