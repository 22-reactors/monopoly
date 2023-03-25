import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { footerProps } from '../../mocs/footerProps';
import { headerProps } from '../../mocs/headerProps';
import { store } from '../../reduxstore/monopolyStore';
import { getUser } from '../../reduxstore/user/userSlice';

export const rootLoader = async () => {
  return await store.dispatch(getUser());
};

export const Layout = () => (
  <>
    <Header {...headerProps} />
    <Outlet />
    <Footer {...footerProps} />
  </>
);
