import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import { App } from './app';
import './main.scss';
import { store } from './reduxstore/monopolyStore';
import { routes } from './routes';

/* hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter(
    m => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async m => {
        const routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }
} */

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
