import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { footerProps } from '../../mocs/footerProps';
import { headerProps } from '../../mocs/headerProps';
import { useAppDispatch } from '../../reduxstore/hooks';
import { getUser } from '../../reduxstore/user/userSlice';

export const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Header {...headerProps} />
      <Outlet />
      <Footer {...footerProps} />
    </>
  );
};
