import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { HOST } from './utils/const';

const router = createBrowserRouter(routes);

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `${HOST}/api`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <RouterProvider router={router} />;
}
