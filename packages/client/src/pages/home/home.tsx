import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';

import { headerProps } from '../../mocs/headerProps';

export const Home = () => {

  return (
    <main>
      <Header {...headerProps} />
      <Outlet />
    </main>
  )
}
