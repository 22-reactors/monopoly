import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { footerProps } from '../../mocs/footerProps';
import { headerProps } from '../../mocs/headerProps';
import { useAppSelector } from '../../reduxstore/hooks';
import { userSelector } from '../../reduxstore/user/user.selector';

export const rootLoader = () => {
  const user = useAppSelector(userSelector);
  return user;
};

export const Layout = () => {
  return (
    <>
      <Header {...headerProps} />
      <Outlet />
      <Footer {...footerProps} />
    </>
  );
};
