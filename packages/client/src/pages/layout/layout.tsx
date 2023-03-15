import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { footerProps } from '../../mocs/footerProps';
import { headerProps } from '../../mocs/headerProps';

export const Layout = () => (
    <>
      <Header {...headerProps} />
      <Outlet />
      <Footer {...footerProps} />
    </>
);
